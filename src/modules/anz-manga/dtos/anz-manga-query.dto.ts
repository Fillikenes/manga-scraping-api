import { IsDefined, IsString } from 'class-validator';
import { PAGE_PATTERN } from '../constants';
import { MatchRegex } from '../../../validators';
import { IOutboundGetParams } from '../../../interfaces';

export class AnzMangaQueryDto implements IOutboundGetParams {
  @IsDefined()
  @IsString()
  @MatchRegex(PAGE_PATTERN, {
    message: "The manga's url is not valid for this site",
  })
  url: string;
}
