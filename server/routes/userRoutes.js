import express from 'express';
import User from '../models/User.js';
import { protect, admin } from '../middleware/auth.js';
import { badRequest, notFound, conflict } from '../middleware/errorHandler.js';
import { hashPassword, validatePasswordStrength } from '../utils/passwordUtils.js';

const router = express.Router();

// Get all users (admin only)
router.get('/list', protect, admin, async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    next(error);
  }
});

// Get single user by ID (admin only)
router.get('/:id', protect, admin, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return next(notFound('User not found'));
    }
    
    res.status(200).json({
      success: true,
      user: user
    });
  } catch (error) {
    next(error);
  }
});

// Create new user (admin only)
router.post('/create', protect, admin, async (req, res, next) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return next(badRequest('Please provide name, email, and password'));
    }

    // Validate password
    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.valid) {
      return next(badRequest(passwordCheck.message));
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(badRequest('Please provide a valid email address'));
    }

    // Validate role if provided
    if (role && role !== 'user' && role !== 'admin') {
      return next(badRequest('Role must be either "user" or "admin"'));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return next(conflict('User with this email already exists'));
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone ? phone.trim() : '',
      address: address || {},
      role: role || 'user'
    });

    // Save user
    const savedUser = await user.save();
    const userData = savedUser.toJSON();

    res.status(201).json({
      success: true,
      user: userData,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update user (admin only)
router.put('/:id', protect, admin, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, email, password, phone, address, role, isActive } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return next(notFound('User not found'));
    }

    // Update name if provided
    if (name) {
      user.name = name.trim();
    }

    // Update email if provided
    if (email) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return next(badRequest('Please provide a valid email address'));
      }

      // Check if email is already taken by another user
      const existingUser = await User.findOne({ 
        email: email.toLowerCase().trim(),
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        return next(conflict('Email already in use by another user'));
      }
      
      user.email = email.toLowerCase().trim();
    }

    // Update password if provided
    if (password) {
      // Validate password
      const passwordCheck = validatePasswordStrength(password);
      if (!passwordCheck.valid) {
        return next(badRequest(passwordCheck.message));
      }
      
      // Hash new password
      user.password = await hashPassword(password);
    }

    // Update phone if provided
    if (phone !== undefined) {
      user.phone = phone ? phone.trim() : '';
    }

    // Update address if provided
    if (address) {
      user.address = address;
    }

    // Update role if provided
    if (role) {
      if (role !== 'user' && role !== 'admin') {
        return next(badRequest('Role must be either "user" or "admin"'));
      }
      user.role = role;
    }

    // Update isActive if provided
    if (isActive !== undefined) {
      user.isActive = isActive;
    }

    // Save updated user
    const updatedUser = await user.save();
    const userData = updatedUser.toJSON();

    res.status(200).json({
      success: true,
      user: userData,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Delete user (admin only)
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return next(notFound('User not found'));
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
