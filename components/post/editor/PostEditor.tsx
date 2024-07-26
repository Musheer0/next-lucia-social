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
const PostEditor = () => {
   const [isLoading,setIsLoading] = useState(false)
   const {user}= useSession()
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
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
        setIsLoading(true)

        const post = await CreatePost(input);
        console.log(post);
        editor?.commands.clearContent();
        setIsLoading(false);
        toast({
            title: 'posted successfully!'
        })
    }
  return (
    <div className='flex flex-col items-end  bg-card rounded-lg h-fit p-4 gap-2 shadow-md w-full'>
        <div className="text-area flex w-full items-start gap-2">
            <UserAvatar url={user.avatarUrl} size={44}/>
            <EditorContent   editor={editor} className='bg-background max-h-[240px] overflow-auto flex-1 p-2 rounded-xl'/>
        </div>
        <LoadingButton loading={isLoading} disabled={isLoading} onClick={handleSubmit}>
            Post
        </LoadingButton>
    </div>
  )
}

export default PostEditor