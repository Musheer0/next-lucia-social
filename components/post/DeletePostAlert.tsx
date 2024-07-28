"use client"
import React, { PropsWithChildren, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import DeletePostButton from './DeletePostButton'
import { useDeletePostMutation } from './mutations'
import LoadingButton from '../LoadingButton'
interface DeletePostProps extends PropsWithChildren{
id:string
}
const DeletePostAlert = ({children, id}:DeletePostProps) => {
    const [open,setIsopen]= useState(false)
    const mutaiton = useDeletePostMutation()

  return (
   <Dialog onOpenChange={()=>{setIsopen(!open)}} open={open}>
    <DialogTrigger>
    <Button variant={'ghost'} className='w-full'>
       Delete Post
       </Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Delete Post
            </DialogTitle>
            <DialogDescription>
                This will permanently delete this post
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <LoadingButton onClick={async()=>{
            await    mutaiton.mutate(id)
           }} loading={mutaiton.isPending} variant={'destructive'}>
    Delete Post
  </LoadingButton>
            <Button variant={'outline'} onClick={()=>{setIsopen(false)}}>Cancle</Button>
        </DialogFooter>
    </DialogContent>
   </Dialog>
  )
}

export default DeletePostAlert