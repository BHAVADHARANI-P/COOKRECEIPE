import React from 'react';
import Navbar from './Navbar';
import { Box } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" className="fade-in" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          textAlign: 'center', 
          bgcolor: 'var(--text-dark)', 
          color: 'white',
          fontFamily: "'Playfair Display', serif"
        }}
      >
        © 2024 RecipeMagic. Crafted with passion for food lovers.
      </Box>
    </Box>
  );
};

export default MainLayout;
