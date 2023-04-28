import { IsDefined, IsString } from 'class-validator';
import { IOutboundGetParams } from '../../../interfaces';

export class InMangaGetDto implements IOutboundGetParams {
  @IsDefined()
  @IsString()
  url: string;
}
