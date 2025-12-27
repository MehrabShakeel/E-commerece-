
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import Title from './Title';
import ProductItems from './ProductItems';

const BestSellers = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    setBestseller(products.filter((item) => item.bestseller));
  }, [products]);

  return (
    <div className='flex flex-col items-center pt-4'>
      <div className='flex justify-center text-5xl gap-3'>
        <Title text1={'BEST'} text2={' SELLERS'} />
                     <div className='w-40 h-1 bg-black mt-6'></div>
      </div>
      <p className="text-center max-w-xl mx-auto mt-6 text-slate-600">
        Our most-loved pieces, picked by you. Explore what everyone is buying right now.
      </p>

      <div className='px-10 pt-12 w-full'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 transition-all ease-in-out duration-300'>
          {
            bestseller.map((item, index) => (
              <ProductItems
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default BestSellers;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductItems from "./ProductItems";

// const BestSellers = () => {
//   const [bestseller, setBestseller] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/product/list", {
//           headers: {
//             token: localStorage.getItem("token"), // 👈 yahan token bhejna hoga
//           },
//         });

//         console.log("API Response ===>", res.data);

//         const allProducts = Array.isArray(res.data.products)
//           ? res.data.products
//           : [];

//         const best = allProducts.filter((p) => p.bestseller === true);

//         setBestseller(best);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>

//       {bestseller.length === 0 ? (
//         <p>No Best Seller Products Found</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {bestseller.map((item) => (
//             <ProductItems
//               key={item._id}
//               id={item._id}
//               name={item.name}
//               price={item.price}
//               image={item.image[0]}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BestSellers;
