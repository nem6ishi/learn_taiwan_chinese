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
  'ㄧ': '一',   // i
  'ㄨ': '五',   // u
  'ㄩ': '雨',   // yu
  'ㄅ': '包',   // b
  'ㄆ': '撲',   // p
  'ㄇ': '摸',   // m
  'ㄈ': '佛',   // f
  'ㄉ': '刀',   // d
  'ㄊ': '頭',   // t
  'ㄋ': '奶',   // n
  'ㄌ': '老',   // l
  'ㄍ': '哥',   // g
  'ㄎ': '客',   // k
  'ㄏ': '喝',   // h
  'ㄗ': '資',   // z
  'ㄘ': '次',   // c
  'ㄙ': '思',   // s
  'ㄓ': '知',   // zh
  'ㄔ': '吃',   // ch
  'ㄕ': '是',   // sh
  'ㄖ': '日',   // r
  'ㄐ': '家',   // j
  'ㄑ': '七',   // q
  'ㄒ': '西'    // x
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

window.VOWELS_STEP3_DATA = [
  {
    id: "vowel-an",
    symbol: "ㄢ",
    pinyin: "an",
    ipa: "[an]",
    katakana: "アン",
    typeTag: "前鼻音 (鼻音韻母)",
    title: "前鼻音「ㄢ」",
    originKanji: "冉 (rǎn)",
    originDesc: "「案」のアン。舌先を上の前歯の裏につけて「ん」を響かせます。",
    tipTitle: "舌先を前歯の裏につけてスッキリ「アン」！",
    tipDesc: "日本語の「案内(あんない)」の「ん」と同じ舌の位置で息を止めます。",
    color: "from-amber-500 to-orange-600",
    themeHex: "#D97706",
    examples: [
      { traditional: "山", zhuyin: "ㄕㄢ", pinyin: "shān", meaning: "やま (山)" },
      { traditional: "台灣", zhuyin: "ㄊㄞˊ ㄨㄢ", pinyin: "táiwān", meaning: "台湾" }
    ]
  },
  {
    id: "vowel-en",
    symbol: "ㄣ",
    pinyin: "en",
    ipa: "[ən]",
    katakana: "エン / ウン",
    typeTag: "前鼻音 (鼻音韻母)",
    title: "前鼻音「ㄣ」",
    originKanji: "隱の変形",
    originDesc: "口に力を入れず、曖昧な「エ/オ」から前歯の裏に舌をつけて「ん」。",
    tipTitle: "口の力を抜いて曖昧に「エン」！",
    tipDesc: "日本語の「因縁(いんえん)」の「ん」に近い感覚です。",
    color: "from-emerald-500 to-green-600",
    themeHex: "#059669",
    examples: [
      { traditional: "人", zhuyin: "ㄖㄣˊ", pinyin: "rén", meaning: "ひと (人)" },
      { traditional: "門", zhuyin: "ㄇㄣˊ", pinyin: "mén", meaning: "ドア / 門" }
    ]
  },
  {
    id: "vowel-ang",
    symbol: "ㄤ",
    pinyin: "ang",
    ipa: "[ɑŋ]",
    katakana: "アン (後鼻音)",
    typeTag: "後鼻音 (鼻音韻母)",
    title: "後鼻音「ㄤ」",
    originKanji: "尪 (wāng)",
    originDesc: "口を大きく開けたまま、舌の奥を喉につけて鼻へ響かせる深い「アン」。",
    tipTitle: "口を大きく開けたまま喉奥で「アン」！",
    tipDesc: "日本語の「案外(あんがい)」の「ん」のように舌先は浮かせたままです。",
    color: "from-blue-500 to-cyan-600",
    themeHex: "#2563EB",
    examples: [
      { traditional: "羊", zhuyin: "ㄧㄤˊ", pinyin: "yáng", meaning: "ヒツジ (羊)" },
      { traditional: "幫", zhuyin: "ㄅㄤ", pinyin: "bāng", meaning: "手伝う / 助ける" }
    ]
  },
  {
    id: "vowel-eng",
    symbol: "ㄥ",
    pinyin: "eng",
    ipa: "[ɤŋ]",
    katakana: "エン (後鼻音)",
    typeTag: "後鼻音 (鼻音韻母)",
    title: "後鼻音「ㄥ」",
    originKanji: "肱 (gōng)",
    originDesc: "曖昧な「エ/オ」から口を開けたまま喉奥を引いて鼻へ抜く音。",
    tipTitle: "喉奥を引いて響かせる「エン」！",
    tipDesc: "「風(fēng)」などの語尾で使われる深い鼻音です。",
    color: "from-indigo-500 to-purple-600",
    themeHex: "#4F46E5",
    examples: [
      { traditional: "風", zhuyin: "ㄈㄥ", pinyin: "fēng", meaning: "かぜ (風)" },
      { traditional: "朋", zhuyin: "ㄆㄥˊ", pinyin: "péng", meaning: "ともだち (朋友の朋)" }
    ]
  },
  {
    id: "vowel-er",
    symbol: "ㄦ",
    pinyin: "er",
    ipa: "[ɑɚ]",
    katakana: "アル (そり舌)",
    typeTag: "卷舌韻母 (そり舌)",
    title: "そり舌母音「ㄦ」",
    originKanji: "兒 (ér)",
    originDesc: "漢字「兒」に由来。舌先を上顎に向けて巻き上げながら発声します。",
    tipTitle: "舌をくるっと上顎へ巻き上げて「アル」！",
    tipDesc: "英語の「R」に近く、舌先をどこにも付けずに引きます。",
    color: "from-rose-500 to-pink-600",
    themeHex: "#E11D48",
    examples: [
      { traditional: "兒子", zhuyin: "ㄦˊ ㄗ˙", pinyin: "érzi", meaning: "むすこ (息子)" },
      { traditional: "耳", zhuyin: "ㄦˇ", pinyin: "ěr", meaning: "みみ (耳)" }
    ]
  }
];

// 1-4: 介音 (ㄧ ㄨ ㄩ)
window.VOWELS_STEP4_DATA = [
  {
    id: "vowel-i",
    symbol: "ㄧ",
    pinyin: "i / y",
    ipa: "[i]",
    katakana: "イー",
    typeTag: "介音 (結合韻母)",
    title: "介音「ㄧ」",
    originKanji: "一 (yī)",
    originDesc: "数字の「一」の横棒から。口を横に一文字に引っ張って「イー」。単独では「yi」と表記。",
    tipTitle: "口を横にキーッと引き伸ばして「イー」！",
    tipDesc: "日本語の「イ」よりも強く左右に口角を引っ張るのがポイントです。",
    color: "from-sky-500 to-blue-600",
    themeHex: "#0284C7",
    examples: [
      { traditional: "一", zhuyin: "ㄧ", pinyin: "yī", meaning: "数字の「1」" },
      { traditional: "衣服", zhuyin: "ㄧ ㄈㄨˊ", pinyin: "yīfú", meaning: "ふく (衣服)" }
    ]
  },
  {
    id: "vowel-u",
    symbol: "ㄨ",
    pinyin: "u / w",
    ipa: "[u]",
    katakana: "ウー",
    typeTag: "介音 (結合韻母)",
    title: "介音「ㄨ」",
    originKanji: "五の古代文字",
    originDesc: "「五」の原字に由来。唇を前にキュッと突き出して丸く「ウー」。単独では「wu」と表記。",
    tipTitle: "タコのように唇を前に突き出して「ウー」！",
    tipDesc: "日本語のフラットな「ウ」と違い、丸く小さな穴を作って前に突き出します。",
    color: "from-amber-500 to-orange-600",
    themeHex: "#D97706",
    examples: [
      { traditional: "五", zhuyin: "ㄨˇ", pinyin: "wǔ", meaning: "数字の「5」" },
      { traditional: "屋子", zhuyin: "ㄨ ㄗ˙", pinyin: "wūzi", meaning: "へや / いえ (屋子)" }
    ]
  },
  {
    id: "vowel-yu",
    symbol: "ㄩ",
    pinyin: "ü / yu",
    ipa: "[y]",
    katakana: "ユー (ユィ)",
    typeTag: "介音 (結合韻母)",
    title: "介音「ㄩ」",
    originKanji: "凵 (kǎn / うけばこ)",
    originDesc: "器の形に由来。「イ」と言いながら唇だけを「ウ」の丸さにする音。単独では「yu」と表記。",
    tipTitle: "「イ」の舌で口だけ口笛の口「ユー」！",
    tipDesc: "舌の位置は「イ」のまま、唇だけを丸く絞って「ユィ/ユー」と発声します。",
    color: "from-emerald-500 to-teal-600",
    themeHex: "#059669",
    examples: [
      { traditional: "雨", zhuyin: "ㄩˇ", pinyin: "yǔ", meaning: "あめ (雨)" },
      { traditional: "魚", zhuyin: "ㄩˊ", pinyin: "yú", meaning: "さかな (魚)" }
    ]
  }
];

