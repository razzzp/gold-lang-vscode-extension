import * as fs from 'fs/promises'
import * as path from 'path'
import GoldDocumentParser, { IGoldDocumentParser } from "./parsers/GoldDocumentParser";
import IGoldCU from "./entities/IGoldCU";
import IGoldEntity from './entities/IGoldEntity';
import * as fuzzysort from 'fuzzysort'
import { IFileFinder } from './utils/utils';



const _indexers = new Map<string, GoldProjectIndexer>();

export default class GoldProjectIndexer {

   private _cus: IGoldCU[];
   private _entities: IGoldEntity[];
   /**
    *
    */
   constructor() {
      this._cus = [];
      this._entities = [];
   }

   public getCUs(): IGoldCU[]{
      // return copy list of CUs
      return this._cus.slice();
   }

   /**
    * getEntities
    */
   public getEntities(): IGoldEntity[] {
      return this._entities.slice();
   }
   /**
    * indexFolder
    */
   public async indexProject(fileFinder: IFileFinder, parser: IGoldDocumentParser) :Promise<void> {
      const filePaths = await fileFinder.findFiles('**/*.god');
      await Promise.allSettled(filePaths.map((val,i)=>{
         return this._parseDocument(val, parser);
      }));
      // flatten all entities
      for(let cu of this._cus){
         this._entities.push(cu);
         this._entities.push(...cu.variables);
         this._entities.push(...cu.methods);
      }  
   }

   private async _parseDocument(filePath: string, parser: IGoldDocumentParser) : Promise<void>{
      // read file
      const data = await fs.readFile(filePath, {encoding:'utf-8'});
   
      // parse
      const newGoldEntity = parser.parse(data, filePath);
      if(newGoldEntity) {
         this._cus.push(newGoldEntity);
      } else {
         console.log(`failed to parse: ${filePath}`);
      }
      return;
   }

   public async queryEntityByName(query: string, ): Promise<IGoldEntity[]> {
      const sortResults =  fuzzysort.go<IGoldEntity>(query, this._entities, {key: 'name'});
      return sortResults.map((val, idx) => {
         return val.obj;
      });
   }
}
