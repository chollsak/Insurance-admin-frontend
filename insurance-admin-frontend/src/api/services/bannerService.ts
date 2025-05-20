import apiClient from '../config/apiClient';

interface BannerService {
  deleteBanner(id: string): Promise<void>;
}

export const bannerService: BannerService = {
  async deleteBanner(id: string): Promise<void> {
    try {
      const response = await apiClient.delete(`/banners/${id}`);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to delete banner: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      throw error;
    }
  }
};