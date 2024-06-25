import React from 'react';
import lipstick from '../images/Rectangle 8.svg'; // Import your lipstick SVG image
import blush from '../images/Rectangle 9.svg'; // Import your blush SVG image

const products = [
  {
    id: 1,
    image: lipstick, // Use imported lipstick SVG as background
    name: 'Product 1',
    description: 'This is product 1',
  },
  {
    id: 2,
    image: blush, // Use imported blush SVG as background
    name: 'Product 2',
    description: 'This is product 2',
  }
];

function HighlightedProducts() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-screen-md w-full">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative flex items-center justify-center shadow-lg overflow-hidden rounded-lg"
            style={{ 
              width: '100%', // Full width of the grid cell
              paddingBottom: '100%', // Maintain 1:1 aspect ratio (square)
              backgroundColor: '#f0f0f0', // Placeholder background color for non-SVG images
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain rounded-lg" // Changed object-cover to object-contain
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 rounded-lg bg-opacity-75" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              {/* Adjust bg-opacity-50 to change opacity to 50% (or adjust as desired) */}
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="mt-2">{product.description}</p>
              <button className="mt-4 border-2 border-white text-white px-6 py-2">
                View All
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighlightedProducts;
