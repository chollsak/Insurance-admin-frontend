import apiClient from "../config/apiClient";

interface InsuranceService {
    deleteInsurance(id: string): Promise<void>;
  }
  
  export const insuranceService: InsuranceService = {
    async deleteInsurance(id: string): Promise<void> {
      try {
        const response = await apiClient.delete(`/insurances/${id}`);
        
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Failed to delete insurance: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error deleting insurance:', error);
        throw error;
      }
    }
  };