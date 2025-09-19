import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
import Title from './Title'
import ProductItems from './ProductItems'

const RelatedCategory = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext)
  const [relatedProducts, setrelatedProducts] = useState([])

  useEffect(() => {
     console.log("All Products:", products);
    if (products.length > 0) {
      let productsCopy = products.slice()
      productsCopy = productsCopy.filter((item) => category === item.category)
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
      setrelatedProducts(productsCopy.slice(0, 5))
    }
  }, [products, category, subCategory])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {relatedProducts.map((item, index) => (
          <ProductItems
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedCategory
