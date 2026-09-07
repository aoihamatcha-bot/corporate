// Working names describe intended domains. These are not launched-product claims.
export const business = [
  {
    id: "platform",
    index: "01",
    verb: "DISCOVER",
    visual: "/images/afterglow.webp",
    visualBlend: "screen",
    en: ["Entertainment", "Platform"],
    nameStatus: "working",
    title: "出会いをつくる、プラットフォーム。",
    description:
      "新しい商品やコンテンツとの出会いを、心が動く体験へ。エンターテインメントの楽しさを、サービスの仕組みから考えます。",
    value:
      "探していたものに出会う喜びも、思いがけず好きになる瞬間も。デジタルの中に、人の好奇心が広がるきっかけをつくることを目指しています。",
    tags: ["新しい発見", "デジタル体験", "つながり"],
    collaboration:
      "商品やコンテンツが持つ魅力を、新しい接点へ。パートナーの皆さまと、出会い方の可能性を考えていきます。",
  },
  {
    id: "creative",
    index: "02",
    verb: "CREATE",
    visual: "/images/daylight.webp",
    visualBlend: "multiply",
    en: ["Creative", "Experience"],
    nameStatus: "working",
    title: "魅力が伝わる、体験のデザイン。",
    description:
      "ブランドやクリエイターの魅力を、デジタルならではの表現で届ける。技術とアイデアを組み合わせ、体験の可能性を広げます。",
    value:
      "見る、触れる、気づく。その一つひとつが、記憶に残る体験につながるように。伝えたいことと、受け取る人の気持ちを大切にした表現を探ります。",
    tags: ["クリエイティブ", "インタラクション", "ストーリー"],
    collaboration:
      "アイデアの芽を、実際に触れられる体験へ。表現や技術の視点を持ち寄り、一緒に可能性を見つけていきます。",
  },
] as const;
