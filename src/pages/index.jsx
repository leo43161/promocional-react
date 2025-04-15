import ResponsiveVideo from '@/components/common/ResponsiveVideo'
import Planifica from '@/components/main/planifica'
import React from 'react'

export default function index() {
  return (
    <div>
      <div className='mb-6'>
        <ResponsiveVideo />
      </div>
      <div className='w-11/12 mx-auto'>
        <Planifica></Planifica>
      </div>
    </div>
  )
}
