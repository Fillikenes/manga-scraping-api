import {
  IOutboundChapter,
  IOutboundGetParams,
  IOutboundSearchParams,
  IOutboundSearchResponse,
} from '.';

export interface IMangaScrapingService {
  search(params: IOutboundSearchParams): Promise<IOutboundSearchResponse[]>;
  get(params: IOutboundGetParams): Promise<IOutboundChapter[]>;
}
