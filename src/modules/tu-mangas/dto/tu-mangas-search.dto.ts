import { IsDefined, IsString } from 'class-validator';

export class TuMangasGetListDto {
  @IsDefined()
  @IsString()
  name: string;
}
