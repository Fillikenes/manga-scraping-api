import { IsDefined, IsString } from 'class-validator';

export class TmoLectorNetSearchParamDto {
  @IsDefined()
  @IsString()
  value: string;
}
