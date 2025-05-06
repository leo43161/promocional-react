import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ItemLista from '@/components/lista/ItemLista';
// Importa tus componentes de UI, layout, etc.
// import Layout from '../../components/Layout';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import ErrorMessage from '../../components/ErrorMessage';

export default function Lista() {
  
  return (
    <div> 
      <ParallaxContainer
        speed={0.2}
        minHeight="h-96 md:h-[58vh]"
        className=""
      >
        <div className="container mx-auto h-full text-white flex flex-col justify-end">
          <div className='w-11/12 mx-auto pt-5'>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Segunda Sección
            </h2>
          </div>
        </div>
      </ParallaxContainer>
      <div className='w-11/12 mx-auto pt-5 mb-10'>
        <div className='mb-5'>
          <Breadcrumb items={
            [{ label: "Prestadores activos", href: '/prestadores' }]
          }></Breadcrumb>
        </div>
      </div>

      <div className='mb-10 md:w-11/14 w-full mx-auto flex flex-col gap-15 px-5'>
        <ItemLista id="10" titulo="Conocé Tucumán en 2 días" img="guia.jpg"></ItemLista>
        <ItemLista id="10" titulo="Conocé Tucumán en 2 días" img="guia.jpg" right={true}></ItemLista>
        <ItemLista id="10" titulo="Conocé Tucumán en 2 días" img="guia.jpg"></ItemLista>
      </div>

    </div>
  );
}