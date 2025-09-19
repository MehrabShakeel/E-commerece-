


// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContextProvider';
// import RelatedCategory from '../components/RelatedCategory';

// const Product = () => {
//   const { id } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');

//   useEffect(() => {
//     const item = products.find((item) => item.id === Number(id));
//     if (item) {
//       setProductData(item);
//       // setSelectedSize(item.sizes[0]); // default selected size
//     }
//   }, [id, products]);

//   return productData ? (
//     <div className="px-6 md:px-20 py-10">
//       <div className="flex flex-col md:flex-row gap-10">
//         {/* Image Section */}
//         <div className="flex gap-4">
//           {/* Small thumbnail image */}
//           <img
//             src={productData.image}
//             alt="Thumbnail"
//             className="w-24 h-24 object-cover border rounded-md"
//           />

//           {/* Large main image */}
//           <img
//             src={productData.image}
//             alt={productData.name}
//             className="w-[400px] h-[400px] object-cover rounded-md shadow-md"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="w-full md:w-1/2 space-y-4">
//           <h1 className="text-3xl font-bold">{productData.name}</h1>

//           {/* Stars */}
//           <div className="flex text-yellow-400 text-xl">
//             <span>★</span>
//             <span>★</span>
//             <span>★</span>
//             <span>★</span>
//             <span className="text-gray-300">★</span>
//           </div>

//           <p className="text-xl font-semibold">
//             {currency}
//             {productData.price}
//           </p>

//           <p className="text-gray-700">{productData.description}</p>

//           {/* Size Selection */}
//           {/* <div className="mt-4">
//             <label className="block font-medium mb-1">Select Size</label>
//             <select
//               value={selectedSize}
//               onChange={(e) => setSelectedSize(e.target.value)}
//               className="border px-3 py-2 rounded w-full md:w-1/2"
//             >
//               {productData.sizes.map((size, index) => (
//                 <option key={index} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div> */}
//           <div className="flex gap-2 flex-wrap mt-2">
//             {productData.sizes.map((size, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedSize(size)}
//                 className={`px-4 py-2 border rounded 
//         ${selectedSize === size
//                     ? 'bg-black text-white border-black'
//                     : 'bg-white text-black border-gray-300 hover:border-black'}`}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>


//           {/* Add to Cart Button */}
//           <button onClick={() => addToCart(productData.id, selectedSize)} className="mt-6 bg-black text-white px-6 py-2 rounded">
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Description Section */}
//       <div className="mt-16">
//         <h2 className="text-2xl font-bold mb-4">Description</h2>
//         <p className="text-gray-700 mb-4">Reviews (122)</p>
//         <p className="text-gray-600 leading-relaxed">
//           An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
//           <br></br>
//           E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
//         </p>
//       </div>
//       <RelatedCategory category={productData.category} subCategory={productData.subCategory} />

//     </div>

//   ) : (
//     <div className="opacity-0">Loading...</div>
//   );
// };

// export default Product;


import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextProvider';
import RelatedCategory from '../components/RelatedCategory';

const Product = () => {
  const { id } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const item = products.find((item) => item.id === Number(id));
    if (item) {
      setProductData(item);
      // ❌ Removed default size selection
    }
  }, [id, products]);

  return productData ? (
    <div className="px-6 md:px-20 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="flex gap-4">
          <img
            src={productData.image}
            alt="Thumbnail"
            className="w-24 h-24 object-cover border rounded-md"
          />

          <img
            src={productData.image}
            alt={productData.name}
            className="w-[400px] h-[400px] object-cover rounded-md shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{productData.name}</h1>

          {/* Stars */}
          <div className="flex text-yellow-400 text-xl">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span className="text-gray-300">★</span>
          </div>

          <p className="text-xl font-semibold">
            {currency}
            {productData.price}
          </p>

          <p className="text-gray-700">{productData.description}</p>

          {/* Size Selection Buttons */}
          <div className="mt-4">
            <label className="block font-medium mb-1">Select Size</label>
            <div className="flex gap-2 flex-wrap mt-2">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded 
                    ${selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData.id, selectedSize)}
            className="mt-6 bg-black text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-gray-700 mb-4">Reviews (122)</p>
        <p className="text-gray-600 leading-relaxed">
          An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          <br />
          E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
        </p>
      </div>

      <RelatedCategory category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
