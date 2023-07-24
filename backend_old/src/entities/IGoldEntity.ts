export interface IRange{
   startPos: number;
   endPos: number;
}
export default interface IGoldEntity{
   get name(): string;
   get pos(): number;
   get path(): string;
   set path(uri:string);
   get range(): IRange;
   get type(): string;
}