'use client'
import {React,useContext, useEffect} from 'react'
import { ThemeContext } from '@/context/ThemeContext';
const Footer = () => {
  const [theme] = useContext(ThemeContext);

  return (
    <div className={"w-screen mx-auto py-4 flex justify-center text-lg font-bold h-16 mt-auto "+theme}>
    <p className="no-style">Red Doctor</p>
  </div>
  );
};

export default Footer;
