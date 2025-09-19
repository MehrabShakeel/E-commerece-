


import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContextProvider';
import searchIcon from '../assets/searchIcon.png';
import { RxCross1 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';

const SearchBar = () => {
    const { search, setsearch, showSearch, setshowSearch } = useContext(ShopContext);
    const [visible, setvisible] = useState(false)
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setvisible(true)
        }
        else {
            setvisible(false)
        }
    }, [location])


    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-40 text-center py-5'>
            <div className='flex items-center justify-center gap-4 mx-auto w-3/4 sm:w-1/2'>
                {/* Search input */}
                <div className='flex items-center border border-gray-400 px-5 py-2 rounded-full w-full'>
                    <input
                        className='flex-grow outline-none bg-inherit'
                        type="text"
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                    />
                    <img className='w-10' src={searchIcon} alt="searchIcon" />
                </div>

                {/* Clickable cross */}
                <span
                    onClick={() => setshowSearch(false)}
                    className='cursor-pointer text-2xl p-1 hover:text-red-500'
                >
                    <RxCross1 />
                </span>
            </div>
        </div>
    ) : null;
};

export default SearchBar;
