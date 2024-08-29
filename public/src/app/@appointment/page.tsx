import Searchbox from '@/_components/UI/Searchbox'
import React, { useEffect, Suspense } from 'react'
import LocationList from '@/_components/UI/LocationList'
export default function Appointment() {
    return (
      <>

        <div class="flex-1 flex flex-col sm:flex-row border-2 shadow-md shadow-xl shadow-2xl shadow-lg w-full">
          {/* <main class="flex-1 flex-grow p-2 w-full">
            <Suspense fallback={<p>loading.....</p>}>
              <LocationList />
            </Suspense>
          </main> */}
          <h1>this is appointment</h1>
      
        </div>
      </>
    )
}