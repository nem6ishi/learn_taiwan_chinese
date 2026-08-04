// 台湾華語学習サイト 共通データ構造 (1-1, 1-2, 1-3 対応 ＋ 多彩な確認クイズ完全版)
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

window.VOWELS_STEP3_DATA = [
  {
    id: "vowel-an",
    symbol: "ㄢ",
    pinyin: "an",
    ipa: "[an]",
    katakana: "アン（前鼻音）",
    typeTag: "鼻音・附聲韻",
    title: "前鼻音「ㄢ」",
    originKanji: "屳 (xiān / 仙人)",
    originDesc: "漢字「屳」の形に由来。「ア」を発音したあと、舌先を上の前歯の裏に押し当てて「ン」と抜く音です。",
    tipTitle: "「ア」＋ 舌先を前歯の裏につける「ン」！",
    tipDesc: "日本語の「案内（あんない）」の「あん」と同じ口の動きです。舌先を上の前歯の裏にペタッとつけて音を止めます。",
    color: "from-teal-500 to-cyan-600",
    themeHex: "#0891B2",
    examples: [
      { traditional: "臺灣", zhuyin: "ㄊㄞˊ ㄨㄢ", pinyin: "Táiwān", meaning: "台湾" },
      { traditional: "飯店", zhuyin: "ㄈㄢˋ ㄉㄧㄢˋ", pinyin: "fàndiàn", meaning: "ホテル / レストラン" },
      { traditional: "早餐", zhuyin: "ㄗㄠˇ ㄘㄢ", pinyin: "zǎocān", meaning: "朝ごはん" }
    ]
  },
  {
    id: "vowel-en",
    symbol: "ㄣ",
    pinyin: "en",
    ipa: "[ən]",
    katakana: "エン / アン（前鼻音）",
    typeTag: "鼻音・附聲韻",
    title: "前鼻音「ㄣ」",
    originKanji: "隱の古字原形",
    originDesc: "漢字「隱」の古字・原形に由来。曖昧な「エ/ア」から始まって、舌先を前歯の裏につける音です。",
    tipTitle: "曖昧な口から前歯の裏へ「ン」！",
    tipDesc: "口を大きく開けず、力を抜いた曖昧な「エ/ア」の音からスタートし、最後は「ㄢ」と同じく舌先を前歯の裏につけます。",
    color: "from-blue-500 to-indigo-600",
    themeHex: "#2563EB",
    examples: [
      { traditional: "身體", zhuyin: "ㄕㄣ ㄊㄧˇ", pinyin: "shēntǐ", meaning: "身体 / 体" },
      { traditional: "朋友", zhuyin: "ㄆㄥˊ ㄧㄡˇ", pinyin: "péngyǒu", meaning: "友達" },
      { traditional: "門", zhuyin: "ㄇㄣˊ", pinyin: "mén", meaning: "ドア / 門" }
    ]
  },
  {
    id: "vowel-ang",
    symbol: "ㄤ",
    pinyin: "ang",
    ipa: "[ɑŋ]",
    katakana: "アング（後鼻音）",
    typeTag: "鼻音・附聲韻",
    title: "後鼻音「ㄤ」",
    originKanji: "尢 (wāng / オウ)",
    originDesc: "漢字「尢」の形に由来。「ア」の口を広く開けたまま、喉の奥をすぼめて響かせる音です。",
    tipTitle: "口を開けたまま喉の奥で響かせる「アング」！",
    tipDesc: "日本語の「案外（あんがい）」の「あん」に近い音です。舌先を前歯につけず、口を大きく開けたまま喉の奥を閉じて鼻に抜きます。",
    color: "from-orange-500 to-amber-600",
    themeHex: "#D97706",
    examples: [
      { traditional: "棒球", zhuyin: "ㄅㄤˋ ㄑㄧㄡˊ", pinyin: "bàngqiú", meaning: "野球" },
      { traditional: "珍珠", zhuyin: "ㄓㄣ ㄓㄨ", pinyin: "zhēnzhū", meaning: "タピオカ / 真珠" },
      { traditional: "幫忙", zhuyin: "ㄅㄤ ㄇㄤˊ", pinyin: "bāngmáng", meaning: "手伝う" }
    ]
  },
  {
    id: "vowel-eng",
    symbol: "ㄥ",
    pinyin: "eng",
    ipa: "[ɤŋ]",
    katakana: "エング（後鼻音）",
    typeTag: "鼻音・附聲韻",
    title: "後鼻音「ㄥ」",
    originKanji: "肱 (gōng / コウ)",
    originDesc: "漢字「肱」の原字に由来。喉の奥で響かせる「エング/オング」の音です。",
    tipTitle: "「ㄜ(e)」の口から喉の奥を閉じて鼻へ抜く！",
    tipDesc: "「ㄜ (e)」の曖昧な口から喉の奥をキュッと閉じて響かせます。日本語の「りんご」の「ん」のような喉奥の響きです。",
    color: "from-violet-500 to-purple-600",
    themeHex: "#7C3AED",
    examples: [
      { traditional: "風", zhuyin: "ㄈㄥ", pinyin: "fēng", meaning: "風" },
      { traditional: "公園", zhuyin: "ㄍㄨㄥ ㄩㄢˊ", pinyin: "gōngyuán", meaning: "公園" },
      { traditional: "眼睛", zhuyin: "ㄧㄢˇ ㄐㄧㄥ", pinyin: "yǎnjīng", meaning: "目" }
    ]
  },
  {
    id: "vowel-er",
    symbol: "ㄦ",
    pinyin: "er",
    ipa: "[aɚ]",
    katakana: "アール（巻舌音）",
    typeTag: "捲舌韻母",
    title: "巻舌母音「ㄦ」",
    originKanji: "兒 (ér / 児)",
    originDesc: "漢字「兒」の草書体に由来。舌先を口の天井に向けて持ち上げ・奥へ巻きながら発音します。",
    tipTitle: "「ア」を出しながら舌先を奥へキュッと巻く！",
    tipDesc: "英語の「R」の音に近いです。「ア」と声を出し始めると同時に、舌先を上あごにつけないように奥へ巻き上げます。",
    color: "from-rose-500 to-red-600",
    themeHex: "#E11D48",
    examples: [
      { traditional: "二", zhuyin: "ㄦˋ", pinyin: "èr", meaning: "2 (数字のニ)" },
      { traditional: "耳朵", zhuyin: "ㄦˇ ㄉㄨㄛ˙", pinyin: "ěrduo", meaning: "耳" },
      { traditional: "兒子", zhuyin: "ㄦˊ ㄗ˙", pinyin: "érzi", meaning: "息子" }
    ]
  }
];

