"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const GoldDocumentParser_1 = require("../parsers/GoldDocumentParser");
const text = fs.readFileSync('./src/tests/inputs/aDocumentParserTest.god', 'utf8');
test('test parse class info', () => {
    const parser = new GoldDocumentParser_1.default();
    const { className, parentClass, pos } = parser.parseClassInfo(text);
    console.log(className, parentClass, pos);
    expect(className).toEqual('aTestClass');
    expect(parentClass).toEqual('aParentClass');
});
//# sourceMappingURL=DocumentParser.test.js.map