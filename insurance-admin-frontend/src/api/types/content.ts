import type { ApiResponse } from './apiResponses';

export type ContentCategory = 'BANNER' | 'INSURANCE' | 'PROMOTION' | 'SUIT_INSURANCE';

export interface Content {
  id: string;
  title: string;
  status: string;
  category: ContentCategory;
  categoryContentId: string;
}

export interface PagingInfo {
  pageNo: number;
  pageSize: number;
  rowsPerPageOption: number[];
  totalPage: number;
  totalRow: number;
}

export interface ContentListData {
  content: Content[];
  paging: PagingInfo;
}

export type ContentListResponse = ApiResponse<ContentListData>;