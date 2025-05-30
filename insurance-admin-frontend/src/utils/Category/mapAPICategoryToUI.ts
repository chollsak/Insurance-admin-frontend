import type { ContentCategory, UICategory } from "../../models";

export const mapAPICategoryToUI = (apiCategory: ContentCategory): UICategory => {
    switch (apiCategory) {
        case "BANNER":
            return 'เเบนเนอร์';
        case "PROMOTION":
            return 'โปรโมชั่น';
        case "INSURANCE":
            return 'ประกันภัย';
        case "SUIT_INSURANCE":
            return 'ประกันที่เหมาะสม';
        default:
            return 'เเบนเนอร์';
    }
};