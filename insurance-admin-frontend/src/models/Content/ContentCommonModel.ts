import type { ContentStatus } from "../common/Status";

export interface ContentCommonModel {
    id: string;
    title: string;
    effectiveFrom: string;
    effectiveTo: string;
    status: ContentStatus;
}