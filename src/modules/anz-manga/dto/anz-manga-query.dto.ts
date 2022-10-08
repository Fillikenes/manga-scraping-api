import { IsDefined, IsString } from 'class-validator';

export class AnzMangaQueryDto {
  @IsDefined()
  @IsString()
  url: string;
}
