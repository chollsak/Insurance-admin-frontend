import { z } from "zod";
import { BannerSchema } from "../Content";

export type BannerCreateModel = z.infer<typeof BannerSchema>