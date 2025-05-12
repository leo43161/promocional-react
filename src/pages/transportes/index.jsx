import React, { useState, useEffect } from 'react';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import BuscadorTransporte from '@/components/transportes/DestinosModule';
export default function Transportes() {
    return (
        <div>
            <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[58vh]"
                className=""
                imageUrl='https://www.tucumanturismo.gob.ar/public/img/planviaje/1920x650-Planifica-Transporte-Desktop.jpg'
            >
                <div className="container mx-auto h-full text-white flex flex-col justify-end">
                    <div className='w-11/12 mx-auto pt-5'>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Transportes
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

            <div className='mb-10 md:w-12/14 w-full mx-auto px-2'>
                <BuscadorTransporte></BuscadorTransporte>
            </div>
        </div>
    )
}
