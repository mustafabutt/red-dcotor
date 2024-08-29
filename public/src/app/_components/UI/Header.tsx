'use client'
import React from 'react'
import {  useState, useEffect } from 'react';
import { useRouter, } from 'next/router';
import Image from 'next/image'
import {useContext } from 'react';
import ThemeToggle from '@/_components/UI/themeToggle'

import Cookies from "js-cookie";

import { useSession, signOut } from "next-auth/react"
import { ThemeContext } from '@/context/ThemeContext';

const Header = () => {
  const [nav, setNav] = useState(false);
  let [showLogout, setLogout] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState();
  const [avatar, setAvatar] = useState(null);

  // const router = useRouter();
  const { data: session,status } = useSession();
  const userProfile  = async () => {
    // router.push("/profile");
  }
  const[theme] = useContext(ThemeContext);
  // const theme = "bg-black border-2 border-white-600"
  const adminDashboard  = async () => {
    // router.push("/dashboard");
  }
  const goHome  = async () => {
    // router.push("/");
  }
  const logOut  = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
    })
    signOut();
  }

 
  return (
    <> 
      <div className={'flex justify-between items-center w-full h-20 px-4 fixed nav shadow-xl shadow-2xl shadow-lg shadow-md '+theme} >
        <div>
          <h1 className="text-5xl font-signature ml-2">
            Red Doctor
            <a
              className="link-underline link-underline-black"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              {avatar?<Image
                src={`data:image/jpeg;base64, ${avatar}`}
                alt=""
                width={80}
                height={80}
              />:null} 
            </a>
        
          </h1>
        
        </div>
        
        {status == "authenticated" ? <button onClick={logOut}  className={theme == "bg-white border-2 border-black-600"? "items-center ml-auto inline-flex bg-black rounded-lg p-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800":" items-center inline-flex ml-auto bg-white rounded-lg p-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}>Sign out</button>:null}

          <ThemeToggle />
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden" >
      
        </div>

      </div>
    </>
  );
};

export default Header;
