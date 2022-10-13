export interface ISearchResponse {
  message: string;
  success: boolean;
  result: ISearchResult[];
  statusCode: number;
  errors: any;
}

export interface ISearchResult {
  Name: string;
  Identification: string;
  Id?: string;
  ThumbnailPath?: string;
  CreationDate?: string;
  Sinopsis?: string;
  BroadcastStatus?: number;
  BroadcastStatusDescription?: string;
  Genres?: string[];
  AlternativeNames?: string[];
}
