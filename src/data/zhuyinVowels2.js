export const VOWELS_STEP2_DATA = [
  {
    id: "vowel-ai",
    symbol: "ㄞ",
    pinyin: "ai",
    ipa: "[aɪ]",
    katakana: "アイ",
    typeTag: "二重母音 (複韻母)",
    title: "二重母音「ㄞ」",
    originKanji: "亥 (hài / ハイ)",
    originDesc: "漢字「亥」の上の部分の形に由来。漢字の発音に含まれる二重母音「ㄞ (ai)」をとっています。",
    tipTitle: "「ㄚ(a)」から「ㄧ(i)」へ滑らかに移る二重母音！",
    tipDesc: "「ㄚ (a)」の口から始まり、一気に滑らかに「ㄧ (i)」へと繋げます。「ア」を強く長めに、「イ」は小さく添える感覚で発音します。",
    color: "from-pink-500 to-rose-600",
    themeHex: "#E11D48",
    examples: [
      { traditional: "愛", zhuyin: "ㄞˋ", pinyin: "ài", meaning: "愛する / 愛" },
      { traditional: "白色", zhuyin: "ㄅㄞˊ ㄙㄜˋ", pinyin: "báisè", meaning: "白色" },
      { traditional: "青菜", zhuyin: "ㄑㄧㄥ ㄘㄞˋ", pinyin: "qīngcài", meaning: "野菜" }
    ]
  },
  {
    id: "vowel-ei",
    symbol: "ㄟ",
    pinyin: "ei",
    ipa: "[eɪ]",
    katakana: "エイ",
    typeTag: "二重母音 (複韻母)",
    title: "二重母音「ㄟ」",
    originKanji: "也の変形文字",
    originDesc: "漢字「也」の草書・古字の変形に由来。「エ」から始まって「イ」へ繋がる音です。",
    tipTitle: "明るい「エ」から素早く「イ」へ滑らせる！",
    tipDesc: "日本語の「えい（英語のエー）」に近い音ですが、「エ」を口をしっかり開けてスタートし、最後に軽く「イ」の口にすぼめます。",
    color: "from-amber-500 to-yellow-600",
    themeHex: "#D97706",
    examples: [
      { traditional: "飛機", zhuyin: "ㄈㄟ ㄐㄧ", pinyin: "fēijī", meaning: "飛行機" },
      { traditional: "杯子", zhuyin: "ㄅㄟ ㄗ˙", pinyin: "bēizi", meaning: "コップ" },
      { traditional: "黑色", zhuyin: "ㄏㄟ ㄙㄜˋ", pinyin: "hēisè", meaning: "黒色" }
    ]
  },
  {
    id: "vowel-ao",
    symbol: "ㄠ",
    pinyin: "ao",
    ipa: "[aʊ]",
    katakana: "アオ / アウ",
    typeTag: "二重母音 (複韻母)",
    title: "二重母音「ㄠ」",
    originKanji: "幺 (yāo / 小さい)",
    originDesc: "漢字「幺（イョウ・小さい）」の形に由来。「ア」から始まって口を丸める音です。",
    tipTitle: "大きな「ア」から口を丸めて「オ/ウ」へ！",
    tipDesc: "「ㄚ (a)」の大きな口から一気に唇を丸めて「オ/ウ」へと繋げます。「ア」の音を長めにハッキリ発音するのが綺麗に聴こえるコツです。",
    color: "from-emerald-500 to-teal-600",
    themeHex: "#059669",
    examples: [
      { traditional: "貓", zhuyin: "ㄇㄠ", pinyin: "māo", meaning: "ネコ" },
      { traditional: "高興", zhuyin: "ㄍㄠ ㄒㄧㄥˋ", pinyin: "gāoxìng", meaning: "嬉しい" },
      { traditional: "包子", zhuyin: "ㄅㄠ ㄗ˙", pinyin: "bāozi", meaning: "肉まん" }
    ]
  },
  {
    id: "vowel-ou",
    symbol: "ㄡ",
    pinyin: "ou",
    ipa: "[oʊ]",
    katakana: "オウ",
    typeTag: "二重母音 (複韻母)",
    title: "二重母音「ㄡ」",
    originKanji: "又 (yòu / ウー)",
    originDesc: "漢字「又」の形に由来。「オ」の口から唇を小さくすぼめて「ウ」へ進みます。",
    tipTitle: "「オ」の口から唇を突き出して「ウ」へ！",
    tipDesc: "日本語の「おう（王様のエー/オー）」に近い音ですが、最後にしっかりと唇を丸く小さくすぼめて「ウ」を完成させます。",
    color: "from-violet-500 to-purple-600",
    themeHex: "#7C3AED",
    examples: [
      { traditional: "狗", zhuyin: "ㄍㄡˇ", pinyin: "gǒu", meaning: "イヌ" },
      { traditional: "手", zhuyin: "ㄕㄡˇ", pinyin: "shǒu", meaning: "手" },
      { traditional: "猴子", zhuyin: "ㄏㄡˊ ㄗ˙", pinyin: "hóuzi", meaning: "サル" }
    ]
  }
];

export const VOWELS_QUIZ_QUESTIONS_2 = [
  {
    id: 1,
    type: "audio",
    targetSymbol: "ㄞ",
    prompt: "再生された音声に当てはまる二重母音を選んでください",
    options: ["ㄞ", "ㄟ", "ㄠ", "ㄡ"]
  },
  {
    id: 2,
    type: "pinyin",
    targetSymbol: "ㄠ",
    prompt: "ピンイン表記「ao」に対応する二重母音はどれ？",
    options: ["ㄡ", "ㄠ", "ㄟ", "ㄞ"]
  },
  {
    id: 3,
    type: "example",
    targetSymbol: "ㄟ",
    prompt: "「飛機 (fēijī / 飛行機)」の「飛」に使われている二重母音はどれ？",
    options: ["ㄟ", "ㄞ", "ㄠ", "ㄡ"]
  },
  {
    id: 4,
    type: "example",
    targetSymbol: "ㄡ",
    prompt: "「狗 (gǒu / イヌ)」に使われている二重母音はどれ？",
    options: ["ㄠ", "ㄡ", "ㄞ", "ㄟ"]
  },
  {
    id: 5,
    type: "audio",
    targetSymbol: "ㄠ",
    prompt: "「貓 (māo / ネコ)」に使われている「アオ」の二重母音を選んでください",
    options: ["ㄞ", "ㄟ", "ㄠ", "ㄡ"]
  }
];
