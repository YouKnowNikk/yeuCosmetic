import React from 'react';
import Marquee from 'react-fast-marquee';
import image1 from "../images/image 1.png";
import image2 from "../images/image 2.png";
import image3 from "../images/image 3.png";
import image4 from "../images/image 4.png";
import image5 from "../images/image 5.png";
import Rectangleimages from "../images/Rectangle 20.png"
import instagram from "../images/instagram (1) 1.png"
import youtube from "../images/youtube 1.png"
import socialimg from "../images/social 1.png"




const ScrollingImages = () => {
    return (
        <>
        <h1 className="text-center italic text-2xl   mt-10 font-bold">Featured In</h1>
        <div>
          <div className="flex w-full flex-col my-9">
            <Marquee autoFill pauseOnHover>
              <div className="cursor-pointer">
                <img className="w-full px-5 sm:px-3 md:px-5" src={image1} alt="Rectangle1" />
              </div>
              <div className="cursor-pointer">
                <img className="w-full px-5 sm:px-3 md:px-5" src={image2} alt="Rectangle2" />
              </div>
              <div className="cursor-pointer">
                <img className="w-full px-5 sm:px-3 md:px-5" src={image3} alt="Rectangle3" />
              </div>
              <div className="cursor-pointer">
                <img className="w-full px-5 sm:px-3 md:px-5" src={image4} alt="Rectangle4" />
              </div>
              <div className="cursor-pointer">
                <img className="w-full px-5 sm:px-3 md:px-5" src={image5} alt="Rectangle5" />
              </div>
            </Marquee>
          </div>
        </div>


        
        <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center italic font-bold mb-8">Our story</h1>
            <div className="relative hoverEffectt w-full">
             <img src={Rectangleimages} alt="" className="w-full" />
             <div className="absolute inset-0 custom-overlay  flex justify-center items-center">
               <p className="text-center text-[8px] sm:text-[16px]  text-white px-4 sm:px-8 md:px-16 z-10">
                Personal, confident, sexy, bold, proficient, sophisticated and adept.
                  <br />
                 We know exactly what you’re looking for and we’re ready to deliver it to you!
               </p>
              </div>
            </div>
        </div>


        <div className='mt-9'>  
          {/* The component is created below */}
          <SocialMedia/>
        </div>
      </>
      
    );
}

export default ScrollingImages;






// social media component
const SocialMedia = () =>{

  const item = [
    {
      content:"follow us",
      url:instagram
    },
    {
      content:"follow us",
      url:youtube
    },
    {
      content:"follow us",
      url:socialimg
    },
  ]

  return(
    <div className='pt-9'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-center italic font-bold mb-8'>INSPIRED AND GET INSPIRED</h1>

     <div className='grid grid-cols-1  md:grid-cols-3 md:px-0 px-4 gap-5'>
       {
         item.map(
           (data, i) => {
             return (
               <div key={i} className='bg-[#D9D9D9] parentzoom md:h-[300px] py-5 md:py-0 lg:py-0 flex flex-col justify-center items-center'>
                 <img src={data.url} alt="" className='drop-shadow-lg saclezoom' />
                 <span className='text-base md:text-lg lg:text-xl font-bold pt-4'>{data.content}</span>
               </div>
             )
          }
         )
       } 
    </div>
   </div>
  )
}