// 1-5: 舌根音（ㄍㄎㄏ）＋ 歯茎音（ㄗㄘㄙ）＋ そり舌音（ㄓㄔㄕㄖ）
window.VOWELS_STEP5_DATA = [
  {
    id: "vowel-g",
    symbol: "ㄍ",
    pinyin: "g",
    ipa: "[k]",
    katakana: "ガ / ゴ",
    typeTag: "舌根音 (無気音)",
    title: "舌根音「ㄍ」",
    originKanji: "巛 (川の形)",
    originDesc: "「川」の形に由来。舌の奥を喉につけてから息を出さずに離します。",
    tipTitle: "【無気音】喉奥から息を出さずに「ガ」！",
    tipDesc: "日本語の「カ行」に近いですが、息を吹き出さない静かな音です。",
    color: "from-blue-500 to-indigo-600",
    themeHex: "#2563EB",
    examples: [
      { traditional: "哥", zhuyin: "ㄍㄜ", pinyin: "gē", meaning: "お兄さん (哥哥)" },
      { traditional: "高", zhuyin: "ㄍㄠ", pinyin: "gāo", meaning: "たかい (高)" }
    ]
  },
  {
    id: "vowel-k",
    symbol: "ㄎ",
    pinyin: "k",
    ipa: "[kʰ]",
    katakana: "カ / コ",
    typeTag: "舌根音 (有気音)",
    title: "舌根音「ㄎ」",
    originKanji: "考 (kǎo)",
    originDesc: "漢字「考」の上部に由来。喉の奥から強く息を吹き出します。",
    tipTitle: "【有気音】喉奥から息を強く破裂させて「カーッ！」",
    tipDesc: "ティッシュが大きく揺れるほど、喉から勢いよく呼吸を吐き出します。",
    color: "from-amber-500 to-yellow-600",
    themeHex: "#D97706",
    examples: [
      { traditional: "客", zhuyin: "ㄎㄜˋ", pinyin: "kè", meaning: "きゃく (客人)" },
      { traditional: "開", zhuyin: "ㄎㄞ", pinyin: "kāi", meaning: "あける (開門)" }
    ]
  },
  {
    id: "vowel-h",
    symbol: "ㄏ",
    pinyin: "h",
    ipa: "[x]",
    katakana: "ハ / ホ",
    typeTag: "舌根音 (擦音)",
    title: "舌根音「ㄏ」",
    originKanji: "厂 (崖の形)",
    originDesc: "崖の形に由来。喉の奥を軽く狭めて息をこすり出します。",
    tipTitle: "寒い日に手へ「ハァ〜」と息を吹きかける音！",
    tipDesc: "日本語の「ハ行」よりも喉の奥から息を擦り出させて「ハー」。",
    color: "from-emerald-500 to-green-600",
    themeHex: "#059669",
    examples: [
      { traditional: "好", zhuyin: "ㄏㄠˇ", pinyin: "hǎo", meaning: "よい / すき (好)" },
      { traditional: "喝", zhuyin: "ㄏㄜ", pinyin: "hē", meaning: "のむ (喝水)" }
    ]
  },
  {
    id: "vowel-z",
    symbol: "ㄗ",
    pinyin: "z",
    ipa: "[ts]",
    katakana: "ズ / ヅ",
    typeTag: "平舌音 (無気音)",
    title: "平舌音「ㄗ」",
    originKanji: "節 (jié)",
    originDesc: "漢字「節」の古代文字に由来。舌先を上の前歯の裏につけて息をためます。",
    tipTitle: "【無気音】舌先を前歯裏につけて息を出さずに「ズ」！",
    tipDesc: "「正座」の「座(ざ/づ)」のように舌先をリラックスさせて発音します。",
    color: "from-purple-500 to-pink-600",
    themeHex: "#9333EA",
    examples: [
      { traditional: "早", zhuyin: "ㄗㄠˇ", pinyin: "zǎo", meaning: "おはよう (早安)" },
      { traditional: "子", zhuyin: "ㄗ˙", pinyin: "zi", meaning: "こども / 語尾 (屋子)" }
    ]
  },
  {
    id: "vowel-c",
    symbol: "ㄘ",
    pinyin: "c",
    ipa: "[tsʰ]",
    katakana: "ツ",
    typeTag: "平舌音 (有気音)",
    title: "平舌音「ㄘ」",
    originKanji: "七 (qī)",
    originDesc: "数字「七」の古文字に由来。舌先から息を強く弾け出させます。",
    tipTitle: "【有気音】舌先から強烈に息を弾き出させて「ツッ！」",
    tipDesc: "日本語の「ツ」に鋭い強い息を乗せて発音します。",
    color: "from-rose-500 to-red-600",
    themeHex: "#E11D48",
    examples: [
      { traditional: "菜", zhuyin: "ㄘㄞˋ", pinyin: "cài", meaning: "りょうり / やさい (菜)" },
      { traditional: "茶", zhuyin: "ㄘㄚˊ", pinyin: "chá", meaning: "おちゃ (珍珠奶茶)" }
    ]
  },
  {
    id: "vowel-s",
    symbol: "ㄙ",
    pinyin: "s",
    ipa: "[s]",
    katakana: "ス / サ",
    typeTag: "平舌音 (擦音)",
    title: "平舌音「ㄙ」",
    originKanji: "私 (sī)",
    originDesc: "「私」の原字に由来。歯の隙間から息をすべらせて「スー」。",
    tipTitle: "前歯の隙間から息を滑らせて「スー」！",
    tipDesc: "日本語の「サ行/ス」と同じ要領で静かに息を擦り出します。",
    color: "from-teal-500 to-cyan-600",
    themeHex: "#0D9488",
    examples: [
      { traditional: "三", zhuyin: "ㄙㄢ", pinyin: "sān", meaning: "数字の「3」" },
      { traditional: "四", zhuyin: "ㄙˋ", pinyin: "sì", meaning: "数字の「4」" }
    ]
  },
  {
    id: "vowel-zh",
    symbol: "ㄓ",
    pinyin: "zh",
    ipa: "[tʂ]",
    katakana: "ヂ / ヂュ",
    typeTag: "翹舌音 (そり舌・無気音)",
    title: "そり舌音「ㄓ」",
    originKanji: "之 (zhī)",
    originDesc: "漢字「之」の古文字に由来。舌先を軽く上顎へ丸めます。",
    tipTitle: "【台湾マイルド】舌を上顎へ軽く丸めて息を出さずに「ヂ」！",
    tipDesc: "台湾華語では大陸ほど強く巻かず、舌を軽く引いて自然に発音するのがコツです。",
    color: "from-orange-500 to-amber-600",
    themeHex: "#EA580C",
    examples: [
      { traditional: "知道", zhuyin: "ㄓ ㄉㄠˋ", pinyin: "zhīdào", meaning: "しっている (知道)" },
      { traditional: "中", zhuyin: "ㄓㄨㄥ", pinyin: "zhōng", meaning: "なか (台灣)" }
    ]
  },
  {
    id: "vowel-ch",
    symbol: "ㄔ",
    pinyin: "ch",
    ipa: "[tʂʰ]",
    katakana: "チ / チュ",
    typeTag: "翹舌音 (そり舌・有気音)",
    title: "そり舌音「ㄔ」",
    originKanji: "彳 (行の左半分)",
    originDesc: "「行」の左側の形に由来。丸めた舌先から強い息を出します。",
    tipTitle: "【有気音】丸めた舌先から息を噴出させて「チッ！」",
    tipDesc: "食べる「吃 (chī)」などで毎日使う非常に重要な音です。",
    color: "from-red-500 to-rose-600",
    themeHex: "#DC2626",
    examples: [
      { traditional: "吃", zhuyin: "ㄔ", pinyin: "chī", meaning: "たべる (吃飯)" },
      { traditional: "車", zhuyin: "ㄔㄜ", pinyin: "chē", meaning: "くるま (計程車)" }
    ]
  },
  {
    id: "vowel-sh",
    symbol: "ㄕ",
    pinyin: "sh",
    ipa: "[ʂ]",
    katakana: "シ / シュ",
    typeTag: "翹舌音 (そり舌・擦音)",
    title: "そり舌音「ㄕ」",
    originKanji: "尸 (しかばね)",
    originDesc: "漢字「尸」の形に由来。丸めた舌と上顎の隙間から息をすべらせます。",
    tipTitle: "丸めた舌の隙間から「シー」！",
    tipDesc: "「是 (shì / 〜です)」や「山 (shān)」で毎日使う超重要音。",
    color: "from-sky-500 to-indigo-600",
    themeHex: "#0284C7",
    examples: [
      { traditional: "是", zhuyin: "ㄕˋ", pinyin: "shì", meaning: "〜です (我是)" },
      { traditional: "山", zhuyin: "ㄕㄢ", pinyin: "shān", meaning: "やま (山)" }
    ]
  },
  {
    id: "vowel-r",
    symbol: "ㄖ",
    pinyin: "r",
    ipa: "[ʐ]",
    katakana: "リ / ル",
    typeTag: "翹舌音 (そり舌・濁音)",
    title: "そり舌音「ㄖ」",
    originKanji: "日 (rì)",
    originDesc: "漢字「日」の象形に由来。丸めた舌を震わせながら声を響かせます。",
    tipTitle: "英語のRのように舌を引いて声を響かせる「リー」！",
    tipDesc: "「人 (rén)」や「日 (rì)」などで使う独特な滑らかさを持つ音です。",
    color: "from-yellow-500 to-amber-600",
    themeHex: "#EAB308",
    examples: [
      { traditional: "日", zhuyin: "ㄖˋ", pinyin: "rì", meaning: "ひ / にち (日本人)" },
      { traditional: "人", zhuyin: "ㄖㄣˊ", pinyin: "rén", meaning: "ひと (台灣人)" }
    ]
  }
];

