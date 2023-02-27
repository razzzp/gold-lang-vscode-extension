import IGoldClassVariable, { GoldClassVariable } from "../entities/IGoldClassVariable";

export interface IGoldClassVariableParser {
   parse(text: string): IGoldClassVariable[];
}

export default class GoldClassVariableParser implements IGoldClassVariableParser {
   public parse(text: string): IGoldClassVariable[]{
      return this._parseClassVariables(text);
   }

   private _parseClassVariables(text: string): IGoldClassVariable[] {
      // regex to match class variable declaration, 'd' flag enabled to allow indices for submatches
      //  (?:\[[^\]]*?\][\s\S]*?)? is to match the [type:model..] syntax in gold
      // group 1: memory ?
      // group 2: variable name
      // group 3: refTo/listOf ?
      // group 4: ref modifiers ? (e.g. [P,A,T])
      // group 5: var type
      // group 6: inverse ?
      // group 7: inverse var ?
      // group 8: other modifiers ? (protected, override)
      //  last non-capturing group is to prevent matching 
     
      // const classVariableDeclarationRegex = /^(?!;) *(?:(memory) +)?(?:(\w+) *)\: *(?:(refTo|listOf) *(\[[\w, ]*\])? *)?(?:(\w+))(?: +(inverse) +(\w+))?(?: +(?!inverse)([\w ]+))?/mgi
      // TODO Find a way to parse model syntax, for now class variables that are indented will NOT be matched
      const classVariableDeclarationRegex = /^(?!;) {0,3}(?:(memory) +)?(?:(\w+) *)\: *(?:(refTo|listOf) *(\[[\w, ]*\])? *)?(?:(\w+))(?: +(inverse) +(\w+))?(?: +(?!inverse)([\w ]+))?/gimd;
      let variablesText = this._getClassVariablesText(text);
      const matches = [...variablesText.matchAll(classVariableDeclarationRegex)];
      
      if(!matches) return null;

      const result = new Array<IGoldClassVariable>();
      for(let match of matches) {
         const newGoldVar = this._buildGoldVariableFromRegexMatch(match);
         if (newGoldVar){
            result.push(newGoldVar);
         }
      }
      return result;
   }

      
   private _buildGoldVariableFromRegexMatch(regexMatch: RegExpMatchArray): IGoldClassVariable{
      if (!regexMatch) return null;

      const result = new GoldClassVariable();
      
      result.isMemory = (regexMatch[1] === 'memory');
      result.name = regexMatch[2];
      result.refType = regexMatch[3] ? regexMatch[3] : '';
      result.refModifiers = regexMatch[4] ? regexMatch[4] : '';
      result.type = regexMatch[5];
      result.inverseVar = regexMatch[7]?regexMatch[7]: '';
      result.modifiers = regexMatch[8]? regexMatch[8] : '';
      // indices not supported in typescript yet
      result.pos = regexMatch.index + regexMatch[0].indexOf(regexMatch[2]);
      
      return result
   }

   /**
    * removes everything after the first method
    * @param text document text
    */
   private _getClassVariablesText(text:string):string {
      const methodRegex = /^(?!;) *(function|func|procedure|proc)/mi;
      const firstMethodMatch = methodRegex.exec(text);
      // trim text to exclude functions, to prevent accidental matches to method params
      if(firstMethodMatch) {
         return text.substring(0,firstMethodMatch.index);
      } else {
         return text;
      }
   }
}