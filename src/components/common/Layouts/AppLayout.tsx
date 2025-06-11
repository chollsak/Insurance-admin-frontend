import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useCommon } from "../../../hooks";
import { Sidebar } from "../Sidebar";
import { Topbar } from "../Header";

export default function AppLayout() {
    const { isSidebarOpen, handleToggleSidebar } = useCommon();

    const context = {
        sx: {
            flexGrow: 1,
            overflow: "auto",
            backgroundColor: "#f8f9fa",
            mt: 1,
        }
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", userSelect: "none", maxWidth: "1440px", mx: "auto" }}>
            <Box
                sx={{
                    width: isSidebarOpen ? "255px" : "0px",
                    minWidth: isSidebarOpen ? "255px" : "0px",
                    height: "100vh",
                    borderRight: isSidebarOpen ? "1px solid #e0e0e0" : "none",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                }}>
                <Sidebar />
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "100vh",
            }}>
                <Box sx={{
                    height: "55px",
                    ml: 0.5,
                    borderBottom: "1px solid #e0e0e0"
                }}>
                    <Topbar onToggleSidebar={handleToggleSidebar} />
                </Box>

                <Outlet context={context} />
            </Box>
        </Box>
    );
}
