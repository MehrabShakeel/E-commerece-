

import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { FiSearch } from "react-icons/fi";
import { IoMdContact } from "react-icons/io";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { ShopContext } from '../context/ShopContextProvider';

const Navbar = () => {
  const { setshowSearch, getCartCount } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className='flex justify-between items-center px-10 py-4 bg-white relative z-50'>
        <img src={logo} alt="logo" className='w-36' />

        <ul className='list-none md:flex hidden justify-center items-center gap-6'>
          <li><Link to="/" className='hover:underline'>HOME</Link></li>
          <li><Link to="/collection" className='hover:underline'>COLLECTION</Link></li>
          <li><Link to="/about" className='hover:underline'>ABOUT</Link></li>
          <li><Link to="/contact" className='hover:underline'>CONTACT</Link></li>
        </ul>

        <div className='flex items-center gap-6 text-2xl pt-1'>
          <FiSearch onClick={() => setshowSearch(true)} className="cursor-pointer" />

         <Link to={'/login'}><IoMdContact className="cursor-pointer" />
</Link> 
          <Link to="/cart" className="relative cursor-pointer">
            <FaCartFlatbedSuitcase />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            )}
          </Link>

          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden top-0 left-0 w-full h-screen bg-white z-40 flex flex-col gap-6 p-10 text-xl font-semibold">
          <Link to="/" onClick={closeMenu}>HOME</Link>
          <Link to="/collection" onClick={closeMenu}>COLLECTION</Link>
          <Link to="/about" onClick={closeMenu}>ABOUT</Link>
          <Link to="/contact" onClick={closeMenu}>CONTACT</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;

