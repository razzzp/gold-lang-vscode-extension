import GoldCUVariableParser from "../parsers/GoldCUVariableParser";


let parser: GoldCUVariableParser;
function initializeParser(){
   parser = new GoldCUVariableParser();
} 

beforeEach(initializeParser);

test('test parse class variable declaration, single', ()=>{

   const testInput = 'AClassVariable:AType';
   const goldVariables = parser.parse(testInput);

   expect(goldVariables).toBeDefined();
   expect(goldVariables.length).toBe(1);
   expect(goldVariables[0].name).toBe('AClassVariable');
   expect(goldVariables[0].type).toBe('AType')
});

test('test parse class variable declaration, single, refto and all modifiers', ()=>{

   const testInput = ' memory  AClassVariable2 : refto [P,A,T] AType2 inverse InverseVar private override';
   const goldClassVariables = parser.parse(testInput);

   expect(goldClassVariables).toBeDefined();
   expect(goldClassVariables.length).toBe(1);
   expect(goldClassVariables[0].name).toBe('AClassVariable2');
   expect(goldClassVariables[0].type).toBe('AType2');
   expect(goldClassVariables[0].isMemory).toBe(true);
   expect(goldClassVariables[0].refType).toBe('refto');
   expect(goldClassVariables[0].refModifiers).toBe('[P,A,T]');
   expect(goldClassVariables[0].inverseVar).toBe('InverseVar');
   expect(goldClassVariables[0].modifiers).toBe('private override');
});

test('test parse class variable declaration, multiple, with comments', ()=>{

   const testInput = 
   `
   memory  FirstVariable : refto [P,A,T] FirstType inverse InverseVar private override
   ; ACommentVariable:ACommentType
   SecondVariable:SecondType
   ` 
   const goldClassVariables = parser.parse(testInput);

   expect(goldClassVariables).toBeDefined();
   expect(goldClassVariables.length).toBe(2);
   
   expect(goldClassVariables[0].name).toBe('FirstVariable');
   expect(goldClassVariables[0].type).toBe('FirstType');
   expect(goldClassVariables[0].isMemory).toBe(true);
   expect(goldClassVariables[0].refType).toBe('refto');
   expect(goldClassVariables[0].refModifiers).toBe('[P,A,T]');
   expect(goldClassVariables[0].inverseVar).toBe('InverseVar');
   expect(goldClassVariables[0].modifiers).toBe('private override');

   expect(goldClassVariables[1].name).toBe('SecondVariable');
   expect(goldClassVariables[1].type).toBe('SecondType');
   expect(goldClassVariables[1].isMemory).toBe(false);
   expect(goldClassVariables[1].refType).toBe('');
   expect(goldClassVariables[1].refModifiers).toBe('');
   expect(goldClassVariables[1].inverseVar).toBe('');
   expect(goldClassVariables[1].modifiers).toBe('');
});