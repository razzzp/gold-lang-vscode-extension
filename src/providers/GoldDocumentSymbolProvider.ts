import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, ProviderResult, SymbolInformation, TextDocument } from "vscode";


export default class GoldDocumentSymbolProvider implements DocumentSymbolProvider {
   provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
      throw new Error("Method not implemented.");
   }
}