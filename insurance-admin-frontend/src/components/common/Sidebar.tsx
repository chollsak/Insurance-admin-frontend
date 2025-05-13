import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SidebarItemProps {
  iconSrc: string;
  text: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ iconSrc, text, active = false }) => {
  return (
    <ListItem
      sx={{
        py: 0,
        px: -3,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: active ? '#063868' : 'transparent',
        borderRadius: '6px',
        ml: -0,
        mb: 0.5,
        '&:hover': {
          backgroundColor: active ? '#1a3a70' : 'rgba(0, 0, 0, 0.04)',
          cursor: 'pointer',
        },
      }}
    >
      <Box width={'9px'} height={'45px'} sx={{
        borderRadius: '4px',
        mr: 3,
        ml: -4.65,
        backgroundColor: active ? '#063868' : 'transparent',
      }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16,
          height: 16,
          mr: 2,
        }}
      >
        <Box
          component="img"
          src={iconSrc}
          alt={text}
          sx={{
            width: '100%',
            height: 'auto',
            filter: active ? 'brightness(0) invert(1)' : 'none', // Make icon white when active
          }}
        />
      </Box>
      <Typography
        sx={{
          color: active ? 'white' : '#063868',
          fontSize: '18px',
          fontWeight: active ? 500 : 400,
        }}
      >
        {text}
      </Typography>
    </ListItem>
  );
};

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: 255,
        height: '100vh',
        bgcolor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
        py: 3,
        pl: 2,
        pt: 3
      }}
    >
      {/* Logo and Company Name - Now Centered */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 0
      }}>
        <Box
          sx={{
            width: '180px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            component="img"
            src="/src/assets/img/navbar/BKI.png"
            alt="Bangkok Insurance Logo"
            onClick={handleLogoClick}
            sx={{
              width: '100%',
              height: 'auto',
              ml: '-40px',
              mb: '20px',
              cursor: 'pointer',
            }}
          />
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ p: 0 }}>
        <SidebarItem iconSrc="/src/assets/img/icons/dashboard.png" text="Dashboard" />
        <SidebarItem iconSrc="/src/assets/img/icons/website.png" text="ข่าวสารและกิจกรรม" active={true} />
        <SidebarItem iconSrc="/src/assets/img/icons/website.png" text="ส่วนประกอบเว็บไซต์" />
        <SidebarItem iconSrc="/src/assets/img/icons/claims.png" text="รายการแจ้งเคลม" />
        <SidebarItem iconSrc="/src/assets/img/icons/renewal.png" text="รายการต่ออายุกรมธรรม์" />
        <SidebarItem iconSrc="/src/assets/img/icons/payment.png" text="รายการชำระเงิน" />
        <SidebarItem iconSrc="/src/assets/img/icons/inspection.png" text="รายการตรวจสภาพรถ" />
        <SidebarItem iconSrc="/src/assets/img/icons/tax.png" text="รายการลดหย่อนภาษี" />
        <SidebarItem iconSrc="/src/assets/img/icons/settings.png" text="ตั้งค่า" />
      </List>
    </Box>
  );
};