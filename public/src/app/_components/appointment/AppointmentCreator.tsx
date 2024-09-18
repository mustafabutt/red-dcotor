'use client'
import {React,useContext, useEffect, useState} from 'react'
import { useDoctorContext } from '@/context/DoctorProvider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import Dropdown from '../UI/dropDown'
export default function AppointmentCreator({ params, searchParams, request }) {

    const {getCurrentDoctor, setSelectedDate, setSelectedTime}  = useDoctorContext();
    const [selectedTiming, setSelectedTiming] = useState(null);
    const pathname = usePathname()    
  
    const handleSelect = (option) => {
      setSelectedDate(option.day)
      setSelectedTiming(option);
      
    };
    const handleTime = (option) => {
      setSelectedTime(option)
      // setSelectedTiming(option);
      
    };

    const handleId = (e) => {
        setCurrentDoctorId(e.target.id)
    }

    return (
      <div>
        <main class="container mx-auto flex lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          <div class="grid grid-rows-2 gap-4">
            <div className='text-xl font-semibold mb-4'> Select Date & Time</div>
            <div class="grid grid-cols-2 gap-4">
       
              <div>
                <Dropdown onSelect={handleSelect} placeholder="Choose date" />
              </div>
              <div>
                {selectedTiming && (<Dropdown options={selectedTiming} onSelect={handleTime} placeholder="Choose time" />)}
              </div>
            </div>
          </div>
    </main>
  </div>
    )
}
