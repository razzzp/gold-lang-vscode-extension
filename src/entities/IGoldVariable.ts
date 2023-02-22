import IGoldEntity from "./IGoldEntity";

export default interface IGoldVariable extends IGoldEntity{
   get type(): string;
}

export class GoldVariable implements IGoldVariable{
   public pos: number
   public name: string;
   public type: string

   constructor() {
   }

}