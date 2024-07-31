import {PostData} from '@/lib/type'
import React from 'react'
import UserAvatar from '../UserAvatar'
import Link from 'next/link'
import formatTimeDifference from '@/lib/FormatDate'
import { Button } from '../ui/button'
import { Ellipsis } from 'lucide-react'
import PostActions from './PostActions'
import LinkiFy from '../LinkiFy'

interface PostProps{
    post:PostData,
    showactions: boolean
}
const Post = ({post,showactions}: PostProps) => {
  return (
    <article className='flex flex-col w-full p-4 gap-2 bg-card rounded-xl'>
        <div className="header flex items-center justify-between ">
       <div className="left flex items-center gap-1">
       <Link href={'/users/'+post.user.username}><UserAvatar url={post.user.avatar} size={40}/></Link>
            <div className="text flex flex-col">
            <Link href={'/users/'+post.user.username}>  <p className='font-semibold hover:underline cursor-pointer'>{post.user.username}</p></Link>
            <Link href={'/posts/'+post.id}>  <p className='text-sm text-zinc-400'>{formatTimeDifference(post?.createdAt) || post.createdAt.toLocaleDateString("en-Us", {month: 'long', year: 'numeric', day: 'numeric', minute: 'numeric', hour: '2-digit'})}</p></Link>
            </div>
       </div>
          {showactions&&   <div className="action">
         <PostActions id={post.id}/>
            </div>}
        </div>
        <div className="body">
               <LinkiFy>
               <p className='whitespace-pre-wrap'>{post.caption}</p>
               </LinkiFy>
            </div>
    </article>
  )
}

export default Post