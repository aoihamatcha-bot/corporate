import type { Locale } from "./i18n";

export type CorporateAssetId =
  "A01" | "A02" | "A03" | "A04" | "A05" | "A06" | "A07" | "A08" | "A09" | "A10";

// Approved v2 assets plus Owner-supplied Japanese replacements.
// Source hashes: docs/asset-adoption-v2.json and docs/concept-replacements-v3.json.
export const corporateAssets = [
  {
    id: "A01",
    variant: "ja",
    path: "/images/corporate/a01-service-overview-v3-ja.webp",
    width: 1586,
    height: 992,
    bytes: 125552,
    sha256: "5bca5314f5e5d44434fd4b621e2d5780ec11584ee1802a4c9d4b49be290a2bf5",
    alt: {
      ja: "ミステリーボックスと、保護ケース入りのトレーディングカード、上質なジャケット、精密カメラを並べたエンタメECの構想図",
      en: "An entertainment commerce concept featuring a mystery box, protected trading cards, a tailored jacket and a precision camera",
    },
  },
  {
    id: "A01",
    variant: "en",
    path: "/images/corporate/a01-service-overview-en.webp",
    width: 1600,
    height: 1000,
    bytes: 79894,
    sha256: "acabc392775c070502653c6a86e010dd4b302edeebbe2cba7f615c79b613410d",
    alt: {
      ja: "ミステリーボックスと、保護ケース入りのトレーディングカード、上質なジャケット、精密カメラを並べたエンタメECの構想図",
      en: "An entertainment commerce concept featuring a mystery box, protected trading cards, a tailored jacket and a precision camera",
    },
  },
  {
    id: "A02",
    variant: "ja",
    path: "/images/corporate/a02-experience-flow-v3-ja.webp",
    width: 1586,
    height: 992,
    bytes: 130956,
    sha256: "5fd320db5b2035fdfa4d868b204582ac28e04f7c0ce4349bd4e45af6937ce1b8",
    alt: {
      ja: "商品情報を確認し、ミステリーボックスを開封して、カードの内容を確認する3段階の構想図",
      en: "A proposed three-step mystery box journey: review product details, open the box and explore the revealed trading card",
    },
  },
  {
    id: "A02",
    variant: "en",
    path: "/images/corporate/a02-experience-flow-en.webp",
    width: 1600,
    height: 1000,
    bytes: 82328,
    sha256: "3eef3ed94e224e8cab0ec1afb22dfb0ef6ac02b5661a141952a4fca3f41575f3",
    alt: {
      ja: "商品情報を確認し、ミステリーボックスを開封して、カードの内容を確認する3段階の構想図",
      en: "A proposed three-step mystery box journey: review product details, open the box and explore the revealed trading card",
    },
  },
  {
    id: "A03",
    variant: "common",
    path: "/images/corporate/a03-company-workstyle.webp",
    width: 1586,
    height: 992,
    bytes: 242994,
    sha256: "e1b0a8857b0762fac29e47ca9adc18cfa3efb772943fb963eed1abaccdecfc17",
    alt: {
      ja: "企画資料、UI画面、商品見本を囲んで共同制作する架空の3人を描いたイラスト",
      en: "An illustration of an imaginary team collaborating around UI designs, a storyboard and product samples",
    },
  },
  {
    id: "A04",
    variant: "common",
    path: "/images/corporate/a04-about-workbench.webp",
    width: 1586,
    height: 992,
    bytes: 233222,
    sha256: "fef62a50861eb3b8743851b5634c0ee1ef440fc558b56bfc2b05678bef04e06f",
    alt: {
      ja: "ノート、開発用PC、カメラ、商品見本、スマートフォンが並ぶ架空の制作机のイラスト",
      en: "An imaginary creative workbench with a notebook, development laptop, camera, product sample and phone",
    },
  },
  {
    id: "A05",
    variant: "ja",
    path: "/images/corporate/a05-social-share-ja.png",
    width: 1200,
    height: 630,
    bytes: 50580,
    sha256: "0634c26faf8572e0a9de9221b656a149d640649269ffc7a18fc77d998c55008b",
    alt: {
      ja: "MYSTENAのコピーと青いカードを組み合わせた記号なしのSNS共有画像案",
      en: "A symbol-free MYSTENA sharing graphic with layered blue cards",
    },
  },
  {
    id: "A05",
    variant: "en",
    path: "/images/corporate/a05-social-share-en.png",
    width: 1200,
    height: 630,
    bytes: 57124,
    sha256: "c2fc0e128604583b297788a5394f3c97099a01f1ba71d866fb9aee4e1464ac7b",
    alt: {
      ja: "MYSTENAのコピーと青いカードを組み合わせた記号なしのSNS共有画像案",
      en: "A symbol-free MYSTENA sharing graphic with layered blue cards",
    },
  },
  {
    id: "A06",
    variant: "ja",
    path: "/images/corporate/a06-business-concept-v3-ja.webp",
    width: 1586,
    height: 992,
    bytes: 137954,
    sha256: "2a62ff1eb32ab73e0e8e8dbab6217a713c42537035a08e759fd4e926c7f26241",
    alt: {
      ja: "商品を届ける事業者、MYSTENAのボックス開封サービス、タブレットで商品を探す人をつないだ事業の構想図",
      en: "A business concept connecting product sellers, MYSTENA's box-opening service and a person discovering products on a tablet",
    },
  },
  {
    id: "A06",
    variant: "en",
    path: "/images/corporate/a06-business-concept-en.webp",
    width: 1600,
    height: 850,
    bytes: 71490,
    sha256: "3f2c54cdb8a876c7684f61a23e3cd16316d34172c682606bd1e90cb2c1cd8eaa",
    alt: {
      ja: "事業者、文字のみのMYSTENA、カードを手にして商品情報を見る人物をつないだ事業関係図",
      en: "A relationship diagram connecting businesses, the text-only MYSTENA name and a collector viewing product information",
    },
  },
  {
    id: "A07",
    variant: "ja",
    path: "/images/corporate/a07-video-poster-v3-ja.webp",
    width: 1672,
    height: 941,
    bytes: 118506,
    sha256: "c790eadc85e201b96dfd98e261cd6b03889eb275153e897374bc43be01b56f82",
    alt: {
      ja: "ミステリーボックス、トレーディングカード、ジャケット、精密カメラを並べた紹介動画の表紙案",
      en: "A video cover concept showing a mystery box with trading cards, a tailored jacket and a precision camera",
    },
  },
  {
    id: "A07",
    variant: "en",
    path: "/images/corporate/a07-video-poster-en.webp",
    width: 1600,
    height: 900,
    bytes: 63420,
    sha256: "21553b88020dfdcc2b81f8f9103c0d1565bdbb22647b6d0f83cecaf287e151ab",
    alt: {
      ja: "ミステリーボックス、トレーディングカード、ジャケット、精密カメラを並べた紹介動画の表紙案",
      en: "A video cover concept showing a mystery box with trading cards, a tailored jacket and a precision camera",
    },
  },
  {
    id: "A08",
    variant: "common",
    path: "/images/corporate/a08-brand-keyvisual.webp",
    width: 1600,
    height: 900,
    bytes: 138810,
    sha256: "d0030153e3f10d9cd695ad1675075d4e28806d0957d86bbd90c518ccd2021af8",
    alt: {
      ja: "青い窓と架空の水辺の街を背景に、商品、UI、映像のカードが光の線でつながるイラスト",
      en: "An imaginary waterfront seen through a blue portal, with product, interface and storyboard cards linked by light",
    },
  },
  {
    id: "A09",
    variant: "ja",
    path: "/images/corporate/a09-news-template-ja.png",
    width: 1200,
    height: 630,
    bytes: 41891,
    sha256: "5017fec711ea11849f823cf3946b75ae0a5e5f380de8a1a21f49f86d8ba9283f",
    alt: {
      ja: "NEWSとMYSTENAからのお知らせの文字に、青いカードの重なりを添えたニュース表紙",
      en: "A news cover with the words NEWS and Updates from MYSTENA beside layered blue editorial cards",
    },
  },
  {
    id: "A09",
    variant: "en",
    path: "/images/corporate/a09-news-template-en.png",
    width: 1200,
    height: 630,
    bytes: 41456,
    sha256: "f60db4643f0609ae63d89a88b04d49ebd4e216543bdb576ebfb1abc8788b2f9f",
    alt: {
      ja: "NEWSとMYSTENAからのお知らせの文字に、青いカードの重なりを添えたニュース表紙",
      en: "A news cover with the words NEWS and Updates from MYSTENA beside layered blue editorial cards",
    },
  },
  {
    id: "A10",
    variant: "light",
    path: "/images/corporate/a10-wordmark-light.png",
    width: 1400,
    height: 360,
    bytes: 13662,
    sha256: "390679479598ed14a13abc26578a891ccd48f1bb9a32e946938d3a2b46a8b202",
    alt: {
      ja: "記号を除いた文字だけのMYSTENAワードマーク",
      en: "The text-only MYSTENA wordmark without a symbol",
    },
  },
  {
    id: "A10",
    variant: "dark",
    path: "/images/corporate/a10-wordmark-dark.png",
    width: 1400,
    height: 360,
    bytes: 11308,
    sha256: "4495860bb996de604c4e4f2366e8b25489bf3f6668e86ae8ab1df414654cc02f",
    alt: {
      ja: "記号を除いた文字だけのMYSTENAワードマーク",
      en: "The text-only MYSTENA wordmark without a symbol",
    },
  },
  {
    id: "A10",
    variant: "light-fit",
    path: "/images/corporate/a10-wordmark-light-fit.svg",
    x: 281,
    y: 120,
    width: 849,
    height: 128,
    bytes: 3977,
    sha256: "559f38be0bf91d2e4fec971c86290dbff3ef28808ea54f6eb54dd411cc66fab7",
    derivative:
      "Approved outlined SVG, transparent viewBox margins trimmed only",
    alt: {
      ja: "MYSTENA",
      en: "MYSTENA",
    },
  },
  {
    id: "A10",
    variant: "dark-fit",
    path: "/images/corporate/a10-wordmark-dark-fit.svg",
    x: 281,
    y: 120,
    width: 849,
    height: 128,
    bytes: 3974,
    sha256: "2ab0769b43a48bbf59136d027b41a4704b3a45720c9d015452cafb52dd9f9db7",
    derivative:
      "Approved outlined SVG, transparent viewBox margins trimmed only",
    alt: {
      ja: "MYSTENA",
      en: "MYSTENA",
    },
  },
] as const;

export function corporateAsset(id: CorporateAssetId, locale: Locale) {
  const asset = corporateAssets.find(
    (asset) =>
      asset.id === id &&
      (asset.variant === locale ||
        asset.variant === "common" ||
        (id === "A10" && asset.variant === "light-fit")),
  );
  if (!asset) throw new Error("Missing corporate asset: " + id + "/" + locale);
  return { ...asset, alt: asset.alt[locale] };
}
