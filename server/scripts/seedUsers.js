import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { hashPassword } from '../utils/passwordUtils.js';

dotenv.config({ path: './.env' });

const sampleUsers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    phone: "+1234567890",
    role: "user",
    isActive: true,
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    }
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password123",
    phone: "+1234567891",
    role: "user",
    isActive: true,
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA"
    }
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    phone: "+1234567892",
    role: "admin",
    isActive: true,
    address: {
      street: "789 Admin Blvd",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "USA"
    }
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Clear existing users (optional - remove if you want to keep existing data)
    // await User.deleteMany({});
    // console.log('Cleared existing users');

    // Check if users already exist
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
      console.log(`Found ${existingUsers.length} existing users. Skipping seed.`);
      process.exit(0);
      return;
    }

    // Hash passwords securely before inserting
    const usersWithHashedPasswords = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password)
      }))
    );

    // Insert sample users
    const insertedUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`Inserted ${insertedUsers.length} users`);
    console.log('\nSample login credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: john.doe@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();

