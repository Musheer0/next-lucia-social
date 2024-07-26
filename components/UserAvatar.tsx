import Image from 'next/image'
import React from 'react'
interface Avatar{
    url :string|null|undefined,
    size: number | null,

}
const UserAvatar = ({url, size}:Avatar) => {
  return (
    <Image src={url|| '/assets/avatar.png'} className= 'flex-shrink-0 rounded-full' alt='profile' width={size|| 48} height={size||48}/>
  )
}

export default UserAvatar