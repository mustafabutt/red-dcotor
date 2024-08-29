'use client'
import Head from 'next/head';
import { useForm } from "react-hook-form"
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState,FormEvent, useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/lib/actions'
import { LoginButton } from '@/_components/UI/LoginButton';
import { redirect } from 'next/dist/server/api-utils';
import axios from "axios";
import Alert from '@/_components/UI/alert';
import { ThemeContext } from '@/context/ThemeContext';

export default function Signin() {
  const router = useRouter();
  const [invalidCred, setInvalidCred] = useState(false);
  const [ showSpinner,setShowSpinner ] = useState(false);
  const [theme, setTheme]:any = useContext(ThemeContext);
  const username = useRef("");
  const pass = useRef("");

  const { data: session,status } = useSession();

  const focusHandler = () => {
    setInvalidCred(false);
  };
  const onSubmit = async (platform:string) =>{
   
    let results:any = "";
    if(platform == "google")
      results = await signIn("google", { callbackUrl: "/",  redirect:true })
    else {
      (async ()=>{
        
        results = await signIn('credentials', {
          email: username.current,
          password: pass.current,
          redirect:false,
          callbackUrl:"/"
        },
          )
          setShowSpinner(true)
          
          if(results?.status == '401')
            setInvalidCred(true)
      })() 
      } 
    }
   
  useEffect(()=>{
    if(status == "authenticated")
      router.push('/')
    else setShowSpinner(false)
    })

    return (
      <>
        <Head>
        <title>Candlik - Login</title>
      </Head>
        <section >
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen sm:h-screen xs:h-screen">
              
              <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      
                      {showSpinner? (
                      <div className="text-center items-center justify-center" >
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                          
                        </div>
                      </div>
                      ):<>
                      <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                                    Sign in to your account
                                </h1>
                      <form className="space-y-4 md:space-y-6" onSubmit={(e) => {e.preventDefault(); onSubmit("credentials")}}>
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" onChange={(e)=>{username.current = e.target.value}} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password" onChange={(e)=>{pass.current = e.target.value}} onFocus={focusHandler}  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                          </div>
                          <div className="flex items-center justify-between">
                              <div className="flex items-start">
                                  <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                  </div>
                                  <div className="ml-3 text-sm">
                                    <label htmlFor="remember" >Remember me</label>
                                  </div>
                              </div>
                              <a  href="/forget" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                          </div>
                          {/* <button onClick={onSubmit} className="w-full bg-orange-400 rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button> */}
                          <button type='submit' className={theme == "bg-white border-2 border-black-600"? "bg-black w-full rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800":"bg-white w-full rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}>Sign in</button>

                      </form>
                      <button onClick={() => onSubmit("google")} className={theme == "bg-white border-2 border-black-600"? "bg-black w-full rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800":"bg-white w-full rounded-lg p-2 mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}>Sign in with Google</button>
                      <p className="text-sm font-light">
                          Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                      </p>
                      {/* {sessionValue ? (<button onClick={() => signOut()}>Sign out</button>) : null} */}

                      {invalidCred ? (
                          <Alert type="error">
                            <span>Incorrect username or password.</span>
                          </Alert>
                        ) : null}
            </>}
                      
                     
                  </div>
              </div>
          </div>
        </section>
      </>
    

    )
}



