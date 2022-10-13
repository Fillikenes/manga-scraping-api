export const listChapters = `<div class="tagcloud">
    <a href="https://tumangas.net/leer-manga/lector-omnisciente-128.00">
    Lector omnisciente Capítulo 128.00
    </a>
    <a href="https://tumangas.net/leer-manga/lector-omnisciente-127.00">
    Lector omnisciente Capítulo 127.00
    </a>
</div>`;

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
    chapterNumber: 1,
    images: [
      { url: 'https://imagizer.imageshack.com/img923/9500/kxhubB.jpg' },
      { url: 'https://imagizer.imageshack.com/img922/9195/CEobih.jpg' },
    ],
    url: 'https://tumangas.net/leer-manga/el-salvaje-oeste-marcial-6.00',
  },
  {
    chapterNumber: 1,
    images: [
      { url: 'https://imagizer.imageshack.com/img923/9500/kxhubB.jpg' },
      { url: 'https://imagizer.imageshack.com/img922/9195/CEobih.jpg' },
    ],
    url: 'https://tumangas.net/leer-manga/el-salvaje-oeste-marcial-5.00',
  },
];
