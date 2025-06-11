import { useEffect, useState } from "react";
import type { ContentFormValues, PromotionModel } from "../../../models";
import { useFormContext } from "react-hook-form";
import { getImageUrl } from "../../../utils";
import { Box, Typography } from "@mui/material";
import { PromotionCard } from "./PromotionCard";

interface IPromotionPreviewProps {
    isEditMode: boolean;
    promotion?: PromotionModel;
}

export function PreviewPromotion({ promotion, isEditMode }: IPromotionPreviewProps) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const useSmallFont = windowWidth <= 1450;

    const { watch } = useFormContext<ContentFormValues>();
    const titleTh = watch("titleTh");
    const descriptionTh = watch("descriptionTh");
    const startEndDate = watch("startEndDate");
    const coverImage = watch("coverImage");
    const coverImageUrl = coverImage.type === "" ? isEditMode ? getImageUrl(promotion?.coverImagePath) ?? "/src/assets/img/fallback/default-promotion.JPG" : "/src/assets/img/fallback/default-promotion.JPG" : URL.createObjectURL(coverImage);

    const validUntil = startEndDate && startEndDate[1]
        ? `วันนี้ - ${startEndDate[1].toDate().toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })}`
        : "ไม่ได้กำหนดวันที่";

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const promotionPreview = {
        id: "preview",
        title: titleTh || "ชื่อโปรโมชัน",
        description: descriptionTh || "คำอธิบายโปรโมชัน",
        coverImage: coverImageUrl!,
        validUntil: validUntil,
        discount: "",
        couponCode: "",
    };

    return (
        <Box
            sx={{
                width: "400px",
                height: "480px",
                padding: 2,
            }}>
            <Box
                sx={{
                    bgcolor: "#F4F5FA",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <Typography
                    sx={{
                        fontSize: "22px",
                        lineHeight: "100%",
                        borderBottom: "0.5px solid #A7A7A7",
                        px: 3,
                        pt: 2,
                        pb: 1.5,
                    }}>
                    ตัวอย่างโปรโมชัน
                </Typography>

                <Box
                    sx={{
                        flex: 1,
                        px: 3,
                        pt: 1,
                        userSelect: "none",
                        overflow: "hidden",
                    }}>
                    <Box
                        sx={{
                            display: { xs: "none", md: "block" },
                        }}>
                        <Box
                            sx={{
                                width: 500,
                                p: 3,
                                marginLeft: '-40px',
                                height: "100%",
                                transform: "scale(0.9)",
                                transformOrigin: "top left",
                                marginTop: '20px'
                            }}>
                            <PromotionCard
                                width={350}
                                promotion={promotionPreview}
                                useSmallFont={useSmallFont}
                                bgColor="#a8bbd6" />
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}