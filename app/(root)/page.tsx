import SideBar from '@/components/home/SideBar'
import PostEditor from '@/components/post/editor/PostEditor'
import Post from '@/components/post/Post'
import db from '@/lib/prisma'
import { postDataInclude } from '@/lib/type'
import React from 'react'
import Fyp from './Fyp'

const page = async() => {
  return (
    <div className='flex  h-full w-full gap-1 py-1'>
 <div className="flex  h-full w-full flex-col gap-2 py-1">
 <PostEditor/>
 <Fyp/>
 </div>
 <div className="sidebar hidden lg:flex">
  <SideBar/>
 </div>
    </div>
  )
}

export default page