import type { ApiResponse, ContentCategory, ContentStatus } from "../common";

export interface ContentModel {
    id: string;
    title: string;
    status: ContentStatus;
    category: ContentCategory;
    categoryContentId: string;
}

export interface Paging {
    pageNo: number;
    pageSize: number;
    rowsPerPageOption: number[];
    totalPage: number;
    totalRow: number;
}

export interface ContentResponse {
    content: ContentModel[];
    paging: Paging;
}

export type ContentListResponse = ApiResponse<ContentResponse>;