import type { Locale } from "./i18n";

export type CorporateAssetId =
  "A01" | "A02" | "A03" | "A04" | "A05" | "A06" | "A07" | "A08" | "A09" | "A10";

// Approved illustrations; v4 removes review footers and matches EN compositions to JA.
// Provenance: docs/asset-revisions-v4.json; earlier records remain historical.
export const corporateAssets = [
  {
    id: "A01",
    variant: "ja",
    path: "/images/corporate/a01-service-overview-v4-ja.webp",
    width: 1586,
    height: 992,
    bytes: 117134,
    sha256: "1b4b492154ca697cdcd613675d9df61e69bf294c11e9c6f149ae7e180f48f073",
    alt: {
      ja: "ミステリーボックスと、保護ケース入りのトレーディングカード、上質なジャケット、精密カメラを並べたエンタメECの構想図",
      en: "An entertainment commerce concept featuring a mystery box, protected trading cards, a tailored jacket and a precision camera",
    },
  },
  {
    id: "A01",
    variant: "en",
    path: "/images/corporate/a01-service-overview-v4-en.webp",
    width: 1586,
    height: 992,
    bytes: 122754,
    sha256: "e4866e443c85e05300987a675567e8baeb182ba71428edb8b801236a9bfb370d",
    alt: {
      ja: "ミステリーボックスと、保護ケース入りのトレーディングカード、上質なジャケット、精密カメラを並べたエンタメECの構想図",
      en: "An entertainment commerce concept featuring a mystery box, protected trading cards, a tailored jacket and a precision camera",
    },
  },
  {
    id: "A02",
    variant: "ja",
    path: "/images/corporate/a02-experience-flow-v4-ja.webp",
    width: 1586,
    height: 992,
    bytes: 118504,
    sha256: "4d69f7b8842863501fa071f3d489f6085c209b41122edf5a552bbc8cfa2467db",
    alt: {
      ja: "商品情報を確認し、ミステリーボックスを開封して、カードの内容を確認する3段階の構想図",
      en: "A three-step mystery box journey: review product details, open the box and explore the revealed trading card",
    },
  },
  {
    id: "A02",
    variant: "en",
    path: "/images/corporate/a02-experience-flow-v4-en.webp",
    width: 1586,
    height: 992,
    bytes: 115264,
    sha256: "b3345af0b25d0bab723d7368508c6f98148e4204b8ea53ee0412d9874d299708",
    alt: {
      ja: "商品情報を確認し、ミステリーボックスを開封して、カードの内容を確認する3段階の構想図",
      en: "A three-step mystery box journey: review product details, open the box and explore the revealed trading card",
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
    path: "/images/corporate/a06-business-concept-v4-ja.webp",
    width: 1586,
    height: 992,
    bytes: 125596,
    sha256: "c6445ef0ff3356d13170fe276081b666d50a5d14ce4f6c20de2d2d50258f5f05",
    alt: {
      ja: "商品を届ける事業者、MYSTENAのボックス開封サービス、タブレットで商品を探す人をつないだ事業の構想図",
      en: "A business concept connecting product sellers, MYSTENA's box-opening service and a person discovering products on a tablet",
    },
  },
  {
    id: "A06",
    variant: "en",
    path: "/images/corporate/a06-business-concept-v4-en.webp",
    width: 1586,
    height: 992,
    bytes: 129388,
    sha256: "82850cd4e322582e58418b38329604d1cbf79e36bea619a705d59c7dd4d798ad",
    alt: {
      ja: "商品を届ける事業者、MYSTENAのボックス開封サービス、タブレットで商品を探す人をつないだ事業の構想図",
      en: "A business concept connecting product sellers, MYSTENA's box-opening service and a person discovering products on a tablet",
    },
  },
  {
    id: "A07",
    variant: "ja",
    path: "/images/corporate/a07-video-poster-v4-ja.webp",
    width: 1672,
    height: 941,
    bytes: 110734,
    sha256: "aa040221783cb5ae1d7330b84e286c011b271e049159f6c9b9a473a09055b341",
    alt: {
      ja: "ミステリーボックス、トレーディングカード、ジャケット、精密カメラを並べた紹介動画の表紙案",
      en: "A video cover concept showing a mystery box with trading cards, a tailored jacket and a precision camera",
    },
  },
  {
    id: "A07",
    variant: "en",
    path: "/images/corporate/a07-video-poster-v4-en.webp",
    width: 1672,
    height: 941,
    bytes: 115000,
    sha256: "1615782f4df7da4fba5c809bcce1786dc5f5eb3cc6c9e8faaf2d58197b790eba",
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
