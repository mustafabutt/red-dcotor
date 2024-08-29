import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: Request, response:Response) {

  const credentials = {
    email: "test@gmail.com",
    password: 'qwerty',
    gender:"male"
  };
  const {data,error}:any = await axios.post("http://localhost:3001/auth/login", credentials);
  cookies().set({
      name: 'access_token',
      value: data.access_token,
      maxAge: 86400,
      httpOnly: false,
  }); 
  return Response.json({ data })
}

