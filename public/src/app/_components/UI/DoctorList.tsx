'use client'
import {React,useContext, useEffect, useState} from 'react'
import { useDoctorContext } from '@/context/DoctorProvider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";

export default async function DoctorList({ params, searchParams, request }) {

    const {getDoctorList,setCurrentDoctorId}  = useDoctorContext();
    const pathname = usePathname()    
   
    const handleId = (e) => {
        setCurrentDoctorId(e.target.id);
    }

    return (
        <>
      
        <ul class="max-w-2xl p-10 divide-y overflow-scroll max-w-[900px] max-h-[500px] w-full">

            {
            getDoctorList() && getDoctorList().map((doctor)=> {
                        
                return <li class="pb-3 sm:pb-4 my-5">
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-shrink-0">
                            <Image class="rounded-full" src="/profile.png"  width={100} height={100} alt="Picture of the author" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <b class="text-lg font-large truncate">
                            <Link href={`${pathname}/${doctor.firstName}`} id={doctor._id} onClick={handleId}>{doctor.firstName} {doctor.lastName} </Link>
                            </b>
                            <div className='flex '>
                                <div class="flex-shrink-0 ">
                                    <Image class="rounded-full" src="/category.png"  width={20} height={20} alt="Picture of the author" />
                                </div>
                                <div class="flex-1 min-w-0 pb-1 mx-1">{doctor.expertise}</div>
                            </div>
                            <div className='flex'>
                                <div class="flex-shrink-0">
                                    <Image class="rounded-full" src="/degree.png"  width={20} height={20} alt="Picture of the author" />
                                </div>
                                <div class="flex-1 min-w-0 mx-1">{doctor.qualification}</div>
                            </div>
                            <div className='flex'>
                                <div class="flex-shrink-0">
                                    <Image class="rounded-full" src="/clock.png"  width={20} height={20} alt="Picture of the author" />
                                </div>
                                <div class="flex-1 min-w-0 mx-1">{doctor.waitTime}</div>
                            </div>
                        </div>
                        <div class="inline-flex text-base">
                        Consultation Fees: {doctor.fees} PKR
                        </div>
                    </div>
                </li>
            })
            }
        </ul>
    </>
    )
}
