import Carousel from '@/components/common/Carousel'
import ResponsiveVideo from '@/components/common/ResponsiveVideo'
import Entumesa from '@/components/main/Entumesa'
import Imperdible from '@/components/main/Imperdible'
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
      <div className='mb-10'>
        <Entumesa></Entumesa>
      </div>
      <div className='md:w-11/13 w-full mx-auto mb-10'>
        <h1 className="text-4xl mb-7 text-center text-gray-500/70">IMPERDIBLES</h1>
        <Imperdible></Imperdible>
      </div>
      <div className='md:w-11/13 w-full mx-auto h-60 border border-amber-500'>
        <h1>Titulo de ejemplo</h1>
      </div>
    </div>
  )
}
