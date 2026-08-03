export const VOWELS_STEP1_DATA = [
  {
    id: "vowel-a",
    symbol: "ㄚ",
    pinyin: "a",
    ipa: "[a]",
    katakana: "アー",
    title: "開口音「ㄚ」",
    tipTitle: "日本語の「あ」より口を大きく縦に開ける！",
    tipDesc: "舌の位置は低く下げ、喉の奥からハッキリと明るく「アー」と声を注ぎます。日本語の「あ」よりも少し大きな口を意識するのがポイントです。",
    color: "from-amber-500 to-rose-500",
    themeHex: "#FF6B4A",
    examples: [
      { traditional: "爸爸", zhuyin: "ㄅㄚˋ ㄅㄚ˙", pinyin: "bàba", meaning: "お父さん / パパ" },
      { traditional: "鴨子", zhuyin: "ㄧㄚ ㄗ˙", pinyin: "yāzi", meaning: "アヒル" },
      { traditional: "阿姨", zhuyin: "ㄚ ㄧˊ", pinyin: "āyí", meaning: "おばさん / 阿姨" }
    ]
  },
  {
    id: "vowel-o",
    symbol: "ㄛ",
    pinyin: "o",
    ipa: "[o]",
    katakana: "オー",
    title: "圓唇音「ㄛ」",
    tipTitle: "口を丸くすぼめて、奥から「オー」！",
    tipDesc: "唇を綺麗に丸く突き出し、息をしっかり前に押し出すように「オー」と発音します。主に「ㄅ (b)」「ㄆ (p)」「ㄇ (m)」「ㄈ (f)」の後について使われます。",
    color: "from-teal-500 to-emerald-500",
    themeHex: "#008078",
    examples: [
      { traditional: "襪子", zhuyin: "ㄨㄚˋ ㄗ˙", pinyin: "wàzi", meaning: "靴下" },
      { traditional: "波浪", zhuyin: "ㄅㄛ ㄌㄤˋ", pinyin: "bōlàng", meaning: "波 / 波浪" },
      { traditional: "婆婆", zhuyin: "ㄆㄛˊ ㄆㄛ˙", pinyin: "pópo", meaning: "おばあさん" }
    ]
  },
  {
    id: "vowel-e-e",
    symbol: "ㄜ",
    pinyin: "e",
    ipa: "[ɤ]",
    katakana: "アー（エの口）",
    title: "扁唇音「ㄜ」",
    tipTitle: "「え」の口のまま、喉の奥で「お/あ」と声を出す！",
    tipDesc: "日本語にはない独特の音です。口を横に少し引いて「え」の形を作ったまま、力を抜いて喉の奥から「オ」または「ア」に近い曖昧な声を「ウー/オー」と出します。",
    color: "from-indigo-500 to-purple-500",
    themeHex: "#6366F1",
    examples: [
      { traditional: "鵝", zhuyin: "ㄜˊ", pinyin: "é", meaning: "ガチョウ" },
      { traditional: "哥哥", zhuyin: "ㄍㄜ ㄍㄜ˙", pinyin: "gēge", meaning: "お兄さん" },
      { traditional: "喝水", zhuyin: "ㄏㄜ ㄕㄨㄟˇ", pinyin: "hēshuǐ", meaning: "水を飲む" }
    ]
  },
  {
    id: "vowel-eh",
    symbol: "ㄝ",
    pinyin: "ê / ie / üe",
    ipa: "[ɛ]",
    katakana: "エー",
    title: "前元音「ㄝ」",
    tipTitle: "日本語の「え」に近く、口を横に開いて「エー」！",
    tipDesc: "口を横に自然に開き、舌の先を下歯の裏につけてハッキリ「エー」と発音します。単独で使われることは少なく、「ㄧ (i)」や「ㄩ (ü)」と組み合わせて「ㄧㄝ (ie)」「ㄩㄝ (üe)」としてよく登場します。",
    color: "from-sky-500 to-blue-600",
    themeHex: "#0284C7",
    examples: [
      { traditional: "爺爺", zhuyin: "ㄧㄝˊ ㄧㄝ˙", pinyin: "yéye", meaning: "おじいちゃん" },
      { traditional: "葉子", zhuyin: "ㄧㄝˋ ㄗ˙", pinyin: "yèzi", meaning: "葉っぱ" },
      { traditional: "姐姐", zhuyin: "ㄐㄧㄝˇ ㄐㄧㄝ˙", pinyin: "jiějie", meaning: "お姉さん" }
    ]
  },
  {
    id: "vowel-ai",
    symbol: "ㄞ",
    pinyin: "ai",
    ipa: "[aɪ]",
    katakana: "アイ",
    title: "複韻母「ㄞ」",
    tipTitle: "大きな「あ」から素早く「い」へ滑らせる！",
    tipDesc: "「ㄚ (a)」の口から始まり、一気に滑らかに「ㄧ (i)」へと繋げます。「ア」を強く長めに、「イ」は小さく添える感覚で「アイ！」と発音するのが美しく聞こえるコツです。",
    color: "from-pink-500 to-rose-600",
    themeHex: "#E11D48",
    examples: [
      { traditional: "愛", zhuyin: "ㄞˋ", pinyin: "ài", meaning: "愛する / 愛" },
      { traditional: "白色的", zhuyin: "ㄅㄞˊ ㄙㄜˋ ㄉㄜ˙", pinyin: "báisè de", meaning: "白い" },
      { traditional: "菜", zhuyin: "ㄘㄞˋ", pinyin: "cài", meaning: "料理 / 野菜" }
    ]
  }
];

export const VOWELS_QUIZ_QUESTIONS = [
  {
    id: 1,
    type: "audio",
    targetSymbol: "ㄚ",
    prompt: "再生された音声に当てはまる注音符号を選んでください",
    options: ["ㄚ", "ㄛ", "ㄜ", "ㄞ"]
  },
  {
    id: 2,
    type: "pinyin",
    targetSymbol: "ㄛ",
    prompt: "ピンイン表記「o」に対応する注音符号はどれ？",
    options: ["ㄜ", "ㄛ", "ㄝ", "ㄚ"]
  },
  {
    id: 3,
    type: "tip",
    targetSymbol: "ㄜ",
    prompt: "「『え』の口の形のまま喉奥で声を出す」曖昧な音の符号はどれ？",
    options: ["ㄝ", "ㄞ", "ㄜ", "ㄛ"]
  },
  {
    id: 4,
    type: "example",
    targetSymbol: "ㄞ",
    prompt: "「愛 (ài)」の主韻母に使われている注音符号はどれ？",
    options: ["ㄚ", "ㄞ", "ㄝ", "ㄛ"]
  },
  {
    id: 5,
    type: "audio",
    targetSymbol: "ㄝ",
    prompt: "「爺爺 (yéye)」の後半に出てくる明るい「エー」の音覚える符号は？",
    options: ["ㄝ", "ㄜ", "ㄚ", "ㄛ"]
  }
];
