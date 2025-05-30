import { useQuery } from "@tanstack/react-query"
import { contentService } from "../api/services"
import type { ContentCategory } from "../models"

export const useContentsQuery = (
    category: 'ALL' | ContentCategory,
    pageNo = 0,
    pageSize = 10
) => {
    return useQuery({
        queryKey: ["contents", category, pageNo, pageSize],
        queryFn: () =>
            contentService.getAllContents(category, pageNo, pageSize),
    })
}