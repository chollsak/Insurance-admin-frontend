import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { ContentCategoryEnum, ContentStatusEnum, defaultBanner, defaultPromotion, type ContentFormValues } from "../../../models";
import { CalendarIcon } from "../../common";
import { contentCategoryTranslations } from "../../../common";

export function BaseContentInputGroup({ isEditMode }: { isEditMode: boolean }) {
    const { control, reset, formState: { errors } } = useFormContext<ContentFormValues>();

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding={3}
            spacing={2}
            flex={2}
            width="100%">
            <FormControl error={!!errors.category} sx={{ maxWidth: "341px", width: "100%", }}>
                <Typography component="label" htmlFor="category" sx={{ fontSize: "22px", width: "fit-content" }}>
                    Category <span style={{ color: "#FF0000" }}>*</span>
                </Typography>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            disabled={isEditMode}
                            onChange={(event) => {
                                const newCategory = event.target.value as ContentFormValues["category"];
                                field.onChange(newCategory);

                                if (newCategory === "BANNER") {
                                    reset(defaultBanner);
                                } else if (newCategory === "PROMOTION") {
                                    reset(defaultPromotion);
                                }
                            }}
                            size="small"
                            IconComponent={ExpandMoreIcon}>
                            {ContentCategoryEnum.options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {contentCategoryTranslations[option]["en"]}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                <FormHelperText>{errors.category?.message}</FormHelperText>
            </FormControl>


            <FormControl error={!!errors.title} sx={{ maxWidth: "341px", width: "100%", }}>
                <Typography component="label" htmlFor="title" sx={{ fontSize: "22px", width: "fit-content" }}>
                    Title <span style={{ color: "#FF0000" }}>*</span>
                </Typography>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} id="title" variant="outlined" size="small" fullWidth
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    )}
                />
            </FormControl>

            <FormControl error={!!errors.effectiveDate} sx={{ maxWidth: "341px", width: "100%", }}>
                <Typography component="label" htmlFor="effectiveDate" sx={{ fontSize: "22px", width: "fit-content", mb: 1 }}>
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
                                slots={{ openPickerIcon: CalendarIcon }}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        sx: { width: "100%" },
                                        error: !!errors.effectiveDate,
                                    },
                                    openPickerButton: {
                                        sx: { color: "#B3B3B3" }
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    )}
                />
                <FormHelperText>{errors.effectiveDate?.message}</FormHelperText>
            </FormControl>

            <FormControl error={!!errors.status} sx={{ maxWidth: "341px", width: "100%", }}>
                <Typography component="label" htmlFor="status" sx={{ fontSize: "22px", width: "fit-content" }}>
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
                            IconComponent={ExpandMoreIcon}>
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
        </Stack>
    );
}
