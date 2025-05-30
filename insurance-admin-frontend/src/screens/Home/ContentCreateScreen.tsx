import { Box, type SxProps, type Theme } from "@mui/material";
import { useOutletContext } from "react-router-dom";

export default function ContentCreateScreen() {
    const { sx } = useOutletContext<{ sx?: SxProps<Theme> }>();
    return (
        <Box sx={{
            ...sx,
        }}>
            test
        </Box>
    )
}