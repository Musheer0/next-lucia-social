"use server"

import db from "@/lib/prisma"
import { LoginSchema } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect";
import {verify} from '@node-rs/argon2'
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

 export const signin = async(credentials:{username:string, password:string})=>{
    try{
       const {username, password} = LoginSchema.parse(credentials)  ;
       const user = await db.user.findFirst({where: {
        username: {
            equals: username,
            mode: 'insensitive'
        }
       }});
       if(!user || !user.password ) return {error:'invalid credentials'};
       const isvalidpassword = verify(user.password, password,{
        memoryCost: 19456,
        timeCost: 2,
        outputLen:32,
        parallelism:1
       })
       if(!isvalidpassword) return {error:'invalid credentials'};
       const session = await lucia.createSession(user?.id, {});
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
      sessionCookie.attributes
      );
      return redirect('/')

    }
    catch(error){
      console.error(error)
        if(isRedirectError(error)) return;
        console.error(error);
      return {error: 'somthin went wrong '}
    }
 }