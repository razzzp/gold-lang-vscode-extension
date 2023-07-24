import { CancellationToken, ProviderResult, SymbolInformation, WorkspaceSymbolProvider } from "vscode";
import GoldProjectIndexer from "../GoldProjectIndexer";
import * as vscode from "vscode";


export default class GoldWorkspaceSymbolProvider implements WorkspaceSymbolProvider<SymbolInformation> {
   private _indexer: GoldProjectIndexer;

   /**
    *
    */
   constructor(goldIndexer: GoldProjectIndexer) {
      this._indexer = goldIndexer;
   }

   async provideWorkspaceSymbols(query: string, token: CancellationToken): Promise<SymbolInformation[]> {
      const queryResult = await this._indexer.queryEntityByName(query);
      return queryResult.map((entity)=>{
         return new SymbolInformation(
            entity.name,
            vscode.SymbolKind.Field,
            '',
            new vscode.Location(vscode.Uri.file(entity.path),undefined)
         );
      });
   }

   private _getSymbolKind(goldType: string): vscode.SymbolKind{
      // TODO
      return vscode.SymbolKind.Field;
   }

   async resolveWorkspaceSymbol?(symbol: SymbolInformation, token: CancellationToken): Promise<SymbolInformation> {
      const textDoc = await vscode.workspace.openTextDocument(symbol.location.uri);
      if(!textDoc) return undefined;

      const entity = this._indexer.searchExactCaseInsensitive(symbol.name);
      if(!entity) return undefined;

      symbol.location.range = new vscode.Range(
         textDoc.positionAt(entity.range.startPos),
         textDoc.positionAt(entity.range.endPos));
      return symbol;
   }
}