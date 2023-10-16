
import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	OptionalVersionedTextDocumentIdentifier,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;
declare let v8debug:any;
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
	

	const serverModuleDebug = context.asAbsolutePath(
		path.join('server', 'gold-lang-lsp', 'target', 'debug', exec_name))

	const serverModule = context.asAbsolutePath(
		path.join('server', 'gold-lang-lsp', 'target', 'release', exec_name))


	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { command: serverModule, transport: TransportKind.stdio, },
		debug: { 
			command: `${serverModuleDebug}`, 
			transport: TransportKind.stdio,
			options: {
				env:{
					"RUST_BACKTRACE": 1
				}
			}
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', pattern: '**/*.god'}],
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'goldlangext',
		'Gold Lang Extension',
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