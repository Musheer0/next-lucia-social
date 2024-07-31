"use client"
import { useFollowerInfo } from '@/hooks/useFollowerInfo'
import { FollowerInfo } from '@/lib/type'
import { cn, FormatNumber } from '@/lib/utils'
import React from 'react'
interface FollowerCountProps{
    userId:string,
    initialstate:FollowerInfo,
    className?:string
}
const FollowerCount = ({userId,initialstate,className}:FollowerCountProps) => {
    const {data} = useFollowerInfo(userId, initialstate);
  return (
   <span className={cn( className)}>
      {FormatNumber(Number(data.followers))}
   </span>
  )
}
 
export default FollowerCount