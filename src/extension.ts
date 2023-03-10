// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import GoldProjectIndexer from './GoldProjectIndexer';
import GoldDocumentParser from './parsers/GoldDocumentParser';
import GoldDocumentSymbolProvider from './providers/GoldDocumentSymbolProvider';
import GoldWorkspaceSymbolProvider from './providers/GoldWorkspaceSymbolProvider';
import { VSCodeWorkspaceWrapper } from './wrappers/VSCodeWrappers';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Gold Lang" is now active!');

	let docSymProviderDisp = vscode.languages.registerDocumentSymbolProvider('gold',new GoldDocumentSymbolProvider());
	context.subscriptions.push(docSymProviderDisp);

	if(vscode.workspace.workspaceFolders) {
		const fileFinder = new VSCodeWorkspaceWrapper();
		const indexer = new GoldProjectIndexer();
		const parser = new GoldDocumentParser();
		indexer.indexProject(fileFinder, parser);
		let wsSymProviderDisp = vscode.languages.registerWorkspaceSymbolProvider(new GoldWorkspaceSymbolProvider(indexer));
		context.subscriptions.push(wsSymProviderDisp);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
