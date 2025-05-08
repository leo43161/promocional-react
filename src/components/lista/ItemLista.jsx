import React from 'react'
import Button from '../common/Button'

export default function ItemLista({ articulo, right = false }) {
    const imageBaseUrl = process.env.URL_IMG || '';
    const { idArticulo, nombre, imagen, imagenMovil, copete } = articulo;
    return (
        <div className={`flex flex-col md:flex-row items-stretch md:gap-12 gap-7 ${right && "md:flex-row-reverse"}`}>
            <div className="md:w-3/6 md:h-[60vh] h-[45vh] w-full">
                <img src={`${imageBaseUrl}${imagen}`} className='object-cover h-full shadow hidden md:block' alt="" />

                <img src={`${imageBaseUrl}${imagenMovil ? imagenMovil : imagen}`} className='object-cover h-full shadow md:hidden' alt="" />
            </div>
            <div className={`md:w-3/6 flex flex-col justify-center md:gap-8 gap-7 ${right ? "md:items-end" : "md:items-start"}`}>
                <h2 className='text-3xl font-bold'>{nombre}</h2>
                <p className={`${right && "md:text-right"}`}>{copete}</p>
                <a className='cursor-pointer' href={`/articulos/articulo/${idArticulo}`}>
                    <Button className='shadow-lg'>
                        Haz click aqui
                    </Button>
                </a>
            </div>
        </div>
    )
}
