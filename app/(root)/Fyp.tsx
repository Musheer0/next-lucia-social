"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Post from '@/components/post/Post';
import { PostData } from '@/lib/type';
import { Loader2 } from 'lucide-react';
import post_feed_instanse from '@/lib/ky';

const Fyp = () => {
  const { data, error, isLoading, status } = useQuery<PostData[]>({
    queryKey: ['fyp', 'get-posts'],
    queryFn:post_feed_instanse.get('/api/posts/fyp').json<PostData[]>
  });

  if (isLoading) return <div><Loader2 className='animate-spin' /></div>;
  if (error) return <p>Something went wrong error: {error.message}</p>;

  return (
    <div className="body flex flex-col gap-2">

      {data?.map((e) => (
        <Post post={e} key={e.id} />
      ))}
    </div>
  );
}

export default Fyp;
