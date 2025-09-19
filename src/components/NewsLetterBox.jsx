import React from 'react';

const NewsLetterBox = () => {
  const SubmitHandler = (event) => {
    event.preventDefault();
    // You can handle form submission here (e.g., show toast or send API request)
  };

  return (
    <div className='text-center bg-gray-100 py-10 px-4 rounded-lg'>
      <h2 className='text-2xl font-semibold text-gray-800'>Subscribe Now & Get 20% Off</h2>
      <p className='text-gray-600 mt-2'>Stay in the loop with our latest updates and exclusive offers.</p>
      <p className='text-gray-600 mb-6'>Subscribe now and never miss out on new arrivals and special deals!</p>

      <form onSubmit={SubmitHandler}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="px-4 py-2 w-full sm:w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsLetterBox;
