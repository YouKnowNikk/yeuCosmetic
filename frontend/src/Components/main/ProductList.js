// ProductList.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


function ProductList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch all products (replace with your data fetching logic)
    const allProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      // ...other products
    ];
    setProducts(allProducts);

if (query) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }    , [query]);

  const items = [
    {
      title: "Dry"
    },
    {
      title: "Oily"
    },
    {
      title: "Combination"
    },
    {
      title: "Acne"
    }
  ]

  return (
    <>
      <div className="relative bg-[#5F5F5F] shadow-lg">
        <div className="relative" style={{ top: '20px' }}>
          <Navbar />
        </div>

        <div className="h-[80vh] flex items-center justify-center relative">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(270deg, #D8CCA6, #B7A880)' }}></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">


          </div>
        </div>
      </div>

      <div className='container mx-auto py-8 lg:w-3/4 w-full max-w-screen-md'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:px-[0px] px-[15px]'>
          {items.map((item, index) => {
            return (
              <div key={index} className='border bg-[#000000] flex justify-center items-center h-48 sm:h-56 md:h-64 lg:h-72'>
                <h4 className='text-2xl text-[#dedddd]'>
                  <i>{item.title}</i>
                </h4>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative bg-[#5F5F5F] shadow-lg">

        <div className="h-[400px] flex items-center justify-center relative">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(270deg, #D8CCA6, #B7A880)' }}></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h4 className='text-[24px] text-[#dedddd] '>
              <i>Quality Benefits (Gif)</i>
            </h4>
          </div>
        </div>
      </div>

      <div className='bg-[#F4F4F4]'>
        <div className=' container mx-auto py-8 lg:w-3/4 w-full max-w-[1200px]'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ProductList;


