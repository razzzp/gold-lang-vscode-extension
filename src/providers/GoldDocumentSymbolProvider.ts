import { CancellationToken, DocumentSymbol, DocumentSymbolProvider, ProviderResult, Range, SymbolInformation, SymbolKind, TextDocument } from "vscode";
import IGoldClass from "../entities/IGoldClass";
import IGoldClassVariable from "../entities/IGoldClassVariable";
import IGoldEntity from "../entities/IGoldEntity";
import GoldDocumentParser from "../parsers/GoldDocumentParser";


export default class GoldDocumentSymbolProvider implements DocumentSymbolProvider {
   private _getRangeForGoldEntity(document: TextDocument, goldEntity: IGoldEntity): Range{
      return new Range(
         document.positionAt(goldEntity.pos),
         document.positionAt(goldEntity.pos+goldEntity.name.length)
      )
   }

   private _generateGoldClassSymbol(goldClass : IGoldClass, document : TextDocument) :DocumentSymbol{
      const range = this._getRangeForGoldEntity(document, goldClass)
      const goldClassSymbol = new DocumentSymbol(
         goldClass.name,
         '', 
         SymbolKind.Class, 
         range,
         range,
      );
      goldClassSymbol.children.push(...this._generateGoldClassVariablesSymbols(goldClass.variables, document));
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
}