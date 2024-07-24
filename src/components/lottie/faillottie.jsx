import React from 'react';
import Lottie from 'lottie-react';
import animationData from "./fail.json"

const Logolottie = () => {
  return <Lottie animationData={animationData} loop={true} style={{ height: 100, width: 100}} />;
};

export default Logolottie;