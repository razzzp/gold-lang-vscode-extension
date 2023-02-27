import IGoldCU, { GoldCU } from "../entities/IGoldCU";
import GoldClassVariableParser from "./GoldClassVariableParser";
import GoldMethodParser from "./GoldMethodParser";
import GoldCUParser from "./GoldCUParser";


export default class GoldDocumentParser{
   /**
    * parse
    */
   public parse(text: string) :  IGoldCU{
      // parse CU
      const cuParser = new GoldCUParser()
      const cu = cuParser.parse(text);

      // variables
      const classVariableParser = new GoldClassVariableParser()
      cu.variables = classVariableParser.parse(text);

      // methods
      const methodParser = new GoldMethodParser();
      cu.methods = methodParser.parse(text);

      return cu;
   }
}