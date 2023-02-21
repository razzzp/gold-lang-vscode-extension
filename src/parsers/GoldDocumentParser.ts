import IGoldClass, { GoldClass } from "../entities/IGoldClass";


export default class DocumentParser {
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

      return result;
   }

   public parseClassInfo(text: string) : {className:string, parentClass:string, pos:number}{
      // regex for class name will not be specific
      //  so validation can be done later
      const regex = /^(?!;) *class\s+(\w+)(?: *\((\w+)\))?/mg;
      const matches = [...text.matchAll(regex)];
      
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