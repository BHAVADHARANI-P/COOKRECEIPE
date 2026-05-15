import React, { useState, useEffect } from "react";
import api from "../../api";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  IconButton, 
  Paper,
  InputAdornment,
  Divider
} from "@mui/material";
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import ListIcon from '@mui/icons-material/List';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const RecipeForm = ({ onRecipeAdded, initialData, onUpdateComplete }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [recipeId, setRecipeId] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setIngredients(initialData.ingredients.join(", "));
      setSteps(initialData.steps.join("\n"));
      setRecipeId(initialData._id);
      setImagePreview(initialData.imageUrl);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    if (image) formData.append("image", image);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const apiCall = recipeId
        ? api.put(`/recipes/${recipeId}`, formData, config)
        : api.post("/recipes", formData, config);

      const res = await apiCall;
      recipeId ? onUpdateComplete(res.data) : onRecipeAdded(res.data);

      // Reset
      setTitle("");
      setDescription("");
      setIngredients("");
      setSteps("");
      setImage(null);
      setImagePreview(null);
      setRecipeId(null);
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Recipe Title"
            variant="outlined"
            placeholder="e.g., Mom's Special Pasta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Short Description"
            variant="outlined"
            multiline
            rows={2}
            placeholder="What makes this dish special?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Ingredients"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Ingredient 1, Ingredient 2, ..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            helperText="Separate ingredients with commas"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ListIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Cooking Steps"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Step 1...&#10;Step 2..."
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            helperText="Enter each step on a new line"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FormatListNumberedIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box 
            sx={{ 
              border: '2px dashed rgba(0,0,0,0.1)', 
              borderRadius: 4, 
              p: 3, 
              textAlign: 'center',
              bgcolor: 'rgba(0,0,0,0.02)',
              position: 'relative'
            }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button 
                variant="outlined" 
                component="span" 
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                Upload Recipe Image
              </Button>
            </label>
            
            {imagePreview && (
              <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                />
              </Box>
            )}
            {!imagePreview && (
              <Typography variant="body2" color="text.secondary">
                Drag and drop or click to upload a photo of your dish
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ 
              py: 1.5, 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              borderRadius: 3,
              background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: '0.2s'
              }
            }}
          >
            {recipeId ? "🔄 Update Recipe" : "🍳 Publish Recipe"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeForm;
