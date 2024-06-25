import React from 'react';
import img1 from '../images/Rectangle 10.svg';
import img2 from '../images/Rectangle 11.svg';
import img3 from '../images/Rectangle 12.svg';
import img4 from '../images/Rectangle 13.svg';

const products = [
  {
    id: 1,
    image: img1,
    name: 'Product 1',
    price: '$29.99',
  },
  {
    id: 2,
    image: img2,
    name: 'Product 2',
    price: '$39.99',
  },
  {
    id: 3,
    image: img3,
    name: 'Product 3',
    price: '$49.99',
  },
  {
    id: 4,
    image: img4,
    name: 'Product 4',
    price: '$59.99',
  }
];

function ProductGrid() {
  return (
    <div className="flex justify-center mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col items-center shadow-lg overflow-hidden rounded-lg"
            style={{ 
              backgroundColor: '#f0f0f0', // Placeholder background color for non-SVG images
              width: '180px', // Adjusted width
              height: '260px', // Adjusted height
            }}
          >
            <div className="flex-shrink-0 w-full h-2/3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain" // Adjusted image to fit within its container
              />
            </div>
            <div className="w-full flex flex-col justify-between items-center p-2 bg-white text-center h-1/3">
              <div>
                <h2 className="text-sm font-bold">{product.name}</h2>
                <p className="mt-1 text-gray-700">{product.price}</p>
              </div>
              <button className="mt-1 bg-black text-white italic px-2 py-1 rounded text-xs">Add to Bag</button> {/* Updated button style */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
