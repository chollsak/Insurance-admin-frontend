import { z } from "zod";
import { Dayjs } from "dayjs";

export const ContentCategoryEnum = z.enum(["BANNER", "PROMOTION", "INSURANCE", "SUIT_INSURANCE"]);
export type ContentCategory = z.infer<typeof ContentCategoryEnum>;

export const ContentStatusEnum = z.enum(["ACTIVE", "INACTIVE"]);
export type ContentStatus = z.infer<typeof ContentStatusEnum>;

export const BaseContentSchema = z.object({
    category: ContentCategoryEnum,
    title: z.string().min(3, "title must be at least 3 characters"),
    status: ContentStatusEnum,
    effectiveDate: z
        .tuple([
            z
                .custom<Dayjs | null>((val) => val === null || (val && typeof val === 'object' && 'isValid' in val && val.isValid()), {
                    message: 'Invalid start date',
                }),
            z
                .custom<Dayjs | null>((val) => val === null || (val && typeof val === 'object' && 'isValid' in val && val.isValid()), {
                    message: 'Invalid end date',
                }),
        ])
        .refine(([from, to]) => from && to && (from.isBefore(to) || from.isSame(to, 'day')), {
            message: 'effective from must be before or same as effective to',
        })

});

const MAX_BANNER_CONTENTS = 10;
export const BannerSchema = BaseContentSchema.extend({
    category: z.literal("BANNER"),
    coverImage: z
        .instanceof(File)
        .refine(file => file.size > 0, { message: "โปรดเลือกภาพปก" }),
    coverHyperLink: z.string().url(),
    contents: z.array(
        z.object({
            contentImage: z.instanceof(File).refine(f => f.size > 0, { message: "โปรดเลือกภาพเนื้อหา" }),
            contentHyperLink: z.string().url(),
        })
    ).min(1)
        .max(MAX_BANNER_CONTENTS),
});

export const PromotionSchema = BaseContentSchema.extend({
    category: z.literal("PROMOTION"),
    coverImage: z
        .instanceof(File)
        .refine(file => file.size > 0, { message: "โปรดเลือกภาพปก" }),
    coverHyperLink: z.string().url(),
    titleTh: z.string().min(3, "titleTh must be at least 3 characters"),
    titleEn: z.string().min(3, "titleEn must be at least 3 characters"),
    descriptionTh: z.string().min(3, "descriptionTh must be at least 3 characters"),
    descriptionEn: z.string().min(3, "descriptionEn must be at least 3 characters"),
    startEndDate: z
        .tuple([
            z
                .custom<Dayjs | null>((val) => val === null || (val && typeof val === 'object' && 'isValid' in val && val.isValid()), {
                    message: 'Invalid start date',
                }),
            z
                .custom<Dayjs | null>((val) => val === null || (val && typeof val === 'object' && 'isValid' in val && val.isValid()), {
                    message: 'Invalid end date',
                }),
        ])
        .refine(([from, to]) => from && to && (from.isBefore(to) || from.isSame(to, 'day')), {
            message: 'start date must be before or same as end date',
        })
})

export const InsuranceSchema = BaseContentSchema.extend({
    category: z.literal("INSURANCE"),
    coverImage: z
        .instanceof(File)
        .refine(file => file.size > 0, { message: "โปรดเลือกภาพปก" }),
    coverHyperLink: z.string().url(),
    titleTh: z.string().min(3, "titleTh must be at least 3 characters"),
    titleEn: z.string().min(3, "titleEn must be at least 3 characters"),
    descriptionTh: z.string().min(3, "descriptionTh must be at least 3 characters"),
    descriptionEn: z.string().min(3, "descriptionEn must be at least 3 characters"),
    startEndDate: z
        .tuple([
            z
                .custom<Dayjs | null>((val) => val === null || (val && typeof val === 'object' && 'isValid' in val && val.isValid()), {
                    message: 'Invalid start date',
                }),
            z
                .custom<Dayjs | null>((val) => val === null || (val && typeof val === 'object' && 'isValid' in val && val.isValid()), {
                    message: 'Invalid end date',
                }),
        ])
        .refine(([from, to]) => from && to && (from.isBefore(to) || from.isSame(to, 'day')), {
            message: 'start date must be before or same as end date',
        })
});

export const ContentFormSchema = z.discriminatedUnion("category", [
    BannerSchema,
    PromotionSchema,
    InsuranceSchema,
]);

export type ContentFormValues = z.infer<typeof ContentFormSchema>

export const defaultBanner: z.infer<typeof BannerSchema> = {
    category: "BANNER",
    title: "",
    status: "ACTIVE",
    effectiveDate: [null, null],
    coverImage: new File([], ""),
    coverHyperLink: "",
    contents: [{ contentImage: new File([], ""), contentHyperLink: "" }],
};

export const defaultPromotion: z.infer<typeof PromotionSchema> = {
    category: "PROMOTION",
    title: "",
    status: "ACTIVE",
    effectiveDate: [null, null],
    coverImage: new File([], ""),
    coverHyperLink: "",
    titleTh: "",
    titleEn: "",
    descriptionTh: "",
    descriptionEn: "",
    startEndDate: [null, null],
};

export const defaultInsurance: z.infer<typeof InsuranceSchema> = {
    category: "INSURANCE",
    title: "",
    status: "ACTIVE",
    effectiveDate: [null, null],
    coverImage: new File([], ""),
    coverHyperLink: "",
    titleTh: "",
    titleEn: "",
    descriptionTh: "",
    descriptionEn: "",
    startEndDate: [null, null],
};

