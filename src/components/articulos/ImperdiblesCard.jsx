import React from 'react'

export default function ImperdiblesCard({ titulo, img }) {
    return (
        <div className='w-full flex items-end h-[150px] relative rounded overflow-hidden'>
            <img
                src={img}
                className='w-full h-full object-cover rounded'
                alt=""
            />
            <div
                className='absolute bottom-0 z-20 bg-gradient-to-t from-black/60 via-black/40 to-transparent w-full'
            >
                <h1 className='text-4xl text-white mb-3 ms-3 font-semibold'>{titulo}</h1>
            </div>
        </div>
    )
}
