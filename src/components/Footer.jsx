// import React from 'react'

// const Footer = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Footer
import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className=" bg-white-900 text-gray py-10 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">

                {/* Logo or Site Name */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">Your Shop</h2>
                     <img src={logo} alt="logo" className='w-36' />
                    <p className="text-sm text-gray-600">
                        Discover timeless style and modern comfort with every piece.
                        Crafted to elevate your wardrobe without compromising on value.
                    </p>

                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><a href="#" className="hover:text-black">Home</a></li>
                        <li><a href="#" className="hover:text-black">Shop</a></li>
                        <li><a href="#" className="hover:text-black">About</a></li>
                        <li><a href="#" className="hover:text-black">Contact</a></li>
                    </ul>
                </div>

                {/* Social or Contact */}
                <div>
                    <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
                        <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
                        <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="text-center text-sm text-gray-800 mt-10 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} YourShop. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
