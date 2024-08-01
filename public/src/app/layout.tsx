"use client"
import React, { useEffect, useState } from 'react'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/_components/UI/Header"
import Footer from "@/_components/UI/Footer"
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });
import { ThemeContext } from './context/ThemeContext';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [theme, setTheme] = useState(localStorage.getItem('theme'));
  useEffect(()=>{
    console.log(localStorage.getItem('theme') )
    if(!localStorage.getItem('theme') || localStorage.getItem('theme') == 'null'){
      localStorage.setItem('theme','bg-white border-2 border-black-600');
      setTheme(localStorage.getItem('theme'));
    }  

  })
  return (
    <html lang="en" className='bg-black'>

      <body className={theme == "bg-black border-2 border-white-600"?"flex flex-col min-h-screen bg-black":"flex flex-col min-h-screen bg-white"}>
        <SessionProvider >
          <ThemeContext.Provider value={[theme, setTheme]}>
            <Header />
              {children}
            <Footer />
          </ThemeContext.Provider>
        </SessionProvider>
      </body>
 
    </html>
  );
}
