import { useOutletContext, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { Dayjs } from "dayjs";
import { useContentQueryById } from "../../hooks";
import { ContentForm } from "../../components";
import type {
    BannerFormValues,
    BannerModel,
    ContentFormValues,
    InsuranceFormValues,
    InsuranceModel,
    PromotionFormValues,
    PromotionModel,
    SuitInsuranceFormValues,
    SuitInsuranceModel
} from "../../models";
import { parseIsoToDayjs } from "../../utils";

export default function ContentEditScreen() {
    const { sx } = useOutletContext<{ sx?: SxProps<Theme> }>();
    const { id: contentId } = useParams<{ id: string }>();
    console.log("content id", contentId!);
    const { data: rawData, isLoading: isRawLoading, isError } = useContentQueryById(contentId!);

    if (isRawLoading) return <Box>Loading...</Box>;
    if (isError || !rawData?.data) return <Box>Error or no data</Box>;

    const defaultValues = mapContentResponseToDefaultFormValues(rawData.data);

    return (
        <Box
            sx={{
                ...sx,
                pl: 3,
                display: "flex",
                bgcolor: "#F7FAFC",
                overflowY: "hidden",
            }}>
            <ContentForm mode="edit" defaultValues={defaultValues} contentId={contentId} id={rawData?.data?.id} />
        </Box>
    );
}

function mapContentResponseToDefaultFormValues(
    content: BannerModel | PromotionModel | SuitInsuranceModel | InsuranceModel
): (ContentFormValues | undefined) {
    const dummyContent = new Uint8Array([32]);
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
            coverImage: new File([dummyContent], content.coverImagePath),
            coverHyperLink: content.coverHyperLink,
            contents: content.contents.map(bc => ({
                contentItemId: bc.id,
                contentImage: new File([dummyContent], bc.contentImagePath),
                contentHyperLink: bc.contentHyperLink,
            }))
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
            coverImage: new File([dummyContent], content.coverImagePath),
            coverHyperLink: "https://www.youtube.com/watch?v=_XQ_9qaQsQU&t=779s",
            titleTh: content.titleTh,
            titleEn: content.titleEn,
            descriptionTh: content.descriptionTh,
            descriptionEn: content.descriptionEn,
            startEndDate: startEndDate,
        };

        return defaultPromotion;
    } else if (content.category === "INSURANCE") {
        const defaultInsurance: InsuranceFormValues = {
            category: "INSURANCE",
            title: title,
            status: status,
            effectiveDate: effectiveDate,
            coverImage: new File([dummyContent], content.coverImagePath),
            iconImage: new File([dummyContent], content.iconImagePath),
            titleTh: content.titleTh,
            titleEn: content.titleEn,
            descriptionTh: content.descriptionTh,
            descriptionEn: content.descriptionEn,
        };

        return defaultInsurance;
    } else if (content.category === "SUIT_INSURANCE") {
        const defaultInsurance: SuitInsuranceFormValues = {
            category: "SUIT_INSURANCE",
            title: title,
            status: status,
            effectiveDate: effectiveDate,
            image: new File([dummyContent], content.imagePath),
            titleTh: content.titleTh,
            titleEn: content.titleEn,
        };

        return defaultInsurance;
    }
}