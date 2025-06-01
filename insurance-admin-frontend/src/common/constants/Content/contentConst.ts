type MapKey = "BANNER" | "PROMOTION" | "INSURANCE" | "SUIT_INSURANCE";
type Language = "en" | "th";

export const contentCategoryMap: Record<MapKey, Record<Language, string>> = {
    BANNER: {
        en: "Banner",
        th: "แบนเนอร์"
    },
    PROMOTION: {
        en: "Promotion",
        th: "โปรโมชั่น"
    },
    INSURANCE: {
        en: "Insurance",
        th: "ประกันภัย"
    },
    SUIT_INSURANCE: {
        en: "Suit Insurance",
        th: "ประกันภัยที่เหมาะกับคุณ"
    }
};