import { validaterequest } from "@/auth"
import db from "@/lib/prisma";
import { FollowerInfo } from "@/lib/type";

export async function GET(req:Request,
     {params:{id}}
     :
     {params:{id:string}}
    )
    {
      try{
             const {user:LoggedInUser} = await validaterequest();
             if(!LoggedInUser) return Response.json({error: 'Access Denied'},{status:401})
            const user = await db.user.findUnique({
        where: {
            id
        }, select: {
            followers:{
                where: {
                    followerId: LoggedInUser.id
                },
                select: {
                    followerId: true
                }
            },
            follower_count: true
        }});
        if(!user) return Response.json({error: 'User Not found'}, {status:404})
        const data:FollowerInfo={
    followers:user.follower_count,
    isFollowedByUser: !!user.followers.length 
}
      }
      catch{
        return Response.json({error: 'Internal Server Error'}, {status:500})
      }
    }
export async function POST(req:Request,
    {params:{id}}
    :
    {params:{id:string}}){
        try{
            const {user:LoggedInUser} = await validaterequest();
            if(!LoggedInUser) return Response.json({error: 'Access Denied'},{status:401})
         const entry =    await  db.follow.upsert({
           where:{
               followerId_followingId:{
                followerId: id,
                followingId: LoggedInUser.id
               }
           },
        create:{
            followerId:id,
            followingId: LoggedInUser.id
        },  
        update:{}
        });
        if(entry.followingId){
            await db.user.update({where: {id}, data: {
                follower_count: {
                    increment: 1
                }
            }})
            await db.user.update({where: {id:LoggedInUser.id}, data: {
                following_count: {
                   increment: 1
                }
            }})
        }
        return new  Response();
        }
        catch{
            return Response.json({error: 'Internal Server Error'}, {status:500})

        }
    }
export async function DELETE(req:Request,
    {params:{id}}
    :
    {params:{id:string}}){
        try{
            const {user:LoggedInUser} = await validaterequest();
            if(!LoggedInUser) return Response.json({error: 'Access Denied'},{status:401})
            await  db.follow.deleteMany({
        where:{
            followerId: LoggedInUser.id,
            followingId: id 
        }});
        await db.user.update({where: {id}, data: {
            follower_count: {
                decrement: 1
            }
        }})
        await db.user.update({where: {id:LoggedInUser.id}, data: {
            following_count: {
                decrement: 1
            }
        }})
        return new  Response();
        }
        catch{
            return Response.json({error: 'Internal Server Error'}, {status:500})

        }
    }