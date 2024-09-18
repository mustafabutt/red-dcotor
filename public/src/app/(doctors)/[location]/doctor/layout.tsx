
import React from 'react'
import { LocalNextUIProvider } from '@/context/NextUIProvider'
import ClientWrapperDoctor from '@/context/ClientWrapperDoctor'
import { fetchDoctorList } from '@/lib/actions';

export default async function LocationLayout({
    children, 
    params
  }: {
    children: React.ReactNode,
  
  }) {

    const data = await fetchDoctorList(params.location)

    return (
      <section className='justify-center items-center h-screen border-2 p-[10rem] shadow-md overflow-auto	'>
        <LocalNextUIProvider>
          <ClientWrapperDoctor data={data}>
            {children}
          </ClientWrapperDoctor>
        </LocalNextUIProvider>
      </section>
    )
  }