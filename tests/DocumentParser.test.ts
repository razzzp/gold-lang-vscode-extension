import fs from 'fs'
import DocumentParser from '../src/parsers/GoldDocumentParser';

const text = fs.readFileSync('./tests/inputs/aDocumentParserTest.god', 'utf8');

test('test parse class info', ()=>{
   const parser = new DocumentParser();
   const {className, parentClass} = parser.parseClassInfo(text);

   expect(className).toEqual('aTestClass');
   expect(parentClass).toEqual('aParentClass');
});

