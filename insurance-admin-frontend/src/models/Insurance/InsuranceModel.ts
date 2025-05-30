import type { ContentCommonModel } from "../Content/ContentCommonModel";

export interface InsuranceModel extends ContentCommonModel {
    titleTh: string;
    titleEn: string;
    descriptionTh: string;
    descriptionEn: string;
    coverImagePath: string;
    iconImagePath: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}