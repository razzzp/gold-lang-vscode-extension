import { IFileFinder } from "../utils/utils";
import * as vscode from "vscode";
import { IDocument } from "../parsers/GoldDocumentParser";

export class VSCodeWorkspaceWrapper implements IFileFinder {
   async findFiles(pattern: string, exclude?: string): Promise<string[]> {
      const foundUris =  await vscode.workspace.findFiles(pattern, exclude);
      return foundUris.map((val,i)=>{
         return val.fsPath;
      });
   }
}

export class VSCodeDocumentWrapper implements IDocument {
   private _vsCodeDoc : vscode.TextDocument;
   /**
    *
    */
   constructor(vsCodeDoc: vscode.TextDocument) {
      this._vsCodeDoc = vsCodeDoc;
   }
   getText(): string {
      return this._vsCodeDoc.getText();
   }
   getFilePath(): string {
      return this._vsCodeDoc.uri.fsPath;
   }
}