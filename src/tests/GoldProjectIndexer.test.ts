import GoldProjectIndexer from "../parsers/GoldProjectIndexer";


let indexer: GoldProjectIndexer;
function initialize(){
   indexer = new GoldProjectIndexer();
} 

beforeEach(initialize);

test('test indexer CUs', async ()=>{
   const testInput = './src/tests/inputs/TestProject'
   await indexer.indexFolder(testInput);

   const result = indexer.getCUs();
   expect(result.length).toBe(3);
});