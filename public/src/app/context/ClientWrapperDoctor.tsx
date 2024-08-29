"use client";  // Mark this as a client component

import { DoctorProvider } from "./DoctorProvider";
import { useState, useEffect } from 'react'

export default function ClientWrapperDoctor({ children, data }: { children: React.ReactNode; data: any }) {
  const [list, setList] = useState(data);
 let currentDoctor = null;
  
 
  const getDoctorList = () => {
    return list;
  };

  const setCurrentDoctorId = (id) => {
    localStorage.setItem('doctorId',id)
  };

  const setCurrentDoctor = (doctor) => {
    currentDoctor = doctor;
  };

  const getCurrentDoctor = () => {
    return currentDoctor
  };

  const getCurrentDoctorID = () => {
    return localStorage.getItem('doctorId')
  };

  return <DoctorProvider value={{ getDoctorList, setCurrentDoctorId, getCurrentDoctor, setCurrentDoctor,getCurrentDoctorID }}>
          {children}
         </DoctorProvider>
}