import { IsDefined, IsString } from 'class-validator';

export class InMangaParamDto {
  @IsDefined()
  @IsString()
  manga: string;
}
