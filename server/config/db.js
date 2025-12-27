import mongoose from 'mongoose';

// Connect to MongoDB database
const connectDB = async () => {
  try {
    // Get database URL from environment or use default
    const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
    
    // Connect to database
    const connection = await mongoose.connect(dbUrl);
    
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // Exit if database connection fails
  }
};

export default connectDB;
