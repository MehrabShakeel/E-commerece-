import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { unauthorized, forbidden } from './errorHandler.js';

// Protect routes - require authentication
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(unauthorized('Not authorized, no token'));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return next(unauthorized('User not found'));
      }

      if (!req.user.isActive) {
        return next(unauthorized('User account is inactive'));
      }

      next();
    } catch (error) {
      return next(unauthorized('Not authorized, token failed'));
    }
  } catch (error) {
    next(error);
  }
};

// Protect routes - require admin role
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(forbidden('Access denied. Admin privileges required.'));
  }
};

