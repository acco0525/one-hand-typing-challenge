import { Hand, Finger, KeyData } from './types';

export const LEVELS: string[][] = [
  // Level 1: Home row basics
  ['f', 'j', 'd', 'k', 's', 'l', 'a', ';', 'g', 'h'],
  // Level 2: Top row basics
  ['r', 'u', 'e', 'i', 'w', 'o', 'q', 'p', 't', 'y'],
  // Level 3: やさしいひらがな単語 (Easy Hiragana Words)
  ['いぬ', 'ねこ', 'さかな', 'とり', 'うし', 'うま'],
  // Level 4: もうすこしひらがな単語 (A few more Hiragana Words)
  ['りんご', 'みかん', 'くるま', 'でんしゃ', 'ひこうき'],
  // Level 5: たべもの・のりもの (Food & Vehicles)
  ['おすし', 'てんぷら', 'らーめん', 'じてんしゃ', 'しんかんせん'],
  // Level 6: みじかいひらがな文 (Short Hiragana Sentences)
  ['おはよう', 'こんにちは', 'ありがとう', 'さようなら'],
  // Level 7: ながいひらがな文 (Longer Hiragana Sentences)
  ['きょうはとてもいいてんきですね', 'たいぴんぐのれんしゅうをがんばろう'],
  // Level 8: かんじまじりの文 (Sentences with Kanji) -> Hiragana version
  // 元: 日本の首都は東京です
  ['にほんのしゅとはとうきょうです'],
  // Level 9: カタカナまじりの文 (Sentences with Katakana)
  // 元: タイピングマスターを目指して練習を続けよう
  ['タイピングマスターをめざしてれんしゅうをつづけよう'],
  // Level 10: ことわざ (Proverbs) -> Hiragana version
  // 元: 石の上にも三年, 継続は力なり
  ['いしのうえにもさんねん', 'けいぞくはちからなり'],
];

