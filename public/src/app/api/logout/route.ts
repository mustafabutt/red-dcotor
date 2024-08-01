import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: Request, response:Response) {
    cookies().delete("next-auth.session-token");
    cookies().delete("access_token");
  return Response.json({  })
}