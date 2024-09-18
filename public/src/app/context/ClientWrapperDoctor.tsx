"use client";  // Mark this as a client component

import { DoctorProvider } from "./DoctorProvider";
import { useState, useEffect } from 'react'

export default function ClientWrapperDoctor({ children, data }: { children: React.ReactNode; data: any }) {
  const [list, setList] = useState(data);
  const [doctor, setDoctor] = useState("");
  const [selectedLoc, setSelectedLoc] = useState("");
  const [selectedTim, setSelectedTim] = useState("");
  const [selectedDat, setSelectedDat] = useState("");
//  let currentDoctor = null;
 
  const getDoctorList = () => {
    return list;
  };

  const setCurrentDoctorId = (id) => {
    localStorage.setItem('doctorId',id)
  };

  const setCurrentDoctor = (doctor) => {
    setDoctor(doctor);
  };

  const getCurrentDoctor = () => {
    return doctor
  };

  const getCurrentDoctorID = () => {
    return localStorage.getItem('doctorId')
  };

  const getAppointmentLocation = (data) => {
    return data
  }

  const setSelectedLocation = (location) => {
    setSelectedLoc(location);
  };
  const getSelectedLocation = () => {
   return selectedLoc
  };
  const setSelectedTime = (time) => {
    setSelectedTim(time)
  };
  const getSelectedTime = () => {
    return selectedTim
  };
  const setSelectedDate = (date) => {
    setSelectedDat(date)
  };

  const getSelectedDate = () => {
    return selectedDat
  };

  return <DoctorProvider value={{getAppointmentLocation, getDoctorList, setCurrentDoctorId, getCurrentDoctor, setCurrentDoctor,getCurrentDoctorID, setSelectedLocation,
    getSelectedLocation,
    setSelectedTime,
    getSelectedTime,
    setSelectedDate,
    getSelectedDate
  }}>
          {children}
         </DoctorProvider>
}