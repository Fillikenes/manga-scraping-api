import { IsDefined, IsString } from 'class-validator';
import { IOutboundSearchParams } from '../../../interfaces';

export class LectorMangaSearchDto implements IOutboundSearchParams {
  @IsDefined()
  @IsString()
  value: string;
}
