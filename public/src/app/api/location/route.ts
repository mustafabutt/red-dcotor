import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }) {

    const res = await fetch(`http://localhost:3001/locations`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+cookies().get('access_token')?.value
        },
    });
    const data = await res.json();
    return Response.json(data)
  }

export async function POST(request: Request) {
    const resp = await request.json()
    try{
      const res = await fetch("http://localhost:3001/locations", {
        method: 'POST',
        body: JSON.stringify(resp),
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+cookies().get('access_token')?.value
        },
    });
      const data = await res.json();
      if(res.status == '201')
        revalidatePath('/location');
        return Response.json(data)
    }
    catch (e) {
      throw new Error('Failed to create task')
    }
  }

  export async function DELETE(request: Request) {
    const resp = await request.json()

    try{
      const res = await fetch("http://localhost:3001/locations/"+resp, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+cookies().get('access_token')?.value
        },
    });
    const data = await res.json();
    revalidatePath('/location');
    return Response.json(data)
    }
    catch (e) {
      throw new Error('Failed to create task')
    }
  }