// 1-6: 舌面音（ㄐㄑㄒ）＋ 台湾超頻出日常フレーズ (注音符号全37文字コンプリート!)
window.VOWELS_STEP6_DATA = [
  {
    id: "vowel-j",
    symbol: "ㄐ",
    pinyin: "j",
    ipa: "[tɕ]",
    katakana: "ジ / ヂュ",
    typeTag: "舌面音 (無気音)",
    title: "舌面音「ㄐ」",
    originKanji: "糾 (jiū / たばねる)",
    originDesc: "漢字「糾」の原字の形に由来。舌面を硬口蓋に密着させて息を出さずに離します。",
    tipTitle: "【無気音】舌を上顎につけて息を出さずに「ジ/ヂュ」！",
    tipDesc: "「家 (jiā)」や名前をたずねる「叫 (jiào)」で使う基本子音です。",
    color: "from-cyan-500 to-blue-600",
    themeHex: "#0891B2",
    examples: [
      { traditional: "家", zhuyin: "ㄐㄧㄚ", pinyin: "jiā", meaning: "いえ / マイホーム (我家)" },
      { traditional: "叫", zhuyin: "ㄐㄧㄠˋ", pinyin: "jiào", meaning: "〜という名前である (我叫〜)" }
    ]
  },
  {
    id: "vowel-q",
    symbol: "ㄑ",
    pinyin: "q",
    ipa: "[tɕʰ]",
    katakana: "チ / チュ",
    typeTag: "舌面音 (有気音)",
    title: "舌面音「ㄑ」",
    originKanji: "七 (qī) の草書体",
    originDesc: "数字の「七」の草書体に由来。密着させた舌面から一気に息を爆発させます。",
    tipTitle: "【有気音】舌面から強烈に息を弾き出させて「チッ！」",
    tipDesc: "「去 (qù / 行く)」や丁寧な「請 (qǐng / 〜してください)」の超重要音です。",
    color: "from-teal-500 to-emerald-600",
    themeHex: "#0D9488",
    examples: [
      { traditional: "去", zhuyin: "ㄑㄩˋ", pinyin: "qù", meaning: "いく (要去夜市)" },
      { traditional: "請", zhuyin: "ㄑㄧㄥˇ", pinyin: "qǐng", meaning: "〜してください / どうぞ (請進)" }
    ]
  },
  {
    id: "vowel-x",
    symbol: "ㄒ",
    pinyin: "x",
    ipa: "[ɕ]",
    katakana: "シ / シュ",
    typeTag: "舌面音 (擦音)",
    title: "舌面音「ㄒ」",
    originKanji: "丅 (下)",
    originDesc: "漢字「下」の古字の形に由来。舌面と上顎の狭い隙間から息を滑らせます。",
    tipTitle: "舌面と上顎の隙間から「シー」！",
    tipDesc: "台湾で最も大切な魔法の言葉「謝謝 (xièxie / ありがとう)」の必須子音！",
    color: "from-indigo-500 to-purple-600",
    themeHex: "#4F46E5",
    examples: [
      { traditional: "謝謝", zhuyin: "ㄒㄧㄝˋ ㄒㄧㄝ˙", pinyin: "xièxie", meaning: "ありがとう" },
      { traditional: "想", zhuyin: "ㄒㄧㄤˇ", pinyin: "xiǎng", meaning: "〜したい / おもう (我想吃)" }
    ]
  }
];

// 1-7: 5つの声調（四声＋軽声）＆ 結合音 ＆ 注音総合まとめ
window.TONES_STEP7_DATA = [
  {
    id: "tone-1",
    symbol: "ˉ",
    name: "第一声 (平調)",
    pitch: "55 (高いままキープ)",
    desc: "高い声をまっすぐ平らに伸ばす音。注音符号では記号を書かず無表記とします。",
    exampleWord: "媽",
    exampleZhuyin: "ㄇㄚ",
    examplePinyin: "mā",
    exampleMeaning: "お母さん"
  },
  {
    id: "tone-2",
    symbol: "ˊ",
    name: "第二声 (升調)",
    pitch: "35 (一気に引き上げる)",
    desc: "「えっ！？」と驚いたときのように、下から上へキュッと声を急上昇させます。文字の右上に「ˊ」を書きます。",
    exampleWord: "麻",
    exampleZhuyin: "ㄇㄚˊ",
    examplePinyin: "má",
    exampleMeaning: "あさ (麻) / しびれる"
  },
  {
    id: "tone-3",
    symbol: "ˇ",
    name: "第三声 (轉調 / 低音)",
    pitch: "214 (低いまま抑える)",
    desc: "声を低く抑え込む音。台湾の日常会話では低く低音をキープする「半三声」が主流です。文字の右上に「ˇ」を書きます。",
    exampleWord: "馬",
    exampleZhuyin: "ㄇㄚˇ",
    examplePinyin: "mǎ",
    exampleMeaning: "うま (馬)"
  },
  {
    id: "tone-4",
    symbol: "ˋ",
    name: "第四声 (降調)",
    pitch: "51 (上から一気に急降下)",
    desc: "カラスが「カーッ！」と鳴くように、上から下へ勢いよく息を叩き落とします。文字の右上に「ˋ」を書きます。",
    exampleWord: "罵",
    exampleZhuyin: "ㄇㄚˋ",
    examplePinyin: "mà",
    exampleMeaning: "しかる / ののしる"
  },
  {
    id: "tone-5",
    symbol: "˙",
    name: "軽声 (輕聲)",
    pitch: "軽くて短い音",
    desc: "跳ねるように軽く短く添える音。注音符号では**文字の上（頭の上）に黒丸「˙」**を添えます。",
    exampleWord: "嗎",
    exampleZhuyin: "ㄇㄚ˙",
    examplePinyin: "ma",
    exampleMeaning: "〜ですか？ (疑問)"
  }
];

