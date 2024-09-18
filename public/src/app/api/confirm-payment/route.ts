import { cookies } from "next/headers";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest, response: NextResponse) {

    const reqData = await request.json();
    try{
      const res = await fetch("http://localhost:3001/stripe/confirm/", {
        method: 'POST',
        body: JSON.stringify(reqData),
        headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+cookies().get('access_token')?.value
        },
    });
      const data = await res.json();

      if(res.status == 201)
        return NextResponse.json(data);
    }
    catch (e) {
      throw new Error('Failed to create task')
    }
  
}
