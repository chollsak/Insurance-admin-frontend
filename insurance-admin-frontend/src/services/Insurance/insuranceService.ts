import { apiClient } from "../../common";
import type { ApiResponse } from "../../models";

export const insuranceService = {
  async deleteInsurance(id: string): Promise<ApiResponse<undefined>> {
    const { data } = await apiClient.delete<ApiResponse<undefined>>(`/insurances/${id}`);
    return data;
  }
};

export default insuranceService;