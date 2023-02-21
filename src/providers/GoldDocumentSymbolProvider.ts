import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, ProviderResult, Range, SymbolInformation, SymbolKind, TextDocument } from "vscode";
import IGoldEntity from "../entities/IGoldEntity";
import DocumentParser from "../parsers/GoldDocumentParser";


export default class GoldDocumentSymbolProvider implements DocumentSymbolProvider {
   private _getRangeForGoldEntity(document: TextDocument, goldEntity: IGoldEntity): Range{
      return new Range(
         document.positionAt(goldEntity.pos),
         document.positionAt(goldEntity.pos+goldEntity.name.length)
      )
   }


   provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
      const result = new Array<DocumentSymbol>();
      
      const goldDocumentParser = new DocumentParser();
      const goldClass = goldDocumentParser.parse(document.getText());
      const range = this._getRangeForGoldEntity(document, goldClass)
      if (goldClass) {
         // TODO: Add class details
         result.push(new DocumentSymbol(
            goldClass.name,
            '', 
            SymbolKind.Class, 
            range,
            range
         ));
      }

      return result;
   } 
}