// ==================== クイズデータ（ステップ1-1〜1-9 ＆ 2-1 統一ナンバリング） ====================

// STEP 1-1 確認クイズ: 5つの声調 (全5問)
window.VOWELS_QUIZ_QUESTIONS_1_1 = [
  { id: 1, type: "audio", targetSymbol: "媽 (ㄇㄚ)", speechTarget: "媽", prompt: "再生された音声「第一声 (平調)」の単語を選んでください", options: ["媽 (ㄇㄚ)", "麻 (ㄇㄚˊ)", "馬 (ㄇㄚˇ)", "罵 (ㄇㄚˋ)"] },
  { id: 2, type: "audio", targetSymbol: "麻 (ㄇㄚˊ)", speechTarget: "麻", prompt: "再生された「えっ！？」と急上昇する「第二声 (升調)」の単語を選んでください", options: ["麻 (ㄇㄚˊ)", "媽 (ㄇㄚ)", "馬 (ㄇㄚˇ)", "罵 (ㄇㄚˋ)"] },
  { id: 3, type: "audio", targetSymbol: "馬 (ㄇㄚˇ)", speechTarget: "馬", prompt: "再生された声を低く抑える「第三声 (轉調)」の単語を選んでください", options: ["馬 (ㄇㄚˇ)", "媽 (ㄇㄚ)", "麻 (ㄇㄚˊ)", "罵 (ㄇㄚˋ)"] },
  { id: 4, type: "audio", targetSymbol: "罵 (ㄇㄚˋ)", speechTarget: "罵", prompt: "再生された上から下へ急降下する「第四声 (降調)」の単語を選んでください", options: ["罵 (ㄇㄚˋ)", "媽 (ㄇㄚ)", "麻 (ㄇㄚˊ)", "罵 (ㄇㄚˇ)"] },
  { id: 5, type: "audio", targetSymbol: "嗎 (ㄇㄚ˙)", speechTarget: "嗎", prompt: "再生された跳ねるように短く添える「軽声 (輕聲)」の単語を選んでください", options: ["嗎 (ㄇㄚ˙)", "媽 (ㄇㄚ)", "麻 (ㄇㄚˊ)", "罵 (ㄇㄚˋ)"] }
];

// STEP 1-2 確認クイズ: 唇音＋単母音 (全8文字・全10問)
window.VOWELS_QUIZ_QUESTIONS_1_2 = [
  { id: 1, type: "audio", targetSymbol: "ㄅ", speechTarget: "ㄅ", prompt: "再生された音声に当てはまる無気唇音を選んでください", options: ["ㄅ", "ㄆ", "ㄇ", "ㄈ"] },
  { id: 2, type: "audio", targetSymbol: "ㄆ", speechTarget: "ㄆ", prompt: "再生された音声に当てはまる有気唇音（息を強く吐く音）を選んでください", options: ["ㄆ", "ㄅ", "ㄇ", "ㄈ"] },
  { id: 3, type: "audio", targetSymbol: "ㄇ", speechTarget: "ㄇ", prompt: "再生された音声に当てはまる鼻音唇音を選んでください", options: ["ㄇ", "ㄈ", "ㄅ", "ㄆ"] },
  { id: 4, type: "audio", targetSymbol: "ㄈ", speechTarget: "ㄈ", prompt: "再生された音声に当てはまる唇歯音（前歯を当てる音）を選んでください", options: ["ㄈ", "ㄇ", "ㄅ", "ㄆ"] },
  { id: 5, type: "audio", targetSymbol: "ㄚ", speechTarget: "ㄚ", prompt: "再生された音声に当てはまる単母音「a」を選んでください", options: ["ㄚ", "ㄛ", "ㄜ", "ㄝ"] },
  { id: 6, type: "audio", targetSymbol: "ㄛ", speechTarget: "ㄛ", prompt: "再生された音声に当てはまる単母音「o」を選んでください", options: ["ㄛ", "ㄚ", "ㄜ", "ㄝ"] },
  { id: 7, type: "audio", targetSymbol: "ㄜ", speechTarget: "ㄜ", prompt: "再生された音声に当てはまる単母音「e」を選んでください", options: ["ㄜ", "ㄛ", "ㄚ", "ㄝ"] },
  { id: 8, type: "audio", targetSymbol: "ㄝ", speechTarget: "ㄝ", prompt: "再生された音声に当てはまる単母音「eh」を選んでください", options: ["ㄝ", "ㄜ", "ㄛ", "ㄚ"] },
  { id: 9, type: "zhuyin-to-word", targetSymbol: "爸爸", speechTarget: "爸爸", prompt: "注音符号「ㄅㄚˋ ㄅㄚ˙」に対応する単語はどれ？", options: ["爸爸", "婆婆", "摸", "八"] },
  {
    id: 10, type: "word-to-zhuyin", targetSymbol: "ㄆㄛˊ ㄆㄛ˙", speechTarget: "婆婆",
    optionSpeechMap: { "ㄆㄛˊ ㄆㄛ˙": "婆婆", "ㄅㄚˋ ㄅㄚ˙": "爸爸", "ㄇㄚ": "媽", "ㄈㄚ": "發" },
    prompt: "単語「婆婆 (pópo / おばあさん)」の正しい注音表記はどれ？", options: ["ㄆㄛˊ ㄆㄛ˙", "ㄅㄚˋ ㄅㄚ˙", "ㄇㄚ", "ㄈㄚ"]
  }
];

// STEP 1-3 確認クイズ: 舌尖音＋二重母音 (全8文字・全10問)
window.VOWELS_QUIZ_QUESTIONS_1_3 = [
  { id: 1, type: "audio", targetSymbol: "ㄉ", speechTarget: "ㄉ", prompt: "再生された音声「d (ド)」を選んでください", options: ["ㄉ", "ㄊ", "ㄋ", "ㄌ"] },
  { id: 2, type: "audio", targetSymbol: "ㄊ", speechTarget: "ㄊ", prompt: "再生された音声「t (ト)」を選んでください", options: ["ㄊ", "ㄉ", "ㄋ", "ㄌ"] },
  { id: 3, type: "audio", targetSymbol: "ㄋ", speechTarget: "ㄋ", prompt: "再生された音声「n (ノ)」を選んでください", options: ["ㄋ", "ㄌ", "ㄉ", "ㄊ"] },
  { id: 4, type: "audio", targetSymbol: "ㄌ", speechTarget: "ㄌ", prompt: "再生された音声「l (ロ)」を選んでください", options: ["ㄌ", "ㄋ", "ㄉ", "ㄊ"] },
  { id: 5, type: "audio", targetSymbol: "ㄞ", speechTarget: "ㄞ", prompt: "再生された二重母音「ai (アイ)」を選んでください", options: ["ㄞ", "ㄟ", "ㄠ", "ㄡ"] },
  { id: 6, type: "audio", targetSymbol: "ㄟ", speechTarget: "ㄟ", prompt: "再生された二重母音「ei (エイ)」を選んでください", options: ["ㄟ", "ㄞ", "ㄠ", "ㄡ"] },
  { id: 7, type: "audio", targetSymbol: "ㄠ", speechTarget: "ㄠ", prompt: "再生された二重母音「ao (アオ)」を選んでください", options: ["ㄠ", "ㄡ", "ㄞ", "ㄟ"] },
  { id: 8, type: "audio", targetSymbol: "ㄡ", speechTarget: "ㄡ", prompt: "再生された二重母音「ou (オウ)」を選んでください", options: ["ㄡ", "ㄠ", "ㄞ", "ㄟ"] },
  { id: 9, type: "zhuyin-to-word", targetSymbol: "大", speechTarget: "大", prompt: "注音「ㄉㄚˋ」に対応する単語はどれ？", options: ["大", "他", "奶", "老"] },
  { id: 10, type: "zhuyin-to-word", targetSymbol: "老", speechTarget: "老", prompt: "注音「ㄌㄠˇ」に対応する単語はどれ？", options: ["老", "大", "他", "奶"] }
];

