'use client'
import {React,useContext, useEffect, useState, useRef} from 'react'
import { useDoctorContext } from '@/context/DoctorProvider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation'

const LocationList = async () => {

    const [locationData, setLocationData] = useState(null);
    const [openModel, setOpenModel] = useState(false);
    const divRef = useRef(null);
    const router = useRouter();
    let locationId = null;
    const [trigger, setTrigger] = useState(false);

    useEffect( ()=>{

        (async function(){
            let res = await fetch('/api/location', {method: 'GET',cache: 'force-cache'})
            let data = await res.json();
            setLocationData(data)
            }
        )()
        setTrigger(false);
    },[trigger])

    async function DeleteLocation(e){
        e.preventDefault();
        locationId
        let res = await fetch('/api/location',
        {
            method: 'DELETE',
            body:JSON.stringify(locationId)
        })
        closeModal();
        setTrigger(true);
    }

    const showModal = (id:string) => {
        divRef.current.style.display = 'block'
        locationId = id;
    }

    const closeModal = () => {
        divRef.current.style.display = 'none'
    };

    if(!locationData)
        return null

    return (
        <>
            <button  data-modal-target="select-modal" data-modal-toggle="select-modal" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right" type="button">
               <Link href='/location/create'>Add new</Link> 
            </button>

            <div ref={divRef} class="hidden relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true">
                    
                </div>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto ">
                
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    
                        <div class="border-2 border-dark-600 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={closeModal}  type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                       
                        
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this location?</h3>
                            <button onClick={DeleteLocation} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                Yes, I'm sure
                            </button>
                            <button onClick={closeModal}  data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                        </div>
                    </div>
                                
                        </div>
                    </div>
                </div>
            </div>

            

        <ul class="max-w-2xl p-10 divide-y overflow-scroll max-w-[900px] max-h-[500px] w-full">

            {
            locationData.map((data)=> {
                        
                return <li class="pb-3 sm:pb-4 my-5">
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-shrink-0">
                            <Image class="rounded-full" src="/profile.png" width={100} height={100} alt="Picture of the author" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <b class="text-lg font-large truncate">
                                {data.hospital}
                            </b>
                            <div className='flex '>
                                <div class="flex-shrink-0 ">
                                    <Image class="rounded-full" src="/category.png"  width={20} height={20} alt="Picture of the author" />
                                </div>
                                <div class="flex-1 min-w-0 pb-1 mx-1">{data.city} {data.streat} {data.postCode} </div>
                            </div>
                        </div>
                        <div class="inline-flex text-base space-x-2"  >
                            <Link href='/location/edit'><Image class="rounded-full bg-white cursor-pointer "  data-toggle="tooltip" title="Edit"  src="/edit.png" width={30} height={30}  alt="Picture of the author" /></Link>
                            <Image onClick={(value) => showModal(data._id)} class="rounded-full bg-white cursor-pointer "  data-toggle="tooltip" title="Delete"  src="/delete.png" width={30} height={30}  alt="Picture of the author" />
                        </div>
                        
                    </div>
                </li>
            })
            }
        </ul>
    </>
    )
}

export default LocationList;
