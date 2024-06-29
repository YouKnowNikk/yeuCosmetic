// Navbar.js
import React, { useState } from 'react';
import { FiUser, FiSearch, FiShoppingCart, FiMenu } from 'react-icons/fi';
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/Logo Of yeu 1.svg';
import { FaRegHeart } from "react-icons/fa";
import Search from './Search';
import { RxCross2 } from "react-icons/rx";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4 relative">
          
          {/* Hamburger menu for mobile */}
          <div className="md:hidden flex items-center">
            <button className="text-white hover:cursor-pointer" onClick={handleMenuToggle}>
              {isMenuOpen ? <RxCross1 size={20} /> : <FiMenu size={20} />}
            </button>
          </div>

          {/* Logo section */}
          <div className="flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12" style={{ marginTop: "-1.6rem" }} /> {/* Adjust the height as needed */}
            </Link>
          </div>

          {/* Main navigation links */}
          <div className="hidden md:flex space-x-6">
            <NavLink 
              to="/shop" 
              className={({ isActive }) => isActive ? 'underline text-white hover:text-gray-300' : 'text-white hover:text-gray-300 hover:cursor-pointer'}
              style={{ fontWeight: 400 }}
            >
              Shop
            </NavLink>
            <NavLink 
              to="/our-story" 
              className={({ isActive }) => isActive ? 'underline text-white hover:text-gray-300' : 'text-white hover:text-gray-300 hover:cursor-pointer'}
              style={{ fontWeight: 400 }}
            >
              Our Story
            </NavLink>
            <NavLink 
              to="/book-look" 
              className={({ isActive }) => isActive ? 'underline text-white hover:text-gray-300' : 'text-white hover:text-gray-300 hover:cursor-pointer'}
              style={{ fontWeight: 400 }}
            >
              Book Look
            </NavLink>
            <NavLink 
              to="/membership" 
              className={({ isActive }) => isActive ? 'underline text-white hover:text-gray-300' : 'text-white hover:text-gray-300 hover:cursor-pointer'}
              style={{ fontWeight: 400 }}
            >
              Membership
            </NavLink>
            <NavLink 
              to="/blogs" 
              className={({ isActive }) => isActive ? 'underline text-white hover:text-gray-300' : 'text-white hover:text-gray-300 hover:cursor-pointer'}
              style={{ fontWeight: 400 }}
            >
              Blogs
            </NavLink>
          </div>

          {/* User actions section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-300 hover:cursor-pointer">
              <FiUser size={20} />
            </Link>
            <Link to="/" className="text-white hover:text-gray-300 hover:cursor-pointer">
              <FaRegHeart size={20}/>
            </Link>
            <Link className="text-white hover:text-gray-300 hover:cursor-pointer" onClick={handleSearchToggle}>
            { isSearchOpen ? <RxCross2 size={20} />  : <FiSearch size={20} /> }            
            </Link>
            <Link to="/" className="text-white hover:text-gray-300 hover:cursor-pointer">
              <FiShoppingCart size={20} />
            </Link>
          </div>

          {/* Mobile user actions section */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-300 hover:cursor-pointer">
              <FiUser size={20} />
            </Link>
            <Link to="/" className="text-white hover:text-gray-300 hover:cursor-pointer">
              <FaRegHeart size={20} />
            </Link>
            <Link className="text-white hover:text-gray-300 hover:cursor-pointer" onClick={handleSearchToggle}>
            { isSearchOpen ? <RxCross2 size={20} />  : <FiSearch size={20} /> }            
            </Link>
            <Link to="/" className="text-white hover:text-gray-300 hover:cursor-pointer">
              <FiShoppingCart size={20} />
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <NavLink 
              to="/shop" 
              className={({ isActive }) => isActive ? 'underline block text-white hover:text-gray-300 py-2' : 'block text-white hover:text-gray-300 py-2'}
              style={{ fontWeight: 400 }}
              onClick={handleMenuToggle}
            >
              Shop
            </NavLink>
            <NavLink 
              to="/our-story" 
              className={({ isActive }) => isActive ? 'underline block text-white hover:text-gray-300 py-2' : 'block text-white hover:text-gray-300 py-2'}
              style={{ fontWeight: 400 }}
              onClick={handleMenuToggle}
            >
              Our Story
            </NavLink>
            <NavLink 
              to="/book-look" 
              className={({ isActive }) => isActive ? 'underline block text-white hover:text-gray-300 py-2' : 'block text-white hover:text-gray-300 py-2'}
              style={{ fontWeight: 400 }}
              onClick={handleMenuToggle}
            >
              Book Look
            </NavLink>
            <NavLink 
              to="/membership" 
              className={({ isActive }) => isActive ? 'underline block text-white hover:text-gray-300 py-2' : 'block text-white hover:text-gray-300 py-2'}
              style={{ fontWeight: 400 }}
              onClick={handleMenuToggle}
            >
              Membership
            </NavLink>
            <NavLink 
              to="/blogs" 
              className={({ isActive }) => isActive ? 'underline block text-white hover:text-gray-300 py-2' : 'block text-white hover:text-gray-300 py-2'}
              style={{ fontWeight: 400 }}
              onClick={handleMenuToggle}
            >
              Blogs
            </NavLink>
          </div>
        )}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0  p-4">
            <Search />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
