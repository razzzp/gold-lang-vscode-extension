import IGoldMethod, { GoldMethod } from "../entities/IGoldMethod";
import { getRangeForEntity } from "../utils/utils";

export interface IGoldMethodParser {
   parse(text: string): IGoldMethod[];
   parseWithLocation(text: string, path:string): IGoldMethod[];
}

export default class GoldMethodParser implements IGoldMethodParser {
   parseWithLocation(text: string, path: string): IGoldMethod[] {
      const result = this.parse(text);
      if(result) {
         for(let goldEntity of result) {
            goldEntity.path = path;
         }
      }
      return result;
   }
   
   public parse(text: string): IGoldMethod[]{
      return this._parseMethods(text);
   }
   private _parseProcedure(methodBody: string, index: number): IGoldMethod{
      // regex to match procedure declaration
      // group 1 : proc | procedure
      // group 2 : name
      // group 3 : params including () ?
      // group 4 : private | protected ?
      // group 5 : override | final ?
      // group 6 : external DLL name ?
      const procedureRegex = /(?:^|\n)(?!;) *\b(proc|procedure)\s+(\w+)(?:\s*(\([^)]*\)?))?(?:\s+\b(private|protected)\b)?(?:\s+\b(override|final)\b)?(?:\s+external\s*'(.*)')?/gi;
      const match = procedureRegex.exec(methodBody);
      if(!match) return null;

      const result = new GoldMethod();
      result.type = 'procedure';
      result.name = match[2];
      result.paramaters = match[3]?match[3]:'';
      result.scope = match[4]?match[4]:'';
      result.returnType = '';
      result.modifiers = match[5] ? match[5]:'';
      // typescript does not support indices yet
      result.pos = index +  match[0].indexOf(match[2]);
      result.range = getRangeForEntity(result, result.pos);

      return result;
   }

   private _parseFunction(methodBody: string, index: number): IGoldMethod{
      // regex to match function declaration
      // group 1 : func | function
      // group 2 : name
      // group 3 : params including () ?
      // group 4 : return type
      // group 5 : private | protected ?
      // group 6 : override | final ?
      // group 7 : external DLL name ?
      const procedureRegex = /(?:^|\n)(?!;) *\b(func|function)\s+(\w+)(?:\s*(\([^)]*\)?))?(?:\s*\breturn\s+(\w+))(?:\s+\b(private|protected)\b)?(?:\s+\b(override|final)\b)?(?:\s+external\s*'(.*)')?/gi;

      const match = procedureRegex.exec(methodBody);
      if(!match) return null;

      // const matches = [...methodBody.matchAll(procedureRegex)];
      // if(!matches[0]) return null;
      // const match = matches[0]

      const result = new GoldMethod();
      result.type = 'function';
      result.name = match[2];
      result.paramaters = match[3]?match[3]:'';
      result.scope = match[5] ? match[5]:'';
      result.returnType = match[4]?match[4]:'';
      result.modifiers = match[6] ? match[6]:'';
      // typescript does not support indices yet
      result.pos = index +  match[0].indexOf(match[2]);
      result.range = getRangeForEntity(result, result.pos);

      return result;
   }

   private _parseMethods(text:string): IGoldMethod[] {
      // TODO
      const result = new Array<IGoldMethod>();
      // generic regex to capture method blocks only
      const methodBlockRegex = /(?:^|\n)(?!;) *\b(function|func|procedure|proc)\b[\s\S]*?\n\s*(?!;)\s*\b(endFunc|endProc|end)\b/ig
      const matches = text.matchAll(methodBlockRegex);

      for(let match of matches){
         let methodToPush: IGoldMethod = null;
         if (match[1].toLowerCase() === 'function' || match[1].toLowerCase() === 'func'){
            methodToPush= this._parseFunction(match[0], match.index);
         } else if (match[1].toLowerCase() === 'procedure' || match[1].toLowerCase() === 'proc'){
            methodToPush= this._parseProcedure(match[0], match.index);
         }
         if(methodToPush){
            result.push(methodToPush);
         }
      }

      return result;
   }
}

