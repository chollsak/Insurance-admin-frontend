import { useOutletContext, useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { useContentQueryById } from "../../hooks";
import { ContentForm } from "../../components";
import type {
    BannerFormValues,
    BannerModel,
    ContentFormValues,
    InsuranceModel,
    PromotionFormValues,
    PromotionModel,
    SuitInsuranceModel
} from "../../models";
import { getImageUrl, imageUrlToFile, parseIsoToDayjs } from "../../utils";
import type { Dayjs } from "dayjs";
import { useQuery } from "@tanstack/react-query";

export default function EditScreen() {
    const { sx } = useOutletContext<{ sx?: SxProps<Theme> }>();
    const { id } = useParams<{ id: string }>();
    const { data: rawData, isLoading: isRawLoading } = useContentQueryById(id!);

    const {
        data: defaultValues,
        isLoading: isTransformLoading,
        isError,
    } = useQuery({
        queryKey: ["defaultFormValues", id],
        queryFn: async () => {
            if (!rawData?.data) throw new Error("No content");
            return await mapContentResponseToDefaultFormValues(rawData.data);
        },
        enabled: !!rawData?.data,
    });

    if (isRawLoading || isTransformLoading) return <Box>Loading...</Box>;
    if (isError || !defaultValues) return <Box>Error or no data</Box>;

    return (
        <Container
            disableGutters={true}
            sx={{
                ...sx,
                display: "flex",
                bgcolor: "#F7FAFC",
                overflowY: "hidden",
            }}>
            <ContentForm mode="edit" defaultValues={defaultValues} contentId={id} />
        </Container>
    );
}

async function mapContentResponseToDefaultFormValues(
    content: BannerModel | PromotionModel | SuitInsuranceModel | InsuranceModel
): Promise<ContentFormValues | undefined> {
    const title = content.title;
    const status = content.status;
    const effectiveDate: [Dayjs | null, Dayjs | null] = [
        parseIsoToDayjs(content.effectiveFrom),
        parseIsoToDayjs(content.effectiveTo)
    ];

    if (content.category === "BANNER") {
        const defaultBanner: BannerFormValues = {
            category: "BANNER",
            title: title,
            status: status,
            effectiveDate: effectiveDate,
            coverImage: await imageUrlToFile(getImageUrl(content.coverImagePath)!, content.coverImagePath),
            coverHyperLink: content.coverHyperLink,
            contents: await Promise.all(
                content.contents.map(async (bc) => ({
                    contentImage: await imageUrlToFile(getImageUrl(bc.contentImagePath)!, bc.contentImagePath),
                    contentHyperLink: bc.contentImagePath
                }))
            ),
        };

        return defaultBanner;
    } else if (content.category === "PROMOTION") {
        const startEndDate: [Dayjs | null, Dayjs | null] = [
            parseIsoToDayjs(content.startDate),
            parseIsoToDayjs(content.endDate),
        ]

        const defaultPromotion: PromotionFormValues = {
            category: "PROMOTION",
            title: title,
            status: status,
            effectiveDate: effectiveDate,
            coverImage: await imageUrlToFile(getImageUrl(content.coverImagePath)!, content.coverImagePath),
            coverHyperLink: "https://www.youtube.com/watch?v=_XQ_9qaQsQU&t=779s",
            titleTh: content.titleTh,
            titleEn: content.titleEn,
            descriptionTh: content.descriptionTh,
            descriptionEn: content.descriptionEn,
            startEndDate: startEndDate,
        };

        return defaultPromotion;
    }
}
