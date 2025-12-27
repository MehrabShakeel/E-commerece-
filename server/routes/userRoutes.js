import express from 'express';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';
import { catchAsync, badRequest, notFound, conflict, validationError } from '../middleware/errorHandler.js';
import { hashPassword, validatePasswordStrength } from '../utils/passwordUtils.js';

const router = express.Router();

// Get all users (admin only)
router.get('/list', protect, admin, catchAsync(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    users: users
  });
}));

// Get single user by ID (admin only)
router.get('/:id', protect, admin, catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return next(notFound('User not found'));
  }
  res.status(200).json({
    success: true,
    user: user
  });
}));

// Create new user (admin only)
router.post('/create', protect, admin, catchAsync(async (req, res, next) => {
  const { name, email, password, phone, address, role } = req.body;

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

  // Validate role
  if (role && !['user', 'admin'].includes(role)) {
    return next(badRequest('Role must be either "user" or "admin"'));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    return next(conflict('User with this email already exists'));
  }

  // Hash password securely
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    phone: phone?.trim(),
    address,
    role: role || 'user'
  });

  const savedUser = await user.save();
  // Remove password from response
  const userResponse = savedUser.toJSON();
  res.status(201).json({
    success: true,
    user: userResponse,
    message: 'User created successfully'
  });
}));

// Update user (admin only)
router.put('/:id', protect, admin, catchAsync(async (req, res, next) => {
  const { name, email, password, phone, address, role, isActive } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(notFound('User not found'));
  }

  // Update fields
  if (name) user.name = name.trim();
  if (email) {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(badRequest('Please provide a valid email address'));
    }
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ 
      email: email.toLowerCase().trim(), 
      _id: { $ne: req.params.id } 
    });
    if (existingUser) {
      return next(conflict('Email already in use by another user'));
    }
    user.email = email.toLowerCase().trim();
  }
  if (password) {
    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return next(badRequest(passwordValidation.message));
    }
    // Hash new password securely
    user.password = await hashPassword(password);
  }
  if (phone !== undefined) user.phone = phone?.trim();
  if (address) user.address = address;
  if (role) {
    if (!['user', 'admin'].includes(role)) {
      return next(badRequest('Role must be either "user" or "admin"'));
    }
    user.role = role;
  }
  if (isActive !== undefined) user.isActive = isActive;

  const updatedUser = await user.save();
  const userResponse = updatedUser.toJSON();
  res.status(200).json({
    success: true,
    user: userResponse,
    message: 'User updated successfully'
  });
}));

// Delete user (admin only)
router.delete('/:id', protect, admin, catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(notFound('User not found'));
  }
  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
}));

export default router;

