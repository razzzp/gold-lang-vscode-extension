"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IGoldClass_1 = require("../entities/IGoldClass");
class DocumentParser {
    /**
     * parse
     */
    parse(text) {
        const result = new IGoldClass_1.GoldClass();
        // parse class info
        const { className, parentClass, pos } = this.parseClassInfo(text);
        result.name = className;
        result.parentClass = parentClass;
        result.pos = pos;
        return result;
    }
    parseClassInfo(text) {
        // regex for class name will not be specific
        //  so validation can be done later
        const regex = /^(?!;) *class\s+(\w+)(?:\s*\((\w+)\))?/mg;
        const matches = [...text.matchAll(regex)];
        if (matches && matches[0]) {
            // just get first match for class info
            // console.log(matches);
            return {
                className: matches[0][1],
                parentClass: matches[0][2],
                pos: matches[0].index
            };
        }
        return null;
    }
}
exports.default = DocumentParser;
//# sourceMappingURL=GoldDocumentParser.js.map