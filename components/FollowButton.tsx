"use client"

import { FollowerInfo } from "@/lib/type";

interface FollowButtonProp{
    userId:string,
    initialState:FollowerInfo
}
import React from 'react'
import { Button } from "./ui/button";
import { useFollowerInfo } from "@/hooks/useFollowerInfo";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import post_feed_instanse from "@/lib/ky";
import { useToast } from "./ui/use-toast";

const FollowButton = ({userId, initialState}:FollowButtonProp) => {
  const {toast} = useToast()
    const {data} = useFollowerInfo(userId, initialState);
    const queryKey :QueryKey = ['follower-info', userId]
    const queryClient = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationFn: ()=> data.isFollowedByUser ? post_feed_instanse.delete('/api/users/'+userId): post_feed_instanse.post('/api/users/'+userId),
        onMutate: async()=>{
          await queryClient.cancelQueries({queryKey});
          const prevision_state = queryClient.getQueryData<FollowerInfo>(queryKey);
          queryClient.setQueryData<FollowerInfo>(queryKey,()=>({
            followers: (Number(prevision_state?.followers) || 0) + (prevision_state?.isFollowedByUser ? -1 : 1),
            isFollowedByUser: !prevision_state?.isFollowedByUser}));
            return {prevision_state}
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, context?.prevision_state);
            toast({
              title: 'somthing went wrong'
            })
            console.log(error)
        },


    })
  return (
    <Button disabled={isPending} onClick={()=>{mutate();}} variant={data.isFollowedByUser ? 'secondary': 'default'} className={isPending ? 'opacity-75': 'opacity-100'}>
        {data.isFollowedByUser ? 'Unfollow': 'follow'}
    </Button>
  )
}

export default FollowButton