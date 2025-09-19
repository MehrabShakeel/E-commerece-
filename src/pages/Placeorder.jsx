// // // import React,{useState} from 'react'

// // // import Title from '../components/Title';
// // // import CartTotal from '../components/CartTotal';
// // // import stripe_logo from '../assets/stripe_logo.png'
// // // import Razorpay from '../assets/Razorpay.png'

// // // const Placeorder = () => {
// // // const [Method, setMethod] = useState('cod')
// // //   return (
// // //     <div className="flex justify-start items-start min-h-screen p-10 bg-white">
// // //       <div className="max-w-md w-full">
// // //         <h2 className="text-xl font-light text-gray-700 mb-6">
// // //           DELIVERY <span className="font-bold">INFORMATION</span>{" "}
// // //           <span className="inline-block w-12 border-t border-gray-400 ml-2"></span>
// // //         </h2>

// // //         <form className="space-y-4">
// // //           <div className="flex gap-4">
// // //             <input
// // //               type="text"
// // //               placeholder="First name"
// // //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Last name"
// // //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //             />
// // //           </div>

// // //           <input
// // //             type="email"
// // //             placeholder="Email address"
// // //             className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //           />

// // //           <input
// // //             type="text"
// // //             placeholder="Street"
// // //             className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //           />

// // //           <div className="flex gap-4">
// // //             <input
// // //               type="text"
// // //               placeholder="City"
// // //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="State"
// // //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //             />
// // //           </div>

// // //           <div className="flex gap-4">
// // //             <input
// // //               type="text"
// // //               placeholder="Zipcode"
// // //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Country"
// // //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //             />
// // //           </div>

// // //           <input
// // //             type="text"
// // //             placeholder="Phone"
// // //             className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// // //           />
// // //         </form>
// // //       </div>
// // //       {/* Right side */}
// // //       <div className='mt-8 mx-75'>
// // //         <div className='mt-12 min-w-80'>
// // //           <CartTotal />
// // //         </div>
// // //         <div className='mt-12'>
// // //           {/* <div className='flex justify-center text-5xl gap-3'>
// // //             <Title text1={'PAYMENT'} text2={' METHOD'} />
// // //             <div className='w-20 h-1 bg-black mt-6'></div> */}
// // //           <Title text1={'PAYMENT'} text2={' METHOD'} />
// // //           <div className='flex gap-3 flex-col lg:flex-row'>
// // //             <div onClick={()=>setMethod('stripe')} className='flex items-center gap-5 border  p-2 px-3 cursor-pointer'>
// // //               <p className={`min-w-3.5 h-3.5 border rounded-full ${Method === 'stripe' ? 'bg-green-400' : ''}`}></p>
// // //               <img className='h-10 mx-4' src={stripe_logo} alt='stripe logo' />
// // //             </div>
// // //             <div onClick={()=>setMethod('razorpay')}  className='flex items-center gap-5 border  p-2 px-3 cursor-pointer'>
// // //               <p className={`min-w-3.5 h-3.5 border rounded-full  ${Method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
// // //               <img className='h-10 mx-4' src={Razorpay} alt='razprpay  logo' />
// // //             </div>
// // //             <div  onClick={()=>setMethod('cod')} className='flex items-center gap-5 border  p-2 px-3 cursor-pointer'>
// // //               <p className={`min-w-3.5 h-3.5 border rounded-full  ${Method === 'cod' ? 'bg-green-400' : ''}`}></p>
// // //              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className='mt-5 w-full text-end'>
// // //         <button className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button> 

// // //         </div>
// // //       </div>
// // //     </div>
// // //     // </div>
// // //   );
// // // };


// // // export default Placeorder

// // import React, { useContext, useState } from "react";
// // import Title from "../components/Title";
// // import CartTotal from "../components/CartTotal";
// // import stripe_logo from "../assets/stripe_logo.png";
// // import Razorpay from "../assets/Razorpay.png";
// // import { ShopContext } from "../context/ShopContextProvider";

// // const Placeorder = () => {
// //   const [Method, setMethod] = useState("cod");
// //   const
// //     { navigate } = useContext(ShopContext)

// //   return (
// //     <div className="flex flex-col lg:flex-row items-start min-h-screen p-10 bg-white gap-16">
// //       {/* Left Side Form */}
// //       <div className="max-w-md w-full">
// //         <h2 className="text-xl font-light text-gray-700 mb-6">
// //           DELIVERY <span className="font-bold">INFORMATION</span>
// //           <span className="inline-block w-12 border-t border-gray-400 ml-2"></span>
// //         </h2>

// //         <form className="space-y-4">
// //           <div className="flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="First name"
// //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Last name"
// //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //             />
// //           </div>

// //           <input
// //             type="email"
// //             placeholder="Email address"
// //             className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //           />

// //           <input
// //             type="text"
// //             placeholder="Street"
// //             className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //           />

// //           <div className="flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="City"
// //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //             />
// //             <input
// //               type="text"
// //               placeholder="State"
// //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //             />
// //           </div>

// //           <div className="flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="Zipcode"
// //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Country"
// //               className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //             />
// //           </div>

// //           <input
// //             type="text"
// //             placeholder="Phone"
// //             className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
// //           />
// //         </form>
// //       </div>

// //       {/* Right side */}
// //       <div className="flex flex-col gap-12 min-w-[320px]">
// //         <CartTotal />

