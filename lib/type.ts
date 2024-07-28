import { Post, Prisma } from "@prisma/client";
export const UserDataSelect = {
  username:true,
  avatar: true,
  name: true,
  id: true
} satisfies Prisma.UserSelect
export const postDataInclude= {
    user:{
        select:UserDataSelect
      }
} satisfies Prisma.PostInclude
export type PostData = Prisma.PostGetPayload<{include: typeof postDataInclude}>

export interface PostsPage{
  posts: PostData[],
  nextCursor : string | null | undefined
}