// STEP 1-4 確認クイズ: そり舌母音＆鼻音 (全5文字・全10問)
window.VOWELS_QUIZ_QUESTIONS_1_4 = [
  { id: 1, type: "audio", targetSymbol: "ㄢ", speechTarget: "ㄢ", prompt: "再生された前鼻音「an (アン)」を選んでください", options: ["ㄢ", "ㄣ", "ㄤ", "ㄥ"] },
  { id: 2, type: "audio", targetSymbol: "ㄣ", speechTarget: "ㄣ", prompt: "再生された前鼻音「en (エン)」を選んでください", options: ["ㄣ", "ㄢ", "ㄤ", "ㄥ"] },
  { id: 3, type: "audio", targetSymbol: "ㄤ", speechTarget: "ㄤ", prompt: "再生された後鼻音「ang (アン鼻音)」を選んでください", options: ["ㄤ", "ㄥ", "ㄢ", "ㄣ"] },
  { id: 4, type: "audio", targetSymbol: "ㄥ", speechTarget: "ㄥ", prompt: "再生された後鼻音「eng (エン鼻音)」を選んでください", options: ["ㄥ", "ㄤ", "ㄢ", "ㄣ"] },
  { id: 5, type: "audio", targetSymbol: "ㄦ", speechTarget: "ㄦ", prompt: "再生されたそり舌母音「er (アル)」を選んでください", options: ["ㄦ", "ㄢ", "ㄣ", "ㄤ"] },
  { id: 6, type: "zhuyin-to-word", targetSymbol: "羊", speechTarget: "羊", prompt: "注音「ㄧㄤˊ」に対応する単語はどれ？", options: ["羊", "山", "人", "門"] },
  { id: 7, type: "word-to-zhuyin", targetSymbol: "ㄇㄣˊ", speechTarget: "門", optionSpeechMap: { "ㄇㄣˊ": "門", "ㄕㄢ": "山", "ㄧㄤˊ": "羊", "ㄦˊ ㄗ˙": "兒子" }, prompt: "単語「門 (mén / ドア)」の注音表記はどれ？", options: ["ㄇㄣˊ", "ㄕㄢ", "ㄧㄤˊ", "ㄦˊ ㄗ˙"] },
  { id: 8, type: "zhuyin-to-word", targetSymbol: "山", speechTarget: "山", prompt: "注音「ㄕㄢ」に対応する単語はどれ？", options: ["山", "羊", "人", "門"] },
  { id: 9, type: "zhuyin-to-word", targetSymbol: "人", speechTarget: "人", prompt: "注音「ㄖㄣˊ」に対応する単語はどれ？", options: ["人", "山", "羊", "門"] },
  { id: 10, type: "word-to-zhuyin", targetSymbol: "ㄦˊ ㄗ˙", speechTarget: "兒子", optionSpeechMap: { "ㄦˊ ㄗ˙": "兒子", "ㄇㄣˊ": "門", "ㄕㄢ": "山", "ㄧㄤˊ": "羊" }, prompt: "単語「兒子 (érzi / 息子)」の注音表記はどれ？", options: ["ㄦˊ ㄗ˙", "ㄇㄣˊ", "ㄕㄢ", "ㄧㄤˊ"] }
];

// STEP 1-5 確認クイズ: 介音3文字 (ㄧ ㄨ ㄩ) (全8問)
window.VOWELS_QUIZ_QUESTIONS_1_5 = [
  { id: 1, type: "audio", targetSymbol: "ㄧ", speechTarget: "ㄧ", prompt: "再生された介音「i (イー / 左右に引く音)」を選んでください", options: ["ㄧ", "ㄨ", "ㄩ", "ㄚ"] },
  { id: 2, type: "audio", targetSymbol: "ㄨ", speechTarget: "ㄨ", prompt: "再生された介音「u (ウー / 唇を丸く突き出す音)」を選んでください", options: ["ㄨ", "ㄧ", "ㄩ", "ㄛ"] },
  { id: 3, type: "audio", targetSymbol: "ㄩ", speechTarget: "ㄩ", prompt: "再生された介音「ü (ユー/ユィ / イの舌で丸い口)」を選んでください", options: ["ㄩ", "ㄧ", "ㄨ", "ㄩㄝ"] },
  { id: 4, type: "zhuyin-to-word", targetSymbol: "一", speechTarget: "一", prompt: "注音「ㄧ」に対応する数字の単語はどれ？", options: ["一", "五", "雨", "魚"] },
  { id: 5, type: "zhuyin-to-word", targetSymbol: "五", speechTarget: "五", prompt: "注音「ㄨˇ」に対応する数字の単語はどれ？", options: ["五", "一", "屋子", "雨"] },
  { id: 6, type: "zhuyin-to-word", targetSymbol: "雨", speechTarget: "雨", prompt: "注音「ㄩˇ」に対応する単語はどれ？", options: ["雨", "魚", "五", "一"] },
  {
    id: 7, type: "word-to-zhuyin", targetSymbol: "ㄧ ㄈㄨˊ", speechTarget: "衣服",
    optionSpeechMap: { "ㄧ ㄈㄨˊ": "衣服", "ㄨ ㄗ˙": "屋子", "ㄩˊ": "魚", "ㄨˇ": "五" },
    prompt: "単語「衣服 (yīfú / ふく)」の正しい注音表記はどれ？", options: ["ㄧ ㄈㄨˊ", "ㄨ ㄗ˙", "ㄩˊ", "ㄨˇ"]
  },
  {
    id: 8, type: "word-to-zhuyin", targetSymbol: "ㄩˊ", speechTarget: "魚",
    optionSpeechMap: { "ㄩˊ": "魚", "ㄩˇ": "雨", "ㄨˇ": "五", "ㄧ": "一" },
    prompt: "単語「魚 (yú / さかな)」の正しい注音表記はどれ？", options: ["ㄩˊ", "ㄩˇ", "ㄨˇ", "ㄧ"]
  }
];

// STEP 1-6 確認クイズ: 舌根音（ㄍㄎㄏ）＋ 平舌音（ㄗㄘㄙ） (全8問)
window.VOWELS_QUIZ_QUESTIONS_1_6 = [
  { id: 1, type: "audio", targetSymbol: "ㄍ", speechTarget: "ㄍ", prompt: "再生された音声に当てはまる舌根音（無気音）を選んでください", options: ["ㄍ", "ㄎ", "ㄏ", "ㄗ"] },
  { id: 2, type: "audio", targetSymbol: "ㄎ", speechTarget: "ㄎ", prompt: "再生された音声に当てはまる舌根音（有気音）を選んでください", options: ["ㄎ", "ㄍ", "ㄏ", "ㄘ"] },
  { id: 3, type: "audio", targetSymbol: "ㄏ", speechTarget: "ㄏ", prompt: "再生された音声「ハー」に当てはまる文字を選んでください", options: ["ㄏ", "ㄈ", "ㄙ", "ㄎ"] },
  { id: 4, type: "audio", targetSymbol: "ㄗ", speechTarget: "ㄗ", prompt: "再生された音声（平舌音・無気音）に当てはまる文字を選んでください", options: ["ㄗ", "ㄘ", "ㄙ", "ㄍ"] },
  { id: 5, type: "audio", targetSymbol: "ㄘ", speechTarget: "ㄘ", prompt: "再生された音声「ツッ（有気音）」に当てはまる文字を選んでください", options: ["ㄘ", "ㄗ", "ㄙ", "ㄎ"] },
  { id: 6, type: "audio", targetSymbol: "ㄙ", speechTarget: "ㄙ", prompt: "再生された音声「スー（擦音）」に当てはまる文字を選んでください", options: ["ㄙ", "ㄗ", "ㄘ", "ㄏ"] },
  {
    id: 7, type: "zhuyin-to-word", targetSymbol: "高", speechTarget: "高",
    prompt: "「高い (gāo)」を意味する注音「ㄍㄠ」に対応する単語はどれ？", options: ["高", "開", "好", "三"]
  },
  {
    id: 8, type: "word-to-zhuyin", targetSymbol: "ㄗㄠˇ ㄢ", speechTarget: "早安",
    optionSpeechMap: { "ㄗㄠˇ ㄢ": "早安", "ㄎㄞ ㄇㄣˊ": "開門", "ㄏㄠˇ": "好", "ㄙㄢ": "三" },
    prompt: "「早安 (zǎo'ān / おはよう)」の正確な注音表記はどれ？", options: ["ㄗㄠˇ ㄢ", "ㄎㄞ ㄇㄣˊ", "ㄏㄠˇ", "ㄙㄢ"]
  }
];

