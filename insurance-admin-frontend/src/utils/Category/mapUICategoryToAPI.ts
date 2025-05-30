import type { ContentCategory, UICategory } from "../../models";

export const mapUICategoryToAPI = (uiCategory: UICategory): ContentCategory => {
    switch (uiCategory) {
        case 'เเบนเนอร์':
            return 'BANNER';
        case 'โปรโมชั่น':
            return 'PROMOTION';
        case 'ประกันภัย':
            return 'INSURANCE';
        case 'ประกันที่เหมาะสม':
            return 'SUIT_INSURANCE';
        default:
            return 'BANNER';
    }
};

