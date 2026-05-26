import React, { useMemo } from 'react'
import Carousel from '../common/Carousel'
import CardEventoHomeSmall from './CardEventoHomeSmall'
import { useGetEventoDestacadosQuery } from '@/redux/services/eventosService'

export default function EventosHomeSmall() {
    const { data: eventos, isLoading, isFetching, error } = useGetEventoDestacadosQuery();
    const eventosDestacados = useMemo(() => {
        // Si está cargando, obteniendo datos nuevos, o hubo un error, retorna array vacío
        if (isLoading || isFetching || error || !eventos) {
            // Podrías diferenciar entre loading y error si quieres mostrar mensajes distintos
            return [];
        }
        // Ordenar eventos por array de arrays de 3 elementos
        const sliceItems = window.innerWidth >= 1024 ? 3 : 1;
        const groupedEventos = eventos.result.reduce((acc, item) => {
            const lastGroup = acc[acc.length - 1];
            if (lastGroup && lastGroup.length < sliceItems) {
                lastGroup.push(item);
            } else {
                acc.push([item]);
            }
            return acc;
        }, []);
        return groupedEventos;

    }, [eventos, isLoading, isFetching, error]);
    return (
        <div className='mb-0 relative bg-secondary'>
             <img className='absolute w-full h-full object-cover z-0 opacity-0 object-center top-0 left-0' src={process.env.URL_LOCAL_SERVER + "/images/header/textura-tucuman.png"} alt="" />
            <Carousel
                autoPlay={false}
                showIndicators={false}
                showArrows={true}
                interval={6000}
                colorArrow='#E9721F'
            >
                {eventosDestacados.map((group, indexGroup) => (
                    <div key={indexGroup} className="flex h-full w-full">
                        <div className='flex justify-around w-full'>
                            {group.map((evento, index) => (
                                <div className="md:w-full w-13/16 relative" key={index}>
                                    <a href={`${process.env.URL_LOCAL}/eventos/evento?id=${evento.id}`} key={evento.id}>
                                        <CardEventoHomeSmall evento={evento}></CardEventoHomeSmall>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}
