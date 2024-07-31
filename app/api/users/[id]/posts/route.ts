import { validaterequest } from "@/auth";
import db from "@/lib/prisma";
import { postDataInclude, PostsPage } from "@/lib/type";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest,
    {params:{id}}
    :
    {params:{id:string}}){
        const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
        const PageSize = 10;
            try{
              const {user} = await validaterequest();
              if(!user) return Response.json({error:"Access Denied"}, {status:401})
              const posts = await db.post.findMany({
            include:postDataInclude,
             orderBy: {createdAt: 'desc'},
            take: PageSize+1,
            cursor: cursor? {id: cursor} : undefined,
            where: {
                userId: id
            }
            });
            const nextCursor = posts.length>PageSize ? posts[PageSize].id : null;
            const data:PostsPage = {
              posts: posts.slice(0,PageSize),
              nextCursor
            } 
            return Response.json(data)
                
        
            }
            catch{
                return Response.json({error:"Internal Server Error"}, {status:500})
            }
    }