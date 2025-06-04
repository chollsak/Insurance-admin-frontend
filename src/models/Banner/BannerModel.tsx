import type { ApiResponse } from "../common";
import type { ContentCommonModel } from "../Content/ContentCommonModel";
import type { BannerContentModel } from "./BannerContentModel";

export interface BannerModel extends ContentCommonModel {
    category: "BANNER";
    coverImagePath: string;
    coverHyperLink: string;
    contents: BannerContentModel[];
}

export interface BannerCreateRequest {
    category: "BANNER";
    title: string;
    status: "ACTIVE" | "INACTIVE";
    effectiveFrom: string;
    effectiveTo: string;
    coverImage: File;
    coverHyperLink: string;
    contents: {
        contentImage: File;
        contentHyperLink: string;
    }[]
}

export interface BannerUpdateRequest {
    category?: "BANNER";
    title?: string;
    status?: "ACTIVE" | "INACTIVE";
    effectiveFrom?: string;
    effectiveTo?: string;
    coverImage?: File;
    coverHyperLink?: string;
    contents?: {
        id: string;
        contentImage: File;
        contentHyperLink: string;
    }[]
}

export type BannerResponse = ApiResponse<BannerModel>