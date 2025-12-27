import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
import Title from './Title'
import ProductItems from './ProductItems'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setlatestProducts] = useState([])
  useEffect(() => {
    setlatestProducts(products.slice(0, 10));
  }, [products])

  // console.log(products)
  return (
    <div className='flex flex-col items-center pt-4'>
      <div className='flex justify-center text-5xl gap-3'>
        <Title text1={'LATEST'} text2={'     COLLECTIONS'} />
        <div className='w-40 h-1 bg-black mt-6'></div>
      </div>
      <p className="text-center max-w-xl mx-auto mt-6 text-slate-600">Discover trend-forward pieces and timeless essentials for every occasion.
        Elevate your look with fashion that feels as good as it looks.</p>
      {/* rendering products */}
      {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 '>
        {
          latestProducts.map((item, index) => {
            return (
              <ProductItems
                key={index}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          })

        }

      </div> */}
      <div className='px-10 pt-12'> {/* adds space from the left */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 hover:transition ease-in-out duration-300'>
          {
            latestProducts.map((item, index) => {
              return (
                <ProductItems
                  key={index}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              );
            })
          }
        </div>
      </div>

    </div>
  )
}

export default LatestCollection