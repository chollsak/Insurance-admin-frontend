import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ContentCategory, ContentFormValues, ContentModel } from "../models"
import { bannerService, contentService, insuranceService, promotionService } from "../services"
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
                formData.append('titleTh', data.titleTh);
                formData.append('titleEn', data.titleEn);
                formData.append('descriptionTh', data.descriptionTh);
                formData.append('descriptionEn', data.descriptionEn);
                formData.append('startDate', data.startEndDate[0]?.format("YYYY-MM-DDTHH:mm:ss") ?? "");
                formData.append('endDate', data.startEndDate[1]?.format("YYYY-MM-DDTHH:mm:ss") ?? "");
                return promotionService.createPromotion(formData);

            }else if (data.category === "INSURANCE") {
                
                formData.append("coverImage", data.coverImage);
                formData.append("iconImage", data.iconImage);
                formData.append('titleTh', data.titleTh);
                formData.append('titleEn', data.titleEn);
                formData.append('descriptionTh', data.descriptionTh);
                formData.append('descriptionEn', data.descriptionEn);
                formData.append('startDate', data.startEndDate[0]?.format("YYYY-MM-DDTHH:mm:ss") ?? "");
                formData.append('endDate', data.startEndDate[1]?.format("YYYY-MM-DDTHH:mm:ss") ?? "");

                return insuranceService.createInsurance(formData);
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