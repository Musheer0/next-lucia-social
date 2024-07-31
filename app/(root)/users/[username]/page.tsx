interface PageProps{
    params: {username:string}
}
import { validaterequest } from '@/auth';
import FollowButton from '@/components/FollowButton';
import FollowerCount from '@/components/FollowerCount';
import SideBar from '@/components/home/SideBar';
import LinkiFy from '@/components/LinkiFy';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/UserAvatar';
import UserPosts from '@/components/UserPosts';
import db from '@/lib/prisma';
import { FollowerInfo, UserDataProfile, UserDataSelect } from '@/lib/type';
import { FormatNumber } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache} from 'react'

const getUser = async (username:string, loggedInUserId:string)=>{
  const user = await db.user.findFirst({
    where: {
        username: username
    },
    select: UserDataSelect(loggedInUserId)
  });
  if(!user) notFound();
  return user
  
};
export async function GenerateMetaData(username:string):Promise<Metadata>{
 const loggedInuser = await validaterequest();
 if(!loggedInuser.user) return {}
 const user = await getUser(username, loggedInuser.user.id)
 return {
    title: `${user.name}`
 }
}
const Page = async({params:{username}}:PageProps) => {
 const {user:loggedInuser} = await validaterequest();
 if(!loggedInuser) return <p>plase login to view this page</p>
 const user = await getUser(username, loggedInuser.id)
 return <div className='flex h-full  items-start gap-1 w-full'>
  <div className="body flex flex-col gap-2 w-full">
  <UserProfile user={user} sessionId={loggedInuser.id}/>
  <UserPosts id={user.id}/>
  </div>
   <div className="side-bar  hidden lg:flex">
   <SideBar/>
   </div>
 </div>
 
}
interface UserProfile{
    user :UserDataProfile,
    sessionId:string
}
async function UserProfile({user,sessionId}:UserProfile){
    const Followerinfo:FollowerInfo={
        followers:user.follower_count,
        isFollowedByUser: user.followers.some((e)=> e.followerId===sessionId)
    }
    return <>
    
    <div className='h-fit w-full p-3 rounded-2xl bg-card  object-cover flex flex-col gap-2'>
<UserAvatar url={user.avatar} size={200}  className='mx-auto'/>
  <div className="info flex flex-col w-full gap-1">
    <div className="username flex flex-col items-center justify-center gap-0">
        <p className='text-2xl font-semibold'>{user.name}</p>
        <p className='text-muted-foreground'>@{user.username}</p>
        <p className='text-muted-foreground text-sm'>Member since: {user.createdAt.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
        <LinkiFy>
        <p  className=' text-sm'>{user.bio|| ''}</p>
        </LinkiFy>
    </div>
    <div className="meta-data max-w-[300px] mx-auto flex justify-between">
        <div className='flex flex-col  p-2 px-4  cursor-pointer rounded-lg items-center'>
            <span className=''>Posts</span>
            <span className='text-sm font-bold'>{user._count.posts}</span>
        </div>
        <div className='flex flex-col  p-2 px-4  cursor-pointer rounded-lg items-center'>
            <span className=''>Followers</span>
            <FollowerCount className='text-sm font-bold' userId={user.id}  initialstate={Followerinfo}/>
        </div>
        <div className='flex flex-col  p-2 px-4  cursor-pointer rounded-lg items-center'>
            <span className=''>Following</span>
            <span className='text-sm font-bold'>{user.following_count}</span>
        </div>
    </div>
   {user.id===sessionId ? <Button className='w-full' variant={'secondary'}>Edit Profile</Button>:  <FollowButton userId={user.id} initialState={Followerinfo}/>}
  </div>
    </div>
    </>
}
export default Page