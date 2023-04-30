import { IsDefined, IsString } from 'class-validator';
import { IOutboundGetParams } from '../../../interfaces';

export class LectorMangaGetDto implements IOutboundGetParams {
  @IsDefined()
  @IsString()
  url: string;
}
