import { Box, Button, FormControl, FormHelperText, MenuItem, Select, TextField, Typography, type SxProps, type Theme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useOutletContext } from "react-router-dom";
import { Controller, FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { contentCategoryMap } from "../../common";
import { CalendarIcon } from "../../components";
export const ContentCategoryEnum = z.enum(["BANNER", "PROMOTION", "INSURANCE", "SUIT_INSURANCE"]);
export type ContentCategory = z.infer<typeof ContentCategoryEnum>;

export const ContentStatusEnum = z.enum(["ACTIVE", "INACTIVE"]);
export type ContentStatus = z.infer<typeof ContentStatusEnum>;

const BaseContentSchema = z.object({
    category: ContentCategoryEnum,
    title: z.string().min(3, "Title must be at least 3 characters"),
    status: ContentStatusEnum,
    effectiveDate: z
        .tuple([
            z
                .custom<Dayjs | null>((val) => val === null || (val && typeof val === 'object' && 'isValid' in val && val.isValid()), {
                    message: 'Invalid start date',
                }),
            z
                .custom<Dayjs | null>((val) => val === null || (val && typeof val === 'object' && 'isValid' in val && val.isValid()), {
                    message: 'Invalid end date',
                }),
        ])
        .refine(([from, to]) => from && to && (from.isBefore(to) || from.isSame(to, 'day')), {
            message: 'Effective From must be before or same as Effective To',
        })

});

export type ContentFormValues = z.infer<typeof BaseContentSchema>;

export default function ContentCreateScreen() {
    const { sx } = useOutletContext<{ sx?: SxProps<Theme> }>();
    const methods = useForm<ContentFormValues>({
        resolver: zodResolver(BaseContentSchema),
        defaultValues: {
            category: "BANNER",
            status: "ACTIVE",
            title: "",
            effectiveDate: [null, null],
        }
    });
    const { handleSubmit, control, formState: { errors, isSubmitting } } = methods;

    const onSubmit: SubmitHandler<ContentFormValues> = async (data) => {
        console.log("Form submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
        <FormProvider {...methods}>
            <Box sx={{
                ...sx,
                display: "flex",
            }}>
                <Box sx={{
                    maxWidth: "1010px",
                    width: "100%",
                }}>
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
                                    fontSize: "24px",
                                    fontWeight: "light",
                                    gap: "4px",
                                }}>
                                <Box
                                    component={"img"}
                                    src="/src/assets/img/news/homeicon.png"
                                    sx={{ width: "12px" }} />
                                <Typography>Home</Typography>
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

                    <Box sx={{
                        display: "flex",
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            p: 3,
                            gap: 2,
                        }}>
                            <FormControl error={!!errors.category} sx={{ maxWidth: "341px" }}>
                                <Typography
                                    component="label"
                                    htmlFor="category"
                                    sx={{
                                        fontSize: "22px",
                                        width: "fit-content"
                                    }}>
                                    Category <span style={{ color: "#FF0000" }}>*</span>
                                </Typography>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="category"
                                            size="small"
                                            IconComponent={ExpandMoreIcon}
                                        >
                                            {ContentCategoryEnum.options.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {contentCategoryMap[option]["en"]}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.category?.message}</FormHelperText>
                            </FormControl>

                            <FormControl error={!!errors.title} sx={{ maxWidth: "341px" }}>
                                <Typography
                                    component="label"
                                    htmlFor="title"
                                    sx={{
                                        fontSize: "22px",
                                        width: "fit-content"
                                    }}>
                                    Title <span style={{ color: "#FF0000" }}>*</span>
                                </Typography>
                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            id="title"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            error={!!errors.title}
                                            helperText={errors.title?.message}
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl error={!!errors.effectiveDate} sx={{ maxWidth: "341px" }}>
                                <Typography
                                    component="label"
                                    htmlFor="effectiveDate"
                                    sx={{
                                        fontSize: "22px",
                                        width: "fit-content",
                                        mb: 1,
                                        display: "block",
                                    }}
                                >
                                    EffectiveDate <span style={{ color: "#FF0000" }}>*</span>
                                </Typography>

                                <Controller
                                    name="effectiveDate"
                                    control={control}
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateRangePicker
                                                calendars={1}
                                                value={field.value ?? [null, null]}
                                                onChange={field.onChange}
                                                slots={{
                                                    openPickerIcon: CalendarIcon,
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        sx: { width: "100%" },
                                                        error: !!errors.effectiveDate,
                                                    },
                                                    openPickerButton: {
                                                        sx: { color: "#B3B3B3" }
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />

                                <FormHelperText>{errors.effectiveDate?.message}</FormHelperText>
                            </FormControl>


                            <FormControl error={!!errors.status} sx={{ maxWidth: "341px" }}>
                                <Typography
                                    component="label"
                                    htmlFor="status"
                                    sx={{
                                        fontSize: "22px",
                                        width: "fit-content"
                                    }}>
                                    Status <span style={{ color: "#FF0000" }}>*</span>
                                </Typography>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            id="status"
                                            size="small"
                                            
                                        >
                                            {ContentStatusEnum.options.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>{errors.status?.message}</FormHelperText>
                            </FormControl>


                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                                sx={{ maxWidth: "341px", mt: 2 }}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    maxWidth: "430px",
                    width: "100%",
                    height: "100%",
                    bgcolor: "#ffffff",
                }}>
                    <Box sx={{
                        minHeight: "59px",
                        display: "flex",
                        alignItems: "center",
                        px: 3,
                    }}>
                        <Box
                            component={"img"}
                            src="/src/assets/img/icons/arrow.png"
                            width={"24px"}
                            height={"24px"}
                        />
                        <Typography
                            sx={{
                                color: "#05058C",
                                fontWeight: "500",
                                fontSize: "22px",
                            }}
                        >
                            เลือกเเสดงผล
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </FormProvider>
    )
}
