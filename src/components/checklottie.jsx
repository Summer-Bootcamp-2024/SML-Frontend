import React from 'react';
import Lottie from 'lottie-react';
import animationData from "./check.json"

const Logolottie = () => {
  return <Lottie animationData={animationData} loop={true} style={{ height: 130, width: 130}} />;
};

export default Logolottie;
