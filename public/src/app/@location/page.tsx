import Searchbox from '@/_components/UI/Searchbox'
import React, { useEffect, Suspense } from 'react'
import LocationList from '@/_components/UI/LocationList'
export default function Location() {
    return (
      <>
        <Searchbox />
        <div class="flex-1 flex flex-col sm:flex-row border-2 shadow-md shadow-xl shadow-2xl shadow-lg w-full">
          <main class="flex-1 flex-grow p-2 w-full">
            <Suspense fallback={<p>loading.....</p>}>
              <LocationList />
            </Suspense>
          </main>

          {/* <nav class="order-first sm:w-32 p-2 border-2 shadow-md shadow-xl shadow-2xl shadow-lg">

          </nav> */}
        </div>
      </>
    )
}