import { FollowerInfo } from "@/lib/type";

interface FollowButtonProp{
    userId:string,
    initialState:FollowerInfo
}
import React from 'react'
import { Button } from "./ui/button";

const FollowButton = ({userId, initialState}:FollowButtonProp) => {
    
  return (
    <Button variant={initialState.isFollowedByUser ? 'secondary': 'default'}>
        {initialState.isFollowedByUser ? 'Unfollow': 'follow'}
    </Button>
  )
}

export default FollowButton