import type { ContentStatus } from "./BaseContentForm";

export interface ContentCommonModel {
    id: string;
    title: string;
    effectiveFrom: string;
    effectiveTo: string;
    status: ContentStatus;
}