// STEP 1-7 確認クイズ: そり舌音（ㄓㄔㄕㄖ） (全6問)
window.VOWELS_QUIZ_QUESTIONS_1_7 = [
  { id: 1, type: "audio", targetSymbol: "ㄓ", speechTarget: "ㄓ", prompt: "再生された音声（そり舌音・無気音）を選んでください", options: ["ㄓ", "ㄔ", "ㄕ", "ㄖ"] },
  { id: 2, type: "audio", targetSymbol: "ㄔ", speechTarget: "ㄔ", prompt: "再生された音声「チッ（そり舌・有気音）」を選んでください", options: ["ㄔ", "ㄓ", "ㄕ", "ㄖ"] },
  { id: 3, type: "audio", targetSymbol: "ㄕ", speechTarget: "ㄕ", prompt: "再生された音声「シー（そり舌・擦音）」を選んでください", options: ["ㄕ", "ㄓ", "ㄔ", "ㄖ"] },
  { id: 4, type: "audio", targetSymbol: "ㄖ", speechTarget: "ㄖ", prompt: "再生された音声「リー（そり舌・濁音）」を選んでください", options: ["ㄖ", "ㄌ", "ㄕ", "ㄓ"] },
  {
    id: 5, type: "zhuyin-to-word", targetSymbol: "吃", speechTarget: "吃",
    prompt: "注音「ㄔ」に対応する「食べる」という意味の台湾単語はどれ？", options: ["吃", "是", "人", "水"]
  },
  {
    id: 6, type: "word-to-zhuyin", targetSymbol: "ㄓㄣ ㄓㄨ", speechTarget: "珍珠",
    optionSpeechMap: { "ㄓㄣ ㄓㄨ": "珍珠", "ㄕˋ": "是", "ㄖㄣˊ": "人", "ㄔ": "吃" },
    prompt: "単語「珍珠 (zhēnzhū / タピオカ)」の正しい注音表記はどれ？", options: ["ㄓㄣ ㄓㄨ", "ㄕˋ", "ㄖㄣˊ", "ㄔ"]
  }
];

// STEP 1-8 確認クイズ: 舌面音（ㄐㄑㄒ）＋ 日常フレーズ (全8問)
window.VOWELS_QUIZ_QUESTIONS_1_8 = [
  { id: 1, type: "audio", targetSymbol: "ㄐ", speechTarget: "ㄐ", prompt: "再生された音声に当てはまる舌面音（無気音）を選んでください", options: ["ㄐ", "ㄑ", "ㄒ", "ㄍ"] },
  { id: 2, type: "audio", targetSymbol: "ㄑ", speechTarget: "ㄑ", prompt: "再生された音声「チッ（有気音）」を選んでください", options: ["ㄑ", "ㄐ", "ㄒ", "ㄎ"] },
  { id: 3, type: "audio", targetSymbol: "ㄒ", speechTarget: "ㄒ", prompt: "再生された音声「シー（擦音）」を選んでください", options: ["ㄒ", "ㄐ", "ㄑ", "ㄏ"] },
  {
    id: 4, type: "zhuyin-to-word", targetSymbol: "謝謝", speechTarget: "謝謝",
    prompt: "台湾で1日何十回も使う感謝の言葉「謝謝 (xièxie)」に対応する注音表記「ㄒㄧㄝˋ ㄒㄧㄝ˙」の意味はどれ？", options: ["謝謝", "請", "去", "家"]
  },
  {
    id: 5, type: "zhuyin-to-word", targetSymbol: "請", speechTarget: "請",
    prompt: "「〜してください / どうぞ」を意味する注音「ㄑㄧㄥˇ」に対応する言葉はどれ？", options: ["請", "謝謝", "去", "叫"]
  },
  {
    id: 6, type: "word-to-zhuyin", targetSymbol: "ㄑㄩˋ", speechTarget: "去",
    optionSpeechMap: { "ㄑㄩˋ": "去", "ㄑㄧㄥˇ": "請", "ㄒㄧㄤˇ": "想", "ㄐㄧㄚ": "家" },
    prompt: "単語「去 (qù / 行く)」の注音表記はどれ？", options: ["ㄑㄩˋ", "ㄑㄧㄥˇ", "ㄒㄧㄤˇ", "ㄐㄧㄚ"]
  },
  {
    id: 7, type: "word-to-zhuyin", targetSymbol: "ㄒㄧㄤˇ", speechTarget: "想",
    optionSpeechMap: { "ㄒㄧㄤˇ": "想", "ㄒㄧㄝˋ ㄒㄧㄝ˙": "謝謝", "ㄑㄧㄥˇ": "請", "ㄑㄩˋ": "去" },
    prompt: "単語「想 (xiǎng / 〜したい)」の注音表記はどれ？", options: ["ㄒㄧㄤˇ", "ㄒㄧㄝˋ ㄒㄧㄝ˙", "ㄑㄧㄥˇ", "ㄑㄩˋ"]
  },
  {
    id: 8, type: "word-to-zhuyin", targetSymbol: "ㄐㄧㄚ", speechTarget: "家",
    optionSpeechMap: { "ㄐㄧㄚ": "家", "ㄐㄧㄠˋ": "叫", "ㄑㄩˋ": "去", "ㄒㄧㄝˋ ㄒㄧㄝ˙": "謝謝" },
    prompt: "単語「家 (jiā / ホーム)」の正しい注音表記はどれ？", options: ["ㄐㄧㄚ", "ㄐㄧㄠˋ", "ㄑㄩˋ", "ㄒㄧㄝˋ ㄒㄧㄝ˙"]
  }
];

