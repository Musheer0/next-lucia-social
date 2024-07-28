import React, { PropsWithChildren } from 'react'
import {useInView} from 'react-intersection-observer'
interface InfiniteScrollingContainerProps extends PropsWithChildren{
    onScrollEnd : ()=> void,
    className?: string
}
const InfiniteScrollingContainer = ({onScrollEnd, className, children}:InfiniteScrollingContainerProps) => {
  const {ref} = useInView({
    rootMargin: '400px',
    onChange(inview){
        if(inview) onScrollEnd();
    }
  })
    return (
    <div className={className}>
{children}
<div className="bottom-trigger" ref={ref}></div>
    </div>
  )
}

export default InfiniteScrollingContainer