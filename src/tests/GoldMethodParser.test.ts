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

test('test method parser, 1 function 1 proc',()=>{
   const testInput = `function FirstFunction(FirstParam:FirstType) return FirstReturnType private final
   endfunc

   procedure FirstProcedure(FirstParam:FirstType) protected override
   endproc
   `;
   const goldMethods = parser.parse(testInput);

   expect(goldMethods).toBeDefined();
   expect(goldMethods.length).toBe(2);
   // check func
   expect(goldMethods[0].type).toBe('function');
   expect(goldMethods[0].name).toBe('FirstFunction');
   expect(goldMethods[0].paramaters).toBe('(FirstParam:FirstType)');
   expect(goldMethods[0].scope).toBe('private');
   expect(goldMethods[0].returnType).toBe('FirstReturnType');
   expect(goldMethods[0].modifiers).toBe('final');
   expect(goldMethods[0].pos).toBe(0);
   //check proc
   expect(goldMethods[1].type).toBe('procedure');
   expect(goldMethods[1].name).toBe('FirstProcedure');
   expect(goldMethods[1].paramaters).toBe('(FirstParam:FirstType)');
   expect(goldMethods[1].scope).toBe('protected');
   expect(goldMethods[1].returnType).toBe('');
   expect(goldMethods[1].modifiers).toBe('override');
   // expect(goldMethods[1].pos).toBe(0);
});