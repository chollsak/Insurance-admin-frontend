import { apiClient } from "../../common";
import type { ApiResponse, BannerResponse, ContentCategory, ContentListResponse, InsuranceResponse, PromotionResponse, SuitInsuranceResponse } from "../../models";

export const contentService = {
  getAllContents: async (category: "ALL" | ContentCategory, pageNo: number = 0, pageSize: number = 10): Promise<ContentListResponse> => {
    const { data } = await apiClient.get<ContentListResponse>(
      `/contents?page=${pageNo}&pageSize=${pageSize}&category=${category}`
    );
    return data;
  },

  getContentById: async (id: string): Promise<BannerResponse | PromotionResponse | SuitInsuranceResponse | InsuranceResponse> => {
    const { data } = await apiClient.get<BannerResponse | PromotionResponse | SuitInsuranceResponse | InsuranceResponse>(
      `/contents/${id}`
    );
    return data;
  },

  deleteContentByContentCategoryId: async (id: string, contentCategoryPath: string): Promise<ApiResponse<undefined>> => {
    const { data } = await apiClient.delete(
      `/${contentCategoryPath}/${id}`,
    );
    return data;
  }
};

export default contentService;