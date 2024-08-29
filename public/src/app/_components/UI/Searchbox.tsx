'use client'
import React, {useContext, useEffect, useState} from 'react'
import { ThemeContext } from '@/context/ThemeContext';

export default function Searchbox() {

  const [theme] = useContext(ThemeContext);
  // const theme = "bg-black border-2 border-white-600"
  const [isChecked, setIsChecked] = useState(false);

  const onChangeCheckBox = () => {
    setIsChecked(!isChecked)
  }
  return (

    <div class="w-100 p-1">
        <div class="relative">
          <input type="search" class="w-full p4 rounded-lg border border-gray-200 bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search doctor" />

          {/* <div class="absolute z-10 w-full border rounded-lg shadow divide-y max-h-72 overflow-y-auto bg-white mt-1">
            <a class="block p-2 hover:bg-indigo-50" href="#">Tailwind</a>
            <a class="block p-2 hover:bg-indigo-50" href="#">Bootstrap</a>
            <a class="block p-2 hover:bg-indigo-50" href="#">Foundation</a>
            <a class="block p-2 hover:bg-indigo-50" href="#">Bulma</a>
            <a class="block p-2 hover:bg-indigo-50" href="#">Material UI</a>
            <a class="block p-2 hover:bg-indigo-50" href="#">Semantic UI</a>
            <a class="block p-2 hover:bg-indigo-50" href="#">Element UI</a>
            <a class="block p-2 hover:bg-indigo-50" href="#">Ant Design</a>
          </div> */}
        </div>
    </div>

  );
};
