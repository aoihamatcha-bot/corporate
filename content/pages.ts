export const pages = {
  about: {
    en: "About",
    ja: "私たちについて",
    description:
      "エンターテインメントとテクノロジーで、\n好奇心の先にある可能性をひらく。",
    approach: {
      title: "楽しさを想像する。\n技術で、かたちにする。",
      paragraphs: [
        "人の心が動くきっかけを考えること。そして、そのアイデアを使いやすい体験へと育てること。私たちは、その両方を大切にしています。",
        "新しさのためだけに技術を使うのではなく、体験する人にとっての喜びを起点に。小さな発見から、次の可能性を探していきます。",
      ],
    },
    values: [
      {
        title: "好奇心から、始める。",
        description:
          "「面白そう」の一歩先へ。まだ知らないことに目を向け、新しい出会いを歓迎します。",
      },
      {
        title: "人の気持ちを、真ん中に。",
        description:
          "つくる側の都合よりも、体験する人の気持ちから考える。わかりやすさと心地よさを大切にします。",
      },
      {
        title: "信頼を、積み重ねる。",
        description:
          "心が動く体験を、安心して楽しめるように。一つひとつの選択に、丁寧に向き合います。",
      },
    ],
  },
  business: {
    en: "Business",
    ja: "事業紹介",
    description:
      "楽しさを、次のかたちへ。\nMYSTENAが目指す事業領域をご紹介します。",
  },
  company: {
    en: "Company",
    ja: "会社情報",
    description: "MYSTENAの基本情報をご案内します。",
    notice:
      "会社概要は、公開の準備が整い次第掲載します。ブランド表記のMYSTENAと、正式な法人名は区別してご案内します。",
  },
  news: {
    en: "News",
    ja: "お知らせ",
    description: "MYSTENAからの新しいお知らせを、ここから。",
    emptyTitle: "新しい一歩を、ここから。",
    emptyDescription:
      "現在、公開中のお知らせはありません。\n準備が整い次第、こちらでお届けします。",
  },
  contact: {
    en: "Contact",
    ja: "お問い合わせ",
    description:
      "事業や協業についてのご相談など、\nMYSTENAへのお問い合わせはこちらから。",
    status: "unconfigured" as const,
    noticeTitle: "お問い合わせ窓口を準備しています。",
    notice:
      "現在、フォームからの入力・送信は受け付けていません。窓口の準備が整い次第、こちらでご案内します。",
    purposes: [
      "事業・サービスについて",
      "協業・パートナーシップについて",
      "取材・メディアについて",
      "その他",
    ],
  },
  privacy: {
    en: "Privacy",
    ja: "プライバシーポリシー",
    status: "unpublished" as "unpublished" | "published",
    body: null as null | { heading: string; paragraphs: string[] }[],
    notice:
      "個人情報の取り扱いに関する方針は、正式な内容を確認のうえ、こちらに掲載します。",
    explanation:
      "現在、お問い合わせフォームから個人情報を入力・送信することはできません。受付を開始する際には、利用目的やお問い合わせ窓口などをご案内します。",
  },
};
