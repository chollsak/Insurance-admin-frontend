import type { ContentCategory, ContentStatus } from "./BaseContentForm";

export interface ContentCommonModel {
    id: string;
    title: string;
    effectiveFrom: string;
    effectiveTo: string;
    status: ContentStatus;
    category: ContentCategory;
}