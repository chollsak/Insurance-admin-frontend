// src/api/services/contentService.ts
import apiClient from '../config/apiClient';
import type { Content, ContentCategory, ContentListData, ContentListResponse } from '../types/content';

const BASE_PATH = '/contents';

export const contentService = {
  /**
   * Get all contents with pagination
   * @param pageNo - Page number (0-based)
   * @param pageSize - Number of items per page
   * @returns Promise with content list data
   */
  getAllContents: async (pageNo: number = 0, pageSize: number = 10): Promise<ContentListData> => {
    try {
      console.log(`Fetching contents: page ${pageNo}, size ${pageSize}`);
      const response = await apiClient.get<ContentListResponse>(
        `${BASE_PATH}?pageNo=${pageNo}&pageSize=${pageSize}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching contents:', error);
      throw error;
    }
  },
  
  /**
   * Get contents by category with pagination
   * @param category - Content category
   * @param pageNo - Page number (0-based)
   * @param pageSize - Number of items per page
   * @returns Promise with content list data
   */
  getContentsByCategory: async (
    category: ContentCategory, 
    pageNo: number = 0, 
    pageSize: number = 10
  ): Promise<ContentListData> => {
    try {
      console.log(`Fetching ${category} contents: page ${pageNo}, size ${pageSize}`);
      const response = await apiClient.get<ContentListResponse>(
        `${BASE_PATH}?category=${category}&pageNo=${pageNo}&pageSize=${pageSize}`
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${category} contents:`, error);
      throw error;
    }
  },

  

};

export default contentService;