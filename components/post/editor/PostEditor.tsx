"use client"
import React, { useState } from 'react'
import {EditorContent, useEditor} from'@tiptap/react'
import{StarterKit} from '@tiptap/starter-kit'
import {Placeholder} from '@tiptap/extension-placeholder'
import { CreatePost } from './action'
import LoadingButton from '../../LoadingButton'
import { useSession } from '@/app/(root)/SessionProvider'
import UserAvatar from '../../UserAvatar'
import './style.css'
import { useToast } from '@/components/ui/use-toast'
import { useSubmitPostMutation } from '../../../app/(root)/mutation'
const PostEditor = () => {
   const {user}= useSession()
   const mutation = useSubmitPostMutation();
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
            }),
            Placeholder.configure({
                placeholder: 'enter something hot....'
            })
        ],
        immediatelyRender: false
    })
    const {toast} = useToast()
    const input = editor?.getText({
        blockSeparator: '\n'
    })||""
    const handleSubmit = async()=>{
        if(input.trim()==="") return;
      mutation.mutate(input,{
            
        onSuccess:()=>{
            
            toast({
                title: 'posted successfully!',
            })
        },
        
    })
        editor?.commands.clearContent();

    }
  return (
    <div className='flex flex-col items-end  bg-card rounded-lg h-fit p-4 gap-2 shadow-md w-full'>
        <div className="text-area flex w-full items-start gap-2">
            <UserAvatar url={user.avatarUrl} size={44}/>
            <EditorContent   editor={editor} className='bg-background max-h-[240px] overflow-auto flex-1 p-2 rounded-xl'/>
        </div>
        <LoadingButton loading={mutation.isPending} disabled={mutation.isPending} onClick={handleSubmit}>
            Post
        </LoadingButton>
    </div>
  )
}

export default PostEditor