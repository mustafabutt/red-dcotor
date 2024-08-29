import { cookies } from "next/headers";

export async function POST(request: Request, response:Response) {
    cookies().delete("next-auth.session-token");
    cookies().delete("access_token");
  return Response.json({  })
}


// export async function GET(request: Request, response:Response) {
//   const res = await fetch("http://localhost:3001/doctor", {
     
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization":"Bearer "+cookies().get('access_token')?.value
//         },
//     });
//   let data = await res.json()
//   return Response.json({data})
// }


// export async function GET(request: Request, response:Response) {
//   console.log("i have been called123");

//   const res = await fetch("http://localhost:3001/doctor/66b00189588327dd821b0872", {
//       method: 'GET',
//       headers: {
//           "Content-Type": "application/json",
//           "Authorization":"Bearer "+cookies().get('access_token')?.value
//       },
//   });
//   const data = await res.json();
//   return Response.json({data})
// }