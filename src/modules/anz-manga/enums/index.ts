export enum EChaptersSelector {
  Items = 'ul.chapters > li',
}

export enum EChapterSelector {
  Url = 'h5 > a',
  Name = 'h5 > em',
  Images = '#all > img',
}

export enum EChapterAttribute {
  Href = 'href',
}

export enum EChapterSeparator {
  Name = ' ',
}

export enum EChapterSeparatorName {
  Identifier = -1,
}

export enum EChapterImageAttribute {
  DataSrc = 'data-src',
  Alt = 'alt',
}

export enum EChapterImageSeparator {
  Description = ' - Page ',
}

export enum EChapterImageSeparatorDescription {
  Name = 0,
  Correlative = 1,
}
