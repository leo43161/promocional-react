import React, { useMemo } from 'react'
import Carousel from '../common/Carousel'
import CardEventoHome from './CardEventoHome'
import { useGetEventoDestacadosQuery } from '@/redux/services/eventosService'

export default function EventosHome() {
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
        <div className='mb-10'>
            <Carousel
                autoPlay={false}
                showIndicators={false}
                showArrows={true}
                interval={6000}
            >
                {eventosDestacados.map((group, indexGroup) => (
                    <div key={indexGroup} className="flex h-full w-full">
                        <div className='flex justify-around w-full'>
                            {group.map((evento, index) => (
                                <div className="md:w-4/15 w-13/16 relative" key={index}>
                                    <a href={`${process.env.URL_LOCAL}/eventos/evento?id=${evento.id}`} key={evento.id}>
                                        <CardEventoHome evento={evento}></CardEventoHome>
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
