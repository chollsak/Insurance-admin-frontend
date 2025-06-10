import React, { useState } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Stack
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonRoundedIcon from '@mui/icons-material/PersonOutlineOutlined';

interface ITopbarProps {
  onToggleSidebar: () => void;
}

export function Topbar({ onToggleSidebar }: ITopbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        bgcolor: "#FFFFFF",
        boxShadow: "0 4px 4px #A0A0A04D",
        position: "relative",
        zIndex: 10,
      }}>
      <Toolbar sx={{
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "0 16px",
        height: "100%",
      }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
          sx={{ color: "#063868" }}>
          <MenuIcon sx={{ width: "24px", height: "24px" }} />
        </IconButton>

        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Avatar
            sx={{
              bgcolor: "#1E4C9A",
              width: 40,
              height: 40
            }}>
            <PersonRoundedIcon />
          </Avatar>

          <Stack direction={"row"} alignItems={"center"} spacing={0.5} >
            <Stack>
              <Typography sx={{
                color: "#404040",
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "100%",
              }}>
                นางสี ซีย์ประมาณ
              </Typography>
              <Typography sx={{
                fontSize: "14px",
                lineHeight: "100%",
                color: "#565656",
              }}>
                Admin
              </Typography>
            </Stack>
            <IconButton onClick={handleMenuClick}>
              <ExpandMoreIcon sx={{ width: "24px", height: "24px" }} />
            </IconButton>
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>โปรไฟล์</MenuItem>
            <MenuItem onClick={handleMenuClose}>ออกจากระบบ</MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </Paper >
  );
};