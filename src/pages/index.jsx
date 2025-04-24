import Carousel from '@/components/common/Carousel'
import ResponsiveVideo from '@/components/common/ResponsiveVideo'
import Entumesa from '@/components/main/Entumesa'
import EventosHome from '@/components/main/EventosHome'
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
      <div className='md:w-11/13 w-full mx-auto'>
      <h1 className="text-4xl mb-7 text-center text-gray-500/70">EVENTOS DESTACADOS NUEVOS</h1>
        <div>
          <EventosHome></EventosHome>
        </div>
      </div>
    </div>
  )
}
