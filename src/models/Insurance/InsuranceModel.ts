import type { ApiResponse } from "../common";
import type { ContentCommonModel } from "../Content/ContentCommonModel";

export interface InsuranceModel extends ContentCommonModel {
    category: "INSURANCE";
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

export type InsuranceResponse = ApiResponse<InsuranceModel>;