"use server"
import {lucia} from '@/auth'
import db from "@/lib/prisma";
import { SignUpSchema } from "@/lib/validation";
import {hash} from '@node-rs/argon2'
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export const signup = async(credentials:{username:string, email:string, password:string})=>{
    try{
     const {username, email, password} = SignUpSchema.parse(credentials);
      const hashed_pass = await hash(password,{
        memoryCost: 19456,
        timeCost: 2,
        outputLen:32,
        parallelism:1
      });
      const existingUsername = await db.user.findFirst({where: {
        username: {
            equals: username,
            mode: 'insensitive'
        }
      }});
      if(existingUsername) return {error : 'user already exists'};
      const existingEmail = await db.user.findFirst({where: {
       email: {
            equals: email,
            mode: 'insensitive'
        }
      }});
      if(existingEmail) return {error : 'user already exists'};

      const  userId = await generateIdFromEntropySize(10);
      await db.user.create({
        //@ts-ignore
        data:{
           id: userId,
           email: email,
           username:username,
           password: hashed_pass,
           name: username
        }
      })
    const session = await lucia.createSession(userId, {});
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
      if(isRedirectError(error)) throw error;
        return {error: "Something went wrong"};
    }
}