// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContextProvider'

// const BestSellers = () => {

//     const { products } = useContext(ShopContext)
//     const [bestseller, setBestseller] = useState([])
//     useEffect(() => {

//        setBestseller(products.filter((item)=>item.bestseller))

//     }, [])

//     return (
//         <div>

//         </div>
//     )
// }

// export default BestSellers

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
                id={item.id}
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
