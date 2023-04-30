import { IsDefined, IsString } from 'class-validator';
import { IOutboundSearchParams } from '../../../interfaces';

export class TmoLectorNetSearchParamDto implements IOutboundSearchParams {
  @IsDefined()
  @IsString()
  value: string;
}
