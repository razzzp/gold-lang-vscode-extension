import IGoldEntity from "./IGoldEntity";

export default interface IGoldMethod extends IGoldEntity {
   get type(): string;
   get modifiers(): string;
   get paramaters():string;
   get returnType():string;
}

export class GoldMethod implements IGoldMethod {
   name: string;
   pos: number;
   type: string;
   modifiers: string;
   paramaters:string;
   returnType:string;
}