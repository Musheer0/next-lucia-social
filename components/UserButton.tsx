"use client"
import React from 'react'
import UserAvatar from './UserAvatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  
  } from "@/components/ui/dropdown-menu"
import { useSession } from '@/app/(root)/SessionProvider'
import Link from 'next/link'
import { logout } from '@/app/(auth)/action'
import { Check, Computer, ComputerIcon, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useQueryClient } from '@tanstack/react-query'

const UserButton = () => {
    const {user} = useSession()
    const {theme, setTheme} =useTheme()
    const QueryClient = useQueryClient()
  return (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger className='rounded-full'>
             <UserAvatar url={user.avatarUrl} size={36}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            <Link href={'/user/'}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='flex items-center gap-1'><Monitor size={15}/>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                  <DropdownMenuItem  onClick={()=>{setTheme("system")}} className='flex items-center gap-1'><Monitor size={15}/>System {theme==='system'&& <Check size={14}/>}</DropdownMenuItem>
                  <DropdownMenuItem  onClick={()=>{setTheme("light")}}   className='flex items-center gap-1'><Sun size={15}/>light {theme==='light'&& <Check size={14}/>}</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>{setTheme("dark")}}  className='flex items-center gap-1'><Moon size={15}/>Dark   {theme==='dark'&& <Check size={14}/>}</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onClick={async()=>{
                await QueryClient.clear()
                await logout()
                }}>Logout</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default UserButton