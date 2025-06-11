import { Controller, useFieldArray, useFormContext, type FieldErrors } from "react-hook-form";
import { Box, Button, Divider, FormControl, IconButton, Stack, TextField, Typography, useMediaQuery, type SxProps, type Theme } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import type { BannerFormValues, ContentCategory, ContentFormValues } from "../../../models";
import { SmartTruncateText } from "../../common";
import { useCallback, type Dispatch, type SetStateAction } from "react";

const getBannerErrors = (category: ContentCategory, errors: FieldErrors<ContentFormValues>): FieldErrors<BannerFormValues> | null => {
    if (category === "BANNER") {
        return errors as FieldErrors<BannerFormValues>;
    }
    return null;
};

interface IBannerInputGroups {
    setIsCoverImageChanged: Dispatch<SetStateAction<boolean>>;
    handleRemoveContentItem: (id: string) => void;
    handleUpdateContentItemImage: (image: { id: string; contentImage: File }) => void;
    sx?: SxProps<Theme>,
}

export function BannerInputGroup({ setIsCoverImageChanged, handleRemoveContentItem, handleUpdateContentItemImage, sx }: IBannerInputGroups) {
    return (
        <Box sx={{ ...sx, display: "flex", flexDirection: "column" }}>
            <BannerHeader />
            <Box sx={{
                flex: 1,
                overflowY: "auto",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}>
                <CoverInputGroup setIsCoverImageChanged={setIsCoverImageChanged} />
                <ContentInputGroup
                    handleUpdateContentItemImage={handleUpdateContentItemImage}
                    handleRemoveContentItem={handleRemoveContentItem} />
            </Box>
        </Box>
    );
}

function BannerHeader() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                minHeight: "59px",
                gap: 0.5
            }}>
            <IconButton>
                <KeyboardBackspaceIcon
                    sx={{ width: 24, height: 24, color: "#6F7072" }}
                />
            </IconButton>
            <Typography
                sx={{ color: "#05058C", fontWeight: 500, fontSize: "22px" }}>
                เลือกเเสดงผล
            </Typography>
        </Box>
    );
}

interface ICoverInputGroupProps {
    setIsCoverImageChanged: Dispatch<SetStateAction<boolean>>;
}

function CoverInputGroup({ setIsCoverImageChanged }: ICoverInputGroupProps) {
    const isBelow1100 = useMediaQuery('(max-width: 1100px)');

    const {
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext<ContentFormValues>();
    const coverImage = watch("coverImage");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setValue("coverImage", file);
            setIsCoverImageChanged(_prev => true);
        }
    };

    const handleRemoveFile = () => {
        setValue("coverImage", new File([], ""));
    };

    const bannerErrors = getBannerErrors(watch("category"), errors);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "3px", borderBlock: "1px solid #3978E9", px: 3, py: 1, bgcolor: "#F2F8FF" }}>
                <Typography component="span" sx={{ color: "#05058C", fontWeight: 500, fontSize: "20px" }}>
                    ภาพปก
                </Typography>
                <Typography component="span" sx={{ color: "#FF0000" }}>*</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, px: 3 }}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1.5 }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                    }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px", lineHeight: "20px", color: "#3978E9" }}>
                            <Button
                                component="label"
                                variant="outlined"
                                sx={{ borderRadius: "8px", py: 1, maxWidth: "100px", width: "100%", fontSize: "20px", lineHeight: "20px", borderColor: `${!!bannerErrors?.coverImage ? "#d32f2f" : "inherit"}`, color: `${!!bannerErrors?.coverImage ? "#d32f2f" : "inherit"}` }}>
                                เลือกไฟล์
                                <input
                                    name="coverImage"
                                    type="file"
                                    hidden
                                    accept=".jpg,.jpeg"
                                    onChange={handleFileChange}
                                />
                            </Button>

                            {(coverImage.size > 0) && (
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <SmartTruncateText
                                        value={coverImage.name}
                                        maxWidth={isBelow1100 ? 96 : 160}
                                        isFileName={true}
                                        sx={{
                                            textDecoration: "underline",
                                            fontSize: "20px",
                                            lineHeight: "20px",
                                        }} />
                                    <IconButton
                                        onClick={handleRemoveFile}
                                        sx={{ width: "20px", height: "20px", p: 2, color: "#05058C" }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            )}
                        </Box>

                        {bannerErrors?.coverImage && (
                            <Typography color="error" fontSize="12px" px={2}>
                                {bannerErrors?.coverImage.message}
                            </Typography>
                        )}
                    </Box>

                    <Typography sx={{ fontSize: "18px", letterSpacing: "0.3px", lineHeight: "100%", color: "#676767" }}>
                        สกุลไฟล์.jpg ขนาดไฟล์ 374 x 100 px , ขนาดไม่เกิน 100 kb
                    </Typography>
                </Box>

                <Divider sx={{ width: "100%" }} />

                <FormControl error={!!bannerErrors?.coverHyperLink} sx={{ width: "100%", pb: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                component="label"
                                htmlFor="coverHyperLink"
                                sx={{
                                    fontSize: "20px",
                                    width: "fit-content",
                                    color: "#6B6B6B"
                                }}>
                                ลิงก์ <span style={{ color: "#FF0000" }}>*</span>
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                gap: 1,
                            }}>
                                <Controller
                                    name="coverHyperLink"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="coverHyperLink"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            error={!!bannerErrors?.coverHyperLink}
                                            helperText={bannerErrors?.coverHyperLink?.message}
                                        />
                                    )}
                                />
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderRadius: "8px",
                                        fontSize: "20px",
                                        lineHeight: "20px",
                                        py: 1,
                                        maxWidth: "100px",
                                        width: "100%",
                                        height: "min-content",
                                    }}>
                                    เลือกลิงก์
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </FormControl>
            </Box>
        </Box>
    )
}

