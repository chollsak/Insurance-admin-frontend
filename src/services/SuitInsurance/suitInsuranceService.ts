import { apiClient } from "../../common";
import type { ApiResponse, SuitInsuranceResponse } from "../../models";

export const suitInsuranceService = {
  async createSuitInsurance(formData: FormData): Promise<SuitInsuranceResponse> {
    const { data } = await apiClient.post<SuitInsuranceResponse>("/suit-insurances", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },

  async updateSuitInsuranceById(id: string, formData: FormData): Promise<SuitInsuranceResponse> {
    const { data } = await apiClient.patch<SuitInsuranceResponse>(`/suit-insurances/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async deleteSuitInsurance(id: string): Promise<ApiResponse<undefined>> {
    const { data } = await apiClient.delete<ApiResponse<undefined>>(`/suit-insurances/${id}`);
    return data;
  }
};

export default suitInsuranceService;