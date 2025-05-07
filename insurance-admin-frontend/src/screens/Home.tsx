import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Sidebar } from '../components/common/Sidebar';
import { Topbar } from '../components/common/Topbar';
import News from '../components/common/News';
 // Import the News component

const Home: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left side - Sidebar (fixed width) */}
      {sidebarOpen && (
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
        {/* Topbar */}
        <Box sx={{ 
          height: '55px',
          ml:0.5,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Topbar onToggleSidebar={toggleSidebar} />
        </Box>
        
        {/* Main content area */}
        <Box sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          backgroundColor: '#f8f9fa'
        }}>
          <News />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;