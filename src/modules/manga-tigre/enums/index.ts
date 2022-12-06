export enum EChaptersSelector {
  Items = 'div.chapter-list-wrapper > ul > li > a',
  LoadMore = 'button.btn-load-more-chapters',
}
export enum EChapterAttribute {
  Id = 0,
  Url = 'href',
  Name = 'title',
}

export enum EChapterSeparator {
  Name = ': ',
}

export enum EImagesSelector {
  Images = '.read-type-2 > img',
}

export enum EChapterImageSelector {
  Button = 'button#dropdownReadTypeButton',
  List = 'div.dropdown-menu > button',
  Cascade = 1,
}

export enum EChapterImageAttribute {
  Url = 'src',
  UrlAlt = 'data-src',
}
