import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { catchAsync, badRequest, unauthorized, conflict } from '../middleware/errorHandler.js';
import { hashPassword, comparePassword, validatePasswordStrength } from '../utils/passwordUtils.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key-change-in-production', {
    expiresIn: '30d'
  });
};

// Register new user
router.post('/register', catchAsync(async (req, res, next) => {
  const { name, email, password, phone, address } = req.body;

  // Validation
  if (!name || !email || !password) {
    return next(badRequest('Please provide name, email, and password'));
  }

  // Validate password strength
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.valid) {
    return next(badRequest(passwordValidation.message));
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(badRequest('Please provide a valid email address'));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(conflict('User with this email already exists'));
  }

  // Hash password securely
  const hashedPassword = await hashPassword(password);

  // Create user (default role is 'user')
  const user = new User({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    phone: phone?.trim(),
    address,
    role: 'user' // New registrations are always 'user' role
  });

  const savedUser = await user.save();
  const userResponse = savedUser.toJSON();

  // Generate token
  const token = generateToken(savedUser._id);

  res.status(201).json({
    success: true,
    user: userResponse,
    token,
    message: 'User registered successfully'
  });
}));

// Login user
router.post('/login', catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return next(badRequest('Please provide email and password'));
  }

  // Check for user
  const user = await User.findOne({ email: email.toLowerCase().trim() });

  if (!user) {
    return next(unauthorized('Invalid credentials'));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(unauthorized('Your account has been deactivated'));
  }

  // Check password securely
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return next(unauthorized('Invalid credentials'));
  }

  const userResponse = user.toJSON();
  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    user: userResponse,
    token,
    message: 'Login successful'
  });
}));

// Get current user
router.get('/me', protect, catchAsync(async (req, res) => {
  const user = req.user.toJSON();
  res.status(200).json({
    success: true,
    user
  });
}));

export default router;

