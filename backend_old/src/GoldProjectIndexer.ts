import * as fs from 'graceful-fs'
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

      // debug
      // const found = filePaths.find((val)=>{
      //    return val.toLowerCase().includes('aocsmobileiccardimage.god');
      // });
      // if(found) console.log(`Found! ${found}`);

      // TODO batch and await the parsing to prevent 'EMFILE: too many open files'
      await Promise.allSettled(filePaths.map((val,i)=>{
         return this._parseDocument(val, parser);
      }));
   }

   private async _parseDocument(filePath: string, parser: IGoldDocumentParser) : Promise<void>{
      

      // read file
      const data = await this._readFilePromise(filePath);
   
      // debug
      if(filePath.toLowerCase().includes('aocsmobileiccardimage.god')) {
         // for some reason, fails to read this file. too many open files?
         console.log('found aocsmobileiccardimage');
      }

      // parse
      const newGoldEntity = parser.parse(data, filePath);
      if(newGoldEntity) {
         this._cus.push(newGoldEntity);
         //flatten
         this._entities.push(newGoldEntity);
         this._entities.push(...newGoldEntity.variables);
         this._entities.push(...newGoldEntity.methods);
      } else {
         console.log(`failed to parse: ${filePath}`);
      }
      return;
   }

   private async _readFilePromise(filePath: string): Promise<string> {

      return new Promise<string>((resolve,reject)=>{
         fs.readFile(filePath, {encoding:'utf-8'}, (err, data)=>{
            if(err) reject(err);
            resolve(data);
         });
      });
   }

   public async queryEntityByName(query: string, ): Promise<IGoldEntity[]> {
      const sortResults =  fuzzysort.go<IGoldEntity>(query, this._entities, {key: 'name'});
      return sortResults.map((val, idx) => {
         return val.obj;
      });
   }

   public searchExactCaseInsensitive(query:string): IGoldEntity {
      return this._entities.find((val)=> val.name.toLowerCase()===query);
   }
}
