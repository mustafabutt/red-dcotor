'use server'
import { redirect } from 'next/navigation';
// import { signIn } from '@/auth'
 
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