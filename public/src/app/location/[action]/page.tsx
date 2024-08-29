'use client'
import React, { useEffect, Suspense } from 'react'
import { AddNewLocation } from '@/lib/actions'
import Link from 'next/link'
import { formDataToJson } from '@/utilz/utils'
import { useRouter } from 'next/navigation'

export default function LocationAction({ params }: { params: { slug: string } }) {
    const router = useRouter();

    async function AddNewLocation(e){
        e.preventDefault();
        const formData = new FormData(e.target)
        const json = formDataToJson(formData);

        let res = await fetch('/api/location',
        {
            method: 'POST',
            body:JSON.stringify(json)
        })
        let data = await res.json();
        router.push('/location')
        
    }
    return (
      <>
      <div class="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true">
            
        </div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                
                    <form class="p-4 md:p-5" onSubmit={AddNewLocation}>
                    <Link href="/location" className='float-right' type="button"  data-modal-toggle="crud-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </Link>
                        <div class="grid gap-4 mb-4 grid-cols-2">
                            <div class="col-span-2">
                                <label for="hospital" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital</label>
                                <input type="text" name="hospital" id="hospital" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="hospital" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <input type="text" name="city" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="hospital" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Streat</label>
                                <input type="text" name="streat" id="streat" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            <div class="col-span-2">
                                <label for="postCode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Code</label>
                                <input type='text' required id="postCode" name="postCode"  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type post code here" />                    
                            </div>
                        </div>
                        <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
      </>
    )
}