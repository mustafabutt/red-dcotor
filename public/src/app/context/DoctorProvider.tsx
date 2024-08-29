
'use client'
import { createContext, useContext } from 'react';
  
const DoctorContext = createContext(null)
export const DoctorProvider = DoctorContext.Provider;

export const useDoctorContext = () => {
    const context = useContext(DoctorContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};
  
