import React from 'react';
import Lottie from 'lottie-react';
import animationData from "./first.json"

const Firstlottie = () => {
  return <Lottie animationData={animationData} loop={true} style={{ height: 350, width: 350 }} />;
};

export default Firstlottie;
