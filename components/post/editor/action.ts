"use server"

import { validaterequest } from "@/auth"
import db from "@/lib/prisma";
import { PostSchema } from "@/lib/validation";

export async function CreatePost(input:string){
    const {user} = await validaterequest();
    if(!user) throw new Error("Unauthorized")
        const {caption} = PostSchema.parse({caption: input})
    if(caption){
        const post = await db.post.create({data:{
            caption: caption,
           userId: user.id
        }});
        return post;
    }
}