interface IConetntInputGroups {
    handleRemoveContentItem: (id: string) => void;
    handleUpdateContentItemImage: (image: { id: string; contentImage: File }) => void;
}

function ContentInputGroup({ handleRemoveContentItem, handleUpdateContentItemImage }: IConetntInputGroups) {
    const {
        control,
    } = useFormContext<ContentFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contents",
    })

    const handleAddNewContent = () => {
        if (fields.length < 10) {
            append({ contentImage: new File([], ""), contentHyperLink: "" })
        }
    }

    const handleRemove = useCallback((index: number, contentItemId: string) => {
        handleRemoveContentItem(contentItemId);
        remove(index);
    }, [remove]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%", }}>
            <Box sx={{
                borderBlock: "1px solid #3978E9",
                px: 3,
                py: 1,
                display: "flex",
                justifyContent: "space-between",
                bgcolor: "#F2F8FF",
            }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "3px", }}>
                    <Typography component="span" sx={{ color: "#05058C", fontWeight: 500, fontSize: "20px" }}>
                        Content
                    </Typography>
                    <Typography component="span" sx={{ color: "#FF0000" }}>
                        *
                    </Typography>
                </Box>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography
                        sx={{
                            fontSize: "18px",
                            letterSpacing: "0.3px",
                            lineHeight: "100%",
                            color: "#676767",
                        }}>เพิ่มได้สูงสุด 10 รายการ</Typography>
                    <IconButton
                        onClick={handleAddNewContent}
                        sx={{ width: "20px", height: "20px", p: 2, color: "#05058C" }}>
                        <AddIcon />
                    </IconButton>
                </Stack>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                px: 3,
            }}>
                {fields.length === 0 && (
                    <Typography sx={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 900,
                        color: "#d32f2f",
                    }}>
                        No contents, Please add new content
                    </Typography>
                )}
                {fields.length > 0 && fields.map((field, index) => (
                    <ContentItemInputGroup
                        key={field.id}
                        contentItemId={field.contentItemId}
                        index={index}
                        length={fields.length}
                        onRemove={() => handleRemove(index, field.contentItemId!)}
                        handleUpdateContentItemImage={handleUpdateContentItemImage} />
                ))}
            </Box>
        </Box>
    )
}

