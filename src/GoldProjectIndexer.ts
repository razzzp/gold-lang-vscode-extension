import * as fs from 'fs'
import * as path from 'path'
import GoldDocumentParser, { IGoldDocumentParser } from "./parsers/GoldDocumentParser";
import IGoldCU from "./entities/IGoldCU";
import IGoldEntity from './entities/IGoldEntity';



const _indexers = new Map<string, GoldProjectIndexer>();

function _isPathValid(path: string) : boolean {
   return fs.existsSync(path);
}

export function getGoldProjectIndexerForProject(projectPath: string) : GoldProjectIndexer{
   if (!_isPathValid(projectPath)) return null;

   const normalizedPath = path.normalize(projectPath);
   let indexer = _indexers.get(normalizedPath);
   if(!indexer){
      indexer= new GoldProjectIndexer();
      _indexers.set(normalizedPath, indexer);
      indexer.indexFolder(normalizedPath);
   }

   return indexer;
}

export default class GoldProjectIndexer {

   private _projectRootPath: string;
   private _cus: IGoldCU[];
   private _entities: IGoldEntity[];
   private _indexValid:boolean;
   /**
    *
    */
   constructor() {
      this._projectRootPath='';
      this._cus = [];
      this._entities = [];
      this._indexValid=false;
   }

   public getCUs(): IGoldCU[]{
      // return copy list of CUs
      return this._cus.slice();
   }

   /**
    * indexFolder
    */
   public async indexFolder(rootPath: string) :Promise<void> {
      const result = new Promise<void>((resolve, reject) => {
         const parser = new GoldDocumentParser();
         if (!fs.existsSync(rootPath)) {
            console.log("no dir ", rootPath);
            reject();
         }
   
         // index folder, adding to this._cus
         this._projectRootPath = rootPath;
         this._index(rootPath, '.god', parser);

         // flatten all entities
         for(let cu of this._cus){
            this._entities.push(cu);
            this._entities.push(...cu.variables);
            this._entities.push(...cu.methods);
         }

         // sort by name
         this._entities.sort((a,b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
         });

         // indexing done, set flag
         this._indexValid = true;
         resolve();
      });
      return result;
   }

   private _index(startPath:string, filter : any, parser: IGoldDocumentParser)  {
      const files = fs.readdirSync(startPath);
      for (var i = 0; i < files.length; i++) {
         var filename = path.join(startPath, files[i]);
         var stat = fs.lstatSync(filename);
         if (stat.isDirectory()) {
            this._index(filename, filter, parser); //recurse
         } else if (filename.endsWith(filter)) {
            
            this._parseGoldDocument(filename, parser);
         };
      };
   }

   private _parseGoldDocument(filePath: string, parser: IGoldDocumentParser) {
      const data = fs.readFile(filePath, {encoding:'utf-8'}, (err, data)=>{
         if(err) {
            console.error(`Failed to parse '${filePath}'. ${err.message}`)
            return;
         };

         const newGoldEntity = parser.parse(data, filePath);
         if(newGoldEntity) this._cus.push(newGoldEntity);
         else console.log('failed to parse: ', filePath);
      }); 
   }
}