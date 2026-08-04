// 注音ナビ 共通データ構造 (完全静的スタンドアロン対応)
window.ZHUYIN_SPEECH_MAP = {
  'ㄚ': '啊',   // a
  'ㄛ': '喔',   // o
  'ㄜ': '鵝',   // e
  'ㄝ': '也',   // eh
  'ㄞ': '愛',   // ai
  'ㄟ': '黑',   // ei
  'ㄠ': '凹',   // ao
  'ㄡ': '歐',   // ou
  'ㄅ': '包',   // b
  'ㄆ': '撲',   // p
  'ㄇ': '摸',   // m
  'ㄈ': '佛'    // f
};

window.VOWELS_STEP1_DATA = [
  {
    id: "vowel-a",
    symbol: "ㄚ",
    pinyin: "a",
    ipa: "[a]",
    katakana: "アー",
    typeTag: "単母音 (單韻母)",
    title: "開口音「ㄚ」",
    originKanji: "丫 (ア)",
    originDesc: "二股に分かれた枝を表す漢字「丫（ア）」の形に由来。口を大きく開けて発音します。",
    tipTitle: "日本語の「あ」より口を大きく縦に開ける！",
    tipDesc: "舌の位置は低く下げ、喉の奥からハッキリと明るく「アー」と声を注ぎます。音の途中で口の形を変えない単母音です。",
    color: "from-amber-500 to-rose-500",
    themeHex: "#FF6B4A",
    examples: [
      { traditional: "爸爸", zhuyin: "ㄅㄚˋ ㄅㄚ˙", pinyin: "bàba", meaning: "お父さん / パパ" },
      { traditional: "鴨子", zhuyin: "ㄧㄚ ㄗ˙", pinyin: "yāzi", meaning: "アヒル" },
      { traditional: "阿姨", zhuyin: "ㄚ ㄧˊ", pinyin: "āyí", meaning: "おばさん" }
    ]
  },
  {
    id: "vowel-o",
    symbol: "ㄛ",
    pinyin: "o",
    ipa: "[o]",
    katakana: "オー",
    typeTag: "単母音 (單韻母)",
    title: "圓唇音「ㄛ」",
    originKanji: "𠀤 / 呵 (オ・カ)",
    originDesc: "感嘆を表す古漢字「呵」の原形に由来。口を丸めて「オー」と発音する形を表しています。",
    tipTitle: "口を丸くすぼめて、奥から「オー」！",
    tipDesc: "唇を綺麗に丸く突き出し、息をしっかり前に押し出すように「オー」と発音します。単母音なので口の丸みを最後までキープします。",
    color: "from-teal-500 to-emerald-500",
    themeHex: "#008078",
    examples: [
      { traditional: "波浪", zhuyin: "ㄅㄛ ㄌㄤˋ", pinyin: "bōlàng", meaning: "波" },
      { traditional: "婆婆", zhuyin: "ㄆㄛˊ ㄆㄛ˙", pinyin: "pópo", meaning: "おばあさん" },
      { traditional: "菠菜", zhuyin: "ㄅㄛ ㄘㄞˋ", pinyin: "bōcài", meaning: "ホウレン草" }
    ]
  },
  {
    id: "vowel-e-e",
    symbol: "ㄜ",
    pinyin: "e",
    ipa: "[ɤ]",
    katakana: "アー（エの口）",
    typeTag: "単母音 (單韻母)",
    title: "扁唇音「ㄜ」",
    originKanji: "ㄛの変形文字",
    originDesc: "「ㄛ」の形をアレンジして作られた文字。ピンイン表記は「e」。",
    tipTitle: "「え」の口のまま、喉の奥で曖昧に声を出す！",
    tipDesc: "ピンインでは「e」と書かれますが、日本語の「え」ではなく喉の奥から「オ/ア/ウ」に近い曖昧な声を出す単母音です。",
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
    pinyin: "ê / (ie, üeのe)",
    ipa: "[ɛ]",
    katakana: "エー",
    typeTag: "単母音 (單韻母)",
    title: "前元音「ㄝ」",
    originKanji: "也 (yě / イェ)",
    originDesc: "漢字「也」に由来。ピンインでは「ie (ㄧㄝ)」や「üe (ㄩㄝ)」の「e」と同じ音です。",
    tipTitle: "日本語の「え」に近い明るい音！",
    tipDesc: "ピンインだとどちらも「e」と書かれますが、「ㄝ」は日本語の「え」に近いハッキリした「エー」の単母音です。",
    color: "from-sky-500 to-blue-600",
    themeHex: "#0284C7",
    examples: [
      { traditional: "爺爺", zhuyin: "ㄧㄝˊ ㄧㄝ˙", pinyin: "yéye", meaning: "おじいちゃん" },
      { traditional: "葉子", zhuyin: "ㄧㄝˋ ㄗ˙", pinyin: "yèzi", meaning: "葉っぱ" },
      { traditional: "姐姐", zhuyin: "ㄐㄧㄝˇ ㄐㄧㄝ˙", pinyin: "jiějie", meaning: "お姉さん" }
    ]
  }
];

window.VOWELS_STEP2_DATA = [
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

window.VOWELS_QUIZ_QUESTIONS_1 = [
  {
    id: 1,
    type: "audio",
    targetSymbol: "ㄚ",
    prompt: "再生された音声に当てはまる単母音を選んでください",
    options: ["ㄚ", "ㄛ", "ㄜ", "ㄝ"]
  },
  {
    id: 2,
    type: "pinyin",
    targetSymbol: "ㄛ",
    prompt: "ピンイン表記「o」に対応する単母音はどれ？",
    options: ["ㄜ", "ㄛ", "ㄝ", "ㄚ"]
  },
  {
    id: 3,
    type: "tip",
    targetSymbol: "ㄜ",
    prompt: "ピンインだと「e」と書かれるが、「え」の口のまま喉奥で曖昧に「オ/ア/ウ」と声を出す単母音はどれ？",
    options: ["ㄝ", "ㄜ", "ㄚ", "ㄛ"]
  },
  {
    id: 4,
    type: "example",
    targetSymbol: "ㄝ",
    prompt: "「爺爺 (yéye)」のピンインieに含まれる明るい「エー」の音を表す単母音は？",
    options: ["ㄝ", "ㄜ", "ㄚ", "ㄛ"]
  },
  {
    id: 5,
    type: "audio",
    targetSymbol: "ㄛ",
    prompt: "「波浪 (bōlàng)」の「波」に使われている丸口の単母音を選んでください",
    options: ["ㄚ", "ㄛ", "ㄜ", "ㄝ"]
  }
];

window.VOWELS_QUIZ_QUESTIONS_2 = [
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
