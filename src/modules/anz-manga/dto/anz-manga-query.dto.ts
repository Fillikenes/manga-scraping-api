import { IsDefined, IsString } from 'class-validator';
import { MatchRegex } from '../../../validators';
import { PAGE_PATTERN } from '../constants';

export class AnzMangaQueryDto {
  @IsDefined()
  @IsString()
  @MatchRegex(PAGE_PATTERN, {
    message: "The manga's url is not valid for this site",
  })
  url: string;
}
