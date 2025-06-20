import { Link, useOutletContext } from "react-router-dom";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { Box, Button, Typography, type SxProps, type Theme } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { BannerInputGroup, BaseContentInputGroup, PromotionInputGroup } from "../../components";
import { ContentFormSchema, defaultBanner, type ContentFormValues } from "../../models";
import { useCreateContent } from "../../hooks";

export default function ContentCreateScreen() {
    const { sx } = useOutletContext<{ sx?: SxProps<Theme> }>();
    const methods = useForm<ContentFormValues>({
        resolver: zodResolver(ContentFormSchema),
        defaultValues: defaultBanner,
    });
    const { handleSubmit, formState: { isSubmitting }, watch } = methods;
    const { mutate: createContent } = useCreateContent();

    const onSubmit: SubmitHandler<ContentFormValues> = async (data) => {
        console.log("Form submitted:", data);
        createContent(data, {
            onSuccess: (response) => {
                console.log("Content created successfully");
                console.log("response", response);
            },
            onError: (error) => {
                console.error("Error creating content:", error);
            }
        });
    };

    return (
        <FormProvider {...methods}>
            <Box sx={{
                ...sx,
                display: "flex",
                bgcolor: "#F7FAFC",
                overflowY: "hidden",
            }}>
                <Box sx={{
                    maxWidth: "1010px",
                    width: "100%",
                }}>
                    <ContentHeader />
                    <Box sx={{
                        display: "flex",
                    }}>
                        <BaseContentInputGroup />
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "578px",
                            flex: 3,
                        }}>
                            <DisplayPreviewBanner />
                            <Button
                                disabled={isSubmitting}
                                type="button"
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                                sx={{ fontSize: "22px", letterSpacing: "1px", lineHeight: "100%", maxWidth: "145px", width: "100%", }}>
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
                {watch("category") === "BANNER" && (
                    <BannerInputGroup sx={{
                        maxWidth: "430px",
                        width: "100%",
                        height: "100%",
                        bgcolor: "#FFFFFF",
                    }} />
                )}
                {watch("category") === "PROMOTION" && (
                    <PromotionInputGroup sx={{
                        maxWidth: "430px",
                        width: "100%",
                        height: "100%",
                        bgcolor: "#FFFFFF",
                    }} />
                )}
            </Box>
        </FormProvider>
    )
}

function ContentHeader() {
    return (
        <Box sx={{
            minHeight: "59px",
            display: "flex",
            gap: 1.5,
            alignItems: "flex-end",
            borderBottom: "1px solid #BDBDBD",
            ml: 3,
        }}>
            <Typography
                variant="h5"
                component="h1"
                sx={{
                    color: "#05058C",
                    fontWeight: "bold",
                    fontSize: "24px",
                }}>
                ข่าวสารและกิจกรรม
            </Typography>
            <Typography
                sx={{
                    color: "#666",
                    fontSize: "24px",
                    fontWeight: "900",
                }}>
                |
            </Typography>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}>
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#4285F4",

                        gap: "4px",
                    }}>
                    <Box
                        component="img"
                        src="/src/assets/img/news/homeicon.png"
                        sx={{ width: "16px", height: "16px" }} />
                    <Typography sx={{
                        fontSize: "24px",
                        fontWeight: "light",
                        lineHeight: "100%",
                    }}>Home</Typography>
                </Link>
                <Typography
                    sx={{
                        color: "#515252",
                        fontSize: "24px"
                    }}>
                    /
                </Typography>
                <Typography sx={{ color: "#515252", fontSize: "20px" }}>
                    ข่าวสารและกิจกรรม
                </Typography>
                <Typography
                    sx={{
                        color: "#515252",
                        fontSize: "24px"
                    }}>
                    /
                </Typography>
                <Typography sx={{ color: "#515252", fontSize: "20px" }}>
                    Create
                </Typography>
            </Box>
        </Box>
    )
}

export function DisplayPreviewBanner() {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            padding: 3,
        }}>
            <Box sx={{
                bgcolor: "#F4F5FA",
                width: "100%",
                height: "100%",
            }}>
                <Typography sx={{
                    fontSize: "28px",
                    lineHeight: "100%",
                    borderBottom: "0.5px solid #A7A7A7",
                    px: 3,
                    pt: 2.5,
                    pb: 1.5,
                }}>
                    รายละเอียดเนื้อหา
                </Typography>
            </Box>
        </Box>
    )
}