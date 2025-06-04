import { FormProvider, useForm } from "react-hook-form";
import { ContentFormSchema, type ContentFormValues } from "../../../models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateContent } from "../../../hooks";
import { BaseContentInputGroup } from "./BaseContentInputGroup";
import { BannerInputGroup } from "../Banner";
import { PromotionInputGroup } from "../Promotion";

interface IContentFromProps {
    mode: "create" | "edit";
    defaultValues?: Partial<ContentFormValues>;
    contentId?: string;
}

export function ContentForm({ mode, defaultValues }: IContentFromProps) {
    const methods = useForm<ContentFormValues>({
        resolver: zodResolver(ContentFormSchema),
        defaultValues: defaultValues,
    });
    const { handleSubmit, watch, reset, formState: { isSubmitting } } = methods;

    const { mutate: createContent } = useCreateContent();
    const category = watch("category");

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const onSubmit = (data: ContentFormValues) => {
        if (mode === "create") {
            console.log("data", data);
            createContent(data);
        } else {
            const changedValues = Object.fromEntries(
                Object.entries(data).filter(([key, val]) => val !== defaultValues?.[key as keyof ContentFormValues])
            );
            console.log("changed values", changedValues);
        }
    };

    return (
        <FormProvider {...methods}>
            <Box sx={{
                maxWidth: "1010px",
                width: "100%",
            }}>
                <ContentHeader />
                <Box sx={{
                    display: "flex",
                }}>
                    <BaseContentInputGroup isEditMode={mode === "edit"} />
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
                            {mode === "create" ? (isSubmitting ? "Saving..." : "Save") : (isSubmitting ? "Editing..." : "Edit")}
                        </Button>
                    </Box>
                </Box>
            </Box>
            {category === "BANNER" && (
                <BannerInputGroup sx={{
                    maxWidth: "430px",
                    width: "100%",
                    height: "100%",
                    bgcolor: "#FFFFFF",
                }} />
            )}
            {category === "PROMOTION" && (
                <PromotionInputGroup sx={{
                    maxWidth: "430px",
                    width: "100%",
                    height: "100%",
                    bgcolor: "#FFFFFF",
                }} />
            )}

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