// STEP 1-9 確認クイズ: 結合音 ＆ 総合トロフィーまとめ (全15問)
window.VOWELS_QUIZ_QUESTIONS_1_9 = [
  { id: 1, type: "audio", targetSymbol: "第一声 (平調)", speechTarget: "媽", prompt: "再生された音声「媽 (mā)」の『声調 (トーン)』を選んでください", options: ["第一声 (平調)", "第二声 (升調)", "第三声 (轉調)", "第四声 (降調)"] },
  { id: 2, type: "audio", targetSymbol: "麻 (ㄇㄚˊ)", speechTarget: "麻", prompt: "再生された「えっ！？」と急上昇する「第二声 (升調)」の単語を選んでください", options: ["麻 (ㄇㄚˊ)", "媽 (ㄇㄚ)", "馬 (ㄇㄚˇ)", "罵 (ㄇㄚˋ)"] },
  { id: 3, type: "audio", targetSymbol: "馬 (ㄇㄚˇ)", speechTarget: "馬", prompt: "再生された声を低く抑える「第三声 (轉調)」の単語を選んでください", options: ["馬 (ㄇㄚˇ)", "媽 (ㄇㄚ)", "麻 (ㄇㄚˊ)", "罵 (ㄇㄚˋ)"] },
  { id: 4, type: "audio", targetSymbol: "罵 (ㄇㄚˋ)", speechTarget: "罵", prompt: "再生された上から下へ急降下する「第四声 (降調)」の単語を選んでください", options: ["罵 (ㄇㄚˋ)", "媽 (ㄇㄚ)", "麻 (ㄇㄚˊ)", "罵 (ㄇㄚˇ)"] },
  { id: 5, type: "audio", targetSymbol: "嗎 (ㄇㄚ˙)", speechTarget: "嗎", prompt: "再生された跳ねるように短く添える「軽声 (輕聲)」の単語を選んでください", options: ["嗎 (ㄇㄚ˙)", "媽 (ㄇㄚ)", "麻 (ㄇㄚˊ)", "罵 (ㄇㄚˋ)"] },
  {
    id: 6, type: "zhuyin-to-word", targetSymbol: "頁 (yè)", speechTarget: "頁",
    prompt: "介音『ㄧ』＋ 母音『ㄝ』の結合音「ㄧㄝˋ (ye)」で読める『ページ』を意味する単語はどれ？", options: ["頁 (yè)", "我 (wǒ)", "月 (yuè)", "雲 (yún)"]
  },
  {
    id: 7, type: "zhuyin-to-word", targetSymbol: "位 (wèi)", speechTarget: "位",
    prompt: "介音『ㄨ』＋ 母音『ㄟ』の結合音「ㄨㄟˋ (wei)」で読める『〜席/〜名』を意味する単語はどれ？", options: ["位 (wèi)", "頁 (yè)", "月 (yuè)", "雨 (yǔ)"]
  },
  {
    id: 8, type: "zhuyin-to-word", targetSymbol: "月 (yuè)", speechTarget: "月",
    prompt: "介音『ㄩ』＋ 母音『ㄝ』の結合音「ㄩㄝˋ (yue)」で読める『つき』を意味する単語はどれ？", options: ["月 (yuè)", "位 (wèi)", "頁 (yè)", "魚 (yú)"]
  },
  {
    id: 9, type: "word-to-zhuyin", targetSymbol: "ㄒㄧㄝˋ ㄒㄧㄝ˙", speechTarget: "謝謝",
    optionSpeechMap: { "ㄒㄧㄝˋ ㄒㄧㄝ˙": "謝謝", "ㄋㄧˇ ㄏㄠˇ": "你好", "ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ": "不客氣", "ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ": "對不起" },
    prompt: "「ありがとう」を意味する「謝謝 (xièxie)」の正確な注音表記はどれ？", options: ["ㄒㄧㄝˋ ㄒㄧㄝ˙", "ㄋㄧˇ ㄏㄠˇ", "ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ", "ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ"]
  },
  {
    id: 10, type: "word-to-zhuyin", targetSymbol: "ㄋㄧˇ ㄏㄠˇ", speechTarget: "你好",
    optionSpeechMap: { "ㄋㄧˇ ㄏㄠˇ": "你好", "ㄒㄧㄝˋ ㄒㄧㄝ˙": "謝謝", "ㄗㄠˇ ㄢ": "早安", "ㄗㄞˋ ㄐㄧㄢˋ": "再見" },
    prompt: "「こんにちは」を意味する「你好 (nǐhǎo)」の正確な注音表記はどれ？", options: ["ㄋㄧˇ ㄏㄠˇ", "ㄒㄧㄝˋ ㄒㄧㄝ˙", "ㄗㄠˇ ㄢ", "ㄗㄞˋ ㄐㄧㄢˋ"]
  },
  {
    id: 11, type: "word-to-zhuyin", targetSymbol: "ㄊㄞˊ ㄨㄢ", speechTarget: "台灣",
    optionSpeechMap: { "ㄊㄞˊ ㄨㄢ": "台灣", "ㄖˋ ㄅㄣˇ": "日本", "ㄊㄞˊ ㄅㄟˇ": "台北", "ㄍㄠ ㄒㄧㄨㄥˊ": "高雄" },
    prompt: "「台湾 (táiwān)」の正確な注音表記はどれ？", options: ["ㄊㄞˊ ㄨㄢ", "ㄖˋ ㄅㄣˇ", "ㄊㄞˊ ㄅㄟˇ", "ㄍㄠ ㄒㄧㄨㄥˊ"]
  },
  {
    id: 12, type: "word-to-zhuyin", targetSymbol: "ㄓㄣ ㄓㄨ ㄋㄞˇ ㄔㄚˊ", speechTarget: "珍珠奶茶",
    optionSpeechMap: { "ㄓㄣ ㄓㄨ ㄋㄞˇ ㄔㄚˊ": "珍珠奶茶", "ㄋㄧㄡˊ ㄖㄡˋ ㄇㄧㄢˋ": "牛肉麵", "ㄒㄧㄠˇ ㄌㄨㄥˊ ㄅㄠ": "小籠包", "ㄌㄨˇ ㄖㄡˋ ㄈㄢˋ": "滷肉飯" },
    prompt: "台湾名物「タピオカミルクティー (珍珠奶茶)」の注音表記はどれ？", options: ["ㄓㄣ ㄓㄨ ㄋㄞˇ ㄔㄚˊ", "ㄋㄧㄡˊ ㄖㄡˋ ㄇㄧㄢˋ", "ㄒㄧㄠˇ ㄌㄨㄥˊ ㄅㄠ", "ㄌㄨˇ ㄖㄡˋ ㄈㄢˋ"]
  },
  { id: 13, type: "fill-in-blank", targetSymbol: "37文字", speechTarget: "三十七", prompt: "台湾の注音符号（ボポモフォ）の基本文字は子音21＋母音16を合わせて『全何文字』？", options: ["37文字", "26文字", "46文字", "50文字"] },
  { id: 14, type: "fill-in-blank", targetSymbol: "文字の頭の上", speechTarget: "嗎", prompt: "注音符号で「軽声 (輕聲: ˙)」の黒丸記号を添える正しい位置はどこ？", options: ["文字の頭の上", "文字の右下", "文字の左側", "文字の下"] },
  {
    id: 15, type: "zhuyin-to-word", targetSymbol: "私は台湾に行ったことがあります", speechTarget: "我有去過台灣",
    prompt: "🏆 トロフィー問題！注音『ㄨㄛˇ ㄧㄡˇ ㄑㄩˋ ㄍㄨㄛˋ ㄊㄞˊ ㄨㄢ』の意味はどれ？", options: ["私は台湾に行ったことがあります", "私は日本人です", "私はタピオカミルクティーが飲みたいです", "お会計をお願いします"]
  }
];

// エイリアス定義
window.VOWELS_QUIZ_QUESTIONS_TONES = window.VOWELS_QUIZ_QUESTIONS_1_1;
window.VOWELS_QUIZ_QUESTIONS_1 = window.VOWELS_QUIZ_QUESTIONS_1_2;
window.VOWELS_QUIZ_QUESTIONS_2 = window.VOWELS_QUIZ_QUESTIONS_1_3;
window.VOWELS_QUIZ_QUESTIONS_3 = window.VOWELS_QUIZ_QUESTIONS_1_4;
window.VOWELS_QUIZ_QUESTIONS_4 = window.VOWELS_QUIZ_QUESTIONS_1_5;
window.VOWELS_QUIZ_QUESTIONS_5 = window.VOWELS_QUIZ_QUESTIONS_1_6;
window.VOWELS_QUIZ_QUESTIONS_6 = window.VOWELS_QUIZ_QUESTIONS_1_7;
window.VOWELS_QUIZ_QUESTIONS_7 = window.VOWELS_QUIZ_QUESTIONS_1_8;
window.VOWELS_QUIZ_QUESTIONS_8 = window.VOWELS_QUIZ_QUESTIONS_1_9;
window.VOWELS_QUIZ_QUESTIONS_9 = window.VOWELS_QUIZ_QUESTIONS_1_9;

// ==================== STEP 2-1: 挨拶・自己紹介 ＆ 基本文法「是 (〜です)」 ====================
window.GRAMMAR_STEP2_1_DATA = [
  {
    id: "g2-1-1",
    grammarTitle: "基本文法①: 「〜は〜です」（A 是 B）",
    grammarFormula: "主語 (A) + 是 + 名詞 (B)",
    explanation: "「是」は日本語の「〜です / 〜である」にあたる最も基本的な動詞です。否定する場合は「不是 (〜ではありません)」になります。",
    examples: [
      { traditional: "我是日本人", zhuyin: "ㄨㄛˇ ㄕˋ ㄖˋ ㄅㄣˇ ㄖㄣˊ", meaning: "私は日本人です" },
      { traditional: "他是台灣人", zhuyin: "ㄊㄚ ㄕˋ ㄊㄞˊ ㄨㄢ ㄖㄣˊ", meaning: "彼（彼女）は台湾人です" },
      { traditional: "我不是學生", zhuyin: "ㄨㄛˇ ㄅㄨˋ ㄕˋ ㄒㄩㄝˊ ㄕㄥ", meaning: "私は学生ではありません" }
    ]
  },
  {
    id: "g2-1-2",
    grammarTitle: "基本文法②: 「私の名前は〜です / 〜と申します」",
    grammarFormula: "我叫 + 名前 / 我姓 + 苗字",
    explanation: "フルネームや名前を言うときは「叫」、苗字（姓）を言うときは「姓」を使います。",
    examples: [
      { traditional: "你好！我叫田中", zhuyin: "ㄋㄧˇ ㄏㄠˇ ！ ㄨㄛˇ ㄐㄧㄠˋ ㄊㄧㄢˊ ㄓㄨㄥ", meaning: "こんにちは！私は田中と申します" },
      { traditional: "請問你姓什麼？", zhuyin: "ㄑㄧㄥˇ ㄨㄣˋ ㄋㄧˇ ㄒㄧㄥˋ ㄕㄣˊ ㄇㄛ˙ ？", meaning: "お名前（お苗字）は何とおっしゃいますか？" }
    ]
  },
  {
    id: "g2-1-3",
    grammarTitle: "✈️ 台湾旅行・日常で毎日使う必須フレーズ",
    grammarFormula: "日常の挨拶 ＆ 感謝・お詫び表現",
    explanation: "台湾の街中やお店、ホテルで毎日使う基本中の基本挨拶フレーズです。",
    examples: [
      { traditional: "你好", zhuyin: "ㄋㄧˇ ㄏㄠˇ", meaning: "こんにちは（最も基本の挨拶）" },
      { traditional: "謝謝", zhuyin: "ㄒㄧㄝˋ ㄒㄧㄝ˙", meaning: "ありがとうございます" },
      { traditional: "不客氣", zhuyin: "ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ", meaning: "どういたしまして" },
      { traditional: "對不起", zhuyin: "ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ", meaning: "ごめんなさい / すみません" }
    ]
  }
];

