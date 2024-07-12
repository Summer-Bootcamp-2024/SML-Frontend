import React from 'react';
import Lottie from 'lottie-react';
import animationData from "./credit.json"

const Creditlottie = () => {
  return <Lottie animationData={animationData} loop={true} style={{ height: 170, width: 170, position:'absolute', bottom:0, zIndex:20}} />;
};

export default Creditlottie;
