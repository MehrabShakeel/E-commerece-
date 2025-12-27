import bcrypt from 'bcryptjs';

// Number of salt rounds for password hashing (higher = more secure but slower)
const SALT_ROUNDS = 12;

// Hash a password - converts plain text password to secure hash
export async function hashPassword(password) {
  // Check if password is valid
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }

  try {
    // Generate salt (random data used to hash password)
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

// Compare password - check if entered password matches stored hash
export async function comparePassword(password, hashedPassword) {
  // If either is missing, return false
  if (!password || !hashedPassword) {
    return false;
  }

  try {
    // Compare plain password with hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    return false;
  }
}

// Validate password strength - check if password meets requirements
export function validatePasswordStrength(password) {
  // Check if password exists and is long enough
  if (!password || password.length < 6) {
    return {
      valid: false,
      message: 'Password must be at least 6 characters long'
    };
  }

  // Password is valid
  return {
    valid: true,
    message: 'Password is valid'
  };
}