// 1-1 確認クイズ
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
    type: "zhuyin-to-word",
    targetSymbol: "爸爸",
    speechTarget: "爸爸",
    prompt: "注音符号「ㄅㄚˋ ㄅㄚ˙」に対応する単語はどれ？",
    options: ["爸爸", "鴨子", "阿姨", "波浪"]
  },
  {
    id: 3,
    type: "word-to-zhuyin",
    targetSymbol: "ㄚ ㄧˊ",
    speechTarget: "阿姨",
    prompt: "単語「阿姨 (āyí / おばさん)」の正しい注音表記はどれ？",
    options: ["ㄚ ㄧˊ", "ㄅㄚˋ ㄅㄚ˙", "ㄧㄚ ㄗ˙", "ㄅㄛ ㄌㄤˋ"]
  },
  {
    id: 4,
    type: "fill-in-blank",
    targetSymbol: "ㄛ",
    speechTarget: "菠菜",
    prompt: "単語「菠菜 (bōcài)」の注音「 ㄅ___ ㄘㄞˋ 」の空欄に入る単母音はどれ？",
    options: ["ㄛ", "ㄚ", "ㄜ", "ㄝ"]
  },
  {
    id: 5,
    type: "audio",
    targetSymbol: "ㄛ",
    prompt: "「波浪 (bōlàng)」の「波」に使われている丸口の単母音を選んでください",
    options: ["ㄚ", "ㄛ", "ㄜ", "ㄝ"]
  }
];

// 1-2 確認クイズ
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
    type: "zhuyin-to-word",
    targetSymbol: "飛機",
    speechTarget: "飛機",
    prompt: "注音符号「ㄈㄟ ㄐㄧ」に対応する単語はどれ？",
    options: ["飛機", "杯子", "黑色", "青菜"]
  },
  {
    id: 3,
    type: "word-to-zhuyin",
    targetSymbol: "ㄅㄞˊ ㄙㄜˋ",
    speechTarget: "白色",
    prompt: "単語「白色 (báisè / 白色)」の正しい注音表記はどれ？",
    options: ["ㄅㄞˊ ㄙㄜˋ", "ㄈㄟ ㄐㄧ", "ㄏㄟ ㄙㄜˋ", "ㄍㄠ ㄒㄧㄥˋ"]
  },
  {
    id: 4,
    type: "fill-in-blank",
    targetSymbol: "ㄟ",
    speechTarget: "黑色",
    prompt: "単語「黑色 (hēisè)」の注音「 ㄏ___ ㄙㄜˋ 」の空欄に入る二重母音はどれ？",
    options: ["ㄟ", "ㄞ", "ㄠ", "ㄡ"]
  },
  {
    id: 5,
    type: "audio",
    targetSymbol: "ㄠ",
    prompt: "「貓 (māo / ネコ)」に使われている「アオ」の二重母音を選んでください",
    options: ["ㄞ", "ㄟ", "ㄠ", "ㄡ"]
  }
];

// 1-3 確認クイズ
window.VOWELS_QUIZ_QUESTIONS_3 = [
  {
    id: 1,
    type: "audio",
    targetSymbol: "ㄢ",
    prompt: "再生された音声に当てはまる前鼻音（舌先を前歯の裏につける音）を選んでください",
    options: ["ㄢ", "ㄤ", "ㄣ", "ㄥ"]
  },
  {
    id: 2,
    type: "zhuyin-to-word",
    targetSymbol: "臺灣",
    speechTarget: "臺灣",
    prompt: "注音符号「ㄊㄞˊ ㄨㄢ」に対応する単語はどれ？",
    options: ["臺灣", "飯店", "身體", "棒球"]
  },
  {
    id: 3,
    type: "word-to-zhuyin",
    targetSymbol: "ㄕㄣ ㄊㄧˇ",
    speechTarget: "身體",
    prompt: "単語「身體 (shēntǐ / 体)」の正しい注音表記はどれ？",
    options: ["ㄕㄣ ㄊㄧˇ", "ㄊㄞˊ ㄨㄢ", "ㄅㄤˋ ㄑㄧㄡˊ", "ㄈㄥ"]
  },
  {
    id: 4,
    type: "fill-in-blank",
    targetSymbol: "ㄥ",
    speechTarget: "公園",
    prompt: "単語「公園 (gōngyuán)」の注音「 ㄍㄨ___ ㄩㄢˊ 」の空欄に入る後鼻音はどれ？",
    options: ["ㄥ", "ㄢ", "ㄣ", "ㄤ"]
  },
  {
    id: 5,
    type: "audio",
    targetSymbol: "ㄦ",
    prompt: "数字の2を表す「二 (èr)」に使われている巻舌音を選んでください",
    options: ["ㄢ", "ㄣ", "ㄤ", "ㄦ"]
  }
];
