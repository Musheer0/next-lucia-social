import SignUpForm from '@/components/auth/Sign-up-form'
import { Metadata } from 'next'
import React from 'react'

export const medatadata:Metadata= {
    title: 'sign-up'
}
const page = () => {
  return (
<>
<SignUpForm/>
</>
  )
}

export default page