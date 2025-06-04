import { FormProvider, useForm } from "react-hook-form";
import { ContentFormSchema, type ContentFormValues } from "../../../models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateContent } from "../../../hooks";
import { BaseContentInputGroup } from "./BaseContentInputGroup";
import { BannerInputGroup } from "../Banner";
import { PromotionInputGroup } from "../Promotion";
import { InsuranceInputGroup } from "../Insurance";

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

    const category = watch("category");

    const { mutateAsync: createContent } = useCreateContent();

    const [isShowSuccesModal, setIsShowSuccessModal] = useState<boolean>(false);
    function handleToggleSuccessModal() {
        setIsShowSuccessModal(prev => !prev);
    }

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const onSubmit = async (data: ContentFormValues) => {
        if (mode === "create") {
            console.log("data", data);
            await createContent(data);
            handleToggleSuccessModal();
        } else {
            const changedValues = Object.fromEntries(
                Object.entries(data).filter(([key, val]) => val !== defaultValues?.[key as keyof ContentFormValues])
            );
            console.log("changed values", changedValues);
        }
    };

    return (
        <>
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
                {category === "INSURANCE" && (
                    <InsuranceInputGroup sx={{
                        maxWidth: "430px",
                        width: "100%",
                        height: "100%",
                        bgcolor: "#FFFFFF",
                    }} />
                )}

            </FormProvider>
            <Dialog
                open={isShowSuccesModal}
                onClose={handleToggleSuccessModal}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: "12px",
                            padding: 2,
                        },
                    }
                }}>
                <DialogContent sx={{ textAlign: "center", py: 4 }}>
                    <Box sx={{ mb: 2 }}>
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                bgcolor: "#4CAF50",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto",
                                mb: 2,
                            }}>
                            <Typography sx={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
                                ✓
                            </Typography>
                        </Box>
                    </Box>

                    <Typography
                        variant="h5"
                        sx={{
                            color: "#05058C",
                            fontWeight: "bold",
                            mb: 1,
                        }}>
                        สร้างสำเร็จ!
                    </Typography>

                    <Typography
                        sx={{
                            color: "#666",
                            fontSize: "16px",
                            mb: 3,
                        }}>
                        เนื้อหาได้ถูกสร้างเรียบร้อยแล้ว
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                    <Button
                        onClick={handleToggleSuccessModal}
                        variant="contained"
                        sx={{
                            bgcolor: "#05058C",
                            color: "white",
                            px: 4,
                            py: 1,
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "500",
                            "&:hover": {
                                bgcolor: "#03034A",
                            },
                        }}>
                        ตกลง
                    </Button>
                </DialogActions>
            </Dialog >
        </>
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