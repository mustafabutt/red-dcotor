'use client'
import {React,useContext, useEffect, useState} from 'react'
import { useDoctorContext } from '@/context/DoctorProvider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";

export default function DoctorAvailability() {

    const {getCurrentDoctor, getAppointmentLocation, setSelectedLocation}  = useDoctorContext();
    const [activeIndex, setActiveIndex] = useState(null); // Track the index of the clicked div

    const handleClick = (index) => {
        setSelectedLocation(getAppointmentLocation(getCurrentDoctor().doctorTiming[index]).location[0].city)
        setActiveIndex(index); 
    };

    return (
      <div>
      <main class="container mx-auto flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">  

   
      <div>
        <h3 class="text-xl font-semibold mb-4">Available Timings</h3>
        

        <div class="grid grid-cols-2 gap-4">
            <div>
                <div class="bg-blue-50 border border-blue-200 rounded-lg shadow-md hover:border-blue-500" onClick={() => handleClick("00")}
                    className={`border px-4 py-2 cursor-pointer ${
                        activeIndex === "00" ? 'border-blue-500 bg-blue-50 p-6 rounded-lg shadow-md hover:border-blue-500' : 'border-gray-300 bg-blue-50 rounded-lg shadow-md hover:border-blue-500'
                    }`}>
                    <div class="flex items-center space-x-4">

                    <div class="flex-shrink-0">
                        <img width="40" height="40" src="https://img.icons8.com/fluency/48/appointment-scheduling.png" alt="appointment-scheduling"/>
                    </div>
                    
                    <div>
                        <p class="text-lg font-semibold text-gray-700"> Video Consultation</p>
                        <p class="text-md text-gray-700">Online</p>
                        <p class="text-md text-gray-700">900: PKR</p>
                    </div>
                    </div>
                </div>
            </div>  
        {
            
            getCurrentDoctor() && getCurrentDoctor().doctorTiming.map((obj,index)=>{
                return <div>
                            <div class="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-md " onClick={() => handleClick(index)}
                                className={`border px-4 py-2 cursor-pointer ${
                                    activeIndex === index ? 'border-blue-500 bg-blue-50 p-6 rounded-lg shadow-md hover:border-blue-500' : 'border-gray-300 bg-blue-50 p-6 rounded-lg shadow-md hover:border-blue-500'
                                }`}>
                                <div class="flex items-center space-x-4">

                                <div class="flex-shrink-0">
                                    <img width="40" height="40" src="https://img.icons8.com/fluency/48/appointment-scheduling.png" alt="appointment-scheduling"/>
                                </div>
                                
                                <div>
                                    <p class="text-lg font-semibold text-gray-700"> {obj.location[0].hospital}</p>
                                    <p class="text-lg text-gray-700">{obj.location[0].city}</p>
                                    <p class="text-md text-gray-700">{getCurrentDoctor().fees}: PKR</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    
                })
            }  
        </div>
  
      </div>
    </main>
  </div>
    )
}
