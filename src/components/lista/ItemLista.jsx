import React from 'react'
import Button from '../common/Button'

export default function ItemLista({id, titulo, img, right = false}) {
    return (
        <div className={`flex flex-col md:flex-row items-stretch md:gap-12 gap-7 ${right && "md:flex-row-reverse"}`}>
            <div className="md:w-3/6 md:h-[60vh] h-[45vh] w-full">
                <img src={`/images/main/${img}`} className='object-cover h-full shadow' alt="" />
            </div>
            <div className={`md:w-3/6 flex flex-col justify-center md:gap-10 gap-7 ${right ? "md:items-end" : "md:items-start"}`}>
                <h2 className='text-3xl font-bold'>{titulo}</h2>
                <a href={`articulo?articulo=${id}`}>
                    <Button className='shadow-lg'>
                        Haz click aqui
                    </Button>
                </a>
            </div>
        </div>
    )
}
