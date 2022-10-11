import { IChapterInformation } from './chapter.interface';

export interface IMangaInformation {
  name: string;
  url: string;
  altId: string;
  helperName: string;
  chapters?: IChapterInformation[];
}
