export const listChapters = `
<div class="tagcloud">
<a href="https://tumangas.net/leer-manga/el-salvaje-oeste-marcial-6.00">
El salvaje oeste marcial Capítulo 6.00
</a>
<a href="https://tumangas.net/leer-manga/el-salvaje-oeste-marcial-5.00">
El salvaje oeste marcial Capítulo 5.00
</a>
</div>
`;

export const listMangas = `
<article class="anime">
<a href="https://tumangas.net/manga/me-converti-en-un-actor-superior-solo-por-leer-libros">
</a>
</article>
<article class="anime">
<a href="https://tumangas.net/manga/el-villano-me-ama-solo-a-mi">
</a>
</article>
`;

export const chapters = [
  {
    url: 'https://tumangas.net/leer-manga/el-salvaje-oeste-marcial-6.00',
    chapterNumber: 6,
  },
  {
    url: 'https://tumangas.net/leer-manga/el-salvaje-oeste-marcial-5.00',
    chapterNumber: 5,
  },
];

export const mangas = [
  {
    name: 'me converti en un actor superior solo por leer libros',
    url: 'https://tumangas.net/manga/me-converti-en-un-actor-superior-solo-por-leer-libros',
  },
  {
    name: 'el villano me ama solo a mi',
    url: 'https://tumangas.net/manga/el-villano-me-ama-solo-a-mi',
  },
];

export const listImgsChapter = `
<div id="chapter_imgs">
    <img src="https://imagizer.imageshack.com/img923/1659/WLcexq.jpg">
    <img src="https://imagizer.imageshack.com/img922/290/fR7jwj.jpg">
</div>
`;
export const imgs = [
  {
    url: 'https://imagizer.imageshack.com/img923/9500/kxhubB.jpg',
  },
  {
    url: 'https://imagizer.imageshack.com/img922/9195/CEobih.jpg',
  },
];

export const expectRequest = [
  {
    chapterNumber: 6,
    images: [
      {
        url: 'https://imagizer.imageshack.com/img923/9500/kxhubB.jpg',
        correlative: 1,
      },
      {
        url: 'https://imagizer.imageshack.com/img922/9195/CEobih.jpg',
        correlative: 2,
      },
    ],
    url: 'https://tumangas.net/leer-manga/el-salvaje-oeste-marcial-6.00',
  },
  {
    chapterNumber: 5,
    images: [
      {
        url: 'https://imagizer.imageshack.com/img923/9500/kxhubB.jpg',
        correlative: 1,
      },
      {
        url: 'https://imagizer.imageshack.com/img922/9195/CEobih.jpg',
        correlative: 2,
      },
    ],
    url: 'https://tumangas.net/leer-manga/el-salvaje-oeste-marcial-5.00',
  },
];
