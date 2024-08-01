import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [theme, setTheme] = useContext(ThemeContext);

  const handleCheckboxChange = () => {
    setTheme(theme == "bg-white border-2 border-black-600" ? "bg-black border-2 border-white-600":"bg-white border-2 border-black-600");
    setIsChecked(!isChecked)
  }
  useEffect(()=>{
    localStorage.setItem("theme",theme);
    setIsChecked(localStorage.getItem("theme")=="bg-black border-2 border-white-600"?true:false);
  })

  return (
    <>
    
      <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={theme == "bg-white border-2 border-black-600"? "black":"white"} width="20" height="20">
            <path d="M6.76 4.84l-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12zm10.48 0l2.12-2.12-1.41-1.41-2.12 2.12 1.41 1.41zm4.24 7.16h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2zM12 7a5 5 0 100 10 5 5 0 000-10zm-1 12.24h2v3h-2zm7.76-1.41l-2.12 2.12 1.41 1.41 2.12-2.12-1.41-1.41zm-12.07 0l-2.12 2.12 1.41 1.41 2.12-2.12-1.41-1.41z"/>
        </svg>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        
        <span className='label flex items-center text-sm font-medium text-black'> </span>
       
        <span
          className={`slider mx-2 flex h-4 w-[30px] items-center rounded-full p-1 duration-200   ${
            isChecked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-4 w-2 rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-[20px]' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium text-black'>
       
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={theme == "bg-white border-2 border-black-600"? "black":"white"} width="20" height="20">
            <path d="M12 2a9.99 9.99 0 01 9.98 10.31 8 8 0 11-8.53-9.29A9.94 9.94 0 0112 2m0-2C5.92 0 1 4.92 1 11s4.92 11 11 11 11-4.92 11-11S18.08 0 12 0z"/>
        </svg>

        </span>
      </label>
    </>
  )
}

export default ThemeToggle
