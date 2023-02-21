import vscode from 'vscode'
import GoldDocumentSymbolProvider from './providers/GoldDocumentSymbolProvider';

vscode.languages.registerDocumentSymbolProvider('gold', new GoldDocumentSymbolProvider());