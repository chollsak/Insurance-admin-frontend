import { Box, CircularProgress } from "@mui/material";

export default function FullScreenLoading() {
    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1300,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                p: 2,
            }}>
            <CircularProgress />
        </Box>
    )
};