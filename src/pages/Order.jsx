import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
import Title from '../components/Title'

const Order = () => {
  const { currency, products } = useContext(ShopContext)
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mx-3'>
        <Title text1={' MY '} text2={' ORDER'} />
      </div>
      <div>
        {
          products.slice(0, 4).map((item, index) => (
            <div key={index}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row items-center md:justify-between gap-4'>
              <div className='flex items-start gap-9 text-sm '>
                <img className='w-30 h-40 mx-4' 
                src={item.image} alt='images' />
                <div >
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-7 text-gray-700 mt-2 text-base'>
                    <p className='text-lg'>{currency}{item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>

                  </div>
                  <p className='mt-3'>Date:<span className='text-gray-400'>25,July 2025</span></p>
                </div>
              </div>
              <div className='md:w-1/2  flex justify-between'>
                <div className='flex items-center gap-3'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='teext-sm md:text-base'>Ready To Ship</p>
                </div>
                <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order

