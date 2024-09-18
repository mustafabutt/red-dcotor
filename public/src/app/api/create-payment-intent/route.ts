import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {

    try{
      const res = await fetch("http://localhost:3001/stripe/payment/", {
        method: 'POST',
        body: JSON.stringify({
          "amount":48,
          "currency":"USD"
       }),
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+cookies().get('access_token')?.value
        },
    });
      const data = await res.json();
      if(res.status == '201')
        return NextResponse.json({ clientSecret: data.client_secret, paymentID:data.id });
    }
    catch (e) {
      throw new Error('Failed to create task')
    }
  
}
