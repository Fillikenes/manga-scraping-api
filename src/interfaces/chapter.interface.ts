import { IOutboundImage } from '.';

export interface IOutboundChapter {
  id: number;
  name: string;
  images: IOutboundImage[];
}
