import type { ApiResponse } from "../common";
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

export interface InsuranceCreateRequest {
    category: "INSURANCE";
    titleTh: string;
    titleEn: string;
    descriptionTh: string;
    descriptionEn: string;
    coverImage: File;
    iconImage: File;
    coverHyperLink: string;
    effectiveFrom: string;
    effectiveTo: string;
    status: "ACTIVE" | "INACTIVE";
    startDate: string;
    endDate: string;

}

export type InsuranceResponse = ApiResponse<InsuranceModel>;