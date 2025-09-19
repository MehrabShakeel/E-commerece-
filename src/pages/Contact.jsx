import React from "react";
import contact from "../assets/contact.jpg";

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 px-6 md:px-20">
      {/* Left Side - Image */}
      <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
        <img
          src={contact}
          alt="Contact"
          className="rounded-xl shadow-lg w-4/5 md:w-[420px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Right Side - Contact Details */}
      <div className="md:w-1/2 w-full space-y-10">
        <h2 className="text-center md:text-left text-gray-900 text-sm tracking-[3px] uppercase">
          Contact <span className="font-bold">Us</span>
        </h2>

        <div className="space-y-8">
          {/* Store Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Our Store</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              FashionHub Clothing <br />
              Shop #12, Mall of Lahore <br />
              Lahore, Pakistan
            </p>
            <p className="text-gray-600 mt-3">
              Tel: +92 345 1234567 <br />
              Email: support@fashionhub.com
            </p>
          </div>

          

          {/* Careers */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Careers at FashionHub</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              Passionate about fashion? Join our growing team and
              help us create styles that inspire confidence.
            </p>
            <button className="mt-4 px-6 py-2 border border-gray-700 text-gray-800 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
