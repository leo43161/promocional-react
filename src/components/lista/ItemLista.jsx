import React from 'react'
import Button from '../common/Button'

export default function ItemLista({id, titulo, img, right = false}) {
    return (
        <div className={`flex items-stretch gap-12 ${right && "flex-row-reverse"}`}>
            <div className="w-3/6 h-[60vh]">
                <img src={`/images/main/${img}`} className='object-cover h-full shadow' alt="" />
            </div>
            <div className={`w-3/6 flex flex-col justify-center gap-10 ${right ? "items-end" : "items-start"}`}>
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
