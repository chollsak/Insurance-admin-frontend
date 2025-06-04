import { z } from "zod";
import { InsuranceSchema } from "../Content";

export type InsuranceCreateModel = z.infer<typeof InsuranceSchema>