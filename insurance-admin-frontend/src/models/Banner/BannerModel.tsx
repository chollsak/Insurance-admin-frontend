import type { ContentCommonModel } from "../Content/ContentCommonModel";
import type { BannerContentModel } from "./BannerContentModel";

export interface BannerModel extends ContentCommonModel {
    coverImagePath: string;
    coverHyperLink: string;
    content: BannerContentModel[];
}
