import React from 'react';
import RecipeForm from '../components/Recipe/RecipeForm';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';

const ShareRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editRecipe = location.state?.recipe;

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          py: 8
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                borderRadius: 5,
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
              }}
            >
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontWeight: 'bold',
                    mb: 1
                  }}
                >
                  {editRecipe ? 'Refine Your Recipe' : 'Unleash Your Creativity'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Share the secret behind your culinary masterpiece with the world.
                </Typography>
              </Box>
              
              <RecipeForm 
                initialData={editRecipe}
                onRecipeAdded={() => navigate('/recipes')} 
                onUpdateComplete={() => navigate('/recipes')}
              />
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default ShareRecipe;
