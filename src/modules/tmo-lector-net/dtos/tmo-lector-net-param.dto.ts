import { IsDefined, IsString } from 'class-validator';
import { MatchRegex } from '../../../validators';
import { PAGE_PATTERN } from '../constants';
import { IOutboundGetParams } from '../../../interfaces';

export class TmoLectorNetParamDto implements IOutboundGetParams {
  @IsDefined()
  @IsString()
  @MatchRegex(PAGE_PATTERN, {
    message: "The manga's url is not valid for this site",
  })
  url: string;
}
