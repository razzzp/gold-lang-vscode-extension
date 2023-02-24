import * as fs from 'fs'
import GoldDocumentParser from '../parsers/GoldDocumentParser';



let parser: GoldDocumentParser;
function initializeParser(){
   parser = new GoldDocumentParser();
} 

beforeEach(initializeParser);

test('test parse class info', ()=>{
   const testInput = fs.readFileSync('./src/tests/inputs/aDocumentParserTest.god', 'utf8');
   const {className, parentClass, pos} = parser.parseClassInfo(testInput);
   
   // console.log(className, parentClass, pos);
   expect(className).toEqual('aTestClass');
   expect(parentClass).toEqual('aParentClass');
});


test('test parse class members amount', ()=>{
   // check only amount of variables, methods etc
   const testInput = fs.readFileSync('./src/tests/inputs/aDocumentParserTest.god', 'utf8');
   const goldClass = parser.parse(testInput);

   expect(goldClass.methods.length).toEqual(2);
   expect(goldClass.variables.length).toEqual(2);
});
