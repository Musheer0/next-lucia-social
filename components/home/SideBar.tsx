import { validaterequest } from '@/auth'
import React, { Suspense } from 'react'
import { UserDataSelect } from "@/lib/type";
import db from '@/lib/prisma';
import UserAvatar from '../UserAvatar';
import { Button } from '../ui/button';
import { unstable_cache } from 'next/cache';
import { FormatNumber } from '@/lib/utils';
import { count } from 'console';
import Link from 'next/link';
import FollowButton from '../FollowButton';

const SideBar = () => {
  return (
    <div className='bg-card p-3 sticky top-0 rounded-lg h-fit'>
        <Suspense fallback="Loading">
            <WhoToFollow/>
            <hr/>
            <TrendingTopics/>
        </Suspense>
    </div>
  )
}

export default SideBar

async function WhoToFollow(){
    const {user} = await validaterequest();
    if(!user ) return ;
    const users = await db.user.findMany({
        where: {
            NOT: {
                id : user.id,
             followers: {
                none: {
                    followerId: user.id
                }
             }
            }
        },
        select:UserDataSelect(user.id),
        take:6
    })
    return (
        <div className='min-w-[300px]'>
            <h1 className='font-bold whitespace-nowrap '>Who to follow</h1>
              {users.map((e)=>{
                return <div key={e.id} className='flex py-2 hover:bg-zinc-500/5 px-3 rounded-lg justify-between min-w-[300px] max-w-[500px] gap-3 items-center'>
                    <div className="left">
                        <UserAvatar url={e.avatar} size={45}/>
                    </div>
                    <div className="middle flex flex-1  items-start flex-col">
                        <p className='text-lg font-semibold leading-none line-clamp-1 break-all'>{e.username}</p>
                        <p className='text-muted-foreground text-sm leading-none'>{e.name}</p>
                    </div>
                   <FollowButton userId={user.id} initialState={{
                    followers: e.follower_count,
                    isFollowedByUser: e.followers.some((id)=>id.followerId===user.id)
                   }}/>
                </div>
              })}
        </div>
    )
}

const getTrendingLists = unstable_cache(
    async () => {
        const topics = await db.$queryRaw<{hashtag: string, count: bigint}[]>`
            SELECT LOWER(unnest(regexp_matches(caption, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM post
            GROUP BY hashtag
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;
        return topics.map((row) => ({
            hashtag: row.hashtag,
            count: Number(row.count)
        }));
    }, 
    ["trending_hashtags"], 
    {
        revalidate: 3 * 60 * 60 // Revalidate cache every 3 hours
    }
);
async function TrendingTopics(){
    const topics = await getTrendingLists();
    return ( 
        <div className='flex flex-col gap-2 py-2'>
            <h1 className='font-semibold'>Trending topics</h1>
            {topics.map((e, i)=>{
                return <Link href={'/trending/'+e.hashtag}><div key={i} className='text-sm text-muted-foreground'><p className='text-md text-white hover:underline'>{e.hashtag}</p><p>{FormatNumber(e.count)} {e.count===1 ? 'post':'posts'}</p></div></Link>
            })}
        </div>
    )
}