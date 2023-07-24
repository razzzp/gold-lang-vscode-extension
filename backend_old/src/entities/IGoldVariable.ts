import IGoldEntity, { IRange } from "./IGoldEntity";

export default interface IGoldVariable extends IGoldEntity{
   get type(): string;
}

export class GoldVariable implements IGoldVariable{
   pos: number
   name: string;
   type: string;
   range: IRange;
   path:string;

   constructor() {
   }

}