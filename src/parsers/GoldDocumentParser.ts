import IGoldCU, { GoldCU } from "../entities/IGoldCU";
import GoldCUVariableParser from "./GoldCUVariableParser";
import GoldMethodParser from "./GoldMethodParser";
import GoldCUParser from "./GoldCUParser";

export interface IGoldDocumentParser {
   parse(text: string, path: string) : IGoldCU;
   parseDocument(document: IDocument): IGoldCU;
}

export interface IDocument {
   getText(): string;
   getFilePath(): string;
}

export default class GoldDocumentParser implements IGoldDocumentParser{

   /**
    * parse
    */
   public parse(text: string, path: string) :  IGoldCU{
      // parse CU
      const cuParser = new GoldCUParser()
      const cu = cuParser.parseWithLocation(text, path);

      // variables
      const classVariableParser = new GoldCUVariableParser()
      cu.variables = classVariableParser.parseWithLocation(text, path);

      // methods
      const methodParser = new GoldMethodParser();
      cu.methods = methodParser.parseWithLocation(text, path);

      return cu;
   }

   public parseDocument(document: IDocument): IGoldCU {
      return this.parse(document.getText(), document.getFilePath());
   }
}