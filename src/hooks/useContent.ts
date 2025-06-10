import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ContentCategory, ContentFormValues, ContentModel } from "../models"
import { bannerService, contentService, insuranceService, promotionService, suitInsuranceService } from "../services"
import { contentCategoryApiMap } from "../common"

export const useContentsQuery = (
    category: "ALL" | ContentCategory,
    pageNo = 0,
    pageSize = 10
) => {
    return useQuery({
        queryKey: ["contents", category, pageNo, pageSize],
        queryFn: () =>
            contentService.getAllContents(category, pageNo, pageSize),
    })
}

export const useCreateContent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ContentFormValues) => {
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("status", data.status);
            formData.append("effectiveFrom", data.effectiveDate[0]?.format("YYYY-MM-DDTHH:mm:ss") ?? "");
            formData.append("effectiveTo", data.effectiveDate[1]?.format("YYYY-MM-DDTHH:mm:ss") ?? "");

            if (data.category === "BANNER") {
                formData.append("coverImage", data.coverImage);
                formData.append("coverHyperLink", data.coverHyperLink);
                data.contents.forEach((c, idx) => {
                    formData.append(`contents[${idx}].contentImage`, c.contentImage);
                    formData.append(`contents[${idx}].contentHyperLink`, c.contentHyperLink);
                });

                return bannerService.createBanner(formData);
            } else if (data.category === "PROMOTION") {
                formData.append("coverImage", data.coverImage);
                formData.append("coverHyperLink", data.coverHyperLink);
                formData.append("titleTh", data.titleTh);
                formData.append("titleEn", data.titleEn);
                formData.append("descriptionTh", data.descriptionTh);
                formData.append("descriptionEn", data.descriptionEn);
                formData.append("startDate", data.startEndDate[0]?.format("YYYY-MM-DDTHH:mm:ss") ?? "");
                formData.append("endDate", data.startEndDate[1]?.format("YYYY-MM-DDTHH:mm:ss") ?? "");

                return promotionService.createPromotion(formData);
            } else if (data.category === "INSURANCE") {
                formData.append("coverImage", data.coverImage);
                formData.append("iconImage", data.iconImage);
                formData.append("titleTh", data.titleTh);
                formData.append("titleEn", data.titleEn);
                formData.append("descriptionTh", data.descriptionTh);
                formData.append("descriptionEn", data.descriptionEn);

                return insuranceService.createInsurance(formData);
            } else if (data.category === "SUIT_INSURANCE") {
                formData.append("image", data.image);
                formData.append("titleTh", data.titleTh);
                formData.append("titleEn", data.titleEn);

                return suitInsuranceService.createSuitInsurance(formData);
            }
            throw new Error("Invalid category");
        },
        onSuccess: (response, requestData) => {
            console.log("response", response);
            queryClient.invalidateQueries({ queryKey: ["contents", requestData.category], exact: false })
            queryClient.invalidateQueries({ queryKey: ["contents", "ALL"], exact: false })
        },
        onError: (error) => {
            console.error("error", error.message);
        }
    })
}

export const useUpdateContent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data, category }: { id: string; data: any, category: ContentCategory, contentId: string }) => {
            const formData = new FormData();

            if (data.title) formData.append("title", data.title);
            if (data.status) formData.append("status", data.status);
            if (data.effectiveDate?.[0]) formData.append("effectiveFrom", data.effectiveDate[0].format("YYYY-MM-DDTHH:mm:ss"));
            if (data.effectiveDate?.[1]) formData.append("effectiveTo", data.effectiveDate[1].format("YYYY-MM-DDTHH:mm:ss"));

            if (category === "BANNER") {
                if (data.coverImage) formData.append("coverImage", data.coverImage);
                if (data.coverHyperLink) formData.append("coverHyperLink", data.coverHyperLink);

                if (data.contentRemoves) formData.append("contentRemoves", data.contentRemoves);

                data.contentUpdates?.forEach((c: {
                    id: string;
                    contentImage?: File;
                    contentHyperLink?: string;
                }, idx: number) => {
                    formData.append(`contentUpdates[${idx}].id`, c.id);
                    if (c.contentImage) formData.append(`contentUpdates[${idx}].contentImage`, c.contentImage);
                    if (c.contentHyperLink) formData.append(`contentUpdates[${idx}].contentHyperLink`, c.contentHyperLink);
                });

                data.contentCreates?.forEach((c: {
                    contentImage: File;
                    contentHyperLink: string;
                }, idx: number) => {
                    formData.append(`contentCreates[${idx}].contentImage`, c.contentImage);
                    formData.append(`contentCreates[${idx}].contentHyperLink`, c.contentHyperLink);
                });

                return bannerService.updateBannerById(id, formData);
            } else if (category === "PROMOTION") {
                if (data.coverImage) formData.append("coverImage", data.coverImage);
                if (data.coverHyperLink) formData.append("coverHyperLink", data.coverHyperLink);
                if (data.titleTh) formData.append("titleTh", data.titleTh);
                if (data.titleEn) formData.append("titleEn", data.titleEn);
                if (data.descriptionTh) formData.append("descriptionTh", data.descriptionTh);
                if (data.descriptionEn) formData.append("descriptionEn", data.descriptionEn);
                if (data.startEndDate?.[0]) formData.append("startDate", data.startEndDate[0].format("YYYY-MM-DDTHH:mm:ss"));
                if (data.startEndDate?.[1]) formData.append("endDate", data.startEndDate[1].format("YYYY-MM-DDTHH:mm:ss"));

                return promotionService.updatePromotionById(id, formData);
            } else if (category === "INSURANCE") {
                if (data.coverImage) formData.append("coverImage", data.coverImage);
                if (data.iconImage) formData.append("iconImage", data.iconImage);
                if (data.titleTh) formData.append("titleTh", data.titleTh);
                if (data.titleEn) formData.append("titleEn", data.titleEn);
                if (data.descriptionTh) formData.append("descriptionTh", data.descriptionTh);
                if (data.descriptionEn) formData.append("descriptionEn", data.descriptionEn);

                return insuranceService.updateInsuranceById(id, formData);
            } else if (category === "SUIT_INSURANCE") {
                if (data.image) formData.append("image", data.image);
                if (data.titleTh) formData.append("titleTh", data.titleTh);
                if (data.titleEn) formData.append("titleEn", data.titleEn);

                return suitInsuranceService.updateSuitInsuranceById(id, formData);
            }
            throw new Error("Invalid category");
        },
        onSuccess: (response, requestData) => {
            console.log("response", response);
            queryClient.invalidateQueries({ queryKey: ["content", requestData.contentId] });
            queryClient.invalidateQueries({ queryKey: ["contents", requestData.category], exact: false });
            queryClient.invalidateQueries({ queryKey: ["contents", "ALL"], exact: false });
        },
        onError: (error) => {
            console.error("error", error.message);
        }
    });
}

export const useDeleteContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: ContentModel) => {
            return contentService.deleteContentByContentCategoryId(data.categoryContentId, contentCategoryApiMap[data.category]);
        },
        onSuccess: (response, requestData) => {
            console.log("response", response);
            queryClient.invalidateQueries({ queryKey: ["contents", requestData.category], exact: false })
            queryClient.invalidateQueries({ queryKey: ["contents", "ALL"], exact: false })
        },
        onError: (error) => {
            console.error("error", error.message);
        }
    })
}

export const useContentQueryById = (id: string) => {
    return useQuery({
        queryKey: ["content", id],
        queryFn: () => contentService.getContentById(id),
        enabled: !!id,
    });
};