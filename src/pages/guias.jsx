import React, { useState, useEffect } from 'react';
import { useGetPrestadoresQuery } from '@/redux/services/prestadoresService';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import CardPrestadores from '@/components/prestadores/CardPrestadores';
import Breadcrumb from '@/components/common/Breadcrumb';
import Buscador from '@/components/SearchPrest';
import Paginado from '@/components/common/Paginado';

export default function Guias() {
    // Estado para controlar la paginación y búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Calcular el offset basado en la página actual
    const offset = (currentPage - 1) * itemsPerPage;

    // Consulta con RTK Query
    const { data: prestadores, error, isLoading, refetch, isFetching } = useGetPrestadoresQuery({
        limit: itemsPerPage,
        offset: offset,
        search: searchTerm
    });

    // Manejar cambio de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        refetch();
    };

    // Manejar búsqueda
    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Resetear a la primera página cuando se busca
        refetch();
    };

    // Resetear la página cuando cambia el término de búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    console.log("isLoading:", isLoading, "isFetching:", isFetching);
    if (error) return <p>Hubo un error al cargar los prestadores</p>;
    const totalItems = prestadores?.result[0]?.total ? parseInt(prestadores?.result[0]?.total) : 0;
    // Determinar si estamos en un estado de carga (inicial o actualización)
    const loading = isLoading || isFetching;
    return (
        <div>
            <section>
                <ParallaxContainer
                    speed={0.2}
                    minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
                    className=""
                    imageUrl='https://www.tucumanturismo.gob.ar/public/img/planviaje/activos.webp'
                >
                    <div className="container mx-auto h-full text-white flex flex-col justify-end">
                        <div className='w-11/12 mx-auto pt-5'>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Servicios Turismo Aventura
                            </h2>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <div className='w-11/12 mx-auto pt-5'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: "Prestadores activos", href: '/prestadores' }]
                    }></Breadcrumb>
                </div>
                <h2 className="text-2xl font-bold mb-4">Prestadores de Turismo Aventura Habilitados</h2>
                <div>
                    <h1 className='text-center text-3xl font-bold mb-6'>Buscá aquí que actividad querés hacer</h1>
                    <div>
                        {/* Componente de búsqueda */}
                        <Buscador onSearch={handleSearch} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                    {loading ? (
                        // Mostrar skeletons mientras se están cargando datos
                        Array(itemsPerPage).fill(0).map((_, index) => (
                            <div key={`skeleton-${index}`}>
                                <CardPrestadores isLoading={true} />
                            </div>
                        ))
                    ) : (
                        // Mostrar datos reales cuando no está cargando
                        prestadores.result?.map((prestador) => (
                            <div key={prestador.id}>
                                <CardPrestadores isLoading={false} prestador={prestador} />
                            </div>
                        ))
                    )}
                </div>

                {/* Componente de paginación */}
                <div className='pb-2'>
                    <Paginado
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}