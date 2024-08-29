import DoctorList from '@/_components/UI/DoctorList'
import Checkbox from '@/_components/UI/checkbox'
import Searchbox from '@/_components/UI/Searchbox'
import React, { useEffect, Suspense } from 'react'

export default function Doctors() {
    return (
      <>
        <Searchbox />
        <div class="flex-1 flex flex-col sm:flex-row border-2 shadow-md shadow-xl shadow-2xl shadow-lg w-full">
          <main class="flex-1 flex-grow p-2 w-full">
            <Suspense fallback={<p>loading.....</p>}>
              <DoctorList />
            </Suspense>
          </main>

          <nav class="order-first sm:w-32 p-2 border-2 shadow-md shadow-xl shadow-2xl shadow-lg">
            <Checkbox />
          </nav>
        </div>
      </>
    )
}