import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
interface Avatar{
    url :string|null|undefined,
    size: number | null,
    className?:string
}
const UserAvatar = ({url, size,className}:Avatar) => {
  return (
    <Image src={url|| '/assets/avatar.png'} className= {cn('flex-shrink-0 rounded-full', className )} alt='profile' width={size|| 48} height={size||48}/>
  )
}

export default UserAvatar