import React from 'react';
import api from "../../api";
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  IconButton, 
  Tooltip,
  Chip,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';

const RecipeList = ({ recipes, refresh, onEdit }) => {
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await api.delete(`/recipes/${id}`);
      refresh();
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  if (recipes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h2" sx={{ opacity: 0.3, mb: 2 }}>🍳</Typography>
        <Typography variant="h5" color="text.secondary">No recipes found yet.</Typography>
        <Typography variant="body1" color="text.light">Be the first to share a masterpiece!</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {recipes.map((r, index) => (
        <Grid item xs={12} sm={6} lg={4} key={r._id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 4,
                overflow: 'hidden',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={r.imageUrl || "https://images.unsplash.com/photo-1495195129352-aec325b55b65?auto=format&fit=crop&w=800&q=80"}
                  alt={r.title}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10, 
                    display: 'flex', 
                    gap: 1,
                    bgcolor: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: '20px',
                    p: 0.5
                  }}
                >
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onEdit(r)} sx={{ color: 'var(--secondary-color)' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => handleDelete(r._id)} sx={{ color: 'var(--primary-color)' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontWeight: 'bold',
                    lineHeight: 1.2
                  }}
                >
                  {r.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: '3em'
                  }}
                >
                  {r.description || "A delicious mystery recipe waiting to be discovered."}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <RestaurantIcon sx={{ fontSize: 16, color: 'var(--primary-color)' }} />
                    <Typography variant="caption" fontWeight="bold">
                      {r.ingredients?.length || 0} Ingredients
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 16, color: 'var(--secondary-color)' }} />
                    <Typography variant="caption" fontWeight="bold">
                      {r.steps?.length || 0} Steps
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              
              <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.02)', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {r.ingredients?.slice(0, 3).map((ing, i) => (
                  <Chip key={i} label={ing} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                ))}
                {r.ingredients?.length > 3 && (
                  <Chip label={`+${r.ingredients.length - 3} more`} size="small" sx={{ fontSize: '0.7rem' }} />
                )}
              </Box>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
