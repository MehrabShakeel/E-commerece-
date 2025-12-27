import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Create context for shop/cart
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Constants
  const currency = '$';
  const deliveryFee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // State variables
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Add item to cart
  const addToCart = (itemId, size) => {
    // Check if size is selected
    if (!size) {
      toast.error('Please select size first');
      return;
    }

    // Convert itemId to string for consistency
    const productId = itemId.toString();
    
    // Create copy of cart items
    const newCartItems = { ...cartItems };

    // If product already in cart
    if (newCartItems[productId]) {
      // If this size already exists, increase quantity
      if (newCartItems[productId][size]) {
        newCartItems[productId][size] += 1;
      } else {
        // Add new size
        newCartItems[productId][size] = 1;
      }
    } else {
      // Add new product to cart
      newCartItems[productId] = {};
      newCartItems[productId][size] = 1;
    }

    setCartItems(newCartItems);
  };

  // Get total number of items in cart
  const getCartCount = () => {
    let totalCount = 0;
    
    // Loop through all products in cart
    for (const productId in cartItems) {
      // Loop through all sizes for each product
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }
    
    return totalCount;
  };

  // Get cart data as array
  const getCartData = () => {
    const cartArray = [];
    
    // Loop through all products in cart
    for (const productId in cartItems) {
      // Loop through all sizes for each product
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        
        if (quantity > 0) {
          // Find product details
          const product = products.find((p) => {
            const id = p.id || p._id;
            return id?.toString() === productId.toString();
          });
          
          if (product) {
            cartArray.push({
              ...product,
              size: size,
              quantity: quantity
            });
          }
        }
      }
    }
    
    return cartArray;
  };

  // Update quantity of item in cart
  const updateQuantity = (itemId, size, quantity) => {
    const newCartItems = { ...cartItems };
    newCartItems[itemId][size] = quantity;
    setCartItems(newCartItems);
  };

  // Get total price of all items in cart
  const getCartTotal = () => {
    let totalAmount = 0;

    // Loop through all products in cart
    for (const productId in cartItems) {
      // Find product details
      const product = products.find((p) => {
        const id = p.id || p._id;
        return id?.toString() === productId.toString();
      });

      if (product) {
        // Loop through all sizes for this product
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            totalAmount += product.price * quantity;
          }
        }
      }
    }

    return totalAmount;
  };

  // Fetch products from backend
  const getProductsData = async () => {
    try {
      if (!backendUrl) {
        console.warn('Backend URL not configured');
        return;
      }

      const response = await axios.get(`${backendUrl}/api/product/list`);
      
      if (response.data.success) {
        // Ensure all products have an id field
        const productsWithId = response.data.products.map(product => ({
          ...product,
          id: product.id || product._id
        }));
        
        setProducts(productsWithId);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      // Don't show error if backend is not running (for development)
      if (error.code !== 'ERR_NETWORK' && error.code !== 'ECONNREFUSED') {
        toast.error(error.message);
      }
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    getProductsData();
  }, [backendUrl]);

  // Value to provide to context
  const value = {
    currency: currency,
    delivery_fee: deliveryFee,
    products: products,
    search: search,
    setsearch: setSearch,
    showSearch: showSearch,
    setshowSearch: setShowSearch,
    cartItems: cartItems,
    addToCart: addToCart,
    getCartCount: getCartCount,
    getCartData: getCartData,
    updateQuantity: updateQuantity,
    getCartTotal: getCartTotal,
    navigate: navigate,
    backend_url: backendUrl
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
