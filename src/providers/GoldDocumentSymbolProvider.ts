import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, ProviderResult, Range, SymbolInformation, SymbolKind, TextDocument } from "vscode";
import IGoldCU from "../entities/IGoldCU";
import IGoldClassVariable from "../entities/IGoldClassVariable";
import IGoldEntity from "../entities/IGoldEntity";
import IGoldMethod from "../entities/IGoldMethod";
import GoldDocumentParser from "../parsers/GoldDocumentParser";


export default class GoldDocumentSymbolProvider implements DocumentSymbolProvider {

   provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<SymbolInformation[] | DocumentSymbol[]> {
      
      // try to parse
      const goldDocumentParser = new GoldDocumentParser();
      const goldClass = goldDocumentParser.parse(document.getText());
      if (!goldClass) return null;

      // convert entities to vscode document symbols
      const result = new Array<DocumentSymbol>();
      const goldClassSymbol = this._generateGoldClassSymbol(goldClass,document);

      if (goldClassSymbol) {
         // TODO: Add class details
         result.push(goldClassSymbol);
      }

      return result;
   } 

   
   private _generateGoldClassSymbol(goldClass : IGoldCU, document : TextDocument) :DocumentSymbol{
      const range = this._getRangeForGoldEntity(document, goldClass)
      const goldClassSymbol = new DocumentSymbol(
         goldClass.name,
         '', 
         SymbolKind.Class, 
         range,
         range,
      );
      goldClassSymbol.children.push(...this._generateGoldClassVariablesSymbols(goldClass.variables, document));
      goldClassSymbol.children.push(...this._generateGoldMethodSymbols(goldClass.methods, document));
      return goldClassSymbol;
   }

   private _generateGoldClassVariablesSymbols(goldClassVariables : IGoldClassVariable[], document : TextDocument) : DocumentSymbol[]{
      const result = new Array<DocumentSymbol>();
      
      for(let classVar of goldClassVariables){
         const range = this._getRangeForGoldEntity(document, classVar)
         result.push(new DocumentSymbol(
            classVar.name,
            classVar.type,
            SymbolKind.Field,
            range,
            range
         ));
      }
      return result;
   }

   private _generateGoldMethodSymbols(goldMethods: IGoldMethod[], document: TextDocument) : DocumentSymbol[]{
      const result = new Array<DocumentSymbol>();
      
      for(let method of goldMethods){
         const range = this._getRangeForGoldEntity(document, method)
         result.push(new DocumentSymbol(
            method.name,
            method.returnType,
            SymbolKind.Method,
            range,
            range
         ));
      }
      return result;
   }

   private _getRangeForGoldEntity(document: TextDocument, goldEntity: IGoldEntity): Range{
      return new Range(
         document.positionAt(goldEntity.pos),
         document.positionAt(goldEntity.pos+goldEntity.name.length)
      )
   }

   
}