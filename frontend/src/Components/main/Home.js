import React from 'react';
import Navbar from './Navbar';
import heroSvg from '../images/hro 1.svg'; // Update with your actual hero SVG image path
import HighlightedProducts from './HighlightedProducts';
import ProductGrid from './ProductGrid';
import techosImg from '../images/Rectangle 14.svg'
import { Link } from 'react-router-dom';
import MakeupImg from './MakeupImg'
import Marquee from 'react-fast-marquee';
import Rectangle2 from "../images/Rectangle 16.png";


const HomePage = () => {
 
  return (
    <>
      <div className="relative bg-white shadow-lg">
        <div className="relative" style={{ top: '20px' }}>
          <Navbar />
        </div>

        <div className="h-[90vh] flex items-center justify-center relative">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(270deg, #D8CCA6, #B7A880)' }}></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img src={heroSvg} alt="Hero" className="h-4/5 object-contain" />
            <div className="absolute text-center">
              <h1 className="font-montserrat text-4xl text-white mb-4">FOUNDATION</h1>
              <button className="border-2 border-white text-white px-6 py-2">Explore</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 lg:w-3/4 w-full max-w-screen-md"> {/* Added max-w-screen-md to limit width */}
        <div>
          <HighlightedProducts />
        </div>
        <h1 className="text-2xl font-bold italic mt-8" style={{textAlign:"center"}}>TOP PICKS</h1>
        <ProductGrid />
        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold text-white">TECHOS Beauty Provider</h1>
          <div className='mt-4 relative'>
            <img src={techosImg} alt='techos' />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-white font-bold">WEAR ON SHADES VIRTUALLY</h1>
              <Link to="/virtual-config" className="text-white hover:underline block mt-2">TRY IT ON</Link>
            </div>
          </div>
        </div>
        <div>
          <MakeupImg/>
        </div>

        <div>
        <h1 className="text-center italic text-2xl font-bold mt-10"> ELITE ACCESS </h1>
        <div>
          <div className='flex w-full flex-col '>
            {/* <Marquee autoFill pauseOnHover >
              <div className=' space-x-5 cursor-pointer '>
              <img className="w-full" src={Rectangle2} alt="Rectangle1" />

               
              </div>
            </Marquee> */}

          </div>
        </div>
        </div>

        

      </div>
    </>
  );
}

export default HomePage;
