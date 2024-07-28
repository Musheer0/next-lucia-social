import React from 'react'
import UserAvatar from '../UserAvatar'
import { Skeleton } from '../ui/skeleton'

const PostLoader = () => {
  return (
    <div className='w-full bg-card rounded-lg flex flex-col gap-2 p-3'>
        <div className="header flex items-center gap-2">
            <Skeleton className='w-[40px] h-[40px] rounded-full'/>
            <div className="text flex flex-col gap-1">
                <Skeleton className='w-20 h-2'/>
                <Skeleton className='w-[120px] h-2'/>
            </div>
        </div>
        <div className="content">
            <Skeleton className='w-full h-20 '/>
        </div>
    </div>
  )
}

export default PostLoader