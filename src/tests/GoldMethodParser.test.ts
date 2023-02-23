import GoldMethodParser from "../parsers/GoldMethodParser";

let parser: GoldMethodParser;
function initializeParser(){
   parser = new GoldMethodParser();
} 

beforeEach(initializeParser);

test('test method parser, 1 procedure',()=>{
   const testInput = `procedure FirstProcedure
   endproc
   `;
   const goldMethods = parser.parse(testInput);

   expect(goldMethods).toBeDefined();
   expect(goldMethods.length).toBe(1);
   expect(goldMethods[0].type).toBe('procedure');
   expect(goldMethods[0].name).toBe('FirstProcedure');
   expect(goldMethods[0].paramaters).toBe('');
   expect(goldMethods[0].scope).toBe('');
   expect(goldMethods[0].returnType).toBe('');
   expect(goldMethods[0].modifiers).toBe('');
   expect(goldMethods[0].pos).toBe(0);
});


test('test method parser, 1 function',()=>{
   const testInput = `function FirstFunction return FirstReturnType
   endfunc
   `;
   const goldMethods = parser.parse(testInput);

   expect(goldMethods).toBeDefined();
   expect(goldMethods.length).toBe(1);
   expect(goldMethods[0].type).toBe('function');
   expect(goldMethods[0].name).toBe('FirstFunction');
   expect(goldMethods[0].paramaters).toBe('');
   expect(goldMethods[0].scope).toBe('');
   expect(goldMethods[0].returnType).toBe('FirstReturnType');
   expect(goldMethods[0].modifiers).toBe('');
   expect(goldMethods[0].pos).toBe(0);
});