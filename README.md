# gold-lang README
## Description
A VSCode extension for the Gold Programming Language used by Mphasis Wyde in their eWAM IDE.

## Installation
The extension has been pre-packaged(but not published) and can be found in '/vsix'

### To install:
1. Go to extensions tab in VSCode
2. Click on the triple dot '...' -> select 'Install from VSIX'
3. Select the .VSIX file to install
**or**
1. Run the command 'code --install-extension gold-lang-[latest version].vsix'

## Implemented LSP Features

### Diagnostics
- For now only implements programming rule checking:
  *  Unused local vars
  *  Unpurged tVarByteArray
  *  Function return type checker
  *  Inout param checker
  *  Inherited checker
  *  Naming convention checker

TODO:
- Type inference (for nil checking)
- Type checking

### Go to Definition
- Generally it is implemented for all syntax.

TODO: 
- Classes in 'use' syntax

### Completion Proposal
- Provides auto complete to RHS of a dot operator
- Outside the dot operator, the LSP will propose members defined in the current class/module & its parents
  
TODO:
- Filter proposals based on public/protected/private
- Include keyword autocomplete
- Class & Module autocomplete

## Other Features
### Mobile File FDPC Class Generator
Generates a template for FD_PC classes.
Available through command palette (Ctr + Shift + P): `Gold: Create New Mobile File FDPC Class`

## Contributing
A guide on VSCode Extension can be found on https://code.visualstudio.com/api.

The main sections of interest are under 'Language Extensions' & 'Language Server Extension Guide':
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



### Packaging
1. vsce is required, install by running 'npm install -g @vscode/vsce'
2. Then in the project folder run 'vsce package', say yes to any prompts


