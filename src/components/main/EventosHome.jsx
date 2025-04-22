import React from 'react'
import Carousel from '../common/Carousel'
import CardEventoHome from './CardEventoHome'

export default function EventosHome() {
    return (
        <div className='mb-40'>
            <Carousel
                autoPlay={false}
                showIndicators={false}
                showArrows={true}
                interval={6000}
            >
                <div className="h-full w-full flex">
                    <div className='flex justify-around w-full'>
                        <div className="w-3/13 relative">
                            <CardEventoHome></CardEventoHome>
                        </div>
                        <div className="w-3/13 relative">
                            <CardEventoHome></CardEventoHome>

                        </div>
                        <div className="w-3/13 relative">
                            <CardEventoHome></CardEventoHome>

                        </div>
                    </div>
                </div>
                <div className="h-full w-full flex">
                </div>
                <div className="h-full w-full flex">
                </div>
            </Carousel>
        </div>
    )
}
