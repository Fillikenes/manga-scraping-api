import { IsDefined, IsString } from 'class-validator';
import { IOutboundSearchParams } from '../../../interfaces';

export class TuMangasSearchDto implements IOutboundSearchParams {
  @IsDefined()
  @IsString()
  value: string;
}
