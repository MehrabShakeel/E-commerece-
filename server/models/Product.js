import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['men', 'women', 'kids']
  },
  subCategory: {
    type: String,
    required: true,
    enum: ['topwear', 'bottomwear', 'winter']
  },
  bestseller: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  sizes: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one size must be provided'
    }
  }
}, {
  timestamps: true
});

// Add virtual id field that matches the frontend expectation
productSchema.virtual('id').get(function() {
  return this._id.toString();
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;

