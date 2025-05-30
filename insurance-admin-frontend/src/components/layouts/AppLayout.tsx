import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useCommon } from "../../hooks";
import { Sidebar, Topbar } from "../common";

export default function AppLayout() {
    const { isSidebarOpen, setIsSidebarOpen } = useCommon();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const context = {
        sx: {
            flexGrow: 1,
            overflow: 'auto',
            backgroundColor: '#f8f9fa',
            mt: 1,
        }
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', userSelect: "none" }}>
            {isSidebarOpen && (
                <Box sx={{
                    width: '255px',
                    minWidth: '255px',
                    height: '100vh',
                    borderRight: '1px solid #e0e0e0'
                }}>
                    <Sidebar />
                </Box>
            )}

            {/* Right side - Topbar and content */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                height: '100vh',
            }}>
                <Box sx={{
                    height: '55px',
                    ml: 0.5,
                    borderBottom: '1px solid #e0e0e0'
                }}>
                    <Topbar onToggleSidebar={toggleSidebar} />
                </Box>

                <Outlet context={context} />
            </Box>
        </Box>
    );
}
