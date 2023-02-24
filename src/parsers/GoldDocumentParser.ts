import IGoldClass, { GoldClass } from "../entities/IGoldClass";
import IGoldClassVariable, { GoldClassVariable } from "../entities/IGoldClassVariable";
import GoldClassVariableParser from "./GoldClassVariableParser";
import GoldMethodParser from "./GoldMethodParser";


export default class GoldDocumentParser{
   /**
    * parse
    */
   public parse(text: string) :  IGoldClass{
      const result = new GoldClass();

      // parse class info
      const {className, parentClass, pos} = this.parseClassInfo(text);
      result.name = className;
      result.parentClass = parentClass;
      result.pos= pos;

      // variables
      const classVariableParser = new GoldClassVariableParser()
      result.variables = classVariableParser.parse(text);

      // methods
      const methodParser = new GoldMethodParser();
      result.methods = methodParser.parse(text);

      return result;
   }

   public parseClassInfo(text: string) : {className:string, parentClass:string, pos:number}{
      // regex for class name will not be specific
      //  so validation can be done later
      //  group 1: className
      //  group 2: parentClass
      const classDeclarationRegex = /^(?!;) *class\s+(\w+)(?: *\((\w+)\))?/mgi;
      const matches = [...text.matchAll(classDeclarationRegex)];
      
      if (matches && matches[0]){
         // just get first match for class info
         // console.log(matches);
         return {
            className: matches[0][1],
            parentClass: matches[0][2],
            pos: matches[0].index
         };
      }
      return null;
   }
}