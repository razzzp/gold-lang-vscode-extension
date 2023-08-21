
import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in rust
	// check platform and get correct filename
	let exec_name = '';
	if (process.platform === 'win32'){
		exec_name = 'gold-lang-lsp.exe';
	} else if (process.platform === 'linux'){
		exec_name = 'gold-lang-lsp';
	} else {
		throw new Error(`${process.platform} platform not supported`);
	}
	const serverModule = context.asAbsolutePath(
		path.join('server', 'target', 'debug', exec_name)
	);

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { command: serverModule, transport: TransportKind.stdio},
		debug: { command: serverModule, transport: TransportKind.stdio}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', pattern: '**/*.god'}],
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions,
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}