import type { Dispatch, SetStateAction } from "react";
import { Box, Button, FormControl, IconButton, Stack, TextField, Typography, useMediaQuery, type SxProps, type Theme } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useFormContext, type FieldErrors } from "react-hook-form";
import type { ContentCategory, ContentFormValues, SuitInsuranceFormValues } from "../../../models";
import { SmartTruncateText } from "../../common";

const getSuitInsuranceErrors = (category: ContentCategory, errors: FieldErrors<ContentFormValues>): FieldErrors<SuitInsuranceFormValues> | null => {
    if (category === "INSURANCE") {
        return errors as FieldErrors<SuitInsuranceFormValues>;
    }
    return null;
};

interface ISuitInsuranceInputGroupProps {
    setIsImageChanged: Dispatch<SetStateAction<boolean>>;
    sx?: SxProps<Theme>
}

export function SuitInsuranceInputGroup({ setIsImageChanged, sx }: ISuitInsuranceInputGroupProps) {
    return (
        <Box sx={{ ...sx, display: 'flex', flexDirection: 'column', }}>
            <SuitInsuranceHeader />
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <CoverInputGroup setIsImageChanged={setIsImageChanged} />
                <ContentInputGroup />
            </Box>
        </Box>
    )
}

function SuitInsuranceHeader() {
    return (
        <Box
            sx={{
                minHeight: "58px",
                display: "flex",
                alignItems: "center",
                px: 3,
                gap: 1,
            }}>
            <IconButton>
                <KeyboardBackspaceIcon sx={{ width: 24, height: 24, color: "#6F7072" }} />
            </IconButton>
            <Typography
                sx={{ color: "#05058C", fontWeight: 500, fontSize: "22px" }}>
                เลือกเเสดงผล
            </Typography>
        </Box>
    );
}

interface ICoverInputGroupProps {
    setIsImageChanged: Dispatch<SetStateAction<boolean>>;
}

function CoverInputGroup({ setIsImageChanged }: ICoverInputGroupProps) {
    const isBelow1100 = useMediaQuery('(max-width: 1100px)');

    const {
        formState: { errors },
        setValue,
        watch,
    } = useFormContext<ContentFormValues>();

    const image = watch("image");

    const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setValue("image", file);
            setIsImageChanged(_prev => true);
        }
    };

    const handleImageRemoveFile = () => {
        setValue("image", new File([], ""));
    };

    const suitInsuranceError = getSuitInsuranceErrors(watch("category"), errors);

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
                                sx={{
                                    borderRadius: "8px",
                                    py: 1,
                                    maxWidth: "100px",
                                    width: "100%",
                                    fontSize: "20px",
                                    lineHeight: "20px",
                                    borderColor: `${!!suitInsuranceError?.image ? "#d32f2f" : "inherit"}`,
                                    color: `${!!suitInsuranceError?.image ? "#d32f2f" : "inherit"}`
                                }}>
                                เลือกไฟล์
                                <input
                                    name="image"
                                    type="file"
                                    hidden
                                    accept=".jpg,.jpeg"
                                    onChange={handleImageFileChange} />
                            </Button>

                            {(image && image.size > 0) && (
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <SmartTruncateText
                                        value={image.name}
                                        maxWidth={isBelow1100 ? 96 : 160}
                                        isFileName={true}
                                        sx={{
                                            textDecoration: "underline",
                                            fontSize: "20px",
                                            lineHeight: "20px",
                                        }} />
                                    <IconButton
                                        onClick={handleImageRemoveFile}
                                        sx={{ width: "20px", height: "20px", p: 2, color: "#05058C" }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            )}
                        </Box>

                        {suitInsuranceError?.image && (
                            <Typography color="error" fontSize="12px" px={2}>
                                {suitInsuranceError?.image.message}
                            </Typography>
                        )}
                    </Box>

                    <Typography sx={{ fontSize: "18px", letterSpacing: "0.3px", lineHeight: "100%", color: "#676767" }}>
                        สกุลไฟล์.jpg ขนาดไฟล์ 374 x 100 px , ขนาดไม่เกิน 100 kb
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

function ContentInputGroup() {
    const {
        control,
        formState: { errors },
        watch
    } = useFormContext<ContentFormValues>();

    const insuranceErrors = getSuitInsuranceErrors(watch("category"), errors);

    return (
        <Stack height="100%">
            <Stack direction="row" spacing="3px" alignItems="center"
                sx={{
                    bgcolor: "#F2F8FF",
                    borderBlock: "1px solid #3978E9",
                    px: 3,
                    py: 1,
                }}>
                <Typography component="span" sx={{ color: "#05058C", fontWeight: 500, fontSize: "20px" }}>
                    Content
                </Typography>
                <Typography component="span" sx={{ color: "#FF0000" }}>
                    *
                </Typography>
            </Stack>
            <Stack padding={3} spacing={2}>
                <FormControl error={!!insuranceErrors?.titleTh} sx={{ maxWidth: "341px", width: "100%", gap: 1 }}>
                    <Typography component="label" htmlFor="titleTh" sx={{ fontSize: "20px", lineHeight: "100%", fontWeight: 500, color: "#6B6B6B", width: "fit-content" }}>
                        Title (TH) <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                    <Controller
                        name="titleTh"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} id="titleTh" variant="outlined" size="small" fullWidth
                                error={!!insuranceErrors?.titleTh}
                                helperText={insuranceErrors?.titleTh?.message} />
                        )}
                    />
                </FormControl>

                <FormControl error={!!insuranceErrors?.titleEn} sx={{ maxWidth: "341px", width: "100%", gap: 1 }}>
                    <Typography component="label" htmlFor="titleEn" sx={{ fontSize: "20px", lineHeight: "100%", fontWeight: 500, color: "#6B6B6B", width: "fit-content" }}>
                        Title (EN) <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                    <Controller
                        name="titleEn"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} id="titleEn" variant="outlined" size="small" fullWidth
                                error={!!insuranceErrors?.titleEn}
                                helperText={insuranceErrors?.titleEn?.message} />
                        )}
                    />
                </FormControl>
            </Stack>
        </Stack>
    )
}