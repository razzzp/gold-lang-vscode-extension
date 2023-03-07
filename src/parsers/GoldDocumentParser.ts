import IGoldCU, { GoldCU } from "../entities/IGoldCU";
import GoldCUVariableParser from "./GoldCUVariableParser";
import GoldMethodParser from "./GoldMethodParser";
import GoldCUParser from "./GoldCUParser";

export interface IGoldDocumentParser {
   parse(text: string, uri: string) :  IGoldCU;
}

export default class GoldDocumentParser implements IGoldDocumentParser{

   /**
    * parse
    */
   public parse(text: string, uri: string) :  IGoldCU{
      // parse CU
      const cuParser = new GoldCUParser()
      const cu = cuParser.parseWithLocation(text, uri);

      // variables
      const classVariableParser = new GoldCUVariableParser()
      cu.variables = classVariableParser.parseWithLocation(text, uri);

      // methods
      const methodParser = new GoldMethodParser();
      cu.methods = methodParser.parseWithLocation(text, uri);

      return cu;
   }
}