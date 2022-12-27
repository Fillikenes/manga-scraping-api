import { IsDefined, IsString } from 'class-validator';

export class TuMangasSearchDto {
  @IsDefined()
  @IsString()
  nameManga: string;
}
