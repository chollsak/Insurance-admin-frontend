type MapKey = "BANNER" | "PROMOTION" | "INSURANCE" | "SUIT_INSURANCE";
type Locale = "en" | "th";

export const contentCategoryTranslations: Record<MapKey, Record<Locale, string>> = {
    BANNER: { en: "Banner", th: "แบนเนอร์" },
    PROMOTION: { en: "Promotion", th: "โปรโมชั่น" },
    INSURANCE: { en: "Insurance", th: "ประกันภัย" },
    SUIT_INSURANCE: { en: "Suit Insurance", th: "ประกันที่เหมาะสม" },
};

export const contentCategoryApiMap: Record<MapKey, string> = {
    BANNER: "banners",
    PROMOTION: "promotions",
    INSURANCE: "insurances",
    SUIT_INSURANCE: "suit-insurances",
};
