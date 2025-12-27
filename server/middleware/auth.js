import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { unauthorized, forbidden } from './errorHandler.js';

// Middleware to check if user is logged in
export async function protect(req, res, next) {
  try {
    // Get token from request header
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return next(unauthorized('Not authorized, no token'));
    }

    try {
      // Verify the token
      const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      const decoded = jwt.verify(token, secret);

      // Find user by ID from token
      const user = await User.findById(decoded.id).select('-password');

      // Check if user exists
      if (!user) {
        return next(unauthorized('User not found'));
      }

      // Check if user account is active
      if (!user.isActive) {
        return next(unauthorized('User account is inactive'));
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      return next(unauthorized('Not authorized, token failed'));
    }
  } catch (error) {
    next(error);
  }
}

// Middleware to check if user is admin
export function admin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(forbidden('Access denied. Admin privileges required.'));
  }
}
