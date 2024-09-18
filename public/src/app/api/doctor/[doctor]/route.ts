import { cookies } from "next/headers";
import axios from "axios";

export async function GET(request: Request, { params }) {
    const reqUrl = request.url
    const { searchParams } = new URL(reqUrl)
  
    const res = await fetch(`http://localhost:3001/doctor/${params.doctor}?city=`+searchParams.get("city"), {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+cookies().get('access_token')?.value
        },
    });
    const data = await res.json();
    return Response.json(data)
  }