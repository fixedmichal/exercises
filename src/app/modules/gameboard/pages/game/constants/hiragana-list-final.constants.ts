export type HiraganaSymbol = {
  sign: string;
  romaji: string;
  alternativeRomaji?: string;
}

export const hiraganaSystem: HiraganaSymbol[] = [
  {
    sign: "あ", romaji: "a"
  },
  {
    sign: "い", romaji: "i"
  },
  {
    sign: "う", romaji: "u"
  },
  {
    sign: "え", romaji: "e"
  },
  {
    sign: "お", romaji: "o"
  },
  {
    sign: "か", romaji: "ka"
  },
  {
    sign: "き", romaji: "ki"
  },
  {
    sign: "く", romaji: "ku"
  },
  {
    sign: "け", romaji: "ke"
  },
  {
    sign: "こ", romaji: "ko"
  },
  {
    sign: "さ", romaji: "sa"
  },
  {
    sign: "し", romaji: "shi"
  },
  {
    sign: "す", romaji: "su"
  },
  {
    sign: "せ", romaji: "se"
  },
  {
    sign: "そ", romaji: "so"
  },
  {
    sign: "た", romaji: "ta"
  },
  {
    sign: "ち", romaji: "chi"
  },
  {
    sign: "つ",
    romaji: "tsu"
  },
  {
    sign: "て",
    romaji: "te"
  },
  {
    sign: "と",
    romaji: "to"
  },
  {
    sign: "な",
    romaji: "na"
  },
  {
    sign: "に",
    romaji: "ni"
  },
  {
    sign: "ぬ",
    romaji: "nu"
  },
  {
    sign: "ね",
    romaji: "ne"
  },
  {
    sign: "の",
    romaji: "no"
  },
  {
    sign: "は",
    romaji: "ha"
  },
  {
    sign: "ひ",
    romaji: "hi"
  },
  {
    sign: "ふ",
    romaji: "fu",
    alternativeRomaji: 'hu'
  },
  {
    sign: "へ",
    romaji: "he"
  },
  {
    sign: "ほ",
    romaji: "ho"
  },
  {
    sign: "ま",
    romaji: "ma"
  },
  {
    sign: "み",
    romaji: "mi"
  },
  {
    sign: "む",
    romaji: "mu"
  },
  {
    sign: "め",
    romaji: "me"
  },
  {
    sign: "も",
    romaji: "mo"
  },
  {
    sign: "や",
    romaji: "ya"
  },
  {
    sign: "ゆ",
    romaji: "yu"
  },
  {
    sign: "よ",
    romaji: "yo"
  },
  {
    sign: "ら",
    romaji: "ra"
  },
  {
    sign: "り",
    romaji: "ri"
  },
  {
    sign: "る",
    romaji: "ru"
  },
  {
    sign: "れ",
    romaji: "re"
  },
  {
    sign: "ろ",
    romaji: "ro"
  },
  {
    sign: "わ",
    romaji: "wa"
  },
  {
    sign: "を",
    romaji: "wo",
    alternativeRomaji: "o"
  },
  {
    sign: "ん",
    romaji: "n"
  },
];




// {
  //   sign: "が",
  //   romaji: "ga"
  // },
  // {
  //   sign: "ぎ",
  //   romaji: "gi"
  // },
  // {
  //   sign: "ぐ",
  //   romaji: "gu"
  // },
  // {
  //   sign: "げ",
  //   romaji: "ge"
  // },
  // {
  //   sign: "ご",
  //   romaji: "go"
  // },
   // {
  //   sign: "ざ",
  //   romaji: "za"
  // },
  // {
  //   sign: "じ",
  //   romaji: "ji"
  // },
  // {
  //   sign: "ず",
  //   romaji: "zu"
  // },
  // {
  //   sign: "ぜ",
  //   romaji: "ze"
  // },
  // {
  //   sign: "ぞ",
  //   romaji: "zo"
  // },
  // {
  //   sign: "だ",
  //   romaji: "da"
  // },
  // {
  //   sign: "で",
  //   romaji: "de"
  // },
  // {
  //   sign: "ど",
  //   romaji: "do"
  // },
  // {
  //   sign: "ば",
  //   romaji: "ba"
  // },
  // {
  //   sign: "び",
  //   romaji: "bi"
  // },
  // {
  //   sign: "ぶ",
  //   romaji: "bu"
  // }


export const HiraganaSigns = hiraganaSystem.reduce<string[]>( (acc, value) => {
  acc.push(value.sign);
  return acc;
}, []);