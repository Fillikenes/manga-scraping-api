import { IsDefined, IsString } from 'class-validator';
import { IOutboundGetParams } from '../../../interfaces';

export class TuMangasGetListDto implements IOutboundGetParams {
  @IsDefined()
  @IsString()
  url: string;
}
