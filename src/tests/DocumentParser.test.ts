import * as fs from 'fs'
import DocumentParser from '../parsers/GoldDocumentParser';

const text = fs.readFileSync('./src/tests/inputs/aDocumentParserTest.god', 'utf8');

test('test parse class info', ()=>{
   const parser = new DocumentParser();
   const {className, parentClass, pos} = parser.parseClassInfo(text);

   console.log(className, parentClass, pos);
   expect(className).toEqual('aTestClass');
   expect(parentClass).toEqual('aParentClass');
});

