import mongoose from 'mongoose';

// Define the User schema (structure of user data in database)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // This field is required
    trim: true // Remove extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
    lowercase: true, // Convert to lowercase
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Password must be at least 6 characters
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Only these values are allowed
    default: 'user' // Default value if not provided
  },
  isActive: {
    type: Boolean,
    default: true // User is active by default
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Add virtual id field (converts _id to id for frontend compatibility)
userSchema.virtual('id').get(function() {
  return this._id.toString();
});

// When converting to JSON, include virtual fields and remove sensitive data
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id; // Remove MongoDB's _id
    delete ret.__v; // Remove version key
    delete ret.password; // Never send password to frontend
    return ret;
  }
});

// Create User model from schema
const User = mongoose.model('User', userSchema);

export default User;