export const ROMAJI_MAPPINGS: { [key: string]: string[] } = {
  // Hiragana
  'あ': ['a'], 'い': ['i'], 'う': ['u', 'wu'], 'え': ['e'], 'お': ['o'],
  'か': ['ka', 'ca'], 'き': ['ki'], 'く': ['ku', 'cu', 'qu'], 'け': ['ke'], 'こ': ['ko', 'co'],
  'さ': ['sa'], 'し': ['shi', 'si', 'ci'], 'す': ['su'], 'せ': ['se', 'ce'], 'そ': ['so'],
  'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
  'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
  'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
  'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
  'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
  'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
  'わ': ['wa'], 'を': ['wo'], 'ん': ['n', "n'", 'xn'],
  'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
  'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
  'だ': ['da'], 'ぢ': ['di'], 'づ': ['du'], 'で': ['de'], 'ど': ['do'],
  'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
  'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
  'きゃ': ['kya'], 'きゅ': ['kyu'], 'きょ': ['kyo'],
  'ぎゃ': ['gya'], 'ぎゅ': ['gyu'], 'ぎょ': ['gyo'],
  'しゃ': ['sha', 'sya'], 'しゅ': ['shu', 'syu'], 'しょ': ['sho', 'syo'],
  'じゃ': ['ja', 'jya', 'zya'], 'じゅ': ['ju', 'jyu', 'zyu'], 'じょ': ['jo', 'jyo', 'zyo'],
  'ちゃ': ['cha', 'tya'], 'ちゅ': ['chu', 'tyu'], 'ちょ': ['cho', 'tyo'],
  'ぢゃ': ['dya'], 'ぢゅ': ['dyu'], 'ぢょ': ['dyo'],
  'にゃ': ['nya'], 'にゅ': ['nyu'], 'にょ': ['nyo'],
  'ひゃ': ['hya'], 'ひゅ': ['hyu'], 'ひょ': ['hyo'],
  'びゃ': ['bya'], 'びゅ': ['byu'], 'びょ': ['byo'],
  'ぴゃ': ['pya'], 'ぴゅ': ['pyu'], 'ぴょ': ['pyo'],
  'みゃ': ['mya'], 'みゅ': ['myu'], 'みょ': ['myo'],
  'りゃ': ['rya'], 'りゅ': ['ryu'], 'りょ': ['ryo'],
  'うぁ': ['wha'], 'うぃ': ['wi'], 'うぇ': ['we'], 'うぉ': ['who'],
  'ふぁ': ['fa'], 'ふぃ': ['fi'], 'ふぇ': ['fe'], 'ふぉ': ['fo'],
  'てぃ': ['thi'], 'でぃ': ['dhi'], 'とぅ': ['twu'],
  'ぁ': ['xa', 'la'], 'ぃ': ['xi', 'li'], 'ぅ': ['xu', 'lu'], 'ぇ': ['xe', 'le'], 'ぉ': ['xo', 'lo'],
  'ゃ': ['xya', 'lya'], 'ゅ': ['xyu', 'lyu'], 'ょ': ['xyo', 'lyo'],
  'っ': ['xtu', 'ltu'],

  // Katakana
  'ア': ['a'], 'イ': ['i'], 'ウ': ['u', 'wu'], 'エ': ['e'], 'オ': ['o'],
  'カ': ['ka', 'ca'], 'キ': ['ki'], 'ク': ['ku', 'cu', 'qu'], 'ケ': ['ke'], 'コ': ['ko', 'co'],
  'サ': ['sa'], 'シ': ['shi', 'si', 'ci'], 'ス': ['su'], 'セ': ['se', 'ce'], 'ソ': ['so'],
  'タ': ['ta'], 'チ': ['chi', 'ti'], 'ツ': ['tsu', 'tu'], 'テ': ['te'], 'ト': ['to'],
  'ナ': ['na'], 'ニ': ['ni'], 'ヌ': ['nu'], 'ネ': ['ne'], 'ノ': ['no'],
  'ハ': ['ha'], 'ヒ': ['hi'], 'フ': ['fu', 'hu'], 'ヘ': ['he'], 'ホ': ['ho'],
  'マ': ['ma'], 'ミ': ['mi'], 'ム': ['mu'], 'メ': ['me'], 'モ': ['mo'],
  'ヤ': ['ya'], 'ユ': ['yu'], 'ヨ': ['yo'],
  'ラ': ['ra'], 'リ': ['ri'], 'ル': ['ru'], 'レ': ['re'], 'ロ': ['ro'],
  'ワ': ['wa'], 'ヲ': ['wo'], 'ン': ['n', "n'", 'xn'],
  'ガ': ['ga'], 'ギ': ['gi'], 'グ': ['gu'], 'ゲ': ['ge'], 'ゴ': ['go'],
  'ザ': ['za'], 'ジ': ['ji', 'zi'], 'ズ': ['zu'], 'ゼ': ['ze'], 'ゾ': ['zo'],
  'ダ': ['da'], 'ヂ': ['di'], 'ヅ': ['du'], 'デ': ['de'], 'ド': ['do'],
  'バ': ['ba'], 'ビ': ['bi'], 'ブ': ['bu'], 'ベ': ['be'], 'ボ': ['bo'],
  'パ': ['pa'], 'ピ': ['pi'], 'プ': ['pu'], 'ペ': ['pe'], 'ポ': ['po'],
  'キャ': ['kya'], 'キュ': ['kyu'], 'キョ': ['kyo'],
  'ギャ': ['gya'], 'ギュ': ['gyu'], 'ギョ': ['gyo'],
  'シャ': ['sha', 'sya'], 'シュ': ['shu', 'syu'], 'ショ': ['sho', 'syo'],
  'ジャ': ['ja', 'jya', 'zya'], 'ジュ': ['ju', 'jyu', 'zyu'], 'ジョ': ['jo', 'jyo', 'zyo'],
  'チャ': ['cha', 'tya'], 'チュ': ['chu', 'tyu'], 'チョ': ['cho', 'tyo'],
  'ヂャ': ['dya'], 'ヂュ': ['dyu'], 'ヂョ': ['dyo'],
  'ニャ': ['nya'], 'ニュ': ['nyu'], 'ニョ': ['nyo'],
  'ヒャ': ['hya'], 'ヒュ': ['hyu'], 'ヒョ': ['hyo'],
  'ビャ': ['bya'], 'ビュ': ['byu'], 'ビョ': ['byo'],
  'ピャ': ['pya'], 'ピュ': ['pyu'], 'ピョ': ['pyo'],
  'ミャ': ['mya'], 'ミュ': ['myu'], 'ミョ': ['myo'],
  'リャ': ['rya'], 'リュ': ['ryu'], 'リョ': ['ryo'],
  'ウィ': ['wi'], 'ウェ': ['we'], 'ウォ': ['who'],
  'ファ': ['fa'], 'フィ': ['fi'], 'フェ': ['fe'], 'フォ': ['fo'],
  'ティ': ['thi'], 'ディ': ['dhi'], 'トゥ': ['twu'],
  'ァ': ['xa', 'la'], 'ィ': ['xi', 'li'], 'ゥ': ['xu', 'lu'], 'ェ': ['xe', 'le'], 'ォ': ['xo', 'lo'],
  'ャ': ['xya', 'lya'], 'ュ': ['xyu', 'lyu'], 'ョ': ['xyo', 'lyo'],
  'ッ': ['xtu', 'ltu'],

  // Punctuation
  '、': [','], '。': ['.'], 'ー': ['-'], ' ': [' '], '・': ['/'],
};

