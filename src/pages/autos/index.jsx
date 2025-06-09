import React from 'react';
import { useGetAutosQuery } from '@/redux/services/prestadoresService';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import CardAutos from '@/components/prestadores/CardAutos';
import Breadcrumb from '@/components/common/Breadcrumb';
import Buscador from '@/components/SearchPrest';

export default function Autos() {
    // Estado para controlar la paginación y búsqueda
    const itemsPerPage = 12;

    // Consulta con RTK Query
    const { data: guias, error, isLoading, isFetching } = useGetAutosQuery();

    if (error) return <p>Hubo un error al cargar los guias</p>;

    // Determinar si estamos en un estado de carga (inicial o actualización)
    const loading = isLoading || isFetching;
    return (
        <div>
            <section>
                <ParallaxContainer
                    speed={0.2}
                    minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
                    className=""
                    imageUrl='https://www.tucumanturismo.gob.ar/public/img/planviaje/alquilerautos.webp'
                >
                    <div className="container mx-auto h-full text-white flex flex-col justify-end">
                        <div className='w-11/12 mx-auto pt-5'>
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">
                                Autos
                            </h2>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <div className='w-11/12 mx-auto pt-5'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: "Prestadores activos", href: '/guias' }]
                    }></Breadcrumb>
                </div>
                <div>
                    <h1 className='text-center text-4xl font-bold mb-8 '>Conocé donde organizar tu viaje a Tucumán</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-10/11 mx-auto mb-4">
                    {loading ? (
                        // Mostrar skeletons mientras se están cargando datos
                        Array(itemsPerPage).fill(0).map((_, index) => (
                            <div key={`skeleton-${index}`}>
                                <CardAutos isLoading={true} />
                            </div>
                        ))
                    ) : (
                        // Mostrar datos reales cuando no está cargando
                        guias.result?.map((prestador) => (
                            <div key={prestador.id}>
                                <CardAutos isLoading={false} prestador={prestador} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}