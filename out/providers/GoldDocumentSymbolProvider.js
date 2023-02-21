"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const GoldDocumentParser_1 = require("../parsers/GoldDocumentParser");
class GoldDocumentSymbolProvider {
    _getRangeForGoldEntity(document, goldEntity) {
        return new vscode_1.Range(document.positionAt(goldEntity.pos), document.positionAt(goldEntity.pos + goldEntity.name.length));
    }
    provideDocumentSymbols(document, token) {
        const result = new Array();
        const goldDocumentParser = new GoldDocumentParser_1.default();
        const goldClass = goldDocumentParser.parse(document.getText());
        const range = this._getRangeForGoldEntity(document, goldClass);
        if (goldClass) {
            // TODO: Add class details
            result.push(new vscode_1.DocumentSymbol(goldClass.name, '', vscode_1.SymbolKind.Class, range, range));
        }
        return result;
    }
}
exports.default = GoldDocumentSymbolProvider;
//# sourceMappingURL=GoldDocumentSymbolProvider.js.map