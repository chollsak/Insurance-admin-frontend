import { apiClient } from "../../common";
import type { ApiResponse, InsuranceResponse } from "../../models";

export const insuranceService = {
  async deleteInsurance(id: string): Promise<ApiResponse<undefined>> {
    const { data } = await apiClient.delete<ApiResponse<undefined>>(`/insurances/${id}`);
    return data;
  },

  async createInsurance(formData: FormData): Promise<InsuranceResponse> {
    const { data } = await apiClient.post<InsuranceResponse>("/insurances", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },

  async updateInsuranceById(id: string, formData: FormData): Promise<InsuranceResponse> {
    const { data } = await apiClient.patch<InsuranceResponse>(`/insurances/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  }

};

export default insuranceService;