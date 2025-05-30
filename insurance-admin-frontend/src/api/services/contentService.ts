import type { ContentCategory, ContentListResponse } from '../../models';
import apiClient from '../config/apiClient';

export const contentService = {
  /**
   * Get all contents with pagination
   * @param page - Page number (0-based)
   * @param pageSize - Number of items per page
   * @returns Promise with content list data
   */
  getAllContents: async (category: "ALL" | ContentCategory, pageNo: number = 0, pageSize: number = 10): Promise<ContentListResponse> => {
    const response = await apiClient.get<ContentListResponse>(
      `/contents?page=${pageNo}&pageSize=${pageSize}&category=${category}`
    );
    return response.data;
  },
};

export default contentService;