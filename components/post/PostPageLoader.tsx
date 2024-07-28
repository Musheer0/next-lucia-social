import React from 'react'
import PostLoader from './PostLoader'

const PostPageLoader = () => {
  return (
    <div className='flex flex-col gap-2'>
        {Array.from([1,2,3,4,5,6,7,8,9].map((e,i)=>{
            return <PostLoader key={i}/>
        }))}
    </div>
  )
}

export default PostPageLoader