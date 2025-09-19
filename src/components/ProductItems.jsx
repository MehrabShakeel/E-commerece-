

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextProvider';

const ProductItems = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);
// console.log("IMAGE SRC:", image);

  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/products/${id}`}
    >
      <div className="overflow-hidden">
        <img src={image} alt="product" className="w-full object-cover  transition duration-200 ease-in-out hover:scale-105" />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItems;
