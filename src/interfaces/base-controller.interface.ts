import { IOutboundChapter } from './chapter.interface';
import { IOutboundSearchResponse } from './search-response.interface';

export interface IBaseController {
  search(params: any): Promise<IOutboundSearchResponse[]>;
  get(params: any): Promise<IOutboundChapter[]>;
}
