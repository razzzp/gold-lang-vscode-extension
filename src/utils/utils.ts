import IGoldEntity, { IRange } from "../entities/IGoldEntity";

type RegExpMatchArrayWithIndices = RegExpMatchArray & { indices: Array<[number, number]> };

export function getRangeForEntity(entity: IGoldEntity, startPos: number):IRange {
   if(!entity || !startPos) return null;

   return {
      startPos: startPos,
      endPos: startPos + entity.name.length
   };
}