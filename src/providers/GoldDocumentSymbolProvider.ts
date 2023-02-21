import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, ProviderResult, Range, SymbolInformation, SymbolKind, TextDocument } from "vscode";
import DocumentParser from "../parsers/GoldDocumentParser";


export default class GoldDocumentSymbolProvider implements DocumentSymbolProvider {
   provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
      const goldDocumentParser = new DocumentParser();
      const goldClass = goldDocumentParser.parse(document.getText());

      const result = new Array<DocumentSymbol>();
      if (goldClass) {
         // TODO: Add class details
         result.push(new DocumentSymbol(
            goldClass.name,
            '', 
            SymbolKind.Class, 
            new Range(0,1,0,2),
            new Range(0,1,0,2)
         ));
      }

      return result;
   } 
}