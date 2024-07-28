"use server"
import { validaterequest } from "@/auth";
import db from "@/lib/prisma";

export async function deletepost (id:string){
    console.log('req recived')
    const{user} = await validaterequest();
    if(!user || !id) throw new Error("Access Denied");
    console.log('user recived')

    const post = await db.post.findUnique({where:{id:id}});
    if(!post ) throw new Error ("Post already deleted");
    if(post.userId!==user.id) throw new Error("Access Denied");
    console.log('deleted')

    await db.post.delete({where:{id}});
    return id;
}