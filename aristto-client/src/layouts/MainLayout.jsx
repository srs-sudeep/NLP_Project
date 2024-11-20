import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <div className='mx-auto max-w-[85vw] p-6 sm:p-12'><Outlet /></div>
    </Box>
  );
};

export default MainLayout;
