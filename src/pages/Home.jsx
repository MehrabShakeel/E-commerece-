// import React from 'react';
// import background_img from "../assets/background_img.jpg";

// const Home = () => {
//   return (
//     <div>
//       <img src={background_img} alt="background" className="w-full h-screen object-cover" />
//     </div>
//   );
// };

// export default Home;


import React from 'react';

import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSellers from '../components/BestSellers';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import Footer from '../components/Footer';
const Home = () => {
  return (
    <div>

      <Hero />
      <LatestCollection />
      <BestSellers />
      <OurPolicy />
      <NewsLetterBox />
      {/* <Footer /> */}
    </div>
  )
}
export default Home;