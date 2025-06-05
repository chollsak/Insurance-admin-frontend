import { useOutletContext } from "react-router-dom";
import { Stack, type SxProps, type Theme } from "@mui/material";
import { ContentForm } from "../../components";
import { defaultBanner } from "../../models";

export default function ContentCreateScreen() {
    const { sx } = useOutletContext<{ sx?: SxProps<Theme> }>();
    return (
        <Stack
            direction={"row"}
            sx={{
                ...sx,
                pl: 3,
                display: "flex",
                bgcolor: "#F7FAFC",
                overflowY: "hidden",
            }}>
            <ContentForm mode="create" defaultValues={defaultBanner} />
        </Stack>
    )
}