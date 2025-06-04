import Carousel from '@/components/common/Carousel'
import ResponsiveVideo from '@/components/common/ResponsiveVideo'
import BlogHome from '@/components/main/BlogHome'
import Entumesa from '@/components/main/Entumesa'
import EventosHome from '@/components/main/EventosHome'
import Imperdible from '@/components/main/Imperdible'
import Planifica from '@/components/main/planifica'
import Rutas from '@/components/main/Rutas'
import React from 'react'

export default function index() {

  return (
    <div>
      <div className='mb-10'>
        <ResponsiveVideo />
      </div>
      <div className='md:w-11/13 lg:w-10/13 w-full mx-auto md:mb-30 mb-15'>
        <Planifica></Planifica>
      </div>
      <div className='mb-20'>
        <Entumesa></Entumesa>
      </div>
      <div className='md:w-11/13 lg:w-10/13 w-full mx-auto mb-20'>
        <h1 className="text-4xl mb-12 text-center text-gray-500/70">IMPERDIBLES</h1>
        <Imperdible></Imperdible>
      </div>
      <div className='mb-10'>
        <BlogHome></BlogHome>
      </div>
      <div className='mb-10'>
        <Rutas></Rutas>
      </div>
      <div className='mb-20'>
        <a target='_blank' href='https://teatromercedessosa.com/'>
          <img src={`${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/images/banners/TeatroMercedesSosa-desktop.jpg`} className='w-full' alt="" />
        </a>
      </div>
      <div className='md:w-11/13 w-full mx-auto'>
        <h1 className="text-4xl mb-7 text-center text-gray-500/70">EVENTOS DESTACADOS</h1>
        <div>
          <EventosHome></EventosHome>
        </div>
      </div>
    </div>
  )
}
