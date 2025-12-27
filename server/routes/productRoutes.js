import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import { catchAsync, badRequest, notFound } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all products
router.get('/list', catchAsync(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    products: products
  });
}));

// Get single product by ID
router.get('/:id', catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(notFound('Product not found'));
  }
  res.status(200).json({
    success: true,
    product: product
  });
}));

// Create new product (admin only)
router.post('/create', protect, admin, catchAsync(async (req, res, next) => {
  const { name, price, image, category, subCategory, bestseller, description, sizes } = req.body;

  // Validation
  if (!name || !price || !image || !category || !subCategory || !description || !sizes || sizes.length === 0) {
    return next(badRequest('Please provide all required fields'));
  }

  // Validate price
  if (typeof price !== 'number' || price < 0) {
    return next(badRequest('Price must be a positive number'));
  }

  // Validate category
  if (!['men', 'women', 'kids'].includes(category)) {
    return next(badRequest('Category must be one of: men, women, kids'));
  }

  // Validate subCategory
  if (!['topwear', 'bottomwear', 'winter'].includes(subCategory)) {
    return next(badRequest('SubCategory must be one of: topwear, bottomwear, winter'));
  }

  // Validate sizes array
  if (!Array.isArray(sizes) || sizes.length === 0) {
    return next(badRequest('Sizes must be a non-empty array'));
  }

  const product = new Product({
    name: name.trim(),
    price: parseFloat(price),
    image,
    category,
    subCategory,
    bestseller: bestseller || false,
    description: description.trim(),
    sizes
  });

  const savedProduct = await product.save();
  res.status(201).json({
    success: true,
    product: savedProduct,
    message: 'Product created successfully'
  });
}));

// Update product (admin only)
router.put('/:id', protect, admin, catchAsync(async (req, res, next) => {
  const { name, price, image, category, subCategory, bestseller, description, sizes } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(notFound('Product not found'));
  }

  // Update fields with validation
  if (name) product.name = name.trim();
  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {
      return next(badRequest('Price must be a positive number'));
    }
    product.price = price;
  }
  if (image) product.image = image;
  if (category) {
    if (!['men', 'women', 'kids'].includes(category)) {
      return next(badRequest('Category must be one of: men, women, kids'));
    }
    product.category = category;
  }
  if (subCategory) {
    if (!['topwear', 'bottomwear', 'winter'].includes(subCategory)) {
      return next(badRequest('SubCategory must be one of: topwear, bottomwear, winter'));
    }
    product.subCategory = subCategory;
  }
  if (bestseller !== undefined) product.bestseller = bestseller;
  if (description) product.description = description.trim();
  if (sizes) {
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return next(badRequest('Sizes must be a non-empty array'));
    }
    product.sizes = sizes;
  }

  const updatedProduct = await product.save();
  res.status(200).json({
    success: true,
    product: updatedProduct,
    message: 'Product updated successfully'
  });
}));

// Delete product (admin only)
router.delete('/:id', protect, admin, catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(notFound('Product not found'));
  }
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
}));

export default router;

