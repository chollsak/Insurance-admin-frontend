import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1300,
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                p: 2,
            }}>
            <Typography variant="h2" color="textPrimary" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Page Not Found
            </Typography>
            <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}>
                Back Home
            </Button>
        </Box>
    );
};