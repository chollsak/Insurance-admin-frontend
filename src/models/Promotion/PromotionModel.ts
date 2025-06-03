import type { ApiResponse } from "../common";
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

export interface PromotionCreateRequest {
    category: "BANNER";
    title: string;
    status: "ACTIVE" | "INACTIVE";
    effectiveFrom: string;
    effectiveTo: string;
    coverImage: File;
    coverHyperLink: string;
    titleTh: string;
    titleEn: string;
    descriptionTh: string;
    descriptionEn: string;
    startDate: string;
    endDate: string;
}

export interface PromotionUpdateRequest {
    category: "BANNER";
    title: string;
    status: "ACTIVE" | "INACTIVE";
    effectiveFrom: string;
    effectiveTo: string;
    coverImage: File;
    coverHyperLink: string;
    titleTh: string;
    titleEn: string;
    descriptionTh: string;
    descriptionEn: string;
    startDate: string;
    endDate: string;
}

export type PromotionResponse = ApiResponse<PromotionModel>;