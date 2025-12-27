import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config({ path: './.env' });

const sampleProducts = [
  {
    name: "Kids Outfit 1",
    price: 999,
    image: "/src/assets/kids1.jpg",
    category: "kids",
    subCategory: "topwear",
    bestseller: true,
    description: "Comfortable cotton outfit perfect for kids' daily wear.",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "Men T-Shirt 1",
    price: 1199,
    image: "/src/assets/man-t-shirt1.jpg",
    category: "men",
    subCategory: "topwear",
    bestseller: true,
    description: "Classic round-neck t-shirt for men.",
    sizes: ["M", "L", "XL"]
  },
  {
    name: "Women T-Shirt 1",
    price: 1099,
    image: "/src/assets/woman-t-shirt1.jpg",
    category: "women",
    subCategory: "topwear",
    bestseller: false,
    description: "Stylish and comfortable t-shirt for women.",
    sizes: ["S", "M", "L"]
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing products (optional - remove if you want to keep existing data)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${insertedProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

