import * as fs from 'fs'
import * as path from 'path'
import GoldDocumentParser, { IGoldDocumentParser } from "./GoldDocumentParser";
import IGoldCU from "../entities/IGoldCU";

export default class GoldProjectIndexer {

   private _projectRootPath: string;
   private _cus: IGoldCU[];
   /**
    *
    */
   constructor() {
      this._projectRootPath='';
      this._cus = [];
   }

   public getCUs(): IGoldCU[]{
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
   
         this._projectRootPath = rootPath;
         this._index(rootPath, '.god', parser);
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
      const data = fs.readFileSync(filePath, {encoding:'utf-8'});
      const newGoldEntity = parser.parse(data, filePath);
      if(newGoldEntity) this._cus.push(newGoldEntity);
      else console.log('failed to parse: ', filePath);
   }
}