'use server'
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";
import { formDataToJson } from '@/utilz/utils';
import { revalidatePath } from 'next/cache'

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    // await signIn('credentials', formData)
    console.log("hell yaaa");
    console.log(formData.get('password'))

    // redirect('/dashboard/invoices');
  } catch (error:any) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function fetchDoctorList(location) {
  const res = await fetch("http://localhost:3001/doctor/?city="+location, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+cookies().get('access_token')?.value
      },
  });
  const data = await res.json();
  return data;
}


