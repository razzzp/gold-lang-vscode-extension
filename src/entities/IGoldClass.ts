import { IGoldConstant } from "./IGoldConstants";
import IGoldEntity from "./IGoldEntity";
import IGoldMethod from "./IGoldMethod";
import IGoldVariable from "./IGoldVariable";

export default interface IGoldClass extends IGoldEntity{
   variables: IGoldVariable[];
   methods: IGoldMethod[];
   uses: IGoldClass[];
   constants: IGoldConstant[];
   parentClass: string;
}

export class GoldClass implements IGoldClass{
   parentClass: string;
   variables: IGoldVariable[];
   methods: IGoldMethod[];
   uses: IGoldClass[];
   constants: IGoldConstant[];
   name: string;
}