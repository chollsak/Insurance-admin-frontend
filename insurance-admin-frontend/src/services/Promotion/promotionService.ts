import { apiClient } from "../../common";
import type { ApiResponse, PromotionResponse } from "../../models";

export const promotionService = {
  async createPromotion(formData: FormData): Promise<PromotionResponse> {
    const { data } = await apiClient.post<PromotionResponse>("/promotions", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },

  async updatePromotionById(id: string, formData: FormData): Promise<PromotionResponse> {
    const { data } = await apiClient.patch<PromotionResponse>(`/promotions/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async deletePromotion(id: string): Promise<ApiResponse<undefined>> {
    const { data } = await apiClient.delete<ApiResponse<undefined>>(`/promotions/${id}`);
    return data;
  }
};

export default promotionService;