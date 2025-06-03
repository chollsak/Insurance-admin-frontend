import { apiClient } from "../../common";
import type { ApiResponse, BannerResponse } from "../../models";

export const bannerService = {
  async createBanner(formData: FormData): Promise<BannerResponse> {
    const { data } = await apiClient.post<BannerResponse>("/banners", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },

  async updateBannerById(id: string, formData: FormData): Promise<BannerResponse> {
    const { data } = await apiClient.patch<BannerResponse>(`/banners/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async deleteBanner(id: string): Promise<ApiResponse<undefined>> {
    const { data } = await apiClient.delete<ApiResponse<undefined>>(`/banners/${id}`);
    return data;
  }
};

export default bannerService;