import { IChapterImage } from './chapter-image.interface';

export interface IChapter {
  id: number;
  name: string;
  url: string;
  images: IChapterImage[];
}
