import { IOutboundImage } from '../../../interfaces';

export interface IChapter {
  id: number;
  name: string;
  url: string;
  images: IOutboundImage[];
}
