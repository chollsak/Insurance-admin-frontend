import { apiClient } from "../../common";
import type { ApiResponse } from "../../models";

export const suitInsuranceService = {
  async deleteSuitInsurance(id: string): Promise<ApiResponse<undefined>> {
    const { data } = await apiClient.delete<ApiResponse<undefined>>(`/suit-insurances/${id}`);
    return data;
  }
};

export default suitInsuranceService;