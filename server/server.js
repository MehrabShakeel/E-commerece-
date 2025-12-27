import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler, notFoundRoute } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB database
connectDB();

// Middleware - these run on every request
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON data from requests
app.use(express.urlencoded({ extended: true })); // Parse form data

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes (login, register)
app.use('/api/product', productRoutes); // Product routes
app.use('/api/user', userRoutes); // User management routes (admin only)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Handle 404 - if route doesn't exist
app.use(notFoundRoute);

// Handle all errors - must be last
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
