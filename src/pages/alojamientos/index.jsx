import React, { useState, useEffect } from 'react';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import CardPrestadores from '@/components/prestadores/CardPrestadores';
import Breadcrumb from '@/components/common/Breadcrumb';
import Paginado from '@/components/common/Paginado';
import Filters from '@/components/alojamientos/Filters';
import { useGetAlojamientosQuery } from '@/redux/services/alojamientosService';
import CardAlojamiento from '@/components/alojamientos/CardAlojamiento';

export default function Alojamientos() {
    // Estado para controlar la paginación y búsqueda
    const [filter, setFilter] = useState({ search: '', categoria: "", estrellas: "", localidad: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Calcular el offset basado en la página actual
    const offset = (currentPage - 1) * itemsPerPage;

    // Consulta con RTK Query
    const { data: alojamientos, error, isLoading, refetch, isFetching } = useGetAlojamientosQuery({
        limit: itemsPerPage,
        offset: offset,
        search: filter.search,
        categoria: filter.categoria,
        estrellas: filter.estrellas,
        localidad: filter.localidad
    });
    // Manejar cambio de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        refetch();
    };

    // Resetear la página cuando cambia el término de búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    if (error) return <p>Hubo un error al cargar los alojamientos</p>;
    const totalItems = alojamientos?.result[0]?.total ? parseInt(alojamientos?.result[0]?.total) : 0;
    // Determinar si estamos en un estado de carga (inicial o actualización)
    const loading = isLoading || isFetching;
    return (
        <div>
            <section>
                <ParallaxContainer
                    speed={0.2}
                    minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
                    className=""
                    imageUrl='https://www.tucumanturismo.gob.ar/public/img/planviaje/1920x650-HOTEL-Desktop.jpg'
                >
                    <div className="container mx-auto h-full text-white flex flex-col justify-end">
                        <div className='w-11/12 mx-auto pt-5'>
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">
                                Alojamientos
                            </h2>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <div className='w-11/12 xl:w-11/16 mx-auto pt-5'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: "Alojamientos", href: '/alojamientos' }]
                    }></Breadcrumb>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">Buscá aquí donde hospedarte</h2>
                <div>
                    <div className='w-10/12 mx-auto'>
                        {/* Componente de búsqueda */}
                        <Filters filter={filter} setFilter={setFilter} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 pb-6">
                    {loading ? (
                        // Mostrar skeletons mientras se están cargando datos
                        Array(itemsPerPage).fill(0).map((_, index) => (
                            <div key={`skeleton-${index}`}>
                                <CardPrestadores isLoading={true} />
                            </div>
                        ))
                    ) : (
                        // Mostrar datos reales cuando no está cargando
                        alojamientos.result?.map((alojamiento) => (
                            <div key={alojamiento.id}>
                                <CardAlojamiento alojamiento={alojamiento} />
                            </div>
                        ))
                    )}
                </div>

                {/* Componente de paginación */}
                <Paginado
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    className={'pb-5'}
                />
            </div>
        </div>
    );
}