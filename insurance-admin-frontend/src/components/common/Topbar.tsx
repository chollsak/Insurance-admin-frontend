import React, { useState } from 'react';
import { 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem,
  Paper
} from '@mui/material';

interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  // State for user menu
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
        width: '100%', 
        height: '64px', 
        bgcolor: 'white',
        boxShadow: '0 4px 4px #A0A0A04D',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        backgroundColor: 'white', 
        padding: '0 16px',
        height: '100%'
      }}>
        {/* Hamburger Menu */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
          sx={{ color: '#063868' }}
        >
          <Box
            component="img"
            src="/src/assets/img/icons/menu.png"
            alt="Menu"
            sx={{ width: '24px', height: '24px' }}
          />
        </IconButton>
        
        {/* Right side - User profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ 
              bgcolor: '#1E4C9A', 
              width: 40,
              height: 40 
            }}
          >
            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
              น
            </Typography>
          </Avatar>
          
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenuClick}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="subtitle1" sx={{ color: '#063868', fontWeight: 'bold', lineHeight: 1.2 }}>
                นางสี ซีย์ประมาณ
              </Typography>
              <Typography variant="body2" sx={{ color: '#063868', lineHeight: 1.2 }}>
                Admin
              </Typography>
            </Box>
            <Box
              component="img"
              src="/src/assets/img/icons/v.png"
              alt="Arrow Down"
              sx={{ width: '24px', height: '24px', ml: 1 }}
            />
          </Box>
          
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>โปรไฟล์</MenuItem>
            <MenuItem onClick={handleMenuClose}>ออกจากระบบ</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Paper>
  );
};