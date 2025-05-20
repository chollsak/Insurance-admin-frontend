import apiClient from "../config/apiClient";

interface SuitInsuranceService {
    deleteSuitInsurance(id: string): Promise<void>;
  }
  
  export const suitInsuranceService: SuitInsuranceService = {
    async deleteSuitInsurance(id: string): Promise<void> {
      try {
        const response = await apiClient.delete(`/suit-insurances/${id}`);
        
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Failed to delete suit insurance: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error deleting suit insurance:', error);
        throw error;
      }
    }
  };