import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { badRequest, unauthorized, conflict } from '../middleware/errorHandler.js';
import { hashPassword, comparePassword, validatePasswordStrength } from '../utils/passwordUtils.js';

const router = express.Router();

// Generate JWT token for user
function generateToken(userId) {
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  return jwt.sign({ id: userId }, secret, {
    expiresIn: '30d' // Token expires in 30 days
  });
}

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password) {
      return next(badRequest('Please provide name, email, and password'));
    }

    // Validate password strength
    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.valid) {
      return next(badRequest(passwordCheck.message));
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(badRequest('Please provide a valid email address'));
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return next(conflict('User with this email already exists'));
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone ? phone.trim() : '',
      address: address || {},
      role: 'user' // All new registrations are regular users
    });

    // Save user to database
    const savedUser = await user.save();
    const userData = savedUser.toJSON();

    // Generate token for the new user
    const token = generateToken(savedUser._id);

    // Send success response
    res.status(201).json({
      success: true,
      user: userData,
      token: token,
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Login user
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next(badRequest('Please provide email and password'));
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Check if user exists
    if (!user) {
      return next(unauthorized('Invalid credentials'));
    }

    // Check if user account is active
    if (!user.isActive) {
      return next(unauthorized('Your account has been deactivated'));
    }

    // Compare entered password with stored password
    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return next(unauthorized('Invalid credentials'));
    }

    // Convert user to JSON (removes password)
    const userData = user.toJSON();

    // Generate token
    const token = generateToken(user._id);

    // Send success response
    res.status(200).json({
      success: true,
      user: userData,
      token: token,
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
});

// Get current logged in user
router.get('/me', protect, async (req, res, next) => {
  try {
    // User is already attached to req by protect middleware
    const userData = req.user.toJSON();
    
    res.status(200).json({
      success: true,
      user: userData
    });
  } catch (error) {
    next(error);
  }
});

export default router;
