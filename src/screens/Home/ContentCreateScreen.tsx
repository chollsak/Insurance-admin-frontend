import { Link, useOutletContext } from "react-router-dom";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography, type SxProps, type Theme } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { BannerInputGroup, BaseContentInputGroup, PromotionInputGroup } from "../../components";
import { ContentFormSchema, defaultBanner, type ContentFormValues } from "../../models";
import { useCreateContent } from "../../hooks";
import { InsuranceInputGroup } from "../../components/Home/Insurance/InsuranceInputGroup";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function ContentCreateScreen() {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
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
                if (response.statusCode === 200 || response.statusCode === 201) {
                    setShowSuccessModal(true);
                }
            },
            onError: (error) => {
                console.error("Error creating content:", error);
            }
        });

    
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
    };

    const handleModalConfirm = () => {
        setShowSuccessModal(false);
    };

    return (
        <>
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
                {watch("category") === "INSURANCE" && (
                    <InsuranceInputGroup sx={{
                        maxWidth: "430px",
                        width: "100%",
                        height: "100%",
                        bgcolor: "#FFFFFF",
                    }} />
                )}
            </Box>
        </FormProvider>
        <Dialog
                open={showSuccessModal}
                onClose={handleModalClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        padding: 2,
                    }
                }}
            >
                <DialogContent sx={{ textAlign: "center", py: 4 }}>
                    <Box sx={{ mb: 2 }}>
                        {/* Success Icon */}
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
                            }}
                        >
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
                        }}
                    >
                        สร้างสำเร็จ!
                    </Typography>
                    
                    <Typography
                        sx={{
                            color: "#666",
                            fontSize: "16px",
                            mb: 3,
                        }}
                    >
                        เนื้อหาได้ถูกสร้างเรียบร้อยแล้ว
                    </Typography>
                </DialogContent>
                
                <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                    <Button
                        onClick={handleModalConfirm}
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
                        }}
                    >
                        ตกลง
                    </Button>
                </DialogActions>
            </Dialog>
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