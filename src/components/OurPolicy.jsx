import React from 'react'
import { RiExchangeDollarLine } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { RiCustomerServiceFill } from "react-icons/ri";

const OurPolicy = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-6 py-10 bg-gray-100 rounded-lg">
            <div className="text-center max-w-xs">
                <RiExchangeDollarLine className="text-5xl text-blue-600 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-800">Easy & Secure Payments</p>
                <p className="text-sm text-gray-600">Shop confidently with our trusted payment methods and safe checkout.</p>
            </div>
            <div className="text-center max-w-xs">
                <GiReturnArrow className="text-5xl text-green-600 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-800">Hassle-Free Returns</p>
                <p className="text-sm text-gray-600">Enjoy easy returns within 7 days with no questions asked.</p>
            </div>
            <div className="text-center max-w-xs">
                <RiCustomerServiceFill className="text-5xl text-teal-600 mx-auto mb-3" />
                <p className="text-lg font-semibold text-gray-800">24/7 Support</p>
                <p className="text-sm text-gray-600">Our team is here to help you anytime with your queries or issues.</p>
            </div>
        </div>
    )
}

export default OurPolicy
