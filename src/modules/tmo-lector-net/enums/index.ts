export enum EChaptersSelector {
  Items = '.sub-chap.list-chap > .wp-manga-chapter > a',
}

export enum EChapterSeparator {
  Name = ' : ',
}

export enum EChapterAttribute {
  Href = 'href',
}

export enum EChapterIdReplace {
  search = 'Capítulo ',
  replace = '',
}

export enum EChapterSelector {
  Images = '#images_chapter > img',
}

export enum EChapterImageAttribute {
  DataSrc = 'data-src',
}

export enum ESearchPageNumber {
  Default = 1,
  InitialIteration = 2,
}

export enum ESearchMangasSelector {
  Pages = '.manga_portada > .page-item-detail > .manga_biblioteca > a',
  Pagination = '.pagination > .page-item',
}

export enum ESearchMangaAttribute {
  Href = 'href',
  Title = 'title',
}

export enum ESearchMangaSelector {
  Image = 'img',
}

export enum ESearchMangaImageAttribute {
  Source = 'src',
}

export enum ESearchMangaPagination {
  LastPage = -2,
}