export const KANA_KEYS = Object.keys(ROMAJI_MAPPINGS).sort((a, b) => b.length - a.length);


export const KEYBOARD_LAYOUT: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];

export const FINGER_MAP: { [key: string]: KeyData } = {
  // Left Hand
  'q': { hand: Hand.Left, finger: Finger.Pinky },
  'a': { hand: Hand.Left, finger: Finger.Pinky },
  'z': { hand: Hand.Left, finger: Finger.Pinky },
  'w': { hand: Hand.Left, finger: Finger.Ring },
  's': { hand: Hand.Left, finger: Finger.Ring },
  'x': { hand: Hand.Left, finger: Finger.Ring },
  'e': { hand: Hand.Left, finger: Finger.Middle },
  'd': { hand: Hand.Left, finger: Finger.Middle },
  'c': { hand: Hand.Left, finger: Finger.Middle },
  'r': { hand: Hand.Left, finger: Finger.Index },
  'f': { hand: Hand.Left, finger: Finger.Index },
  'v': { hand: Hand.Left, finger: Finger.Index },
  't': { hand: Hand.Left, finger: Finger.Index },
  'g': { hand: Hand.Left, finger: Finger.Index },
  'b': { hand: Hand.Left, finger: Finger.Index },

  // Right Hand
  'p': { hand: Hand.Right, finger: Finger.Pinky },
  ';': { hand: Hand.Right, finger: Finger.Pinky },
  '/': { hand: Hand.Right, finger: Finger.Pinky },
  'o': { hand: Hand.Right, finger: Finger.Ring },
  'l': { hand: Hand.Right, finger: Finger.Ring },
  '.': { hand: Hand.Right, finger: Finger.Ring },
  'i': { hand: Hand.Right, finger: Finger.Middle },
  'k': { hand: Hand.Right, finger: Finger.Middle },
  ',': { hand: Hand.Right, finger: Finger.Middle },
  'u': { hand: Hand.Right, finger: Finger.Index },
  'j': { hand: Hand.Right, finger: Finger.Index },
  'm': { hand: Hand.Right, finger: Finger.Index },
  'y': { hand: Hand.Right, finger: Finger.Index },
  'h': { hand: Hand.Right, finger: Finger.Index },
  'n': { hand: Hand.Right, finger: Finger.Index },
};