// //         <div>
// //           <Title text1={"PAYMENT"} text2={" METHOD"} />
// //           <div className="flex gap-3 flex-col lg:flex-row">
// //             <div
// //               onClick={() => setMethod("stripe")}
// //               className="flex items-center gap-5 border p-2 px-3 cursor-pointer"
// //             >
// //               <p
// //                 className={`min-w-3.5 h-3.5 border rounded-full ${Method === "stripe" ? "bg-green-400" : ""
// //                   }`}
// //               ></p>
// //               <img className="h-10 mx-4" src={stripe_logo} alt="stripe logo" />
// //             </div>
// //             <div
// //               onClick={() => setMethod("razorpay")}
// //               className="flex items-center gap-5 border p-2 px-3 cursor-pointer"
// //             >
// //               <p
// //                 className={`min-w-3.5 h-3.5 border rounded-full ${Method === "razorpay" ? "bg-green-400" : ""
// //                   }`}
// //               ></p>
// //               <img className="h-10 mx-4" src={Razorpay} alt="razorpay logo" />
// //             </div>
// //             <div
// //               onClick={() => setMethod("cod")}
// //               className="flex items-center gap-5 border p-2 px-3 cursor-pointer"
// //             >
// //               <p
// //                 className={`min-w-3.5 h-3.5 border rounded-full ${Method === "cod" ? "bg-green-400" : ""
// //                   }`}
// //               ></p>
// //               <p className="text-gray-500 text-sm font-medium mx-4">
// //                 CASH ON DELIVERY
// //               </p>
// //             </div>
// //           </div>
// //           <div className='mt-5 w-full text-end'>
// //             <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'> PLACE ORDER</button>
// //         </div>
// //       </div>
// //     </div>
    
// //     </div >
// //   );
// // };

// // export default Placeorder;

// import React, { useContext, useState } from "react";
// import Title from "../components/Title";
// import CartTotal from "../components/CartTotal";
// import stripe_logo from "../assets/stripe_logo.png";
// import Razorpay from "../assets/Razorpay.png";
// import { ShopContext } from "../context/ShopContextProvider";

// const Placeorder = () => {
//   const [Method, setMethod] = useState("cod");
//   const { navigate } = useContext(ShopContext); // assuming Navigate is a function from context

//   return (
//     <div className="flex flex-col lg:flex-row items-start min-h-screen p-10 bg-white gap-16">
//       {/* Left Side Form */}
//       <div className="max-w-md w-full">
//         <h2 className="text-xl font-light text-gray-700 mb-6">
//           DELIVERY <span className="font-bold">INFORMATION</span>
//           <span className="inline-block w-12 border-t border-gray-400 ml-2"></span>
//         </h2>

//         <form className="space-y-4">
//           <div className="flex gap-4">
//             <input type="text" placeholder="First name" required className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//             <input type="text" placeholder="Last name" required className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//           </div>
//           <input type="email" placeholder="Email address" required className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//           <input type="text" placeholder="Street" required className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//           <div className="flex gap-4">
//             <input type="text" placeholder="City" required className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//             <input type="text" placeholder="State" required className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//           </div>
//           <div className="flex gap-4">
//             <input type="text" placeholder="Zipcode" required className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//             <input type="text" placeholder="Country" required className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//           </div>
//           <input type="text" placeholder="Phone" required className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black" />
//         </form>
//       </div>

//       {/* Right Side */}
//       <div className="flex flex-col gap-12 min-w-[320px]">
//         <CartTotal />

//         <div>
//           <Title text1={"PAYMENT"} text2={" METHOD"} />
//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div onClick={() => setMethod("stripe")} className="flex items-center gap-5 border p-2 px-3 cursor-pointer">
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${Method === "stripe" ? "bg-green-400" : ""}`}></p>
//               <img className="h-10 mx-4" src={stripe_logo} alt="stripe logo" />
//             </div>
//             <div onClick={() => setMethod("razorpay")} className="flex items-center gap-5 border p-2 px-3 cursor-pointer">
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${Method === "razorpay" ? "bg-green-400" : ""}`}></p>
//               <img className="h-10 mx-4" src={Razorpay} alt="razorpay logo" />
//             </div>
//             <div onClick={() => setMethod("cod")} className="flex items-center gap-5 border p-2 px-3 cursor-pointer">
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${Method === "cod" ? "bg-green-400" : ""}`}></p>
//               <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
//             </div>
//           </div>

//           <div className="mt-5 w-full text-end">
//             <button onClick={() => navigate('/order')} className="bg-black text-white px-16 py-3 text-sm cursor-pointer">
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Placeorder;

import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import stripe_logo from "../assets/stripe_logo.png";
import Razorpay from "../assets/Razorpay.png";
import { ShopContext } from "../context/ShopContextProvider";

const Placeorder = () => {
  const [Method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const handlePlaceOrder = () => {
    if (
      firstName &&
      lastName &&
      email &&
      street &&
      city &&
      stateName &&
      zipcode &&
      country &&
      phone
    ) {
      navigate("/order");
    } else {
      alert("Please fill out all delivery information before placing the order.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start min-h-screen p-10 bg-white gap-16">
      {/* Left Side Form */}
      <div className="max-w-md w-full">
        <h2 className="text-xl font-light text-gray-700 mb-6">
          DELIVERY <span className="font-bold">INFORMATION</span>
          <span className="inline-block w-12 border-t border-gray-400 ml-2"></span>
        </h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="State"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
          />
        </form>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-12 min-w-[320px]">
        <CartTotal />

        <div>
          <Title text1={"PAYMENT"} text2={" METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-5 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  Method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-10 mx-4" src={stripe_logo} alt="stripe logo" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-5 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  Method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-10 mx-4" src={Razorpay} alt="razorpay logo" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-5 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  Method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="mt-5 w-full text-end">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
