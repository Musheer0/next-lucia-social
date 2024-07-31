"use client"
import post_feed_instanse from "@/lib/ky";
import { FollowerInfo } from "@/lib/type";
import { useQuery } from "@tanstack/react-query";

export  const useFollowerInfo = (userId:String, intialState:FollowerInfo)=>{
    return useQuery({
        queryKey: ['follower-info', userId],
        queryFn:()=> post_feed_instanse.get('/api/users/'+userId).json<FollowerInfo>(),
        initialData: intialState,
        staleTime:Infinity
    });
    
}