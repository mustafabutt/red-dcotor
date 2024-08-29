'use client'
import {React,useContext, useEffect} from 'react'
import { ThemeContext } from '@/context/ThemeContext';
const Footer = () => {
  const [theme] = useContext(ThemeContext);
  // const theme = "bg-black border-2 border-white-600"
  return (
    <div className={"w-screen mx-auto py-4 flex justify-center text-lg font-bold h-16 mt-auto shadow-xl shadow-2xl shadow-lg shadow-md "+theme}>
    <p className="no-style">Red Doctor</p>
  </div>
  );
};

export default Footer;
