import IGoldEntity, { IRange } from "../entities/IGoldEntity";
import * as vscode from 'vscode';
import * as fs from "fs";
import * as path from "path";
import { IDocument } from "../parsers/GoldDocumentParser";

type RegExpMatchArrayWithIndices = RegExpMatchArray & { indices: Array<[number, number]> };

export function getRangeForEntity(entity: IGoldEntity, startPos: number):IRange {
   if(!entity || !startPos) return null;

   return {
      startPos: startPos,
      endPos: startPos + entity.name.length
   };
}

export interface IFileFinder {
   findFiles(pattern:string, exclude?: string) : Promise<string[]>;
}


export interface IDocumentFinder {
   findDocuments(pattern:string, exclude?: string) : Promise<IDocument[]>;
}

export interface IFileSystem {

}

export class MyFileFinder implements IFileFinder{
   private _path:string
   /**
    *
    */
   constructor(path:string) {
      this._path = path;
   }

   async findFiles(pattern: string, exclude?: string): Promise<string[]> {
      const result: string[]= [];
      this._find(this._path, '.god', result);
      return result;
   }

   
   private _find(startPath:string, filter : any, result: string[]) {
      const files = fs.readdirSync(startPath);
      for (var i = 0; i < files.length; i++) {
         var filename = path.join(startPath, files[i]);
         var stat = fs.lstatSync(filename);
         if (stat.isDirectory()) {
            this._find(filename, filter,  result); //recurse
         } else if (filename.endsWith(filter)) {
            result.push(filename);
         };
      };
   }
}