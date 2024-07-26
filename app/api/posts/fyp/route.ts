import { validaterequest } from "@/auth"
import db from "@/lib/prisma";
import { postDataInclude } from "@/lib/type";

export async function GET(){
    try{
      const {user} = await validaterequest();
      if(!user) return Response.json({error:"Access Denied"}, {status:401})
      const posts = await db.post.findMany({
    include:postDataInclude, orderBy: {createdAt: 'desc'}});
    return Response.json(posts)
        

    }
    catch{
        return Response.json({error:"Internal Server Error"}, {status:500})
    }
}