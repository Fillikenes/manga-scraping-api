export interface ISuggestionResponse {
  suggestions: ISuggestionItemResponse[];
}

export interface ISuggestionItemResponse {
  value: string;
  data: string;
}
