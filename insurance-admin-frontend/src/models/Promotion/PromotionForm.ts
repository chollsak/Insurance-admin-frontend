import { z } from "zod";
import { PromotionSchema } from "../Content";

export type PromotionCreateModel = z.infer<typeof PromotionSchema>