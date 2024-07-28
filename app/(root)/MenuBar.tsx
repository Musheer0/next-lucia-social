import Link from 'next/link'
import React from 'react'
import { Bell, Bookmark, Home, Mail } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
type Route ={
    path:string,
    name:string,
    icon:ReactNode
}
 const PublicRoutes:Route[] = [
    {
        path: '/',
        name: 'Home',
        icon: <Home />
    },
    {
        path: '/notifications',  // Corrected typo here
        name: 'Notifications',
        icon: <Bell />
    },
    {
        path: '/messages',
        name: 'Messages',
        icon: <Mail />
    },
    {
        path: '/bookmarks',
        name: 'Bookmarks',
        icon: <Bookmark />
    },
];

const MenuBar = ({className}:{className:string}) => {
  return (
 <div  className={cn('w-fit border-2 bg-card p-2',className)}>
    {PublicRoutes.map((e,i)=>{
        return <Link href={e.path} title={e.name}><div className='flex   items-center gap-1 px-4  hover:bg-zinc-950/15  py-2 rounded-xl' key={i}>{e.icon} <span className='text-sm hidden lg:flex'>{e.name}</span></div></Link>
    })}
 </div>
  )
}

export default MenuBar