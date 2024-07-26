import {PostData} from '@/lib/type'
import React from 'react'
import UserAvatar from '../UserAvatar'
import Link from 'next/link'
import formatTimeDifference from '@/lib/FormatDate'
interface PostProps{
    post:PostData
}
const Post = ({post}: PostProps) => {
  return (
    <article className='flex flex-col w-full p-4 gap-2 bg-card rounded-xl'>
        <div className="header flex items-center gap-1">
            <Link href={'/users/'+post.user.username}><UserAvatar url={post.user.avatar} size={40}/></Link>
            <div className="text flex flex-col">
            <Link href={'/users/'+post.user.username}>  <p className='font-semibold hover:underline cursor-pointer'>{post.user.username}</p></Link>
            <Link href={'/posts/'+post.id}>  <p className='text-sm text-zinc-400'>{formatTimeDifference(post?.createdAt) || post.createdAt.toLocaleDateString("en-Us", {month: 'long', year: 'numeric', day: 'numeric', minute: 'numeric', hour: '2-digit'})}</p></Link>
            </div>
        </div>
        <div className="body">
                <p className=''>{post.caption}</p>
            </div>
    </article>
  )
}

export default Post