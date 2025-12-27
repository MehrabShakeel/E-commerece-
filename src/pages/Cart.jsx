// // // // import React, { useContext, useState, useEffect } from 'react'
// // // // import { ShopContext } from '../context/ShopContextProvider'

// // // // const Cart = () => {
// // // //   const { products, currency, cartItems } = useContext(ShopContext)

// // // //   const [CartData, setCartData] = useState([])
// // // //   // useEffect(() => {
// // // //   //   const tempData = [];
// // // //   //   for (const items in cartItems) {
// // // //   //     for (const item  in cartItems[items]) {

// // // //   //       if(cartItems[items][item] > 0){
// // // //   //         tempData.push({
// // // //   //           id : items,
// // // //   //           size : item,
// // // //   //           quantity : cartItems[items][item]
// // // //   //         })
// // // //   //       }

// // // //   //     }

// // // //   //   }
// // // //   //   setCartData(tempData)
// // // //   //   console.log(tempData);
// // // //   // }, [cartItems])



// // // //   return (
// // // //     <div style={{ color: 'red', fontSize: '20px' }}>
// // // //       Cart Component Rendered

// // // //     </div>
// // // //   )
// // // // }

// // // // export default Cart;
// // // import React, { useContext, useEffect } from 'react';
// // // import { ShopContext } from '../context/ShopContextProvider';

// // // const Cart = () => {
// // //   const { getCartData } = useContext(ShopContext);

// // //   useEffect(() => {
// // //     const cartArray = getCartData();
// // //     console.log(cartArray); // Ye wahi array dega jisme product detail, size, quantity hoga
// // //   }, [getCartData]); // jab getCartData ka result badle tab chale

// // //   return (
// // //     <div className="p-10">
// // //       <h1 className="text-2xl font-bold mb-4">Cart Page</h1>
// // //     </div>
// // //   );
// // // };

// // // export default Cart;

// // import React, { useContext, useEffect } from 'react';
// // import { ShopContext } from '../context/ShopContextProvider';
// // import Title from '../components/Title';

// // const Cart = () => {
// //   const { getCartData, cartItems } = useContext(ShopContext);

// //   useEffect(() => {
// //     console.log(getCartData()); // Har update par array print karega
// //   }, [cartItems]); // Jab cartItems badlega tab chalega

// //   return (
// //     <div className='border-t pt-15'>
// //       <div className='text-2xl mb-3'>
// //         <Title text1={'YOUR'} text2={'CART'} />

// //       </div>
// //       <div>
// //         {
// //           getCartData.map((items, index) => {
// //             const productData = products.find((product) =>
// //               product.id === items.id
// //             );
// //             return (

// //               <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols items-center gap-4'>
// //                 <div className='flex items-start gap-6'>
// //                   <img className='w-17 sm:w-20'
// //                     src={productData.image[0]} alt='images' />
// //                     <div>
// //                     <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
// //                     </div>
// //                 </div>
// //               </div>
// //             )
// //           })
// //         }
// //       </div>

// //     </div>
// //   );
// // };

// // export default Cart;

// // import React, { useContext, useEffect } from 'react';
// // import { ShopContext } from '../context/ShopContextProvider';
// // import Title from '../components/Title';

// // const Cart = () => {
// //   const { getCartData, cartItems, products } = useContext(ShopContext);

// //   useEffect(() => {
// //     console.log(getCartData()); // Har update par array print karega
// //   }, [cartItems]);

// //   return (
// //     <div className='border-t pt-15'>
// //       <div className='text-2xl mb-3'>
// //         <Title text1={'YOUR'} text2={'CART'} />
// //       </div>

// //       <div>
// //         {
// //           getCartData().map((items, index) => {  // <-- Yaha function call karna zaroori hai
// //             const productData = products.find(
// //               (product) => product.id === items.id
// //             );

// //             if (!productData) return null; // Agar product na mile to skip

// //             return (
// //               <div
// //                 key={index}
// //                 className='py-4 border-t border-b text-gray-700 grid grid-cols items-center gap-4'
// //               >
// //                 <div className='flex items-start gap-6'>
// //                   <img
// //                     className='w-17 sm:w-20'
// //                     src={productData.image[0]}
// //                     alt={productData.name}
// //                   />
// //                   <div>
// //                     <p className='text-xs sm:text-lg font-medium'>
// //                       {productData.name}
// //                     </p>
// //                     <p className='text-gray-500 text-sm'>
// //                       Size: {items.size} | Quantity: {items.quantity}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })
// //         }
// //       </div>
// //     </div>
// //   );
// // };

// // export default Cart;

// import React, { useContext, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContextProvider';
// import Title from '../components/Title';

// const Cart = () => {
//   const { getCartData, cartItems, products, currency } = useContext(ShopContext);

//   useEffect(() => {
//     console.log(getCartData()); // Debugging
//   }, [cartItems]);

//   return (
//     <div className="border-t pt-10">
//       <div className="text-2xl mb-3">
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       {getCartData().length === 0 ? (
//         <p className="text-gray-500">Your cart is empty</p>
//       ) : (
//         getCartData().map((item, index) => {
//           const productData = products.find(
//             (product) => product.id === item.id
//           );
//           if (!productData) return null;

//           return (
//             <div
//               key={index}
//               className="py-4 border-b text-gray-700 flex items-center gap-6"
//             >
//               <img
//                 className="w-20"
//                 src={productData.image}
//                 alt={productData.name}
//               />
//               <div className="flex flex-col">
//                 <p className="text-lg font-medium">{productData.name}</p>
//                 <p className="text-sm text-gray-500">
//                   Size: {item.size} | Qty: {item.quantity}
//                 </p>
//                 <p className="text-sm font-semibold">
//                   Price: {currency}
//                   {productData.price * item.quantity}
//                 </p>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import binicon from '../assets/binicon.jpg'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { getCartData, currency, cartItems, updateQuantity,navigate } = useContext(ShopContext);

  useEffect(() => {
    console.log(getCartData());
  }, [cartItems]);

  const cartProducts = getCartData();

  return (
    <div className='border-t pt-10'>
      <div className='text-2xl mb-3'>
        {/* <Title text1={'YOUR'} text2={ ' CART'} />
          <div className='w-40 h-1 bg-black mt-6'></div> */}
        <div className='flex justify-center text-5xl gap-3'>
          <Title text1={'YOUR'} text2={' CART'} />
          <div className='w-40 h-1 bg-black mt-6'></div>
        </div>
      </div>
      {cartProducts.length === 0 ? (
        <p className='mx-4'>Your cart is empty.</p>
      ) : (
        cartProducts.map((item, index) => (
          <div key={index} className='px-3 py-4 border-t border-b text-gray-700 grid grid-cols-[auto_1fr_auto] items-center gap-4'>
            <img className='w-20' src={item.image} alt={item.name} />
            <div >
              <p className='text-lg font-medium'>{item.name}</p>
              <p className='text-sm'>Size: {item.size}</p>
              <p className='text-sm'>Quantity: {item.quantity}</p>
            </div>
            <p className='font-bold'>
              {currency}{item.price * item.quantity}
            </p>
            <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item.id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number ' min={1} defaultValue={item.quantity} />
            <img onClick={() => { updateQuantity(item.id, item.size, 0) }} className='w-8 mr-4 sm:wr-12 cursor-pointer' src={binicon} alt='bin_Icon' />
          </div>
        ))
      )}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end -mx-7'>
            <button onClick={()=>navigate('/placeOrder')} className='bg-black text-white text-sm my-8 px-8 py-3'>Proceed To CheckOut</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;


