 
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

interface Session  {
  accessToken: string;
};

const handler = NextAuth({
  providers: [
      GoogleProvider({
        clientId: '631623577423-sucr0j00nm7gimq0d60ava2uonvmrbf3.apps.googleusercontent.com',
        clientSecret: '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'
    }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {},
        async authorize(credentials, _req) {
            
          try {
     
            const {data,error}:any = await axios.post("http://localhost:3001/auth/login", credentials)

            cookies().set({
                name: 'access_token',
                value: data.access_token,
                maxAge: 86400,
                httpOnly: false,
            });
      
            if (error) 
              return error       
            return await data
          } catch (error) {
           
            throw new Error(JSON.stringify(error.response.data));

          }
        },
      }), 
  ]
  ,
  session: { strategy: "jwt",       maxAge: 86400 },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      return token
    },
    
    async session({ session, token, user }) {
      return {...session, ...token}
    },
    async signIn({account, profile}) {
      
      if(account.provider === 'google') {
        console.log("opop4");
        console.log(account)
        const credentials = {
          email: profile.email,
          password: 'qwerty',
          gender:"male"
        };
        console.log("lol99");
        console.log(credentials)
        const {data,error}:any = await axios.post("http://localhost:3001/auth/login", credentials);
        console.log("lolo78");
        console.log(data);
        cookies().set({
            name: 'access_token',
            value: data.access_token,
            maxAge: 86400,
            httpOnly: false,
        }); 
         return true
      }else return true
    },
  },

  pages:<any> {
    signIn: '/signin',
    error: '/signin',
  }
});

export { handler as GET, handler as POST }
