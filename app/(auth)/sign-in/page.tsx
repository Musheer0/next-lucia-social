import SignInForm from '@/components/auth/Sign-in-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata ={
    title: 'login'
}
const page = () => {
  return (
 <>
       <SignInForm/>
 </>  )
}

export default page