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

    const examples = [
      {
        title: "Classic Margherita Pizza",
        description: "A timeless Italian favorite with fresh basil, mozzarella, and juicy tomatoes on a crispy crust.",
        ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Fresh basil leaves", "Extra virgin olive oil"],
        steps: ["Preheat oven to 450°F", "Roll out dough", "Spread sauce and add mozzarella", "Bake for 12-15 mins", "Garnish with basil and oil"],
        imageUrl: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
        author: admin._id
      },
      {
        title: "Spicy Thai Green Curry",
        description: "A fragrant and creamy curry packed with fresh vegetables and authentic Thai spices.",
        ingredients: ["Coconut milk", "Green curry paste", "Bamboo shoots", "Thai basil", "Kaffir lime leaves", "Tofu or Chicken"],
        steps: ["Heat coconut milk", "Stir in curry paste", "Add protein and vegetables", "Simmer until cooked", "Finish with lime leaves and basil"],
        imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
        author: admin._id
      },
      {
        title: "Berry Bliss Smoothie Bowl",
        description: "A refreshing and nutrient-packed breakfast bowl topped with crunchy granola and fresh fruits.",
        ingredients: ["Frozen berries", "Banana", "Greek yogurt", "Honey", "Granola", "Chia seeds"],
        steps: ["Blend fruit and yogurt", "Pour into a bowl", "Top with granola and seeds", "Drizzle with honey", "Enjoy immediately"],
        imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
        author: admin._id
      }
    ];

    await Recipe.insertMany(examples);
    console.log('✅ Successfully seeded 3 example recipes!');
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
