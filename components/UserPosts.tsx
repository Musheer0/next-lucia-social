"use client"
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Post from '@/components/post/Post';
import {PostsPage } from '@/lib/type';
import post_feed_instanse from '@/lib/ky';
import InfiniteScrollingContainer from '@/components/InfiniteScrollingContainer';
import PostPageLoader from '@/components/post/PostPageLoader';
import { useSession } from '@/app/(root)/SessionProvider';

const UserPosts = ({id}:{id:string}) => {
  const session = useSession()
  const { data, error, isLoading, status, fetchNextPage, isFetchingNextPage, hasNextPage  } = useInfiniteQuery({
    queryKey: ['user-posts', 'get-posts', id],
    queryFn:({pageParam})=>post_feed_instanse.get('/api/users/'+id+'/posts', 
      pageParam? {
         searchParams:
        {
          cursor: pageParam

        }
      }:{}).json<PostsPage>(),
    initialPageParam: null as string |null,
    getNextPageParam:(lastpage) => lastpage.nextCursor
  });

  if (isLoading) return<PostPageLoader/>;
  if (error) return <p className='text-red-600 '>Something went wrong error: {error.message}</p>;

  return (
    <div className="body flex flex-col gap-2">
   <InfiniteScrollingContainer onScrollEnd={()=>{
     if(hasNextPage && !isFetchingNextPage) fetchNextPage();
     else return;
    }} className="body flex flex-col gap-2" >
   {(data?.pages.flatMap((page)=>page.posts)|| []).map((e) => (
        <Post post={e} key={e.id} showactions={e.userId===session.user.id}/>
      ))}
   </InfiniteScrollingContainer>
      {      isFetchingNextPage && <PostPageLoader/>}

    </div>

  );
}

export default UserPosts;
