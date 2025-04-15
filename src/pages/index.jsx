import ResponsiveVideo from '@/components/common/ResponsiveVideo'
import Planifica from '@/components/main/planifica'
import React from 'react'

export default function index() {
  return (
    <div>
      <div className='mb-10'>
        <ResponsiveVideo />
      </div>
      <div className='md:w-11/13 w-full mx-auto'>
        <Planifica></Planifica>
      </div>
    </div>
  )
}
