import React from 'react';
import Lottie from 'lottie-react';
import animationData from "./logo.json"

const Logolottie = () => {
  return <Lottie animationData={animationData} loop={true} style={{ height: 60, width: 60}} />;
};

export default Logolottie;
