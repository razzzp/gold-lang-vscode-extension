import GoldCUParser from "../parsers/GoldCUParser";


let parser: GoldCUParser;
function initializeParser(){
   parser = new GoldCUParser();
} 

beforeEach(initializeParser);


test('test parse class ', ()=>{
   const testInput = 'class aTestClass   (aParentClass)';
   const cu = parser.parse(testInput);
   
   // console.log(className, parentClass, pos);
   expect(cu.name).toEqual('aTestClass');
   expect(cu.type).toBe('class');
   expect(cu.parentClass).toEqual('aParentClass');
   expect(cu.pos).toBe(0);
});

test('test parse class info', ()=>{
   const testInput = 'module aTestModule';
   const cu = parser.parse(testInput);
   
   // console.log(className, parentClass, pos);
   expect(cu.name).toEqual('aTestModule');
   expect(cu.type).toBe('module');
   expect(cu.parentClass).toEqual('');
   expect(cu.pos).toBe(0);
});

