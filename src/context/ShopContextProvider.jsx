

import React, { createContext, useState ,useEffect} from 'react';
import axios from "axios";
// import { products } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [search, setsearch] = useState('');
  const [showSearch, setshowSearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
  const navigate = useNavigate();
  const [products, setproducts] = useState([])

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error('Please select size first');
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setcartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch { }
      }
    }
    return totalCount;
  };

  const getCartData = () => {
    let cartArray = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          const productData = products.find(
            (p) => p.id === parseInt(productId)
          );
          cartArray.push({
            ...productData,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    return cartArray;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity;
    setcartItems(cartData);
  }

  // const getCartTotal =  () => {
  //   let totalAmount = 0;
  //   for (const items in cartItems) {
  //     let itemInfo = products.find((product) => product.id === items);
  //     for (const item in cartItems[items]) {
  //       try {
  //         if (cartItems[items][item] > 0) {
  //           totalAmount += itemInfo.price * cartItems[items][item]
  //         }
  //       } catch (error) {

  //       }

  //     }


  //   }
  //   return totalAmount;
  // }
const getCartTotal = () => {
  let totalAmount = 0;

  for (const productId in cartItems) {
    let itemInfo = products.find(
      (product) => product.id === parseInt(productId)
    );

    for (const size in cartItems[productId]) {
      if (cartItems[productId][size] > 0) {
        totalAmount += itemInfo.price * cartItems[productId][size];
      }
    }
  }

  return totalAmount;
};

// const getProductsData= async()=>{
//   try {
//     const response = await axios.get(backend_url+'/api/product/list');
//     // console.log(response.data);
//     if (response.data.success) {
//       setproducts(response.data.products)
      
//     } else {
//       toast.error(response.data.message)
//     }
//   } catch (error) {
//     console.log(error);
    
//     toast.error(error.message)
//   }
// }

// useEffect(() => {
  
// getProductsData();
// }, [])


const value = {
  currency,
  delivery_fee,
  products,
  search,
  setsearch,
  showSearch,
  setshowSearch,
  cartItems,
  addToCart,
  getCartCount,
  getCartData,
  updateQuantity,
  getCartTotal,
  navigate,
  backend_url
};

return (
  <ShopContext.Provider value={value}>
    {props.children}
  </ShopContext.Provider>
);
};

export default ShopContextProvider;
