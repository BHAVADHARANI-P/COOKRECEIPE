import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/Recipes';
import ShareRecipe from './pages/ShareRecipe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/share" element={<ShareRecipe />} />
    </Routes>
  );
}

export default App;
