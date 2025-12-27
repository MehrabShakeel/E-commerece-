


import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setfilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setsubCategory] = useState([])
  const [sortBy, setsortBy] = useState('relevant')
  useEffect(() => {
    setfilterProducts(products)
  }, [])

  
 const toggleCategory = (event) => {
  if (category.includes(event.target.value)) {
    // If the clicked category is already selected, remove it
    setCategory(prev => prev.filter(item => item !== event.target.value))
  } else {
    // If not selected, add it
    setCategory(prev => [...prev, event.target.value])
  }
}
const togglesubCategory=(event)=>{
    if (subCategory.includes(event.target.value)) {
  // If the clicked category is already selected, remove it
    setsubCategory(prev => prev.filter(item => item !== event.target.value))
  } else {
    // If not selected, add it
    setsubCategory(prev => [...prev, event.target.value])
  }
}
const applyFilter = () => {
  console.log("Search:", search, "ShowSearch:", showSearch);
  let productsCopy = products.slice();

  if (showSearch && search) {
    productsCopy = productsCopy.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category.length > 0) {
    productsCopy = productsCopy.filter(item =>
      category.includes(item.category)
    );
  }

  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter(item =>
      subCategory.includes(item.subCategory)
    );
  }

  setfilterProducts(productsCopy);
};

// const applyFilter = () => {
//   let productsCopy = products.slice();

//   if (showsearch && search) {
//     productsCopy = productsCopy.filter(item =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }

//   if (category.length > 0) {
//     productsCopy = productsCopy.filter(item =>
//       category.includes(item.category)
//     );
//   }

//   if (subCategory.length > 0) {
//     productsCopy = productsCopy.filter(item =>
//       subCategory.includes(item.subCategory)
//     );
//   }

//   setfilterProducts(productsCopy);
// };

// const applyFilter = () => {
//   let productsCopy = products.slice();
//   if(showsearch && search)
//   {
//    productsCopy = productsCopy.filter(item =>
//   item.name.toLowerCase().includes(search.toLowerCase())
// );

// ;  }
//   if (category.length > 0) {
//     productsCopy = productsCopy.filter(item => category.includes(item.category));
//   }

//   // You can add subCategory logic here 
//    if (subCategory.length > 0) {
//     productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
//   }

//   setfilterProducts(productsCopy);
// };
 const sortProducts=()=>{

  let filterProductsCopy = filterProducts.slice();

  switch(sortBy)
  {
    case 'Low-High':
      setfilterProducts(filterProductsCopy.sort((a,b)=>(a.price - b.price)))
      break;

       case 'High-Low':
      setfilterProducts(filterProductsCopy.sort((a,b)=>(b.price - a.price)))
      break;

   default:
    applyFilter()
   break;
 }
 }
 const sortTypefunction=(event)=>{
     setsortBy(event.target.value)
 }
useEffect(() => {
  applyFilter()
}, [category,subCategory,search,products])

useEffect(() => {
 sortProducts()
}, [sortBy])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Section (always visible) */}
      <div className='min-w-60'>

        {/* FILTER HEADER */}
        <p
          className='px-10 text-2xl flex items-center cursor-pointer gap-2 text-black'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
        </p>

        {/* Filter Content: CATEGORIES + TYPE */}
        <div
          className={`border border-gray-500 pl-5 py-3 mt-6
            ${showFilter ? 'block' : 'hidden'} 
            sm:block`}
        >

          {/* CATEGORIES */}
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-medium mb-6'>
            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value='men' onChange={toggleCategory}/>
              <span>MEN</span>
            </label>

            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value='women'  onChange={toggleCategory}/>
              <span>WOMEN</span>
            </label>

            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value='kids' onChange={toggleCategory} />
              <span>KIDS</span>
            </label>
          </div>

          {/* TYPE */}
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-medium'>
            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value='topwear' onChange={togglesubCategory} />
              <span>TopWear</span>
            </label>

            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value='bottomwear'onChange={togglesubCategory} />
              <span>BottomWear</span>
            </label>

            <label className='flex gap-2 items-center'>
              <input className='w-3' type='checkbox' value='winter'onChange={togglesubCategory} />
              <span>WinterWear</span>
            </label>
          </div>
        </div>
      </div>

      {/* Products section can go here */}
      <div className='flex-1'>{/* Products go here */}
        <div className='flex justify-between text-base sm:text-2xl mb-2'>
          <Title text1={'ALL '} text2={' COLLECTIONS'} />
          {/* <div className='w-20 h-1 bg-black mt-6 relative mx-'></div> */}
          <select onChange={sortTypefunction}className='border border-2 border-gray-500 text-sm py-2'>
            <option value='relevant'>Sort by: Relevant</option>
            <option value='Low-High'>Sort by: Low to High</option>
            <option value='High-Low'>Sort by: High to Low</option>

          </select>
        </div>
<div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 gap-y-6'>
  {
    filterProducts.map((item,index)=>{
      return(
        <ProductItems key={index} image={item.image} name={item.name} id={item.id} price ={item.price}/>
      )
    })
  }
</div>
      </div>
    </div>
  );
};

export default Collection;
