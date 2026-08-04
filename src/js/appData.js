// 台湾華語学習サイト 共通データ構造 (全文字単語例2〜3個以上完全拡充版)
window.ZHUYIN_SPEECH_MAP = {
  'ㄚ': '啊',   // a
  'ㄛ': '喔',   // o
  'ㄜ': '鵝',   // e
  'ㄝ': '也',   // eh
  'ㄞ': '愛',   // ai
  'ㄟ': '黑',   // ei
  'ㄠ': '凹',   // ao
  'ㄡ': '歐',   // ou
  'ㄢ': '安',   // an
  'ㄣ': '恩',   // en
  'ㄤ': '昂',   // ang
  'ㄥ': '鞥',   // eng
  'ㄦ': '二',   // er
  'ㄅ': '包',   // b
  'ㄆ': '撲',   // p
  'ㄇ': '摸',   // m
  'ㄈ': '佛'    // f
};

// ==================== 1-1: 唇音 (ㄅㄆㄇㄈ) ＋ 単母音 (ㄚㄛㄜㄝ) ====================
// ★すべての文字に2〜3個の単語例を掲載！
window.VOWELS_STEP1_DATA = [
  // --- 子音 (聲母) 4文字 ---
  {
    id: "consonant-b",
    symbol: "ㄅ",
    pinyin: "b",
    ipa: "[p]",
    katakana: "ブ / バ / ボ",
    typeTag: "子音 (唇音)",
    title: "無気唇音「ㄅ」",
    originKanji: "包 (bāo / 包む)",
    originDesc: "漢字「包」の上の形に由来。唇を閉じてから息を破裂させずに「ブ/バ」と発声します。",
    tipTitle: "【無気音】息を出さない「ブ/バ」！（ティッシュが揺れない）",
    tipDesc: "息を口の中に溜めて、強く吹き出さずに静かに声を出します。口の前のティッシュがまったく揺れないのが正解です。",
    color: "from-teal-500 to-emerald-600",
    themeHex: "#0D9488",
    examples: [
      { traditional: "八", zhuyin: "ㄅㄚ", pinyin: "bā", meaning: "8 (数字のハチ)" },
      { traditional: "爸爸", zhuyin: "ㄅㄚˋ ㄅㄚ˙", pinyin: "bàba", meaning: "お父さん / パパ" },
      { traditional: "拔", zhuyin: "ㄅㄚˊ", pinyin: "bá", meaning: "抜く / 引き抜く" }
    ]
  },
  {
    id: "consonant-p",
    symbol: "ㄆ",
    pinyin: "p",
    ipa: "[pʰ]",
    katakana: "プ / パ / ポ",
    typeTag: "子音 (唇音)",
    title: "有気唇音「ㄆ」",
    originKanji: "撲 (pū / 破る)",
    originDesc: "漢字「撲」の右側の形に由来。唇から息を強烈に吹き出しながら発声します。",
    tipTitle: "【有気音】強烈に息を吹き出す「プ/パ」！（ティッシュが風で跳ねる）",
    tipDesc: "「ㄅ」と同じ唇の形ですが、口の前に置いたティッシュペーパーが「フッ！」と大きく吹き飛ぶくらい息を吐き出します。",
    color: "from-blue-500 to-indigo-600",
    themeHex: "#2563EB",
    examples: [
      { traditional: "婆婆", zhuyin: "ㄆㄛˊ ㄆㄛ˙", pinyin: "pópo", meaning: "おばあさん" },
      { traditional: "爬", zhuyin: "ㄆㄚˊ", pinyin: "pá", meaning: "登る / 這う（はう）" },
      { traditional: "怕", zhuyin: "ㄆㄚˋ", pinyin: "pà", meaning: "怖がる / 恐れる" }
    ]
  },
  {
    id: "consonant-m",
    symbol: "ㄇ",
    pinyin: "m",
    ipa: "[m]",
    katakana: "ム / マ / モ",
    typeTag: "子音 (唇音)",
    title: "鼻音唇音「ㄇ」",
    originKanji: "冪 / 摸 (mō / 覆う)",
    originDesc: "上から布で覆う形に由来。両唇をしっかり閉じて、音を鼻に抜かせる鼻音です。",
    tipTitle: "唇を閉じて鼻に響かせる「ム/マ」！",
    tipDesc: "日本語の「マ行」と全く同じ音です。唇を閉じた状態から音をスタートさせます。",
    color: "from-amber-500 to-orange-600",
    themeHex: "#D97706",
    examples: [
      { traditional: "媽", zhuyin: "ㄇㄚ", pinyin: "mā", meaning: "お母さん / ママ" },
      { traditional: "摸", zhuyin: "ㄇㄛ", pinyin: "mō", meaning: "触る / 撫でる" },
      { traditional: "馬", zhuyin: "ㄇㄚˇ", pinyin: "mǎ", meaning: "ウマ (動物)" }
    ]
  },
  {
    id: "consonant-f",
    symbol: "ㄈ",
    pinyin: "f",
    ipa: "[f]",
    katakana: "フ / ファ / フォ",
    typeTag: "子音 (唇音)",
    title: "唇歯音「ㄈ」",
    originKanji: "匚 (fāng / 箱)",
    originDesc: "物を入れる箱の形「匚」に由来。上の前歯で下唇を軽く押さえて隙間から息を出します。",
    tipTitle: "上の前歯で下唇を軽く噛んで息を擦らせる「フ/ファ」！",
    tipDesc: "英語の「F」と同じ音です。上の前歯を下唇の内側に軽くあて、すき間から「サー/フー」と息を擦らせて出します。",
    color: "from-purple-500 to-violet-600",
    themeHex: "#7C3AED",
    examples: [
      { traditional: "發", zhuyin: "ㄈㄚ", pinyin: "fā", meaning: "発する / 送る" },
      { traditional: "佛", zhuyin: "ㄈㄛˊ", pinyin: "fó", meaning: "仏様 / 仏教" }
    ]
  },

  // --- 母音 (韻母) 4文字 ---
  {
    id: "vowel-a",
    symbol: "ㄚ",
    pinyin: "a",
    ipa: "[a]",
    katakana: "アー",
    typeTag: "単母音 (單韻母)",
    title: "開口音「ㄚ」",
    originKanji: "丫 (ア)",
    originDesc: "二股に分かれた枝を表す漢字「丫」の形に由来。口を大きく縦に開けて発音します。",
    tipTitle: "口を大きく縦に開けて「アー」！",
    tipDesc: "日本語の「あ」よりも指が縦に2本入るくらい大きく口を開け、喉の奥からハッキリ「アー」と出します。",
    color: "from-rose-500 to-pink-600",
    themeHex: "#E11D48",
    examples: [
      { traditional: "八", zhuyin: "ㄅㄚ", pinyin: "bā", meaning: "8 (数字のハチ)" },
      { traditional: "媽", zhuyin: "ㄇㄚ", pinyin: "mā", meaning: "お母さん" },
      { traditional: "阿", zhuyin: "ㄚ", pinyin: "ā", meaning: "感嘆詞 (ああ！)" }
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
    originKanji: "呵 (オ)",
    originDesc: "感嘆を表す古漢字「呵」に由来。口を綺麗に丸くすぼめて「オー」と出します。",
    tipTitle: "口を丸くすぼめて「オー」！",
    tipDesc: "唇を前に丸く突き出し、最後まで口の丸みをキープしたまま「オー」と響かせます。",
    color: "from-emerald-500 to-teal-600",
    themeHex: "#059669",
    examples: [
      { traditional: "摸", zhuyin: "ㄇㄛ", pinyin: "mō", meaning: "触る" },
      { traditional: "婆婆", zhuyin: "ㄆㄛˊ ㄆㄛ˙", pinyin: "pópo", meaning: "おばあさん" },
      { traditional: "佛", zhuyin: "ㄈㄛˊ", pinyin: "fó", meaning: "仏様" }
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
    originKanji: "ㄛの変形",
    originDesc: "「ㄛ」をアレンジした文字。「え」の口のまま喉奥で曖昧に声を出します。",
    tipTitle: "「え」の口のまま喉奥で声を出す！",
    tipDesc: "口を横に「え」の形に軽く開き、力を抜いて喉の奥から「オ/ア」に近い声を曖昧に出します。",
    color: "from-cyan-500 to-blue-600",
    themeHex: "#0284C7",
    examples: [
      { traditional: "麼", zhuyin: "ㄇㄜ˙", pinyin: "me", meaning: "語尾助詞 (什麼などの)" },
      { traditional: "鵝", zhuyin: "ㄜˊ", pinyin: "é", meaning: "ガチョウ (鳥)" }
    ]
  },
  {
    id: "vowel-eh",
    symbol: "ㄝ",
    pinyin: "ê",
    ipa: "[ɛ]",
    katakana: "エー",
    typeTag: "単母音 (單韻母)",
    title: "前元音「ㄝ」",
    originKanji: "也 (yě)",
    originDesc: "漢字「也」に由来。日本語の「え」に近い明るい音です。",
    tipTitle: "日本語の「え」に近い明るい音！",
    tipDesc: "口を少し横に引き、明るくハッキリと「エー」と発音する単母音です。",
    color: "from-sky-500 to-indigo-600",
    themeHex: "#4F46E5",
    examples: [
      { traditional: "咩", zhuyin: "ㄇㄝ", pinyin: "miē", meaning: "羊の鳴き声 (メー)" },
      { traditional: "也", zhuyin: "ㄧㄝˇ", pinyin: "yě", meaning: "〜もまた (漢字「也」)" }
    ]
  }
];

window.VOWELS_STEP2_DATA = [];
window.VOWELS_STEP3_DATA = [];

// 1-1 確認クイズ
window.VOWELS_QUIZ_QUESTIONS_1 = [
  {
    id: 1,
    type: "audio",
    targetSymbol: "ㄅ",
    speechTarget: "ㄅ",
    prompt: "再生された音声に当てはまる子音（唇音）を選んでください",
    options: ["ㄅ", "ㄆ", "ㄇ", "ㄈ"]
  },
  {
    id: 2,
    type: "audio",
    targetSymbol: "ㄚ",
    speechTarget: "ㄚ",
    prompt: "再生された音声に当てはまる単母音を選んでください",
    options: ["ㄚ", "ㄛ", "ㄜ", "ㄝ"]
  },
  {
    id: 3,
    type: "zhuyin-to-word",
    targetSymbol: "爸爸",
    speechTarget: "爸爸",
    prompt: "注音符号「ㄅㄚˋ ㄅㄚ˙」に対応する単語はどれ？",
    options: ["爸爸", "婆婆", "摸", "八"]
  },
  {
    id: 4,
    type: "word-to-zhuyin",
    targetSymbol: "ㄆㄛˊ ㄆㄛ˙",
    speechTarget: "婆婆",
    optionSpeechMap: {
      "ㄆㄛˊ ㄆㄛ˙": "婆婆",
      "ㄅㄚˋ ㄅㄚ˙": "爸爸",
      "ㄇㄚ": "媽",
      "ㄈㄚ": "發"
    },
    prompt: "単語「婆婆 (pópo / おばあさん)」の正しい注音表記はどれ？",
    options: ["ㄆㄛˊ ㄆㄛ˙", "ㄅㄚˋ ㄅㄚ˙", "ㄇㄚ", "ㄈㄚ"]
  },
  {
    id: 5,
    type: "fill-in-blank",
    targetSymbol: "ㄇ",
    speechTarget: "摸",
    prompt: "単語「摸 (mō / 触る)」の注音「 ___ㄛ 」の空欄に入る子音はどれ？",
    options: ["ㄇ", "ㄅ", "ㄆ", "ㄈ"]
  }
];

window.VOWELS_QUIZ_QUESTIONS_2 = [];
window.VOWELS_QUIZ_QUESTIONS_3 = [];