interface IContentItemInputGroupProps {
    contentItemId?: string;
    index: number;
    length: number;
    onRemove?: () => void;
    handleUpdateContentItemImage: (image: { id: string; contentImage: File }) => void;
};

export function ContentItemInputGroup({ contentItemId, index, length, onRemove, handleUpdateContentItemImage }: IContentItemInputGroupProps) {
    const isBelow1100 = useMediaQuery('(max-width: 1100px)');

    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<ContentFormValues>();

    const contentImage = watch(`contents.${index}.contentImage`);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(`contents.${index}.contentImage`, file);
            handleUpdateContentItemImage({ id: contentItemId!, contentImage: file })
        }
    };

    const handleRemoveFile = () => {
        setValue(`contents.${index}.contentImage`, new File([], ""));
    };

    const bannerErrors = getBannerErrors(watch("category"), errors);
    const imageError = bannerErrors?.contents?.[index]?.contentImage;
    const linkError = bannerErrors?.contents?.[index]?.contentHyperLink;

    return (
        <Box sx={{ borderBottom: index < length - 1 ? "0.5px solid #E0E3EE" : undefined, display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Box sx={{
                display: "flex",
                gap: 0.5,
            }}>
                <Typography component="span"
                    sx={{
                        color: "#6B6B6B",
                        fontSize: "20px",
                        lineHeight: "100%",
                        fontWeight: 500,
                    }}>
                    Content {index + 1}
                </Typography>
                <Typography component="span" sx={{ color: "#FF0000" }}>
                    *
                </Typography>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                    }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "20px", lineHeight: "20px", color: "#3978E9" }}>
                            <Button
                                component="label"
                                variant="outlined"
                                sx={{
                                    borderRadius: "8px",
                                    py: 1,
                                    maxWidth: "100px",
                                    width: "100%",
                                    fontSize: "20px",
                                    lineHeight: "20px",
                                    borderColor: imageError ? "#d32f2f" : undefined,
                                    color: imageError ? "#d32f2f" : undefined,
                                }}>
                                เลือกไฟล์
                                <input
                                    type="file"
                                    hidden
                                    accept=".jpg,.jpeg"
                                    onChange={handleFileChange}
                                />
                            </Button>

                            {(contentImage?.size > 0) && (
                                <Stack direction="row" alignItems="center" spacing={1} >
                                    <SmartTruncateText
                                        value={contentImage.name}
                                        maxWidth={isBelow1100 ? 96 : 160}
                                        isFileName={true}
                                        sx={{
                                            textDecoration: "underline",
                                            fontSize: "20px",
                                            lineHeight: "20px",
                                        }} />
                                    <IconButton
                                        size="small"
                                        onClick={handleRemoveFile}
                                        sx={{ width: "20px", height: "20px", p: 2, color: "#05058C" }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            )}
                        </Box>

                        {imageError && (
                            <Typography color="error" fontSize="12px" px={2}>
                                {imageError.message}
                            </Typography>
                        )}
                    </Box>
                    <Typography sx={{ fontSize: "18px", letterSpacing: "0.3px", lineHeight: "100%", color: "#676767" }}>
                        สกุลไฟล์.jpg ขนาดไฟล์ 374 x 100 px , ขนาดไม่เกิน 100 kb
                    </Typography>
                </Box>

                <FormControl fullWidth error={!!linkError}>
                    <Typography
                        component="label"
                        htmlFor={`contents.${index}.contentHyperLink`}
                        sx={{
                            color: "#6B6B6B",
                            fontSize: "20px",
                            lineHeight: "100%",
                            mb: 1
                        }}>
                        ลิงก์ <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                    <Controller
                        name={`contents.${index}.contentHyperLink`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={`contents.${index}.contentHyperLink`}
                                fullWidth
                                variant="outlined"
                                size="small"
                                error={!!linkError}
                                helperText={linkError?.message}
                            />
                        )}
                    />
                </FormControl>
            </Box>

            {onRemove && (
                <Button color="error" onClick={onRemove} sx={{ width: "fit-content", mb: 2, border: "16px" }}>
                    ลบรายการนี้
                </Button>
            )}
        </Box>
    );
}