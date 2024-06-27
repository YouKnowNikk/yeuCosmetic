// Search.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/shop?query=${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products..."
        className="border-2 border-gray-300 rounded-full px-4 py-2"
      />
      <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <FiSearch size={20} className="text-gray-500" />
      </button>
    </form>
  );
};

export default Search;
