import { IsDefined, IsString } from 'class-validator';
import { IOutboundSearchParams } from '../../../interfaces';

export class InMangaSearchDto implements IOutboundSearchParams {
  @IsDefined()
  @IsString()
  value: string;
}
