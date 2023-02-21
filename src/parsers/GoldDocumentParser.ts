import IGoldClass, { GoldClass } from "../entities/IGoldClass";


export default class DocumentParser {
   /**
    * parse
    */
   public parse(text: string) :  IGoldClass{
      const result = new GoldClass();

      // parse class info
      const {className, parentClass } = this.parseClassInfo(text);
      result.name = className;
      result.parentClass = parentClass;

      return result;
   }

   public parseClassInfo(text: string) : {className:string, parentClass:string}{
      // regex for class name will not be specific
      //  so validation can be done later
      const regex = /\bclass\s+(\w+)(?:\s*\((.+)\))?/g;
      const matches = [...text.matchAll(regex)];
      
      if (matches && matches[0]){
         // just get first match for class info
         console.log(matches);
         return {
            className: matches[0][1],
            parentClass: matches[0][2]
         };
      }
      return null;
   }
}