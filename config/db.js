const mongoose = require('mongoose');

const seedData = async () => {
  try {
    const User = require('../models/User');
    const Recipe = require('../models/Recipe');
    
    // Check if recipes already exist
    const count = await Recipe.countDocuments();
    if (count > 0) return;

    console.log('🌱 Seeding example recipes...');

    // Create a default admin if none exists
    let admin = await User.findOne({ email: 'admin@recipeapp.com' });
    if (!admin) {
      admin = new User({
        name: 'Master Chef',
        email: 'admin@recipeapp.com',
        password: 'admin123',
        role: 'admin',
        isActive: true,
        isVerified: true
      });
      await admin.save();
    }

    // Force refresh example recipes to fix image URLs
    await Recipe.deleteMany({ author: admin._id });

    const examples = [
      {
        title: 'Classic Margherita Pizza',
        description: 'A timeless Italian favorite with fresh basil, mozzarella, and juicy tomatoes on a crispy crust.',
        ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
        steps: ['Preheat oven to 450°F', 'Roll out dough', 'Spread sauce and cheese', 'Bake for 12-15 mins', 'Add fresh basil'],
        imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000',
        author: admin._id
      },
      {
        title: 'Spicy Thai Green Curry',
        description: 'A fragrant and creamy curry packed with fresh vegetables and authentic Thai spices.',
        ingredients: ['Coconut milk', 'Green curry paste', 'Chicken or Tofu', 'Bamboo shoots', 'Eggplant', 'Fish sauce'],
        steps: ['Sauté curry paste', 'Add coconut milk', 'Simmer with veggies/protein', 'Season with fish sauce', 'Serve with jasmine rice'],
        imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1000',
        author: admin._id
      },
      {
        title: 'Berry Bliss Smoothie Bowl',
        description: 'A refreshing and nutrient-packed breakfast bowl topped with crunchy granola and fresh berries.',
        ingredients: ['Frozen berries', 'Banana', 'Greek yogurt', 'Almond milk', 'Granola', 'Chia seeds'],
        steps: ['Blend fruits and yogurt', 'Pour into a bowl', 'Top with granola and seeds', 'Add fresh berry slices', 'Enjoy chilled'],
        imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1000',
        author: admin._id
      }
    ];

    await Recipe.insertMany(examples);
    console.log('✅ Example recipes refreshed with new images!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedData();
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Falling back to in-memory MongoDB...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      const conn = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
      await seedData(); // Seed the in-memory database too!
    } catch (fallbackError) {
      console.error('Failed to start in-memory database:', fallbackError);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
