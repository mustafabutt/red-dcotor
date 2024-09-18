'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import TabsUI from '@/_components/UI/Tabs'
import { useDoctorContext } from '@/context/DoctorProvider'
import { usePathname } from "next/navigation";
import Link from 'next/link'

export default function Doctor({ params }: { params: { slug: string } }) {
    const {getCurrentDoctorID, setCurrentDoctor}  = useDoctorContext();
    const [doctorData, setDoctorData] = useState(null);
    const [currentID, setCurrentID] = useState(null);
    const pathName = usePathname();

   useEffect( ()=>{
    (async function(){
    
        let res = await fetch(`/api/doctor/${currentID || getCurrentDoctorID()}?city=`+params.location, {method: 'GET'})
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
      
        <div className="grid grid-rows-4 grid-flow-col border-2 shadow-xl">
            <div className="p-5">
                <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Image className="rounded-full" src="/profile.png" width={100} height={100} alt="Doctor's Profile Picture" />
                </div>
                <div className="flex-1 min-w-0">
                    <b className="text-lg font-large truncate">
                    {doctorData.firstName} {doctorData.lastName}
                    </b>
                    <div className="flex items-center mt-2">
                    <Image className="rounded-full" src="/category.png" width={20} height={20} alt="Expertise Icon" />
                    <span className="ml-2">{doctorData.expertise}</span>
                    </div>
                    <div className="flex items-center mt-2">
                    <Image className="rounded-full" src="/degree.png" width={20} height={20} alt="Qualification Icon" />
                    <span className="ml-2">{doctorData.qualification}</span>
                    </div>
                    <div className="flex items-center mt-2">
                    <Image className="rounded-full" src="/clock.png" width={20} height={20} alt="Wait Time Icon" />
                    <span className="ml-2">{doctorData.waitTime} (Wait time)</span>
                    </div>
                </div>
                <div className="grid-col-2">
                    <div className="text-base font-semibold mr-4 p-6">{doctorData.fees} PKR</div>
                    <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300">
                        <Link href={`${pathName}/appointment`}>Book Appointment</Link>
                    </button>
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