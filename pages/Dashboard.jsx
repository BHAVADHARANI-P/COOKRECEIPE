import React from 'react';
import { Box, Typography, Grid, Container, Card, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBrowseRecipes = () => {
    navigate('/recipes');
  };

  const handleShareRecipe = () => {
    navigate('/share');
  };

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: '90vh',
          backgroundImage:
            'url("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          py: 5
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                p: { xs: 4, md: 6 },
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} textAlign="center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <RestaurantIcon sx={{ fontSize: 80, color: 'var(--primary-color)', mb: 2 }} />
                  </motion.div>
                  <Typography variant="h2" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 'bold', mb: 1 }}>
                    Welcome, Foodie!
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                    Your culinary journey starts here. Explore or share your magic.
                  </Typography>
                  <Box sx={{ width: '80px', height: '4px', bgcolor: 'var(--secondary-color)', mx: 'auto', borderRadius: 2 }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card
                    component={motion.div}
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    sx={{
                      p: 4,
                      height: '100%',
                      backgroundColor: '#fff3e0',
                      borderRadius: 5,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      border: '2px solid transparent',
                      '&:hover': {
                        borderColor: '#ef6c00',
                        boxShadow: '0 10px 20px rgba(239, 108, 0, 0.1)'
                      }
                    }}
                    onClick={handleBrowseRecipes}
                  >
                    <FastfoodIcon sx={{ fontSize: 60, color: '#ef6c00', mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Browse Gallery
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Discover inspiration from chefs around the globe.
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card
                    component={motion.div}
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    sx={{
                      p: 4,
                      height: '100%',
                      backgroundColor: '#f3e5f5',
                      borderRadius: 5,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      border: '2px solid transparent',
                      '&:hover': {
                        borderColor: '#6a1b9a',
                        boxShadow: '0 10px 20px rgba(106, 27, 154, 0.1)'
                      }
                    }}
                    onClick={handleShareRecipe}
                  >
                    <EmojiFoodBeverageIcon sx={{ fontSize: 60, color: '#6a1b9a', mb: 2 }} />
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Share Magic
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Contribute your signature dishes to our collection.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
