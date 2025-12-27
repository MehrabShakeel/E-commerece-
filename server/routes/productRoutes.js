import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import { badRequest, notFound } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all products (public route - anyone can view)
router.get('/list', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      products: products
    });
  } catch (error) {
    next(error);
  }
});

// Get single product by ID (public route)
router.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if (!product) {
      return next(notFound('Product not found'));
    }
    
    res.status(200).json({
      success: true,
      product: product
    });
  } catch (error) {
    next(error);
  }
});

// Create new product (admin only)
router.post('/create', protect, admin, async (req, res, next) => {
  try {
    const { name, price, image, category, subCategory, bestseller, description, sizes } = req.body;

    // Validate required fields
    if (!name || !price || !image || !category || !subCategory || !description) {
      return next(badRequest('Please provide all required fields'));
    }

    // Validate sizes array
    if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
      return next(badRequest('Sizes must be a non-empty array'));
    }

    // Validate price
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      return next(badRequest('Price must be a positive number'));
    }

    // Validate category
    const validCategories = ['men', 'women', 'kids'];
    if (!validCategories.includes(category)) {
      return next(badRequest('Category must be one of: men, women, kids'));
    }

    // Validate subCategory
    const validSubCategories = ['topwear', 'bottomwear', 'winter'];
    if (!validSubCategories.includes(subCategory)) {
      return next(badRequest('SubCategory must be one of: topwear, bottomwear, winter'));
    }

    // Create new product
    const product = new Product({
      name: name.trim(),
      price: priceNumber,
      image: image,
      category: category,
      subCategory: subCategory,
      bestseller: bestseller || false,
      description: description.trim(),
      sizes: sizes
    });

    // Save product
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      product: savedProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update product (admin only)
router.put('/:id', protect, admin, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, price, image, category, subCategory, bestseller, description, sizes } = req.body;

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return next(notFound('Product not found'));
    }

    // Update name if provided
    if (name) {
      product.name = name.trim();
    }

    // Update price if provided
    if (price !== undefined) {
      const priceNumber = parseFloat(price);
      if (isNaN(priceNumber) || priceNumber < 0) {
        return next(badRequest('Price must be a positive number'));
      }
      product.price = priceNumber;
    }

    // Update image if provided
    if (image) {
      product.image = image;
    }

    // Update category if provided
    if (category) {
      const validCategories = ['men', 'women', 'kids'];
      if (!validCategories.includes(category)) {
        return next(badRequest('Category must be one of: men, women, kids'));
      }
      product.category = category;
    }

    // Update subCategory if provided
    if (subCategory) {
      const validSubCategories = ['topwear', 'bottomwear', 'winter'];
      if (!validSubCategories.includes(subCategory)) {
        return next(badRequest('SubCategory must be one of: topwear, bottomwear, winter'));
      }
      product.subCategory = subCategory;
    }

    // Update bestseller if provided
    if (bestseller !== undefined) {
      product.bestseller = bestseller;
    }

    // Update description if provided
    if (description) {
      product.description = description.trim();
    }

    // Update sizes if provided
    if (sizes) {
      if (!Array.isArray(sizes) || sizes.length === 0) {
        return next(badRequest('Sizes must be a non-empty array'));
      }
      product.sizes = sizes;
    }

    // Save updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: 'Product updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Delete product (admin only)
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) {
      return next(notFound('Product not found'));
    }
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
