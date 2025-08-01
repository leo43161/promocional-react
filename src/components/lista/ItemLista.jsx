import React from 'react'
import Button from '../common/Button'
import { generateSlug, languages } from '@/utils';


export default function ItemLista({ articulo, right = false }) {
    const imageBaseUrl = process.env.URL_IMG || '';
    const { idArticulo, nombre, imagen, imagenMovil, copete, idioma } = articulo;
    const idiomaCode = parseInt(idioma) !== 1 && languages.find(lang => lang.id === parseInt(idioma))?.code;
    return (
        <div key={idArticulo} className={`flex flex-col md:flex-row items-stretch md:gap-12 gap-7 ${right && "md:flex-row-reverse"}`}>
            <div className="md:w-6/8 md:h-100 h-[45vh] w-full">
                <a className='cursor-pointer' href={`${process.env.URL_LOCAL}/articulos/articulo/${idArticulo}/${generateSlug(nombre)}${idiomaCode ? `?lang=${idiomaCode}` : ''}`}>
                    <img src={`${imageBaseUrl}${imagen}`} className='object-cover h-full shadow hidden md:block w-full object-center' alt="" />

                    <img src={`${imageBaseUrl}${imagenMovil ? imagenMovil : imagen}`} className='object-cover h-full shadow md:hidden w-full object-center' alt="" />
                </a>
            </div>
            <div className={`md:w-4/8 flex flex-col justify-center md:gap-8 gap-7 ${right ? "md:items-end" : "md:items-start"}`}>
                <h2 className={`text-4xl font-bold ${right && "md:text-right"}`}>{nombre}</h2>
                <p className={`${right ? "md:text-right" : ""} text-2xl`}>{copete}</p>
                <a className='cursor-pointer' href={`${process.env.URL_LOCAL}/articulos/articulo/${idArticulo}/${generateSlug(nombre)}${idiomaCode ? `?lang=${idiomaCode}` : ''}`}>
                    <Button className='shadow-lg cursor-pointer'>
                        Haz click aqui
                    </Button>
                </a>
            </div>
        </div>
    )
}
