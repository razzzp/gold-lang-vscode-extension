import GoldProjectIndexer from "../GoldProjectIndexer";
import GoldDocumentParser from "../parsers/GoldDocumentParser";
import { MyFileFinder } from "../utils/utils";


let indexer: GoldProjectIndexer;
function initialize(){
   indexer = new GoldProjectIndexer();
} 

beforeEach(initialize);

test('test indexer CUs', async ()=>{
   const testInput = './src/tests/inputs/TestProject'
   const fileFinder = new MyFileFinder(testInput);
   const parser = new GoldDocumentParser();
   await indexer.indexProject(fileFinder, parser);

   const cus = indexer.getCUs();
   expect(cus.length).toBe(3);

   const entities = indexer.getEntities()
   expect(entities.length).toBe(15);
});

// test('test index entire cps repo wow', async ()=>{
//    const testInput = 'c:/Users/muhampra/dev/projects/cps-dev'
//    const fileFinder = new MyFileFinder(testInput);
//    const parser = new GoldDocumentParser();
//    await indexer.indexProject(fileFinder, parser);

//    const cus = indexer.getCUs();
//    expect(cus.length).toBe(8170);

//    const entities = indexer.getEntities()
//    expect(entities.length).toBe(99451);
// }, 60000);