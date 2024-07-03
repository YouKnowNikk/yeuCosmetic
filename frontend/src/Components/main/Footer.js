import React from 'react';
import { Link } from 'react-router-dom';
import { IoGlobeOutline } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";






const Footer = () => {
  return (
    <footer className="bg-gray-100 py-3 px-4">
        <div className="grid grid-cols-1 md:grid-cols-5  gap-5 ">
          {/* Left Section */}
          <div className="space-y-4 col-span-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <IoGlobeOutline/>
                <span className="text-sm">India | EN ₹</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm">Find a Store</span>
                <IoLocationSharp/>
              </div>
            </div>
            <div className='flex  md:h-[200px] md:items-center w-full'>
            <div>
              <p className="text-lg font-semibold mb-2">Sign up for updates from YEU</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-[180px] p-2 border border-gray-300 rounded-l-md focus:outline-none"
                />
                <button
                  className="bg-black text-white text-[10px] px-4 m-0 py-2 rounded-r-md"
                >
                  SIGN UP
                </button>
              </form>
            </div>
            </div>
            <div className="flex space-x-4 text-2xl">
              <Link to="#" className="text-gray-600 hover:text-[#1877F2]">
                <FaFacebookSquare/>
              </Link>
              <Link to="#" className="text-gray-600 hover:text-[#E60023]">
              <FaPinterest/>
              </Link>
              <Link to="#" className="text-gray-600 hover:text-[#FF0000]">
              <FaYoutube/>
              </Link>
              <Link to="#" className="text-gray-600 hover:text-[#F56040]">
                <FaInstagram/>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-3">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div>
              <h3 className="font-semibold mb-3">CUSTOMER SERVICE</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-600 hover:text-black">FAQ</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Track My Order</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Returns & Exchanges</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Shipping Terms</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Payment Policy</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">MY ACCOUNT</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-600 hover:text-black">Create Account</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Accounts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">COMPANY</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-600 hover:text-black">About Us</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Careers</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Investor Relations</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Supply Chain Disclosure</Link></li>
                <li><Link to="#" className="text-gray-600 hover:text-black">Corporate Social Responsibility</Link></li>
              </ul>
            </div>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
