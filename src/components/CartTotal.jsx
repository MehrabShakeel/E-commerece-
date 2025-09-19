import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
import Title from './Title'

const CartTotal = () => {
    const { delivery_fee, currency, getCartTotal } = useContext(ShopContext)

    return (
        <div className='w-full -mx-8'>
            <div className=' text-2xl'>
                <Title text1={' CART'} text2={' TOTAL'} />

            </div>
            <div className='flex flex-col gap-2 mt-3 text-sm'>
                <div className='flex justify-between'>
                    <p>SubTotal</p>
                    <p>{currency}{getCartTotal()}.00</p>

                </div>
                <hr></hr>
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>

                </div>
                <hr></hr>
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency}{getCartTotal() === '0' ? 0 : getCartTotal() + delivery_fee}.00</b>

                </div>
            </div>
        </div>
    )
}

export default CartTotal