export type HiraganaSyllable = {
  symbol: string;
  romaji: string;
  alternativeRomaji?: string;
};

export const hiraganaSyllables: HiraganaSyllable[] = [
  {
    symbol: 'あ',
    romaji: 'a',
  },
  {
    symbol: 'い',
    romaji: 'i',
  },
  {
    symbol: 'う',
    romaji: 'u',
  },
  {
    symbol: 'え',
    romaji: 'e',
  },
  {
    symbol: 'お',
    romaji: 'o',
  },
  {
    symbol: 'か',
    romaji: 'ka',
  },
  {
    symbol: 'き',
    romaji: 'ki',
  },
  {
    symbol: 'く',
    romaji: 'ku',
  },
  {
    symbol: 'け',
    romaji: 'ke',
  },
  {
    symbol: 'こ',
    romaji: 'ko',
  },
  {
    symbol: 'さ',
    romaji: 'sa',
  },
  {
    symbol: 'し',
    romaji: 'shi',
  },
  {
    symbol: 'す',
    romaji: 'su',
  },
  {
    symbol: 'せ',
    romaji: 'se',
  },
  {
    symbol: 'そ',
    romaji: 'so',
  },
  {
    symbol: 'た',
    romaji: 'ta',
  },
  {
    symbol: 'ち',
    romaji: 'chi',
  },
  {
    symbol: 'つ',
    romaji: 'tsu',
  },
  {
    symbol: 'て',
    romaji: 'te',
  },
  {
    symbol: 'と',
    romaji: 'to',
  },
  {
    symbol: 'な',
    romaji: 'na',
  },
  {
    symbol: 'に',
    romaji: 'ni',
  },
  {
    symbol: 'ぬ',
    romaji: 'nu',
  },
  {
    symbol: 'ね',
    romaji: 'ne',
  },
  {
    symbol: 'の',
    romaji: 'no',
  },
  {
    symbol: 'は',
    romaji: 'ha',
  },
  {
    symbol: 'ひ',
    romaji: 'hi',
  },
  {
    symbol: 'ふ',
    romaji: 'fu',
    alternativeRomaji: 'hu',
  },
  {
    symbol: 'へ',
    romaji: 'he',
  },
  {
    symbol: 'ほ',
    romaji: 'ho',
  },
  {
    symbol: 'ま',
    romaji: 'ma',
  },
  {
    symbol: 'み',
    romaji: 'mi',
  },
  {
    symbol: 'む',
    romaji: 'mu',
  },
  {
    symbol: 'め',
    romaji: 'me',
  },
  {
    symbol: 'も',
    romaji: 'mo',
  },
  {
    symbol: 'や',
    romaji: 'ya',
  },
  {
    symbol: 'ゆ',
    romaji: 'yu',
  },
  {
    symbol: 'よ',
    romaji: 'yo',
  },
  {
    symbol: 'ら',
    romaji: 'ra',
  },
  {
    symbol: 'り',
    romaji: 'ri',
  },
  {
    symbol: 'る',
    romaji: 'ru',
  },
  {
    symbol: 'れ',
    romaji: 're',
  },
  {
    symbol: 'ろ',
    romaji: 'ro',
  },
  {
    symbol: 'わ',
    romaji: 'wa',
  },
  {
    symbol: 'を',
    romaji: 'wo',
    alternativeRomaji: 'o',
  },
  {
    symbol: 'ん',
    romaji: 'n',
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

export const hiraganaSymbols = hiraganaSyllables.reduce<string[]>((acc, value) => {
  acc.push(value.symbol);

  return acc;
}, []);