// STEP 2-1 確認クイズ (全文法・全フレーズ100%全網羅・全10問)
window.GRAMMAR_QUIZ_QUESTIONS_2_1 = [
  { id: 1, type: "audio", targetSymbol: "你好", speechTarget: "你好", prompt: "再生された音声に当てはまる日常挨拶を選んでください", options: ["你好", "謝謝", "對不起", "不客氣"] },
  { id: 2, type: "audio", targetSymbol: "謝謝", speechTarget: "謝謝", prompt: "再生された音声に当てはまる「ありがとう」の表現を選んでください", options: ["謝謝", "你好", "不客氣", "對不起"] },
  { id: 3, type: "audio", targetSymbol: "不客氣", speechTarget: "不客氣", prompt: "再生された音声に当てはまる「どういたしまして」の表現を選んでください", options: ["不客氣", "謝謝", "對不起", "你好"] },
  { id: 4, type: "audio", targetSymbol: "對不起", speechTarget: "對不起", prompt: "再生された音声に当てはまる「ごめんなさい」の表現を選んでください", options: ["對不起", "不客氣", "謝謝", "你好"] },
  { id: 5, type: "zhuyin-to-word", targetSymbol: "私は日本人です", speechTarget: "我是日本人", prompt: "注音「ㄨㄛˇ ㄕˋ ㄖˋ ㄅㄣˇ ㄖㄣˊ」に対応する日本語訳はどれ？", options: ["私は日本人です", "彼は台湾人です", "私は学生ではありません", "こんにちは"] },
  { id: 6, type: "zhuyin-to-word", targetSymbol: "彼は台湾人です", speechTarget: "他是台灣人", prompt: "注音「ㄊㄚ ㄕˋ ㄊㄞˊ ㄨㄢ ㄖㄣˊ」に対応するフレーズはどれ？", options: ["彼は台湾人です", "私は日本人です", "私は学生です", "ありがとう"] },
  { id: 7, type: "fill-in-blank", targetSymbol: "是", speechTarget: "我是日本人", prompt: "「私は日本人です（我 ___ 日本人）」の空欄に入る動詞はどれ？", options: ["是", "不", "叫", "姓"] },
  { id: 8, type: "fill-in-blank", targetSymbol: "叫", speechTarget: "我叫田中", prompt: "「私の名前は〜です（我 ___ 田中）」の空欄に入る言葉はどれ？", options: ["叫", "是", "姓", "不"] },
  {
    id: 9, type: "word-to-zhuyin", targetSymbol: "ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ", speechTarget: "不客氣",
    optionSpeechMap: { "ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ": "不客氣", "ㄒㄧㄝˋ ㄒㄧㄝ˙": "謝謝", "ㄋㄧˇ ㄏㄠˇ": "你好", "ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ": "對不起" },
    prompt: "「不客氣 (どういたしまして)」の正しい注音表記はどれ？", options: ["ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ", "ㄒㄧㄝˋ ㄒㄧㄝ˙", "ㄋㄧˇ ㄏㄠˇ", "ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ"]
  },
  {
    id: 10, type: "word-to-zhuyin", targetSymbol: "ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ", speechTarget: "對不起",
    optionSpeechMap: { "ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ": "對不起", "ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ": "不客氣", "ㄒㄧㄝˋ ㄒㄧㄝ˙": "謝謝", "ㄋㄧˇ ㄏㄠˇ": "你好" },
    prompt: "「對不起 (すみません)」の正しい注音表記はどれ？", options: ["ㄉㄨㄟˋ ㄅㄨˋ ㄑㄧˇ", "ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ", "ㄒㄧㄝˋ ㄒㄧㄝ˙", "ㄋㄧˇ ㄏㄠˇ"]
  }
];

// ==================== STEP 3-1: 飲食店・夜市での注文会話確認クイズ (全8問) ====================
window.VOWELS_QUIZ_QUESTIONS_3_1 = [
  { id: 1, type: "audio", targetSymbol: "內用", speechTarget: "內用", prompt: "再生された台湾の食堂で毎日聞く「店内飲食」の表現はどれ？", options: ["內用", "外帶", "買單", "謝謝"] },
  { id: 2, type: "audio", targetSymbol: "外帶", speechTarget: "外帶", prompt: "再生された「テイクアウト / お持ち帰り」の表現はどれ？", options: ["外帶", "內用", "點餐", "買單"] },
  { id: 3, type: "zhuyin-to-word", targetSymbol: "イートインでお願いします", speechTarget: "內用，謝謝", prompt: "注音「ㄋㄟˋ ㄩㄥˋ ， ㄒㄧㄝˋ ㄒㄧㄝ˙」に対応する日本語の意味はどれ？", options: ["イートインでお願いします", "テイクアウトでお願いします", "お会計をお願いします", "ごちそうさまでした"] },
  { id: 4, type: "zhuyin-to-word", targetSymbol: "半糖・氷少なめ", speechTarget: "半糖少冰", prompt: "ドリンクの注文「ㄅㄢˋ ㄊㄤˊ ㄕㄠˇ ㄅㄧㄥ」に対応するカスタム内容はどれ？", options: ["半糖・氷少なめ", "微糖・氷なし", "全糖・多氷", "無糖・常温"] },
  { id: 5, type: "fill-in-blank", targetSymbol: "袋子", speechTarget: "要不要袋子", prompt: "「レジ袋は要りますか？ (要不要 ___ ？)」の空欄に入る単語はどれ？", options: ["袋子", "杯子", "筷子", "盒子"] },
  { id: 6, type: "fill-in-blank", targetSymbol: "推薦", speechTarget: "請問有推薦的嗎", prompt: "「おすすめはありますか？ (請問有 ___ ％ 嗎？)」の空欄に入る単語はどれ？", options: ["推薦", "點餐", "買單", "內用"] },
  { id: 7, type: "zhuyin-to-word", targetSymbol: "大杯", speechTarget: "大杯", prompt: "ドリンクスタンドの注音「ㄉㄚˋ ㄅㄟ」に対応するサイズ指定はどれ？", options: ["大杯", "中杯", "小杯", "特大"] },
  {
    id: 8, type: "word-to-zhuyin", targetSymbol: "ㄧˊ ㄍㄨㄥˋ", speechTarget: "一共",
    optionSpeechMap: { "ㄧˊ ㄍㄨㄥˋ": "一共", "ㄇㄞˇ ㄉㄢ": "買單", "ㄋㄟˋ ㄩㄥˋ": "內用", "ㄨㄞˋ ㄉㄞˋ": "外帶" },
    prompt: "「一共 (合計で)」の正しい注音表記はどれ？", options: ["ㄧˊ ㄍㄨㄥˋ", "ㄇㄞˇ ㄉㄢ", "ㄋㄟˋ ㄩㄥˋ", "ㄨㄞˋ ㄉㄞˋ"]
  }
];