export const ONE_HANDED_FINGER_MAP: { [h in Hand]: { [key: string]: Finger } } = {
  [Hand.Left]: {
    // Left Hand - Pinky
    'q': Finger.Pinky, 'a': Finger.Pinky, 'z': Finger.Pinky,
    // Left Hand - Ring
    'w': Finger.Ring, 's': Finger.Ring, 'x': Finger.Ring,
    // Left Hand - Middle
    'e': Finger.Middle, 'd': Finger.Middle, 'c': Finger.Middle,
    // Left Hand - Index (Home)
    'r': Finger.Index, 't': Finger.Index, 'f': Finger.Index, 'g': Finger.Index, 'v': Finger.Index, 'b': Finger.Index,
    // Left Hand - Index (Reach to Right side)
    'y': Finger.Index, 'u': Finger.Index, 'i': Finger.Index, 'o': Finger.Index, 'p': Finger.Index,
    'h': Finger.Index, 'j': Finger.Index, 'k': Finger.Index, 'l': Finger.Index, ';': Finger.Index,
    'n': Finger.Index, 'm': Finger.Index, ',': Finger.Index, '.': Finger.Index, '/': Finger.Index,
  },
  [Hand.Right]: {
    // Right Hand - Pinky
    'p': Finger.Pinky, ';': Finger.Pinky, '/': Finger.Pinky,
    // Right Hand - Ring
    'o': Finger.Ring, 'l': Finger.Ring, '.': Finger.Ring,
    // Right Hand - Middle
    'i': Finger.Middle, 'k': Finger.Middle, ',': Finger.Middle,
    // Right Hand - Index (Home)
    'y': Finger.Index, 'u': Finger.Index, 'h': Finger.Index, 'j': Finger.Index, 'n': Finger.Index, 'm': Finger.Index,
    // Right Hand - Index (Reach to Left side)
    'q': Finger.Index, 'w': Finger.Index, 'e': Finger.Index, 'r': Finger.Index, 't': Finger.Index,
    'a': Finger.Index, 's': Finger.Index, 'd': Finger.Index, 'f': Finger.Index, 'g': Finger.Index,
    'z': Finger.Index, 'x': Finger.Index, 'c': Finger.Index, 'v': Finger.Index, 'b': Finger.Index,
  }
};

export const FINGER_COLORS: { [key in Finger]: string } = {
  [Finger.Pinky]: 'bg-pink-400 border-pink-600 text-white',
  [Finger.Ring]: 'bg-purple-400 border-purple-600 text-white',
  [Finger.Middle]: 'bg-blue-400 border-blue-600 text-white',
  [Finger.Index]: 'bg-green-400 border-green-600 text-white',
  [Finger.Thumb]: 'bg-yellow-400 border-yellow-600 text-white',
};

export const FINGER_COLORS_LIGHT: { [key in Finger]: string } = {
  [Finger.Pinky]: 'bg-pink-100 border-pink-300 text-pink-800',
  [Finger.Ring]: 'bg-purple-100 border-purple-300 text-purple-800',
  [Finger.Middle]: 'bg-blue-100 border-blue-300 text-blue-800',
  [Finger.Index]: 'bg-green-100 border-green-300 text-green-800',
  [Finger.Thumb]: 'bg-yellow-100 border-yellow-300 text-yellow-800',
};

export const FINGER_SVG_COLORS: { [key in Finger]: string } = {
    [Finger.Pinky]: '#f472b6', // pink-400
    [Finger.Ring]: '#a78bfa', // purple-400
    [Finger.Middle]: '#60a5fa', // blue-400
    [Finger.Index]: '#4ade80', // green-400
    [Finger.Thumb]: '#facc15', // yellow-400
};