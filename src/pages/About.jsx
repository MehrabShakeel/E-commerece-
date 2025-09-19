import React from 'react'
import Title from '../components/Title'
import about_us from '../assets/about_us.jpg'

const About = () => {
  return (
    <div>
      <div className='text-xl text-center pt-8 border-t'>



        <div className='flex justify-center text-5xl gap-3'>
          <Title text1={'ABOUT '} text2={' US'} />
          <div className='w-40 h-1 bg-black mt-6'></div>
        </div>


        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img
            className='mx-10 w-full md:max-w-[450px]'
            src={about_us}
            alt="About"
          />

          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 px-6'>
            <p>
              Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
            </p>

            <p>
              Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
            </p>

            <p className='text-black font-semibold text-lg'>Our Mission</p>

            <p>
              Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>

        {/* Info Grid Section */}
        <div className='px-6 pb-10'>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='border rounded-xl p-6 shadow-sm bg-white'>
              <h3 className='text-lg font-semibold mb-2'>Quality Assurance</h3>
              <p className='text-gray-600'>
                We meticulously select and vet each product to ensure it meets our stringent quality standards.
              </p>
            </div>

            <div className='border rounded-xl p-6 shadow-sm bg-white'>
              <h3 className='text-lg font-semibold mb-2'>Convenience</h3>
              <p className='text-gray-600'>
                With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
              </p>
            </div>

            <div className='border rounded-xl p-6 shadow-sm bg-white'>
              <h3 className='text-lg font-semibold mb-2'>Exceptional Customer Service</h3>
              <p className='text-gray-600'>
                Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About
