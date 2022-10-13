import {
  IChapterImageInformation,
  IChapterInformation,
  IMangaInformation,
  ISearchResponse,
} from '../models';

export const imagesInfo: IChapterImageInformation[] = [
  {
    page: 1,
    altId: 'img-xyz',
    url: 'https://pack-yak.intomanga.com/images/manga/One-Piece/chapter/1/page/1/img-xyz',
  },
  {
    page: 2,
    altId: 'img-asd',
    url: 'https://pack-yak.intomanga.com/images/manga/One-Piece/chapter/1/page/2/img-asd',
  },
];

export const imageHtmlInfo = {
  body: `<select id="PageList">
          <option value="${imagesInfo[0].altId}">${imagesInfo[0].page}</option>
          <option value="${imagesInfo[1].altId}">${imagesInfo[1].page}</option>
        </select>`,
};

export const chaptersInfo: IChapterInformation[] = [
  {
    pagesCount: 20,
    id: 1,
    altId: 'qwerty-jkl',
    url: 'https://inmanga.com/ver/manga/One-Piece/1/qwerty-jkl',
  },
  {
    pagesCount: 20,
    id: 2,
    altId: 'qwerty-xyz',
    url: 'https://inmanga.com/ver/manga/One-Piece/2/qwerty-xyz',
  },
];

export const mangaResponse: IMangaInformation = {
  name: 'One Piece',
  url: 'https://inmanga.com/ver/manga/One-Piece/abc-xyz',
  altId: 'abc-xyz',
  helperName: 'One-Piece',
  chapters: [
    {
      ...chaptersInfo[0],
      images: imagesInfo,
    },
    {
      ...chaptersInfo[1],
      images: imagesInfo,
    },
  ],
};

export const searchResponse: ISearchResponse = {
  message: 'ok',
  success: true,
  statusCode: 0,
  errors: null,
  result: [
    {
      Name: 'One Piece',
      Identification: 'abc-xyz',
    },
  ],
};
