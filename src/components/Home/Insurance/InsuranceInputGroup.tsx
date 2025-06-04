import { Box, Button, Divider, FormControl, FormHelperText, IconButton, Stack, TextField, Typography, type SxProps, type Theme } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useFormContext, type FieldErrors } from "react-hook-form";
import type { ContentFormValues, InsuranceSchema } from "../../../models";
import { z } from "zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarIcon } from "../../common/Icons";

const truncateFilename = (filename: string, maxLength: number = 20): string => {
    if (filename.length <= maxLength) {
        return filename;
    }

    const lastDotIndex = filename.lastIndexOf('.');
    const extension = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : '';
    const nameWithoutExtension = lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename;

    const maxNameLength = maxLength - extension.length - 3; // 3 for "..."

    if (maxNameLength <= 0) {
        return "..." + extension;
    }

    return nameWithoutExtension.slice(0, maxNameLength) + "..." + extension;
};

export function InsuranceInputGroup({ sx }: { sx?: SxProps<Theme> }) {
    return (
        <Box sx={{ ...sx, display: 'flex', flexDirection: 'column', }}>
            <InsuranceHeader />
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <CoverInputGroup />
                <ContentInputGroup />
            </Box>
        </Box>
    )
}

function InsuranceHeader() {
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

function CoverInputGroup() {
    const {
        formState: { errors },
        setValue,
        trigger,
        watch,
    } = useFormContext<ContentFormValues>();

    const coverImage = watch("coverImage");
    const iconImage = watch("iconImage");

    console.log("cover image", coverImage.name);
    console.log("icon image", iconImage.name);

    const handleCoverFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setValue("coverImage", file);
            trigger("coverImage");
        }
    };

    const handleCoverRemoveFile = () => {
        setValue("coverImage", new File([], ""));
        trigger("coverImage");
    };

    const handleIconFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setValue("iconImage", file);
            trigger("iconImage");
        }
    };

    const handleIconRemoveFile = () => {
        setValue("iconImage", new File([], ""));
        trigger("iconImage");
    };

    const getInsuranceErrors = (): FieldErrors<z.infer<typeof InsuranceSchema>> | null => {
        if (watch("category") === "INSURANCE") {
            return errors as FieldErrors<z.infer<typeof InsuranceSchema>>;
        }
        return null;
    };

    const insuranceErrors = getInsuranceErrors();

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
                                    borderColor: `${!!errors.coverImage ? "#d32f2f" : "inherit"}`,
                                    color: `${!!errors.coverImage ? "#d32f2f" : "inherit"}`
                                }}>
                                เลือกไฟล์
                                <input
                                    name="coverImage"
                                    type="file"
                                    hidden
                                    accept=".jpg,.jpeg"
                                    onChange={handleCoverFileChange}
                                />
                            </Button>

                            {(coverImage && coverImage.size > 0) && (
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <Typography sx={{
                                        textDecoration: "underline",
                                        fontSize: "20px",
                                        lineHeight: "20px",
                                    }}>
                                        {truncateFilename(coverImage.name)}
                                    </Typography>
                                    <IconButton
                                        onClick={handleCoverRemoveFile}
                                        sx={{ width: "20px", height: "20px", p: 2, color: "#05058C" }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            )}
                        </Box>

                        {errors.coverImage && (
                            <Typography color="error" fontSize="12px" px={2}>
                                {errors.coverImage.message}
                            </Typography>
                        )}
                    </Box>

                    <Typography sx={{ fontSize: "18px", letterSpacing: "0.3px", lineHeight: "100%", color: "#676767" }}>
                        สกุลไฟล์.jpg ขนาดไฟล์ 374 x 100 px , ขนาดไม่เกิน 100 kb
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "3px", borderBlock: "1px solid #3978E9", px: 3, py: 1, bgcolor: "#F2F8FF" }}>
                <Typography component="span" sx={{ color: "#05058C", fontWeight: 500, fontSize: "20px" }}>
                    ภาพ ICON
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
                                    borderColor: `${!!insuranceErrors?.iconImage ? "#d32f2f" : "inherit"}`,
                                    color: `${!!insuranceErrors?.iconImage ? "#d32f2f" : "inherit"}`
                                }}>
                                เลือกไฟล์
                                <input
                                    name="iconImage"
                                    type="file"
                                    hidden
                                    accept=".jpg,.jpeg"
                                    onChange={handleIconFileChange}
                                />
                            </Button>

                            {(iconImage && iconImage.size > 0) && (
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                    <Typography sx={{
                                        textDecoration: "underline",
                                        fontSize: "20px",
                                        lineHeight: "20px",
                                    }}>
                                        {truncateFilename(iconImage.name)}
                                    </Typography>
                                    <IconButton
                                        onClick={handleIconRemoveFile}
                                        sx={{ width: "20px", height: "20px", p: 2, color: "#05058C" }}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            )}
                        </Box>

                        {insuranceErrors?.iconImage && (
                            <Typography color="error" fontSize="12px" px={2}>
                                {insuranceErrors?.iconImage?.message}
                            </Typography>
                        )}
                    </Box>

                    <Typography sx={{ fontSize: "18px", letterSpacing: "0.3px", lineHeight: "100%", color: "#676767" }}>
                        สกุลไฟล์.jpg ขนาดไฟล์ 80 x 100 px , ขนาดไม่เกิน 100 kb
                    </Typography>
                </Box>

                <Divider sx={{ width: "100%" }} />
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

    const getInsuranceErrors = (): FieldErrors<z.infer<typeof InsuranceSchema>> | null => {
        if (watch("category") === "INSURANCE") {
            return errors as FieldErrors<z.infer<typeof InsuranceSchema>>;
        }
        return null;
    };

    const insuranceErrors = getInsuranceErrors();

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
                                helperText={insuranceErrors?.titleTh?.message}
                            />
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
                                helperText={insuranceErrors?.titleEn?.message}
                            />
                        )}
                    />
                </FormControl>

                <FormControl error={!!insuranceErrors?.descriptionTh} sx={{ maxWidth: "341px", width: "100%", gap: 1 }}>
                    <Typography component="label" htmlFor="descriptionTh" sx={{ fontSize: "20px", lineHeight: "100%", fontWeight: 500, color: "#6B6B6B", width: "fit-content" }}>
                        Description (TH) <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                    <Controller
                        name="descriptionTh"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} id="descriptionTh" variant="outlined" size="small" fullWidth
                                error={!!insuranceErrors?.descriptionTh}
                                helperText={insuranceErrors?.descriptionTh?.message}
                            />
                        )}
                    />
                </FormControl>

                <FormControl error={!!insuranceErrors?.descriptionEn} sx={{ maxWidth: "341px", width: "100%", gap: 1 }}>
                    <Typography component="label" htmlFor="descriptionEn" sx={{ fontSize: "20px", lineHeight: "100%", fontWeight: 500, color: "#6B6B6B", width: "fit-content" }}>
                        Description (EN) <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                    <Controller
                        name="descriptionEn"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} id="descriptionEn" variant="outlined" size="small" fullWidth
                                error={!!insuranceErrors?.descriptionEn}
                                helperText={insuranceErrors?.descriptionEn?.message}
                            />
                        )}
                    />
                </FormControl>

                <FormControl error={!!insuranceErrors?.startEndDate} sx={{ maxWidth: "341px", width: "100%", }}>
                    <Typography component="label" htmlFor="startEndDate" sx={{ fontSize: "22px", width: "fit-content", mb: 1 }}>
                        Start - End Date <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
                    <Controller
                        name="startEndDate"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateRangePicker
                                    calendars={1}
                                    value={field.value ?? [null, null]}
                                    onChange={field.onChange}
                                    slots={{ openPickerIcon: CalendarIcon }}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            sx: { width: "100%" },
                                            error: !!insuranceErrors?.startEndDate,
                                        },
                                        openPickerButton: {
                                            sx: { color: "#B3B3B3" }
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                    <FormHelperText>{insuranceErrors?.startEndDate?.message}</FormHelperText>
                </FormControl>
            </Stack>
        </Stack>
    )
}