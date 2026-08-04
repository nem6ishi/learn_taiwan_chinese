// 台湾華語学習サイト 共通データ構造 (1-1 ＆ 1-2 スモールステップ完全対応版)
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
  'ㄈ': '佛',   // f
  'ㄉ': '刀',   // d
  'ㄊ': '頭',   // t
  'ㄋ': '奶',   // n
  'ㄌ': '老'    // l
};

// ==================== 1-1: 唇音 (ㄅㄆㄇㄈ) ＋ 単母音 (ㄚㄛㄜㄝ) ====================
window.VOWELS_STEP1_DATA = [
  // --- 子音 (聲母) 4文字 ---
  {
    id: "consonant-b",
    symbol: "ㄅ",
    pinyin: "b (bō)",
    ipa: "[p]",
    katakana: "ボ (bō)",
    typeTag: "子音 (唇音)",
    title: "無気唇音「ㄅ」",
    originKanji: "包 (bāo / 包む)",
    originDesc: "漢字「包」の上の形に由来。単体で覚える時は母音『ㄛ』を添えて「ㄅㄛ (bō / ボ)」と発声します。",
    tipTitle: "【無気音】息を出さない「ボ (bō)」！（ティッシュが揺れない）",
    tipDesc: "※子音単体は息だけで聞き取りにくいため、伝統的に母音『ㄛ(o)』を添えて「ㄅㄛ(ボ)」と発声します。息を殺して発声するのがコツです。",
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
    pinyin: "p (pō)",
    ipa: "[pʰ]",
    katakana: "ポ (pō)",
    typeTag: "子音 (唇音)",
    title: "有気唇音「ㄆ」",
    originKanji: "撲 (pū / 破る)",
    originDesc: "漢字「撲」の右側の形に由来。単体で覚える時は母音『ㄛ』を添えて「ㄆㄛ (pō / ポ)」と発声します。",
    tipTitle: "【有気音】強烈に息を吹き出す「ポ (pō)」！（ティッシュが跳ねる）",
    tipDesc: "※単体では母音『ㄛ(o)』を添えて「ㄆㄛ(ポ)」と読みます。「ㄅ」と同じ唇ですが、ティッシュが大きく飛ぶくらい強く息を吹き出します。",
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
    originDesc: "物を入れる箱の形に由来。上の前歯で下唇を軽く押さえて隙間から息を出します。",
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
    tipTitle: "日本語の「え」に近い音！（※「ㄧㄝ (ie)」の形でよく登場！）",
    tipDesc: "単体ではあまり使われず、日常会話では「ㄧ(i)」とセットになった「ㄧㄝ (ie / イェ)」の形でよく登場します（例：爺爺, 葉子）。",
    color: "from-sky-500 to-indigo-600",
    themeHex: "#4F46E5",
    examples: [
      { traditional: "咩", zhuyin: "ㄇㄝ", pinyin: "miē", meaning: "羊の鳴き声 (メー)" },
      { traditional: "爺爺", zhuyin: "ㄧㄝˊ ㄧㄝ˙", pinyin: "yéye", meaning: "おじいちゃん (※ㄧ+ㄝの形)" },
      { traditional: "葉子", zhuyin: "ㄧㄝˋ ㄗ˙", pinyin: "yèzi", meaning: "葉っぱ (※ㄧ+ㄝの形)" }
    ]
  }
];

