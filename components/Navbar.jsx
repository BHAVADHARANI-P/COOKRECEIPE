import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Box, Button, Typography } from '@mui/material';

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="navbar-brand">
          <RestaurantMenuIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: "'Playfair Display', serif" }}>
            RecipeMagic
          </Typography>
        </Link>
        <div className="navbar-links">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/recipes" className="navbar-link">Explore</Link>
          <Link to="/share" className="navbar-link">Share</Link>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 2 }}>
            {user && (
              <Typography sx={{ color: 'white', fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                Hi, {user.name.split(' ')[0]}
              </Typography>
            )}
            <Button 
              onClick={logout} 
              variant="contained" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Logout
            </Button>
          </Box>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
