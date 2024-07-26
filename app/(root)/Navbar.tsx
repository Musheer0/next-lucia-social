import UserButton from '@/components/UserButton'
import React from 'react'

const Navbar = () => {

  return (
    <div className='flex items-center justify-between sticky top-0 bg-transparent backdrop-blur-sm  shadow-sm  px-4 h-[4rem] w-full'>
      <h1 className='font-bold capitalize text-primary text-md'>next-social</h1>
      search
      <UserButton/>
    </div>
  )
}

export default Navbar