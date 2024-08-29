'use client'
import React, {useContext, useEffect, useState} from 'react'
import { ThemeContext } from '@/context/ThemeContext';
export default function Checkbox() {

  const [theme] = useContext(ThemeContext);
  // const theme = "bg-black border-2 border-white-600"
  const [isChecked, setIsChecked] = useState(false);

  const onChangeCheckBox = () => {
    setIsChecked(!isChecked)
  }
  return (
    <div >
        <input
              type="checkbox" 
              value=""
              name="time" 
              onChange={onChangeCheckBox}
             
              // checked={item.checked}
              /> Sialkot
             
    {/* {preferredTime.map((item, index) => (
      <div key={index} className={styles.radios}>
        <label htmlFor={item.time} className={styles.checkLabel}>{item.time}
          <input
              type="checkbox" 
              value={item.time}
              name="time" 
              onChange={onChangeCheckBox}
              id={item.time}
              // checked={item.checked}
              />
          <span className={styles.checkSpan}></span>
        </label>
      </div>
    ))} */}
  </div>
  );
};
