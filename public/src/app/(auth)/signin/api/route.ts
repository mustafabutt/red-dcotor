import { cookies } from "next/headers";

export async function POST(request: Request, response:Response) {
  
  const credentials = {
    email: "test@gmail.com",
    password: 'qwerty',
    gender:"male"
  };
  const {data,error}:any = await axios.post("http://localhost:3001/auth/login", credentials)
  
  const res = await res.json()
 
  return Response.json({ res })
}