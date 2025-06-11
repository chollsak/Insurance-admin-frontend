import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { BannerModel, ContentFormValues } from "../../../models";
import { Box, Typography } from "@mui/material";
import { getImageUrl } from "../../../utils";

interface IPreviewBannerProps {
    isEditMode: boolean;
    banner?: BannerModel;
}

export function PreviewBanner({ isEditMode, banner }: IPreviewBannerProps) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardWidth = 100;
    const gap = 4;
    const useSmallFont = windowWidth <= 1450;

    const { watch } = useFormContext<ContentFormValues>();
    const coverImage = watch("coverImage");
    const contents = watch("contents");

    const backgroundImageUrl = coverImage.type === "" ? isEditMode ? getImageUrl(banner?.coverImagePath) ?? "/src/assets/img/fallback/default-banner-cover.JPG" : "/src/assets/img/fallback/default-banner-cover.JPG" : URL.createObjectURL(coverImage);

    const contentImageUrls = contents.map(content => {
        if (isEditMode) {
            if (content.contentImage.type === "") {
                const bannerContent = banner?.contents.find(bc => bc.id === content.contentItemId);
                if (!bannerContent) {
                    return "/src/assets/img/fallback/default-banner-content.JPG";
                }

                return getImageUrl(bannerContent.contentImagePath) ?? "/src/assets/img/fallback/default-banner-content.JPG";
            } else {
                return URL.createObjectURL(content.contentImage);
            }
        } else {
            if (content.contentImage.type === "") {
                return "/src/assets/img/fallback/default-banner-content.JPG";
            } else {
                return URL.createObjectURL(content.contentImage);
            }
        }
    });

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (contents.length === 0) return;

        const interval = setInterval(() => {
            const scrollContainer = scrollRef.current;
            if (scrollContainer) {
                const scrollAmount = cardWidth + gap;
                const maxScrollLeft =
                    scrollContainer.scrollWidth - scrollContainer.clientWidth;

                if (scrollContainer.scrollLeft + scrollAmount >= maxScrollLeft) {
                    scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
                }
            }
        }, 6000);

        return () => clearInterval(interval);
    }, [cardWidth, gap, contents.length]);

    return (
        <Box
            sx={{
                width: "400px",
                height: "100%",
                padding: 3,
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
                    รายละเอียดเนื้อหา
                </Typography>

                <Box
                    sx={{
                        flex: 1,
                        p: 3,
                        userSelect: "none",
                        overflow: "hidden",
                    }}>
                    <Box
                        width="500"
                        height={150}
                        sx={{
                            backgroundImage: `url(${backgroundImageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: useSmallFont ? "80px" : "130px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(57, 120, 233, 0.4)",
                                zIndex: 1,
                            },
                        }}>
                        <Box
                            sx={{
                                width: "300px",
                                position: "relative",
                                zIndex: 2,
                                marginLeft: "-80px",
                            }}>
                            {contents.length === 0 ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: `${cardWidth}px`,
                                        color: "white",
                                        fontSize: "18px",
                                    }}>
                                    ไม่มีเนื้อหาสำหรับแสดง
                                </Box>
                            ) : (
                                <Box
                                    width={300}
                                    ref={scrollRef}
                                    sx={{
                                        display: "flex",
                                        gap: `${gap}px`,
                                        overflowX: "auto",
                                        overflowY: "hidden",
                                        scrollbarWidth: "thin",
                                        "&::-webkit-scrollbar": { height: "6px" },
                                        "&::-webkit-scrollbar-track": {
                                            background: "rgba(255, 255, 255, 0.1)",
                                            borderRadius: "10px",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            background: "rgba(255, 255, 255, 0.3)",
                                            borderRadius: "10px",
                                            "&:hover": {
                                                background: "rgba(255, 255, 255, 0.5)",
                                            },
                                        },
                                        padding: "10px 5px",
                                        scrollBehavior: "smooth",
                                        cursor: "grab",
                                        "&:active": {
                                            cursor: "grabbing",
                                        },
                                    }}>
                                    {contentImageUrls.map((src, index) => {
                                        const href = contents[index]?.contentHyperLink || "#";

                                        return (
                                            <Box
                                                key={index}
                                                component="a"
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{
                                                    display: "block",
                                                    textDecoration: "none",
                                                }}>
                                                <Box
                                                    component="img"
                                                    src={src}
                                                    alt={`Content ${index + 1}`}
                                                    draggable={false}
                                                    sx={{
                                                        width: `${cardWidth}px`,
                                                        height: `${cardWidth}px`,
                                                        objectFit: "cover",
                                                        borderRadius: "12px",
                                                        flexShrink: 0,
                                                        userSelect: "none",
                                                        border: src.startsWith("blob:")
                                                            ? "2px solid rgba(255,255,255,0.3)"
                                                            : "none",
                                                    }}
                                                    onError={(e) => {
                                                        console.error(
                                                            `Error loading content image ${index}`
                                                        );
                                                        e.currentTarget.src = "/src/assets/img/fallback/default-banner-content.JPG";
                                                    }}
                                                />
                                            </Box>
                                        );
                                    })}
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}