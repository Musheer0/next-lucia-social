"use server"

import { lucia, validaterequest } from "@/auth"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async()=>{
    const {session} = await validaterequest();
    if(!session) {
        throw new Error("Unauthorized")
    }
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
      sessionCookie.attributes
      );
      return redirect('/sign-in')
}