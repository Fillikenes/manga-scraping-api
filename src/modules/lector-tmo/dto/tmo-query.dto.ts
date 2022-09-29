import { IsDefined, IsString } from 'class-validator';

export class TmoQueryDto {
  @IsDefined()
  @IsString()
  url: string;
}
