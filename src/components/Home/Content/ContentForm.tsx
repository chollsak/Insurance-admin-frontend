import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ContentFormSchema, type ContentFormValues } from "../../../models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateContent, useUpdateContent } from "../../../hooks";
import { BaseContentInputGroup } from "./BaseContentInputGroup";
import { BannerInputGroup } from "../Banner";
import { PromotionInputGroup } from "../Promotion";
import { InsuranceInputGroup } from "../Insurance";
import { SuitInsuranceInputGroup } from "../SuitInsurance";

interface IContentFromProps {
    mode: "create" | "edit";
    defaultValues?: Partial<ContentFormValues>;
    id?: string;
    contentId?: string;
}

export function ContentForm({ mode, defaultValues, id, contentId }: IContentFromProps) {
    const methods = useForm<ContentFormValues>({
        resolver: zodResolver(ContentFormSchema),
        defaultValues: defaultValues,
    });
    const { handleSubmit, watch, reset, formState: { isSubmitting, dirtyFields } } = methods;

    const category = watch("category");

    const { mutateAsync: createContent } = useCreateContent();
    const { mutateAsync: updateContent } = useUpdateContent();

    const [isCoverImageChanged, setIsCoverImageChanged] = useState<boolean>(false);
    const [isIconImageChanged, setIsIconImageChanged] = useState<boolean>(false);
    const [isImageChanged, setIsImageChanged] = useState<boolean>(false);

    const [contentRemoveIds, setContentRemoveIds] = useState<string[]>([]);
    const [contentImageUpdates, setContentImageUpdates] = useState<Map<string, File>>(new Map());

    function handleRemoveContentItem(id: string) {
        setContentRemoveIds(prev => [...prev, id]);
    }

    function handleUpdateContentItemImage(image: { id: string; contentImage: File }) {
        setContentImageUpdates(prev => {
            const newMap = new Map(prev);
            newMap.set(image.id, image.contentImage);
            return newMap;
        });
    }

    const [isShowSuccesModal, setIsShowSuccessModal] = useState<boolean>(false);
    function handleToggleSuccessModal() {
        setIsShowSuccessModal(prev => !prev);
    }

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const onSubmit = async (data: ContentFormValues) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (mode === "create") {
            console.log("data", data);
            await createContent(data);
        } else {
            const modifiedData: any = {};

            Object.keys(dirtyFields).forEach((key) => {
                const fieldKey = key as keyof ContentFormValues;
                if (dirtyFields[fieldKey] === true) {
                    modifiedData[fieldKey] = data[fieldKey];
                } else if (fieldKey === "effectiveDate" && dirtyFields["effectiveDate"]?.[0] !== null && dirtyFields["effectiveDate"]?.[1] != null) {
                    modifiedData.effectiveDate = data.effectiveDate;
                }
            });

            if (data.category === "BANNER") {
                if (isCoverImageChanged) {
                    modifiedData["coverImage"] = data.coverImage;
                }

                if (contentRemoveIds.length > 0) {
                    modifiedData["contentRemoves"] = contentRemoveIds;
                }

                const contentCreates: { contentImage: File, contentHyperLink: string }[] = [];
                const contentUpdates: { id: string, contentImage?: File, contentHyperLink?: string }[] = [];

                data.contents.forEach(content => {
                    if (content.contentItemId === undefined) {
                        contentCreates.push({
                            contentImage: content.contentImage,
                            contentHyperLink: content.contentHyperLink,
                        });
                    } else {
                        const updatedImage = contentImageUpdates.get(content.contentItemId);

                        contentUpdates.push({
                            id: content.contentItemId,
                            contentHyperLink: content.contentHyperLink,
                            ...(updatedImage && { contentImage: updatedImage }),
                        });
                    }
                });

                if (contentCreates.length > 0) {
                    modifiedData["contentCreates"] = contentCreates;
                }

                if (contentUpdates.length > 0) {
                    modifiedData["contentUpdates"] = contentUpdates;
                }
            } else if (data.category === "PROMOTION") {
                if (isCoverImageChanged) {
                    modifiedData["coverImage"] = data.coverImage;
                }

                if (typeof dirtyFields["startEndDate"] === "object" && dirtyFields["startEndDate"]?.[0] !== null && dirtyFields["startEndDate"]?.[1] != null) {
                    modifiedData["startEndDate"] = data.startEndDate;
                }

            } else if (data.category === "INSURANCE") {
                if (isCoverImageChanged) {
                    modifiedData["coverImage"] = data.coverImage;
                }
                if (isIconImageChanged) {
                    modifiedData["iconImage"] = data.iconImage;
                }
            }
            else if (data.category === "SUIT_INSURANCE") {
                if (isImageChanged) {
                    modifiedData["image"] = data.image;
                }
            }

            console.log("modified data", modifiedData);
            await updateContent({ id: id!, data: modifiedData, category: category, contentId: contentId! })
        }
        handleToggleSuccessModal();
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
                    <BannerInputGroup
                        setIsCoverImageChanged={setIsCoverImageChanged}
                        handleRemoveContentItem={handleRemoveContentItem}
                        handleUpdateContentItemImage={handleUpdateContentItemImage}
                        sx={{
                            maxWidth: "430px",
                            width: "100%",
                            height: "100%",
                            bgcolor: "#FFFFFF",
                        }} />
                )}
                {category === "PROMOTION" && (
                    <PromotionInputGroup
                        setIsCoverImageChanged={setIsCoverImageChanged}
                        sx={{
                            maxWidth: "430px",
                            width: "100%",
                            height: "100%",
                            bgcolor: "#FFFFFF",
                        }} />
                )}
                {category === "INSURANCE" && (
                    <InsuranceInputGroup
                        setIsCoverImageChanged={setIsCoverImageChanged}
                        setIsIconImageChanged={setIsIconImageChanged}
                        sx={{
                            maxWidth: "430px",
                            width: "100%",
                            height: "100%",
                            bgcolor: "#FFFFFF",
                        }} />
                )}
                {category === "SUIT_INSURANCE" && (
                    <SuitInsuranceInputGroup
                        setIsImageChanged={setIsImageChanged}
                        sx={{
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
                        {mode === "edit" ? "แก้ไขสำเร็จ!" : "สร้างสำเร็จ!"}
                    </Typography>

                    <Typography
                        sx={{
                            color: "#666",
                            fontSize: "16px",
                            mb: 3,
                        }}>
                        {mode === "edit" ? "เนื้อหาได้ถูกอัพเดตเรียบร้อยแล้ว!" : "เนื้อหาได้ถูกสร้างเรียบร้อยแล้ว!"}
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
        <Box
            sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "flex-end",
                borderBottom: "1px solid #BDBDBD",
                minHeight: "60px"
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