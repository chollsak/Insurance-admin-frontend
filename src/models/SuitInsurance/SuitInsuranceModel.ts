import type { ApiResponse } from "../common";
import type { ContentCommonModel } from "../Content/ContentCommonModel";

export interface SuitInsuranceModel extends ContentCommonModel {
    category: "SUIT_INSURANCE";
    titleTh: string;
    titleEn: string;
    imagePath: string;
}

export type SuitInsuranceResponse = ApiResponse<SuitInsuranceModel>;