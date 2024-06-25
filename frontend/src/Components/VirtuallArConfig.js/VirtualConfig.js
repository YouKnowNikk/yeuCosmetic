import React, { useEffect, useRef, useState } from 'react';
import * as Beauty from '@deepar/beauty';
import './deepar.css';
import green from '../images/B21.png';

const VirtualMakeup = () => {
  const deepARRef = useRef(null);
  const beautyRef = useRef(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedShade, setSelectedShade] = useState(null);
  const [selectProduct ,setSelectProduct] = useState(null); 
  useEffect(() => {
    const initializeDeepAR = async () => {
      const deepAR = await window.deepar.initialize({
        licenseKey: "ea40f2abb01d2b6974ea18a9996154403395ee329cfe25f78146093f33594c817fe923d43808e03b",
        previewElement: deepARRef.current,
      });

      const beauty = await Beauty.initializeBeauty(deepAR, 'https://cdn.jsdelivr.net/npm/@deepar/beauty/dist/');
      beautyRef.current = beauty;
    };

    initializeDeepAR();

    return () => {
      if (beautyRef.current) {
        beautyRef.current.disable(true);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedItem && selectedShade) {
      applyMakeup(selectedItem, selectedShade);
    }
  }, [selectedItem, selectedShade]);

  const applyMakeup = (item, shade) => {
    if (!beautyRef.current) return;

    switch (item) {
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
        // beautyRef.current.faceMakeup.foundation.enable.set(true);
        beautyRef.current.faceMakeup.foundation.color.set(shade);
        beautyRef.current.faceMakeup.foundation.amount.set(70);
        break;
      case 'eyeliner':
        console.log(shade);
        beautyRef.current.eyeMakeup.eyeliner.enable.set(true);
        beautyRef.current.eyeMakeup.eyeliner.look.setTemplate(shade);
        break;
      // Add more cases for other makeup items
      default:
        break;
    }
  };

  const makeupItems = {
    eyeliner: [
      { type: 'template', value: "vivid" },
      { type: 'template', value: "wingEyes" }
    ],
    lipstick: [
      { type: 'template', value: "matteDarkRed" },
      { type: 'template', value: "mattePoppy" },
      { type: 'template', value: "matteNude" },
      { type: 'template', value: "mattePeach" },
      { type: 'template', value: "mattePink" },
      { type: 'template', value: "matteRedViolet" },
      { type: 'template', value: "matteRed" },
      { type: 'template', value: "matteViolet" },
      { type: 'template', value: "caramel" },
      { type: 'template', value: "butterscotchKiss" },
      { type: 'template', value: "pinkThrill" },
      { type: 'template', value: "golden" },
      { type: 'template', value: "softPink" },
      { type: 'template', value: "sunTouched" },
      { type: 'template', value: "redLust" },
      { type: 'template', value: "napkinNoteRed" },
      { type: 'template', value: "cinnamonSwirl" },
      { type: 'template', value: "midnightPlum" },
      { type: 'template', value: "angelicRosebud" },
      { type: 'template', value: "blushingBallerina" },
      { type: 'template', value: "smokeyMoonlight" },
      { type: 'template', value: "goldenSun" },
      { type: 'template', value: "criminallyCoral" },
      { type: 'template', value: "flameGame" },
      { type: 'template', value: "nudeScandal" },
      { type: 'template', value: "cherryCharm" },
      { type: 'template', value: "rosePetalBlush" },
      { type: 'template', value: "fierySunburst" },
      { type: 'template', value: "sunshineSorbet" },
      { type: 'template', value: "sunlitPlumSparkle" },
      { type: 'template', value: "neon" },
      { type: 'template', value: "cottonCandyKiss" },
      { type: 'template', value: "rubyRedRouge" },
      { type: 'template', value: "softSnowflake" },
      { type: 'custom', value: green }, // Custom image
    ],
    blush: [
      { type: 'template', value: { r: 226, g: 132, b: 130, a: 255 } },
      { type: 'template', value: { r: 255, g: 105, b: 97, a: 255 } }
    ],
    foundation: [
      { type: 'template', value: { r: 245, g: 224, b: 210, a: 255 } },
      { type: 'template', value: { r: 255, g: 229, b: 204, a: 255 } }
    ],
  
    // Add more makeup items and their shades
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 h-screen">
        <div id="deepar-div" ref={deepARRef} className="w-full" style={{height:'40vh'}}></div>
      </div>
      <div className="w-full md:w-1/3 px-4 py-8">
        {Object.keys(makeupItems).map((item) => (
          <div key={item} className="mb-4">
            <h3 className="text-lg font-semibold">{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
            <div className="flex flex-wrap mt-2">
              {makeupItems[item].map((shade, index) => (
                <button
                  key={index}
                  className="mr-2 mb-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => {
                    setSelectedItem(item);
                    setSelectedShade(shade.type === 'custom' ? shade.value : shade.value);
                  }}
                >
                  {shade.type === 'template' ? (
                    typeof shade.value === 'string' ? shade.value : `Shade ${index + 1}`
                  ) : (
                    <img src={shade.value} alt={`Custom Shade ${index + 1}`} className="w-10 h-10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualMakeup;
