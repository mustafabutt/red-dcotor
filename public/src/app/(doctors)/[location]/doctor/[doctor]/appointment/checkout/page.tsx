'use client'
import React, { useEffect } from 'react'
import CheckoutPage from '@/_components/CheckoutPage';
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDoctorContext } from '@/context/DoctorProvider'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Page() {
  const {getCurrentDoctor, getSelectedTime}  = useDoctorContext();

    if(!getSelectedTime())
      return null
      
    return (
      <>
        <div class="flex-1 flex flex-col sm:flex-row border-2 shadow-md shadow-xl shadow-2xl shadow-lg w-full ustify-center items-center h-screen border-2 p-[10rem] shadow-md">
          <main class="flex-1 flex-grow p-2 w-full">
            <Elements
                stripe={stripePromise}
                options={{
                mode: "payment",
                amount: convertToSubcurrency(getCurrentDoctor().fees),
                currency: "usd",
                }}
            >
                <CheckoutPage amount={getCurrentDoctor().fees} />
            </Elements>
        
          </main>
        </div>
      </>
    )
}