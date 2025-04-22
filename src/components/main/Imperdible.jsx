import Carousel from '@/components/common/Carousel'
import React from 'react'

export default function Imperdible() {
    return (
        <div className="w-full">
            <Carousel showIndicators={true} showArrows={true} autoPlay={false} interval={6000}>
                <div className="h-full w-full flex">
                    <div className='flex justify-around w-full'>
                        <div className="w-3/12 relative">
                            <img src={process.env.URL_IMG + "destacadayungas_btizph0i_26-06-2024.jpg"} className='w-auto h-full' alt="" />
                            <div className='absolute top-0 pt-4 ps-4'>
                                <h3 className='text-[2.9em] text-sm/15 font-bold text-white text-shadow-lg'>Tafi del valle</h3>
                            </div>
                        </div>
                        <div className="w-3/12 relative">
                            <img src={process.env.URL_IMG + "destacadayungas_btizph0i_26-06-2024.jpg"} className='w-auto h-full' alt="" />
                            <div className='absolute top-0 pt-4 ps-4'>
                                <h3 className='text-[2.9em] text-sm/15 font-bold text-white text-shadow-lg'>El Mollar</h3>
                            </div>
                        </div>
                        <div className="w-3/12 relative">
                            <img src={process.env.URL_IMG + "destacadayungas_btizph0i_26-06-2024.jpg"} className='w-auto h-full' alt="" />
                            <div className='absolute top-0 pt-4 ps-4'>
                                <h3 className='text-[2.9em] text-sm/15 font-bold text-white text-shadow-lg'>El Mollar</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full flex">
                    <div className='flex justify-around w-full'>
                        <div className="w-3/12 relative">
                            <img src={process.env.URL_IMG + "destacadayungas_btizph0i_26-06-2024.jpg"} className='w-auto h-full' alt="" />
                            <div className='absolute top-0 pt-4 ps-4'>
                                <h3 className='text-[2.9em] text-sm/15 font-bold text-white text-shadow-lg'>Tafi del valle</h3>
                            </div>
                        </div>
                        <div className="w-3/12 relative">
                            <img src={process.env.URL_IMG + "destacadayungas_btizph0i_26-06-2024.jpg"} className='w-auto h-full' alt="" />
                            <div className='absolute top-0 pt-4 ps-4'>
                                <h3 className='text-[2.9em] text-sm/15 font-bold text-white text-shadow-lg'>El Mollar</h3>
                            </div>
                        </div>
                        <div className="w-3/12 relative">
                            <img src={process.env.URL_IMG + "destacadayungas_btizph0i_26-06-2024.jpg"} className='w-auto h-full' alt="" />
                            <div className='absolute top-0 pt-4 ps-4'>
                                <h3 className='text-[2.9em] text-sm/15 font-bold text-white text-shadow-lg'>El Mollar</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}
