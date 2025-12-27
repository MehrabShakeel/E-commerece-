import mongoose from 'mongoose';

// Define the Product schema (structure of product data in database)
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // This field is required
    trim: true // Remove extra spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Price cannot be negative
  },
  image: {
    type: String,
    required: true // Base64 image string
  },
  category: {
    type: String,
    required: true,
    enum: ['men', 'women', 'kids'] // Only these values are allowed
  },
  subCategory: {
    type: String,
    required: true,
    enum: ['topwear', 'bottomwear', 'winter'] // Only these values are allowed
  },
  bestseller: {
    type: Boolean,
    default: false // Not a bestseller by default
  },
  description: {
    type: String,
    required: true
  },
  sizes: {
    type: [String], // Array of strings
    required: true,
    validate: {
      validator: function(v) {
        // At least one size must be provided
        return v && v.length > 0;
      },
      message: 'At least one size must be provided'
    }
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Add virtual id field (converts _id to id for frontend compatibility)
productSchema.virtual('id').get(function() {
  return this._id.toString();
});

// When converting to JSON, include virtual fields
productSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id; // Remove MongoDB's _id
    delete ret.__v; // Remove version key
    return ret;
  }
});

// Create Product model from schema
const Product = mongoose.model('Product', productSchema);

export default Product;
