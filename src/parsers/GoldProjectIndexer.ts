import { IGoldSymbol } from "../entities/IGoldSymbol";
import * as fs from 'fs'
import * as path from 'path'

export default class GoldProjectIndexer {

   private _projectRootPath: string;
   private _symbols: IGoldSymbol[]
   /**
    *
    */
   constructor() {
      
   }

   /**
    * indexFolder
    */
   public indexFolder(rootPath: string) {
      if (!fs.existsSync(rootPath)) {
         console.log("no dir ", rootPath);
         return;
      }

      this._projectRootPath = rootPath;
      this._index(rootPath, '.god');
   }

   private _index(startPath:string, filter : any) {
      const files = fs.readdirSync(startPath);
      for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
               this._index(filename, filter); //recurse
            } else if (filename.endsWith(filter)) {
               console.log('-- found: ', filename);
            };
      };
   }

}