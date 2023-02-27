import IGoldClassVariable from "./IGoldClassVariable";
import { IGoldConstant } from "./IGoldConstants";
import IGoldEntity from "./IGoldEntity";
import IGoldMethod from "./IGoldMethod";

export default interface IGoldCU extends IGoldEntity{
   type: string;
   pos: number;
   parentClass: string;
   variables: IGoldClassVariable[];
   methods: IGoldMethod[];
   uses: IGoldCU[];
   constants: IGoldConstant[];
   name: string;
}

export class GoldCU implements IGoldCU{
   type: string;
   pos: number;
   parentClass: string;
   variables: IGoldClassVariable[];
   methods: IGoldMethod[];
   uses: IGoldCU[];
   constants: IGoldConstant[];
   name: string;
}