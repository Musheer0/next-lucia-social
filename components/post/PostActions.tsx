"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Delete, DeleteIcon, Ellipsis } from 'lucide-react'
import { Button } from '../ui/button'
import DeletePostAlert from './DeletePostAlert'

const PostActions = ({id}:{id:string}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant={'ghost'}><Ellipsis className='text-muted-foreground w-4 '/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
        <DeletePostAlert id={id}/>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PostActions