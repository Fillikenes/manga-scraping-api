import { IsDefined, IsString } from 'class-validator';
import { IOutboundSearchParams } from '../../../interfaces';

export class AnzMangaSearchDto implements IOutboundSearchParams {
  @IsDefined()
  @IsString()
  value: string;
}
