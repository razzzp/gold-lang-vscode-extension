import IGoldVariable from "./IGoldVariable";

export default interface IGoldClassVariable extends IGoldVariable{
   get isMemory(): boolean;
   get refType(): string;
   get refModifiers(): string;
   get inverseVar(): string;
   get modifiers(): string;
}

export class GoldClassVariable implements IGoldClassVariable{
   pos: number
   name: string;
   type: string;
   isMemory: boolean;
   refType: string;
   refModifiers: string;
   inverseVar: string;
   modifiers: string;

   constructor() {
   }

}