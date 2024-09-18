'use client'
import React, { useEffect, useState } from 'react'
import TabsUI from '@/_components/UI/Tabs'
import { useDoctorContext } from '@/context/DoctorProvider';
import AppointmentCreator from '@/_components/appointment/AppointmentCreator';
import DoctorAvailability from '@/_components/appointment/doctorAvailability';
import { useRouter,usePathname } from 'next/navigation'
export default function Appointments({ params}) {
  const router = useRouter();
  const pathname = usePathname()    
  const {getCurrentDoctorID, setCurrentDoctor, getSelectedDate, getSelectedLocation, getSelectedTime}  = useDoctorContext();
  const [doctorData, setDoctorData] = useState(null);
  const [currentID, setCurrentID] = useState(null);
  // cache: 'force-cache'
  useEffect( ()=>{
  (async function(){
    debugger
      let res = await fetch(`/api/doctor/${currentID || getCurrentDoctorID()}?city=`+params.location, {method: 'GET',})
      let data = await res.json();
      debugger
      setCurrentDoctor(data);
      setDoctorData(data);
      setCurrentID(getCurrentDoctorID());
    }
  )()
  },[])

  const bookAppointment = ()=>{
    router.push(`${pathname}/checkout`)
  }
  if(!doctorData)
     return null
 
  return (
    <>
      <div class="grid gap-2 border-2 shadow-md shadow-xl shadow-2xl shadow-lg overflow-auto">
        <div><DoctorAvailability /></div>
        <div><AppointmentCreator />
          <button onClick={bookAppointment} class=" w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300">
            Book Appointment
          </button>
        </div>
        <div><TabsUI /></div>
      </div>
    </>
  )
}