// ==================== 1-2: 舌尖音 (ㄉㄊㄋㄌ) ＋ 二重母音 (ㄞㄟㄠㄡ) ====================
// ★すべての単語例・注音・クイズが、既習の16文字「ㄅㄆㄇㄈㄚㄛㄜㄝ ＋ ㄉㄊㄋㄌㄞㄟㄠㄡ」のみで構成されています！
window.VOWELS_STEP2_DATA = [
  // --- 子音 (聲母) 4文字 ---
  {
    id: "consonant-d",
    symbol: "ㄉ",
    pinyin: "d",
    ipa: "[t]",
    katakana: "ド / ダ / デ",
    typeTag: "子音 (舌尖音)",
    title: "無気舌尖音「ㄉ」",
    originKanji: "刀 (dāo / ナイフ)",
    originDesc: "漢字「刀」の上の形に由来。舌先を上の前歯の裏につけて、息を押し殺して「ド/ダ」と出します。",
    tipTitle: "【無気音】息を出さずに舌先をはじく「ド/ダ」！（ティッシュが動かない）",
    tipDesc: "日本語のタ行/ダ行に近い音ですが、息を吹き出さずに「ド」または「ダ」と静かに発音します。",
    color: "from-teal-500 to-emerald-600",
    themeHex: "#0D9488",
    examples: [
      { traditional: "大", zhuyin: "ㄉㄚˋ", pinyin: "dà", meaning: "大きい" },
      { traditional: "帶", zhuyin: "ㄉㄞˋ", pinyin: "dài", meaning: "持っていく / 帯びる" },
      { traditional: "豆", zhuyin: "ㄉㄡˋ", pinyin: "dòu", meaning: "豆 (まめ)" }
    ]
  },
  {
    id: "consonant-t",
    symbol: "ㄊ",
    pinyin: "t",
    ipa: "[tʰ]",
    katakana: "ト / タ / テ",
    typeTag: "子音 (舌尖音)",
    title: "有気舌尖音「ㄊ」",
    originKanji: "突 (tū / 突き出る)",
    originDesc: "子どもの頭が上に突き出る形に由来。舌先を歯の裏から離す瞬間に強烈に息を吹き出します。",
    tipTitle: "【有気音】強烈に息を吐き出す「ト/タ」！（ティッシュが跳ねる）",
    tipDesc: "「ㄉ」と同じ舌の位置ですが、前歯の裏から破裂させるように息を「ツッ/タッ！」と強く出します。",
    color: "from-blue-500 to-indigo-600",
    themeHex: "#2563EB",
    examples: [
      { traditional: "他", zhuyin: "ㄊㄚ", pinyin: "tā", meaning: "彼 / あの人" },
      { traditional: "頭", zhuyin: "ㄊㄡˊ", pinyin: "tóu", meaning: "頭 (あたま)" },
      { traditional: "颱", zhuyin: "ㄊㄞˊ", pinyin: "tái", meaning: "台風の「颱」" }
    ]
  },
  {
    id: "consonant-n",
    symbol: "ㄋ",
    pinyin: "n",
    ipa: "[n]",
    katakana: "ヌ / ナ / ノ",
    typeTag: "子音 (舌尖音)",
    title: "鼻音舌尖音「ㄋ」",
    originKanji: "乃 (nǎi / あなた)",
    originDesc: "漢字「乃」の形に由来。舌先を前歯の裏につけて音を鼻に抜かせる音です。",
    tipTitle: "舌先をつけたまま鼻へ音を抜く「ナ行」！",
    tipDesc: "日本語の「ナ行（な、に、ぬ、ね、の）」と同じです。舌先を上の歯茎につけて音を出します。",
    color: "from-amber-500 to-orange-600",
    themeHex: "#D97706",
    examples: [
      { traditional: "奶", zhuyin: "ㄋㄞˇ", pinyin: "nǎi", meaning: "ミルク / おっぱい" },
      { traditional: "拿", zhuyin: "ㄋㄚˊ", pinyin: "ná", meaning: "持つ / 取る" }
    ]
  },
  {
    id: "consonant-l",
    symbol: "ㄌ",
    pinyin: "l",
    ipa: "[l]",
    katakana: "ル / ラ / ロ",
    typeTag: "子音 (舌尖音)",
    title: "辺音舌尖音「ㄌ」",
    originKanji: "力 (lì / 力)",
    originDesc: "漢字「力」の形に由来。舌先を前歯の裏からスムーズに弾いて滑らせる音です。",
    tipTitle: "舌先を前歯の裏から軽やかに弾く「ラ行」！",
    tipDesc: "日本語の「ラ行」に非常に近い音です。舌先を前歯裏の歯茎にあててサッと弾きます。",
    color: "from-purple-500 to-violet-600",
    themeHex: "#7C3AED",
    examples: [
      { traditional: "老", zhuyin: "ㄌㄠˇ", pinyin: "lǎo", meaning: "古い / 年老いた" },
      { traditional: "拉", zhuyin: "ㄌㄚ", pinyin: "lā", meaning: "引っ張る / 引く" }
    ]
  },

  // --- 母音 (複韻母) 4文字 ---
  {
    id: "vowel-ai",
    symbol: "ㄞ",
    pinyin: "ai",
    ipa: "[aɪ]",
    katakana: "アイ",
    typeTag: "二重母音 (複韻母)",
    title: "二重母音「ㄞ」",
    originKanji: "亥 (hài / ハイ)",
    originDesc: "漢字「亥」の上の形に由来。「ㄚ (a)」の口から「ㄧ (i)」へと滑らかに移ります。",
    tipTitle: "大きな「ア」から滑らかに「イ」へ繋ぐ！",
    tipDesc: "「ㄚ」の大きな口で強くスタートし、滑らかに口をすぼめて「イ」へと繋ぎます。",
    color: "from-pink-500 to-rose-600",
    themeHex: "#E11D48",
    examples: [
      { traditional: "愛", zhuyin: "ㄞˋ", pinyin: "ài", meaning: "愛する / 愛" },
      { traditional: "帶", zhuyin: "ㄉㄞˋ", pinyin: "dài", meaning: "持っていく" },
      { traditional: "奶", zhuyin: "ㄋㄞˇ", pinyin: "nǎi", meaning: "ミルク" }
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
    originKanji: "也の変形",
    originDesc: "「ㄝ (eh)」から始まって「イ」へ流れる音。日本語の「エイ」に近い音です。",
    tipTitle: "明るい「エ」から素早く「イ」へすべらせる！",
    tipDesc: "「エ」の口をハッキリ作ってスタートし、最後に軽く唇を引いて「イ」で終わります。",
    color: "from-amber-500 to-yellow-600",
    themeHex: "#D97706",
    examples: [
      { traditional: "杯", zhuyin: "ㄅㄟ", pinyin: "bēi", meaning: "コップ / グラス" },
      { traditional: "得", zhuyin: "ㄉㄟˇ", pinyin: "děi", meaning: "〜しなければならない" }
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
    originDesc: "漢字「幺」の形に由来。「ア」の大きな口から一気に唇を丸めて「オ/ウ」へ進みます。",
    tipTitle: "大きな「ア」から一気に口を丸めて「オ/ウ」！",
    tipDesc: "「ア」を長めにしっかり発音し、最後に口をキュッと丸くすぼめて「オ/ウ」を完成させます。",
    color: "from-emerald-500 to-teal-600",
    themeHex: "#059669",
    examples: [
      { traditional: "老", zhuyin: "ㄌㄠˇ", pinyin: "lǎo", meaning: "古い / 年老いた" },
      { traditional: "刀", zhuyin: "ㄉㄠ", pinyin: "dāo", meaning: "ナイフ / 包丁" }
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
    originDesc: "漢字「又」の形に由来。「オ」の口から唇を前へ突き出して「ウ」へ進みます。",
    tipTitle: "「オ」の口から唇を突き出して「ウ」！",
    tipDesc: "日本語の「オー」と引き延ばすのではなく、最後にしっかりと唇を丸く小さくすぼめて「ウ」を完成させます。",
    color: "from-violet-500 to-purple-600",
    themeHex: "#7C3AED",
    examples: [
      { traditional: "頭", zhuyin: "ㄊㄡˊ", pinyin: "tóu", meaning: "頭 (あたま)" },
      { traditional: "豆", zhuyin: "ㄉㄡˋ", pinyin: "dòu", meaning: "豆 (まめ)" }
    ]
  }
];

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

// 1-2 確認クイズ (既習の16文字限定・未学習文字ゼロ)
window.VOWELS_QUIZ_QUESTIONS_2 = [
  {
    id: 1,
    type: "audio",
    targetSymbol: "ㄉ",
    speechTarget: "ㄉ",
    prompt: "再生された音声に当てはまる無気子音（舌尖音）を選んでください",
    options: ["ㄉ", "ㄊ", "ㄋ", "ㄌ"]
  },
  {
    id: 2,
    type: "audio",
    targetSymbol: "ㄞ",
    speechTarget: "ㄞ",
    prompt: "再生された音声に当てはまる二重母音を選んでください",
    options: ["ㄞ", "ㄟ", "ㄠ", "ㄡ"]
  },
  {
    id: 3,
    type: "zhuyin-to-word",
    targetSymbol: "大",
    speechTarget: "大",
    prompt: "注音符号「ㄉㄚˋ」に対応する単語はどれ？",
    options: ["大", "他", "老", "頭"]
  },
  {
    id: 4,
    type: "word-to-zhuyin",
    targetSymbol: "ㄌㄠˇ",
    speechTarget: "老",
    optionSpeechMap: {
      "ㄌㄠˇ": "老",
      "ㄉㄚˋ": "大",
      "ㄊㄡˊ": "頭",
      "ㄋㄞˇ": "奶"
    },
    prompt: "単語「老 (lǎo / 古い・年老いた)」の正しい注音表記はどれ？",
    options: ["ㄌㄠˇ", "ㄉㄚˋ", "ㄊㄡˊ", "ㄋㄞˇ"]
  },
  {
    id: 5,
    type: "fill-in-blank",
    targetSymbol: "ㄊ",
    speechTarget: "頭",
    prompt: "単語「頭 (tóu / 頭)」の注音「 ___ㄡˊ 」の空欄に入る有気子音はどれ？",
    options: ["ㄊ", "ㄉ", "ㄋ", "ㄌ"]
  }
];

// 1-3 確認クイズ (鼻音・そり舌母音 ㄢ ㄣ ㄤ ㄥ ㄦ)
window.VOWELS_QUIZ_QUESTIONS_3 = [
  {
    id: 1,
    type: "audio",
    targetSymbol: "ㄢ",
    speechTarget: "ㄢ",
    prompt: "再生された音声に当てはまる前鼻音（-n 響き）を選んでください",
    options: ["ㄢ", "ㄣ", "ㄤ", "ㄥ"]
  },
  {
    id: 2,
    type: "audio",
    targetSymbol: "ㄦ",
    speechTarget: "ㄦ",
    prompt: "再生された音声に当てはまるそり舌母音（舌を巻き上げる音）を選んでください",
    options: ["ㄦ", "ㄢ", "ㄣ", "ㄤ"]
  },
  {
    id: 3,
    type: "zhuyin-to-word",
    targetSymbol: "羊",
    speechTarget: "羊",
    prompt: "注音符号「ㄧㄤˊ」に対応する単語はどれ？",
    options: ["羊", "山", "人", "門"]
  },
  {
    id: 4,
    type: "word-to-zhuyin",
    targetSymbol: "ㄇㄣˊ",
    speechTarget: "門",
    optionSpeechMap: {
      "ㄇㄣˊ": "門",
      "ㄕㄢ": "山",
      "ㄧㄤˊ": "羊",
      "ㄦˊ ㄗ˙": "兒子"
    },
    prompt: "単語「門 (mén / ドア・門)」の正しい注音表記はどれ？",
    options: ["ㄇㄣˊ", "ㄕㄢ", "ㄧㄤˊ", "ㄦˊ ㄗ˙"]
  },
  {
    id: 5,
    type: "fill-in-blank",
    targetSymbol: "ㄤ",
    speechTarget: "羊",
    prompt: "単語「羊 (yáng / ヒツジ)」の注音「 ㄧ___ˊ 」の空欄に入る後鼻音（-ng 響き）はどれ？",
    options: ["ㄤ", "ㄢ", "ㄣ", "ㄥ"]
  }
];

