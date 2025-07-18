import React, { useState, useEffect } from 'react';
import { useGetGuiasQuery } from '@/redux/services/prestadoresService';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import CardPrestadores from '@/components/prestadores/CardPrestadores';
import Breadcrumb from '@/components/common/Breadcrumb';
import Buscador from '@/components/SearchPrest';
import Paginado from '@/components/common/Paginado';
import CardGuia from '@/components/prestadores/CardGuia';

export default function Guias() {
    // Estado para controlar la paginación y búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Calcular el offset basado en la página actual
    const offset = (currentPage - 1) * itemsPerPage;

    // Consulta con RTK Query
    const { data: guias, error, isLoading, refetch, isFetching } = useGetGuiasQuery({
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
    if (error) return <p>Hubo un error al cargar los guias</p>;
    const totalItems = guias?.result[0]?.total ? parseInt(guias?.result[0]?.total) : 0;
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
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">
                                Servicios Turismo Aventura
                            </h2>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <div className='w-11/12 mx-auto pt-5'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: "Guías de Turismo", href: '/guias' }]
                    }></Breadcrumb>
                </div>
                <h2 className="text-2xl font-bold mb-4">Guías de Turismo Habilitados</h2>
                <div>
                    <h1 className='text-center text-4xl font-bold mb-6'>Buscá aquí los guías de turismo habilitados</h1>
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
                        guias.result?.map((guia) => (
                            <div key={guia.id}>
                                <CardGuia isLoading={false} guia={guia} />
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