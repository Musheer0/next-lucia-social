import { Post, Prisma } from "@prisma/client";
export const UserDataSelect = (session:string)=>{
 return {
    username:true,
    avatar: true,
    name: true,
    id: true,
    bio: true,
    followers:{
      where: {
          followerId: session
      },
      select: {
          followerId: true
      },
      
  },
  _count:{
    select:{
      posts: true
    }
  },
  follower_count: true,
  following_count: true,
  createdAt:true
  } satisfies Prisma.UserSelect
}
export type UserDataProfile = Prisma.UserGetPayload<{
  select: ReturnType<typeof UserDataSelect>
}>
export const postDataInclude= {
    user:{
        select:{
          username:true,
          avatar: true,
          name: true,
          id: true
        } 
      }
} satisfies Prisma.PostInclude
export type PostData = Prisma.PostGetPayload<{include: typeof postDataInclude}>

export interface PostsPage{
  posts: PostData[],
  nextCursor : string | null | undefined
}
export interface FollowerInfo {
  followers :number| BigInt,
  isFollowedByUser:boolean
}