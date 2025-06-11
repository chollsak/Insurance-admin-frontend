import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Promotion {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    validUntil: string;
    discount: string;
    couponCode: string;
}

interface IPromotionCardProps {
    promotion: Promotion;
    useSmallFont: boolean;
    bgColor?: string;
    width?: number;
    height?: number;
}

export function PromotionCard({ promotion, useSmallFont, bgColor, width }: IPromotionCardProps) {
    return (
        <Box
            sx={{
                width: width || "100%",
                maxWidth: "430px",
                borderRadius: "12px",
                overflow: "hidden",
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                marginTop: "-25px"
            }}>
            <Box
                sx={{
                    bgcolor: bgColor,
                    width: "100%",
                    position: "relative",
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    flexShrink: 0,
                }}>
                <Box
                    component="img"
                    src={promotion.coverImage}
                    alt={promotion.title}
                    draggable={false}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        userSelect: "none",
                    }}
                    onError={(e) => {
                        console.error("Image failed to load:", promotion.coverImage);
                        e.currentTarget.src = "/src/assets/img/fallback/default-promotion.JPG";
                    }}
                />
            </Box>

            <Box
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    minHeight: "150px",
                }}>
                <Typography
                    sx={{
                        fontSize: useSmallFont ? "24px" : "26px",
                        fontWeight: "medium",
                        color: "#05058C",
                        mb: 1,
                        lineHeight: 1.2,
                    }}>
                    {promotion.title}
                </Typography>

                <Typography
                    sx={{
                        color: "#3E4767",
                        mb: "auto",
                        fontSize: useSmallFont ? "18px" : "20px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                        lineHeight: 1.3,
                    }}>
                    {promotion.description}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 0,
                        mb: -2,
                        pt: 0,
                        borderTop: "0px solid #eee",
                    }}>
                    <Typography sx={{ color: "#05058C", fontSize: useSmallFont ? "16px" : "18px" }}>
                        {promotion.validUntil}
                    </Typography>

                    <Button
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            color: "#05058C",
                            fontSize: useSmallFont ? "20px" : "22px",
                            fontWeight: "medium",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "transparent",
                                textDecoration: "underline",
                            },
                        }}>
                        รายละเอียด
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}