import IGoldCU, { GoldCU } from "../entities/IGoldCU";
import IGoldEntity from "../entities/IGoldEntity";
import { getRangeForEntity } from "../utils/utils";

interface IGoldCUParser {
   parse(text: string) : IGoldEntity;
   parseWithLocation(text: string, uri:string): IGoldEntity;
}

/**
 * CU represents a module or class
 */
export default class GoldCUParser implements IGoldCUParser{
   parseWithLocation(text: string, uri: string): IGoldCU {
      const result = this.parse(text);
      if(result) result.path = uri;
      return result;
   }

   parse(text: string): IGoldCU {
      let result = this._parseClassInfo(text);
      if(!result) result = this._parseModuleInfo(text);
      return result;
   }

   private _parseClassInfo(text: string) : IGoldCU {
      // regex for class name will not be specific
      //  so validation can be done later
      //  group 1: className
      //  group 2: parentClass
      const classDeclarationRegex = /^(?!;) *class +(\w+)(?: *\((\w+)\))?/mgi;
      const matches = [...text.matchAll(classDeclarationRegex)];
      
      if (matches && matches[0]){
         // just get first match for class info
         // console.log(matches);
         const result = new GoldCU()
         
         result.name = matches[0][1];
         result.type = 'class';
         result.parentClass = matches[0][2];
         result.pos = matches[0].index;
         result.range = getRangeForEntity(result, result.pos);
         return result;
      }
      return null;
   }

   private _parseModuleInfo(text: string) : IGoldCU{
      // regex for class name will not be specific
      //  so validation can be done later
      //  group 1: className
      //  group 2: parentClass
      const moduleDeclarationRegex = /^(?!;) *module +(\w+)/mgi;
      const matches = [...text.matchAll(moduleDeclarationRegex)];
      
      if (matches && matches[0]){
         // just get first match for class info
         // console.log(matches);
         const result = new GoldCU()

         result.name = matches[0][1];
         result.type = 'module';
         result.parentClass = '';
         result.pos = matches[0].index;
         result.range = getRangeForEntity(result, result.pos);
         return result;
      }
      return null;
   }

   

}