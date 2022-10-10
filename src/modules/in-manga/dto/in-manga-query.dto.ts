import { IsDefined, IsString } from 'class-validator';

export class InMangaQueryDto {
  @IsDefined()
  @IsString()
  url: string;
}
