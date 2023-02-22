import IGoldClassVariable from "./IGoldClassVariable";
import { IGoldConstant } from "./IGoldConstants";
import IGoldEntity from "./IGoldEntity";
import IGoldMethod from "./IGoldMethod";

export default interface IGoldClass extends IGoldEntity{
   get variables(): IGoldClassVariable[];
   get methods(): IGoldMethod[];
   get uses(): IGoldClass[];
   get constants(): IGoldConstant[];
   get parentClass(): string;
}

export class GoldClass implements IGoldClass{
   pos: number;
   parentClass: string;
   variables: IGoldClassVariable[];
   methods: IGoldMethod[];
   uses: IGoldClass[];
   constants: IGoldConstant[];
   name: string;
}