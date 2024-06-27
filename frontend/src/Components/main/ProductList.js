// ProductList.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

  return (
    <div>
      <h1>Product List</h1>
      {filteredProducts.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
