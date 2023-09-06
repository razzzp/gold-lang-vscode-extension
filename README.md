# gold-lang README
##
A VSCode extension for the Gold Programming Language used by Mphasis Wyde in their eWAM IDE.

## Quickstart
A guide on VSCode Extension can be found on https://code.visualstudio.com/api.

The main sections of interest are under 'Language Extensions':
1. Syntax Higlighting - https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
2. Programmatic Language Features - https://code.visualstudio.com/api/language-extensions/programmatic-language-features
3. Language Server Extension Guide - https://code.visualstudio.com/api/language-extensions/language-server-extension-guide

### Syntax Higlighting
Syntax Higlighting is done using TextMate Grammar files. See https://macromates.com/manual/en/language_grammars
for the docs. Matches are done using Regex.

The main grammar file for this extension can be found in ./syntaxes/gold.tmLanguage.json

### Language Server
Starting from v0.1.0 the extension uses a language server: gold-lang-lsp, built using rust. Go to the corresponding repo to see what has been implemented.

LSP is under the server folder.

## Installation
The extension has been pre-packaged(but not published) and can be found in /vsix

To package:
1. vsce is require, install by running 'npm install -g @vscode/vsce'
2. Then in the project folder run 'vsce package', say yes to any prompts

To install:
1. Run the command 'code --install-extension gold-lang-[latest version].vsix'
or
1. Go to extensions tab in VSCode
2. Click on the triple dot '...' -> select 'Install from VSIX'
3. Select the .VSIX file to install
