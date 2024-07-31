import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
          <Loader2 className='size-5 animate-spin'/>
    </div>
  )
}

export default loading