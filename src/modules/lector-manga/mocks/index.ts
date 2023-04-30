export const mockParam = {
  url: 'one-punch-man',
  value: 'one piece',
};

export const mockUrlManga = 'https://lectormanga.online/manga/one-punch-man/';

export const expectRequest = [
  {
    id: 214,
    name: '214',
    images: [
      {
        url: 'https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/001.jpg',
        correlative: 0,
      },
      {
        url: 'https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/002.jpg',
        correlative: 1,
      },
    ],
  },
];

export const listChapters = `
<ul class="main version-chap no-volumn">
    <li>
    <a href="https://lectormanga.online/manga/one-punch-man/214/">
    214 </a>
    </li>
    <li>
    <a href="https://lectormanga.online/manga/one-punch-man/213/">
    213 </a>
    </li>
</ul>
`;

export const chapters = [
  {
    id: 214,
    name: '214',
    urlChapter: 'https://lectormanga.online/manga/one-punch-man/214/',
    images: [
      {
        url: 'https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/001.jpg',
        correlative: 0,
      },
      {
        url: 'https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/002.jpg',
        correlative: 1,
      },
    ],
  },
  {
    id: 213,
    name: '213',
    urlChapter: 'https://lectormanga.online/manga/one-punch-man/213/',
    images: [
      {
        url: 'https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/001.jpg',
        correlative: 0,
      },
      {
        url: 'https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/002.jpg',
        correlative: 1,
      },
    ],
  },
];

export const listImgsChapter = `
<div class="reading-content">
    <div class="page-break">
        <img data-lazy-src="https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/001.jpg">
    </div>
</div>
`;

export const imgs = [
  {
    url: 'https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/001.jpg',
    correlative: 0,
  },
  {
    url: 'https://lectormanga.online/wp-content/uploads/WP-manga/data/manga_61ed9f47708b1/4b024a947849152c2dfcffeb0bc8deff/002.jpg',
    correlative: 1,
  },
];

export const listMangas = `
<div class="post-title">
  <h3 class="h4"><a href="https://lectormanga.me/manga/one-punch-man/">One Punch-Man</a></h3>
</div>
`;

export const mangas = [
  {
    name: 'One Punch-Man',
    url: 'https://lectormanga.me/manga/one-punch-man/',
  },
];
