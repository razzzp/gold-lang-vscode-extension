
import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import fs from 'fs';
import fsPromises from 'fs/promises';

import {
	LanguageClient,
	LanguageClientOptions,
	OptionalVersionedTextDocumentIdentifier,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;
declare let v8debug: any;

function setUpLSP(context: ExtensionContext) {
	// The server is implemented in rust
	// check platform and get correct filename
	let exec_name = '';
	if (process.platform === 'win32') {
		exec_name = 'gold-lang-lsp.exe';
	} else if (process.platform === 'linux') {
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
				env: {
					"RUST_BACKTRACE": 1
				}
			},
			args:[
				"--log-debug"
			]
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', pattern: '**/*.god' }],
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

function setUpCommands(context: ExtensionContext) {
	const createMobileFDPC = 'goldlang.createMobileFileFDPCClass';

	const commandHandler = async () => {
		// ask user input
		let className = await vscode.window.showInputBox({prompt:'Enter new class name'});
		if (className === undefined || className.trim() === ''){
			return
		}
		className = className.trim();

		let parentClass = await vscode.window.showInputBox({prompt:'Enter parent class',value:'aOcs_FD_PC_MobileWithCustomAC'});
		if (parentClass === undefined || parentClass.trim() === ''){
			return
		}
		parentClass = parentClass.trim()

		let today = new Date();
		const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(today);
		const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(today);
		const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(today);
		const dateAsString = `${day}${month}${year}`
		let signature = await vscode.window.showInputBox({prompt:'Enter signature (without ADDITION/BEGIN/...)',value:`XYZ CRXXXXX ${dateAsString}`});
		if (signature === undefined || signature.trim() === ''){
			return
		}
		signature = signature.trim()

		const wsedit = new vscode.WorkspaceEdit();
		const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
		const filePath = path.join(wsPath, 'src', '_NEW_', `${className}.god`);
		if (fs.existsSync(filePath)) {
			vscode.window.showInformationMessage(`${className}.god already exists, aborting...`);
			return
		}
		const fileUri = vscode.Uri.file(filePath);


		vscode.window.showInformationMessage(`Creating class ${className} under ${parentClass}`);
		// get template file
		const template = await fsPromises.readFile(
			context.asAbsolutePath('templates/FileFDPCClass.god'), 
			{
				encoding: 'utf8',
			});
		// replace values
		const fileContents = template
			.replace(/\$\{className\}/g, className)
			.replace(/\$\{parentClass\}/g, parentClass)
			.replace(/\$\{today\}/g, dateAsString)
			.replace(/\$\{signature\}/g, signature);
		wsedit.createFile(
			fileUri, 
			{ 
				ignoreIfExists: true,
				contents: Buffer.from(fileContents, 'utf8')
			},);
		vscode.workspace.applyEdit(wsedit);
		vscode.window.showInformationMessage(`File created: ${fileUri.toString()}`);
	};

	context.subscriptions.push(vscode.commands.registerCommand(createMobileFDPC, commandHandler));
}

export function activate(context: ExtensionContext) {
	setUpLSP(context);
	setUpCommands(context);
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}