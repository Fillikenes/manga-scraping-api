import {
  IOutboundChapter,
  IOutboundGetParams,
  IOutboundSearchParams,
  IOutboundSearchResponse,
} from '.';

export interface IBaseController {
  search(params: IOutboundSearchParams): Promise<IOutboundSearchResponse[]>;
  get(params: IOutboundGetParams): Promise<IOutboundChapter[]>;
}
