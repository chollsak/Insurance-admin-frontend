import type { ContentCommonModel } from "../Content/ContentCommonModel";

export interface PromotionModel extends ContentCommonModel {
    titleTh: string;
    titleEn: string;
    descriptionTh: string;
    descriptionEn: string;
    coverImagePath: string;
    stateDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}