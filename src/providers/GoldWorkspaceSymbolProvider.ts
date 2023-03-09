import { CancellationToken, ProviderResult, SymbolInformation, WorkspaceSymbolProvider } from "vscode";
import GoldProjectIndexer, { getGoldProjectIndexerForProject } from "../GoldProjectIndexer";
import * as vscode from "vscode";


export default class GoldWorkspaceSymbolProvider implements WorkspaceSymbolProvider<SymbolInformation> {
   private _indexer: GoldProjectIndexer;

   /**
    *
    */
   constructor(goldIndexer: GoldProjectIndexer) {
      this._indexer = goldIndexer;
   }

   provideWorkspaceSymbols(query: string, token: CancellationToken): ProviderResult<SymbolInformation[]> {
      // TODO
      return null;
      
   }
   resolveWorkspaceSymbol?(symbol: SymbolInformation, token: CancellationToken): ProviderResult<SymbolInformation> {
      // TODO
      throw new Error("Method not implemented.");
   }
}