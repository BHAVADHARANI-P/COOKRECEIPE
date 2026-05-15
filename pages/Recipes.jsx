import React, { useState, useEffect } from 'react';
import RecipeList from '../components/Recipe/RecipeList';
import api from '../api';
import { Container, Typography, Box, CircularProgress, Paper } from '@mui/material';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const res = await api.get('/recipes');
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url("https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontWeight: 'bold',
                    color: 'var(--text-dark)',
                    mb: 2
                  }}
                >
                  Culinary Gallery
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Discover mouth-watering dishes shared by our global community.
                </Typography>
                <Box 
                  sx={{ 
                    width: '60px', 
                    height: '4px', 
                    bgcolor: 'var(--primary-color)', 
                    mx: 'auto', 
                    mt: 2,
                    borderRadius: 2
                  }} 
                />
              </Box>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                  <CircularProgress size={60} thickness={4} sx={{ color: 'var(--primary-color)' }} />
                </Box>
              ) : (
                <RecipeList 
                  recipes={recipes} 
                  refresh={fetchRecipes} 
                />
              )}
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Recipes;
