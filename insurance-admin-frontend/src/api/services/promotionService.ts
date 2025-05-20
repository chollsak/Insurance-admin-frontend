import apiClient from "../config/apiClient";

interface PromotionService {
    deletePromotion(id: string): Promise<void>;
  }
  
  export const promotionService: PromotionService = {
    async deletePromotion(id: string): Promise<void> {
      try {
        const response = await apiClient.delete(`/promotions/${id}`);
        
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Failed to delete promotion: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error deleting promotion:', error);
        throw error;
      }
    }
  };