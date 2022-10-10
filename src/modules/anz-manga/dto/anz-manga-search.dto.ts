import { IsDefined, IsString } from 'class-validator';

export class AnzMangaSearchDto {
  @IsDefined()
  @IsString()
  value: string;
}
