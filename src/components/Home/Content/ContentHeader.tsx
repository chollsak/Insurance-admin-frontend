import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ContentHeader() {
    return (
        <Stack
            direction="row"
            spacing={1.5}
            alignItems="flex-end"
            borderBottom="1px solid #BDBDBD">
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
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
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
                        sx={{ width: "16px", height: "16px" }} />
                    <Typography sx={{
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
                        fontSize: "24px"
                    }}>
                    /
                </Typography>
                <Typography sx={{ color: "#515252", fontSize: "20px" }}>
                    ข่าวสารและกิจกรรม
                </Typography>
            </Stack>
        </Stack>
    )
}
