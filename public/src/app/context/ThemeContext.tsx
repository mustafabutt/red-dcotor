'use client'
import { createContext, useState, useContext } from 'react';
import "../globals.css"
import NextBreadcrumb from '@/_components/UI/NextBreadcrumb';
export const ThemeContext:any = createContext(null);

export function ThemeProvider({
    children,
  }: {
    children: React.ReactNode
  }) {
    const [theme, setTheme] = useState(null);
    return  <html lang="en" className='bg-black'>
              <body className={theme == "bg-black border-2 border-white-600"?"flex flex-col min-h-screen bg-black":"flex flex-col min-h-screen bg-white"}>

                <ThemeContext.Provider value={[theme, setTheme]}>
                {/* <NextBreadcrumb
                  homeElement={'Home'}
                  separator={<span> | </span>}
                  activeClasses='text-amber-500'
                  containerClasses='flex p-20 bg-gradient-to-r from-purple-600 to-blue-600' 
                  listClasses='hover:underline mx-2 font-bold'
                  capitalizeLinks
                /> */}
                  {children}
                </ThemeContext.Provider>
              </body>
            </html>
  }
