import IGoldEntity from "./IGoldEntity";

export interface ILocation{
   get filePathFromRoot():string;
   get startPos(): number;
   get endPos(): number;
}


export interface IGoldSymbol{
   get entity(): IGoldEntity;
   get location(): ILocation;
}