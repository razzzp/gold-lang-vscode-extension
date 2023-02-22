import IGoldClass, { GoldClass } from "../entities/IGoldClass";
import IGoldClassVariable, { GoldClassVariable } from "../entities/IGoldClassVariable";
import IGoldMethod from "../entities/IGoldMethod";


export default class GoldDocumentParser {
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
      result.variables = this.parseClassVariables(text);

      return result;
   }

   public buildGoldVariableFromRegexMatch(regexMatch: RegExpMatchArray): IGoldClassVariable{
      if (!regexMatch) return null;

      const result = new GoldClassVariable();
      result.pos = regexMatch.index;
      result.isMemory = (regexMatch[1] === 'memory');
      result.name = regexMatch[2];
      result.refType = regexMatch[3] ? regexMatch[3] : '';
      result.refModifiers = regexMatch[4] ? regexMatch[4] : '';
      result.type = regexMatch[5];
      result.inverseVar = regexMatch[7]?regexMatch[7]: '';
      result.modifiers = regexMatch[8]? regexMatch[8] : '';
      
      return result
   }

   public parseClassVariables(text: string): IGoldClassVariable[] {
      // regex to match class variable declaration
      // group 1: memory ?
      // group 2: variable name
      // group 3: refTo/listOf ?
      // group 4: ref modifiers ? (e.g. [P,A,T])
      // group 5: var type
      // group 6: inverse ?
      // group 7: inverse var ?
      // group 8: other modifiers ? (protected, override)
      //  last non-capturing group is to prevent matching 
      let variablesText = '';

      const methodRegex = /^(?!;) *(function|func|procedure|proc)/mi;
      const firstMethodMatch = methodRegex.exec(text);
      // trim text to exclude functions, to prevent accidental matches to method params
      if(firstMethodMatch) {
         variablesText = text.substring(0,firstMethodMatch.index);
      } else {
         variablesText = text;
      }

      const classVariableDeclarationRegex = /^(?!;) *(?:(memory) +)?(?:(\w+) *)\: *(?:(refTo|listOf) *(\[[\w, ]*\])? *)?(?:(\w+))(?: +(inverse) +(\w+))?(?: +(?!inverse)([\w ]+))?/mgi
      const matches = [...variablesText.matchAll(classVariableDeclarationRegex)];
      
      if(!matches) return null;

      const result = new Array<IGoldClassVariable>();
      for(let match of matches) {
         const newGoldVar = this.buildGoldVariableFromRegexMatch(match);
         if (newGoldVar){
            result.push(newGoldVar);
         }
      }
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

   private _parseProcedure(methodBody: string, index: number): IGoldMethod{
      // TODO
      return null;
   }

   private _parseFunction(methodBody: string, index: number): IGoldMethod{
      // TODO
      return null;
   }

   public parseMethods(text:string): IGoldMethod[] {
      // TODO
      const result = new Array<IGoldMethod>();
      // generic regex to capture method blocks only
      const methodBlockRegex = /(?:^|\n)(?!;) *\b(function|func|procedure|proc)\b[\s\S]*?\n(?!;)\b(endFunc|endProc|end)\b/ig
      const matches = text.matchAll(methodBlockRegex);

      for(let match of matches){
         let methodToPush: IGoldMethod = null;
         if (match[1] === 'function' || match[1] === 'func'){
            methodToPush= this._parseFunction(match[0], match.index);
         } else if (match[1] === 'procedure' || match[1] === 'proc'){
            methodToPush= this._parseProcedure(match[0], match.index);
         }
         if(methodToPush){
            result.push(methodToPush);
         }
      }

      return result;
   }
}