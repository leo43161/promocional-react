import React, { useState, useEffect } from 'react';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import Filters from '@/components/eventos/Filters';
import { useGetEventosQuery } from '@/redux/services/eventosService';
import CardEvento from '@/components/eventos/CardEvento';
import Paginado from '@/components/common/Paginado';

export default function Eventos() {
    // Estado para controlar la paginación y búsqueda
    const [filter, setFilter] = useState({ search: '', dia: "", fechaIni: "", fechaFin: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Calcular el offset basado en la página actual
    const offset = (currentPage - 1) * itemsPerPage;

    // Consulta con RTK Query
    const { data: eventos, error, isLoading, refetch, isFetching } = useGetEventosQuery({
        limit: itemsPerPage,
        offset: offset,
        search: filter.search,
        dia: filter.dia,
        fechaIni: filter.fechaIni,
        fechaFin: filter.fechaFin
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

    if (error) return <p>Hubo un error al cargar los eventos</p>;
    const totalItems = parseInt(eventos?.total) || 0;
    console.log(eventos);
    // Determinar si estamos en un estado de carga (inicial o actualización)
    const loading = isLoading || isFetching;
    return (
        <div>
            <section>
                <ParallaxContainer
                    speed={0.2}
                    minHeight="h-96 md:h-[58vh]"
                    className=""
                    imageUrl='https://www.tucumanturismo.gob.ar/public/img/planviaje/1920x650-HOTEL-Desktop.jpg'
                >
                    <div className="container mx-auto h-full text-white flex flex-col justify-end">
                        <div className='w-11/12 mx-auto pt-5'>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Eventos
                            </h2>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <div className='w-11/12 mx-auto pt-5'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: "Alojamientos", href: '/eventos' }]
                    }></Breadcrumb>
                </div>
                <h2 className="text-2xl font-bold mb-4">Buscá aquí donde hospedarte</h2>
                <div>
                    <div className='w-10/12 mx-auto'>
                        {/* Componente de búsqueda */}
                        <Filters filter={filter} setFilter={setFilter} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 mb-5 w-10/11 mx-auto">
                    {loading ? (
                        // Mostrar skeletons mientras se están cargando datos
                        Array(itemsPerPage).fill(0).map((_, index) => (
                            <div key={`skeleton-${index}`}>
                                <CardEvento isLoading={true} />
                            </div>
                        ))
                    ) : (
                        // Mostrar datos reales cuando no está cargando
                        eventos.result?.map((evento) => (
                            <a href={`/eventos/evento?id=${evento.id}`} key={evento.id}>
                                <CardEvento evento={evento} />
                            </a>
                        ))
                    )}
                </div>
                <Paginado
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                ></Paginado>
            </div>
        </div>
    );
}