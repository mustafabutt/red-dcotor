import Searchbox from '@/_components/UI/Searchbox'
import React, { useEffect, Suspense } from 'react'
import DoctorList from '@/_components/UI/DoctorList'
export default function Doctor() {
    return (
      <>
        <Searchbox />
        <div class="flex-1 flex flex-col sm:flex-row border-2 shadow-md shadow-xl shadow-2xl shadow-lg w-full">
            {/* <Suspense fallback={<p>loading.....</p>}>
              <DoctorList />
            </Suspense> */}

          <h1>This is doctor page</h1>
        </div>
      </>
    )
}