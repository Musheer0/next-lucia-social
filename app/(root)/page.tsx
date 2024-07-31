import SideBar from '@/components/home/SideBar'
import PostEditor from '@/components/post/editor/PostEditor'
import Post from '@/components/post/Post'
import db from '@/lib/prisma'
import { postDataInclude } from '@/lib/type'
import React from 'react'
import Fyp from './Fyp'
import {Tabs, TabsList, TabsContent,TabsTrigger} from '@/components/ui/tabs'
import Following from './FollowingFeed'
const page = async() => {
  return (
    <div className='flex   w-full gap-1 py-1'>
 <div className="flex  w-full flex-col gap-2 py-1">
 <PostEditor/>
 <Tabs defaultValue='fyp'>
  <TabsList className='w-full flex justify-between bg-card'>
    <TabsTrigger value='fyp' className='flex-1'>For you</TabsTrigger>
    <TabsTrigger value='following' className='flex-1'>Following</TabsTrigger>
  </TabsList>
  <TabsContent value='fyp'><Fyp/></TabsContent>
  <TabsContent value='following'><Following/></TabsContent>
 </Tabs>
 </div>
 <div className="sidebar hidden lg:flex">
  <SideBar/>
 </div>
    </div>
  )
}

export default page