import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ContentFormHeader({ isEditMode }: { isEditMode: boolean }) {
    return (
        <Box
            sx={{
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
            <Box
                sx={{
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
                        sx={{ width: "16px", height: "16px" }}
                    />
                    <Typography
                        sx={{
                            fontSize: "24px",
                            fontWeight: "light",
                            lineHeight: "100%",
                        }}>
                        Home
                    </Typography>
                </Link>
                <Typography
                    sx={{
                        color: "#515252",
                        fontSize: "24px",
                    }}>
                    /
                </Typography>
                <Typography sx={{ color: "#515252", fontSize: "20px" }}>
                    ข่าวสารและกิจกรรม
                </Typography>
                <Typography
                    sx={{
                        color: "#515252",
                        fontSize: "24px",
                    }}>
                    /
                </Typography>
                <Typography sx={{ color: "#515252", fontSize: "20px" }}>
                    {isEditMode ? "Edit" : "Create"}
                </Typography>
            </Box>
        </Box>
    );
}