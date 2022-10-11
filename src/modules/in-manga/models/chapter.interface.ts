import { IChapterImageInformation } from './chapter-image.interface';

export interface IChapterInformation {
  pagesCount: number;
  id: number;
  altId: string;
  url: string;
  images?: IChapterImageInformation[];
}
