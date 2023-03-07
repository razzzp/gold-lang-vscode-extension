import { CancellationToken, ProviderResult, SymbolInformation, WorkspaceSymbolProvider } from "vscode";


export default class GoldWorkspaceSymbolProvider implements WorkspaceSymbolProvider<SymbolInformation> {
   provideWorkspaceSymbols(query: string, token: CancellationToken): ProviderResult<SymbolInformation[]> {
      throw new Error("Method not implemented.");
   }
   resolveWorkspaceSymbol?(symbol: SymbolInformation, token: CancellationToken): ProviderResult<SymbolInformation> {
      throw new Error("Method not implemented.");
   }
}