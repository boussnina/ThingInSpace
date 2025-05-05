import React, { useState, useEffect } from 'react';

import image0 from './assets/Animation1/0.png';
import image1 from './assets/Animation1/1.png';
import image2 from './assets/Animation1/2.png';
import image3 from './assets/Animation1/3.png';
import image4 from './assets/Animation1/4.png';
import image5 from './assets/Animation1/5.png';
import image6 from './assets/Animation1/6.png';
import image7 from './assets/Animation1/7.png';
import image8 from './assets/Animation1/8.png';
import image9 from './assets/Animation1/9.png';
import image10 from './assets/Animation1/10.png';
import image11 from './assets/Animation1/11.png';
import image12 from './assets/Animation1/12.png';
import image13 from './assets/Animation1/13.png';
import image14 from './assets/Animation1/14.png';
import image15 from './assets/Animation1/15.png';

const images = [image15,image14, image13, image12, image11, image10, image9, image8, 
                image7, image6, image5, image4, image3, image2, image1, image0
];

const AnimationComponent = () => {
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
      if (index < images.length - 1) {
        const timeoutDuration = index === 14 ? 100 : 50;
        const timeout = setTimeout(() => {
          setIndex(index + 1);
        }, timeoutDuration);
  
        return () => clearTimeout(timeout);
      }
    }, [index]);
  
    return (
      <img src={images[index]} alt="Animation frame" draggable="false"/>
    );
  };
  
export default AnimationComponent;
