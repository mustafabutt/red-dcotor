
import React from 'react'
import { LocalNextUIProvider } from '@/context/NextUIProvider'
import ClientWrapperDoctor from '@/context/ClientWrapperDoctor'
import { fetchDoctorList } from '@/lib/actions'

export default async function LocationLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className='justify-center items-center h-screen border-2 p-[10rem] shadow-md'>
        <LocalNextUIProvider>
      
            {children}
       
        </LocalNextUIProvider>
      </section>
    )
  }