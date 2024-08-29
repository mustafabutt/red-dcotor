'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import TabsUI from '@/_components/UI/Tabs'
import { useDoctorContext } from '@/context/DoctorProvider'


export default function Doctor({ params }: { params: { slug: string } }) {
    const {getCurrentDoctorID, setCurrentDoctor}  = useDoctorContext();
    const [doctorData, setDoctorData] = useState(null);
    const [currentID, setCurrentID] = useState(null);
    
   useEffect( ()=>{
    (async function(){
        
        let res = await fetch(`/api/doctor/${currentID || getCurrentDoctorID()}`, {method: 'GET'})
        let data = await res.json();
        setCurrentDoctor(data)
        setDoctorData(data);
        setCurrentID(getCurrentDoctorID());
        
      }
    )()
  },[])
  
    if(!doctorData)
        return null
   
    return (
      <>
      
        <div class="grid grid-rows-4 grid-flow-col border-2 shadow-md shadow-xl shadow-2xl shadow-lg">
            <div className=' '>
        
                <div class="flex items-center space-x-4 rtl:space-x-reverse p-5">
                    <div class="flex-shrink-0">
                        <Image class="rounded-full" src="/profile.png"  width={100} height={100} alt="Picture of the author" />
                    </div>
                    <div class="flex-1 min-w-0 ">
                        <b class="text-lg font-large truncate">
                        {doctorData.firstName } {doctorData.lastName }
                        </b>
                        <div className='flex'>
                            <div class="flex-shrink-0 ">
                            <Image class="rounded-full" src="/category.png"  width={20} height={20} alt="Picture of the author" />
                            </div>
                            <div class="flex-1 min-w-0 mx-1">{doctorData.expertise}</div>
                        </div>
                        <div className='flex'>
                            <div class="flex-shrink-0">
                            <Image class="rounded-full" src="/degree.png"  width={20} height={20} alt="Picture of the author" />
                            </div>
                            <div class="flex-1 min-w-0 mx-1">{doctorData.qualification}</div>
                        </div>
                    <div className='flex'>
                    <div class="flex-shrink-0">
                        <Image class="rounded-full" src="/clock.png"  width={20} height={20} alt="Picture of the author" />
                    </div>
                    <div class="flex-1 min-w-0 mx-1">{doctorData.waitTime} (Wait time)</div>
                </div>
                    </div>
                    <div class="inline-flex text-base">
                    {doctorData.fees}
                    </div>
                </div>
            
            </div>
            <div className="flex w-full flex-col">
                <TabsUI />
            </div>  
        </div>
      </>
    )
}