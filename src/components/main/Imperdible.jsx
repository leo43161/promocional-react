import Carousel from '@/components/common/Carousel'
import { useGetImperdiblesQuery } from '@/redux/services/articulosService';
import { languages } from '@/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react'

export default function Imperdible() {
    const router = useRouter();
    // Estado para el ID del idioma seleccionado, inicia con el ID del primer idioma (Español)
    const [selectedLangId, setSelectedLangId] = useState(languages[0].code);
    // Consulta con RTK Query
    const { data: imperdibles, error, isLoading, isFetching } = useGetImperdiblesQuery(selectedLangId, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (!router.isReady) return;
        const { lang } = router.query;
        if (lang) {
            const found = languages.find(l => l.code === lang);
            if (found) {
                setSelectedLangId(found.code);
            }
        }
    }, [router.isReady, router.query.lang]);


    if (error) return <p>Hubo un error al cargar los guias</p>;

    const orderedImperdibles = useMemo(() => {
        // Si está cargando, obteniendo datos nuevos, o hubo un error, retorna array vacío
        if (isLoading || isFetching || error || !imperdibles) {
            console.log('isLoading, isFetching, error, imperdibles:', isLoading, isFetching, error, imperdibles);
            // Podrías diferenciar entre loading y error si quieres mostrar mensajes distintos
            return [];
        }
        // Ordenar imperdibles por array de arrays de 3 elementos
        const sliceItems = window.innerWidth >= 1024 ? 3 : 1;
        console.log(sliceItems);
        const groupedImperdibles = imperdibles.result.reduce((acc, item) => {
            const lastGroup = acc[acc.length - 1];
            if (lastGroup && lastGroup.length < sliceItems) {
                lastGroup.push(item);
            } else {
                acc.push([item]);
            }
            return acc;
        }, []);
        return groupedImperdibles;

    }, [imperdibles, isLoading, isFetching, error]);

    console.log('orderedImperdibles:', orderedImperdibles);
    return (
        <div className="w-full">
            <Carousel className='md:h-135' showIndicators={true} showArrows={true} autoPlay={false} interval={6000}>
                {isLoading || isFetching ? (
                    <div className="animate-pulse h-full w-full flex">
                        <div className='flex justify-around w-full'>
                            <div className="w-1/8 min-h-40 bg-gray-300 rounded"></div>
                            <div className="w-1/8 min-h-40 bg-gray-300 rounded"></div>
                            <div className="w-1/8 min-h-40 bg-gray-300 rounded"></div>
                        </div>
                    </div> // Loading indicator
                ) : error ? (
                    <p className='text-red-600'>Error al cargar menú</p> // Error message
                ) : orderedImperdibles.length > 0 ? (
                    orderedImperdibles.map((item, index) => (
                        <div className="h-full w-full flex" key={index}>
                            <div className='flex justify-around w-full'>
                                {item.map((imperdible, indexImperdible) => (
                                    <div className="md:w-3/11 w-13/16 relative" key={indexImperdible}>
                                        <img src={process.env.URL_IMG + (imperdible.imagenDestacado || imperdible.imagen)} className='object-cover h-full object-center' alt="" />
                                        <div className='absolute top-0 pt-4 ps-4 max-w-full'>
                                            <h3 className='md:text-[2.9em] text-[2.4em] text-sm/15 font-bold text-white text-shadow-lg line-clamp-4'>{imperdible.nombre}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No hay secciones disponibles.</p> // No items message
                )}
            </Carousel>
        </div>
    )
}
