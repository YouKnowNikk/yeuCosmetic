import React, { useEffect, useRef, useState } from 'react';
import * as Beauty from '@deepar/beauty';
import './deepar.css';
import green from '../images/B21.png';

const VirtualMakeup = () => {
  const deepARRef = useRef(null);
  const beautyRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedShade, setSelectedShade] = useState(null);

  useEffect(() => {
    const initializeDeepAR = async () => {
      try {
        const deepAR = await window.deepar.initialize({
          licenseKey: "ea40f2abb01d2b6974ea18a9996154403395ee329cfe25f78146093f33594c817fe923d43808e03b",
          previewElement: deepARRef.current,
          useDefaultCamera: false, // Initialize without default camera if needed
        });

        const beauty = await Beauty.initializeBeauty(deepAR, 'https://cdn.jsdelivr.net/npm/@deepar/beauty/dist/');
        beautyRef.current = beauty;
      } catch (error) {
        console.error('Failed to initialize DeepAR or Beauty:', error);
        if (error.message && error.message.includes('Permission denied')) {
          setCameraError(true); // Set camera error state if permission is denied
        }
      }
    };

    initializeDeepAR();

    return () => {
      if (beautyRef.current) {
        beautyRef.current.disable(true);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedProduct && selectedType && selectedShade) {
      applyMakeup(selectedProduct, selectedType, selectedShade);
    }
  }, [selectedProduct, selectedType, selectedShade]);

  const applyMakeup = (product, type, shade) => {
    if (!beautyRef.current) return;

    switch (product) {
      case 'lipstick':
        if (typeof shade === 'string' && shade.includes("image")) {
          beautyRef.current.lipMakeup.lipstick.enable.set(true);
          beautyRef.current.lipMakeup.lipstick.shade.set(shade); // Set custom image URL
        } else {
          beautyRef.current.lipMakeup.lipstick.enable.set(true);
          beautyRef.current.lipMakeup.lipstick.shade.setTemplate(shade); // Set predefined template
        }
        beautyRef.current.lipMakeup.lipstick.amount.set(70);
        break;
      case 'blush':
        beautyRef.current.faceMakeup.blush.intensity.set(40);
        beautyRef.current.faceMakeup.blush.color.set(shade);
        break;
      case 'foundation':
        beautyRef.current.faceMakeup.foundation.color.set(shade);
        beautyRef.current.faceMakeup.foundation.amount.set(70);
        break;
      case 'eyeliner':
        beautyRef.current.eyeMakeup.eyeliner.enable.set(true);
        beautyRef.current.eyeMakeup.eyeliner.look.setTemplate(shade);
        break;
      default:
        break;
    }
  };

  const makeupItems = {
    eyeliner: {
      sketch: ["vivid", "wingEyes"],
      smooth: ["drama", "basic"]
    },
    lipstick: {
      type1: ["matteDarkRed", "mattePoppy", "matteNude"],
      type2: ["matteViolet", "caramel", "golden"],
      type3: ["matteRedViolet", green],
    },
    blush: {
      blush1: [{ r: 226, g: 132, b: 130, a: 255 }, { r: 255, g: 105, b: 97, a: 255 }]
    },
    foundation: {
      found1: [{ r: 245, g: 224, b: 210, a: 255 }, { r: 255, g: 229, b: 204, a: 255 }]
    },
    // Add more makeup items and their shades
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSelectedType(null);
    setSelectedShade(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedShade(null);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 h-screen">
        {cameraError ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-600 text-xl font-bold">Camera access denied!</p>
          </div>
        ) : (
          <div id="deepar-div" ref={deepARRef} className="w-full" style={{ height: '40vh' }}></div>
        )}
      </div>
      <div className="w-full md:w-1/3 px-4 py-8">
        {Object.keys(makeupItems).map((product) => (
          <div key={product} className="mb-4">
            <button
              className={`w-full mb-2 px-4 py-2 ${selectedProduct === product ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-gray-300 hover:text-gray-900`}
              onClick={() => handleProductSelect(product)}
            >
              {product.charAt(0).toUpperCase() + product.slice(1)}
            </button>
            {selectedProduct === product && (
              <div className="mt-2">
                {Object.keys(makeupItems[product]).map((type) => (
                  <div key={type} className="mb-2">
                    <button
                      className={`px-4 py-2 ${selectedType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-gray-300 hover:text-gray-900`}
                      onClick={() => handleTypeSelect(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                    {selectedType === type && (
                      <div className="mt-2">
                        {makeupItems[product][type].map((shade, index) => (
                          <button
                            key={index}
                            className={`mr-2 mb-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300`}
                            onClick={() => setSelectedShade(shade)}
                          >
                            {typeof shade === 'object' ? (
                              <div
                                style={{
                                  backgroundColor: `rgba(${shade.r}, ${shade.g}, ${shade.b}, ${shade.a})`,
                                  width: '30px',
                                  height: '30px',
                                }}
                              ></div>
                            ) : (
                              shade
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualMakeup;
// "ea40f2abb01d2b6974ea18a9996154403395ee329cfe25f78146093f33594c817fe923d43808e03b"