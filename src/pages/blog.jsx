import React, { useState, useEffect } from 'react';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import CardPrestadores from '@/components/prestadores/CardPrestadores';
import Breadcrumb from '@/components/common/Breadcrumb';
import { languages } from '@/utils';
import Buscador from '@/components/SearchPrest';
import Paginado from '@/components/common/Paginado';
import { useRouter } from 'next/router';
import Carousel from '@/components/common/Carousel';
import { useGetBlogsQuery, useGetDestacadosQuery } from '@/redux/services/blogService';
import CardBlog from '@/components/blog/CardBlog';


export default function blog() {
  const router = useRouter();
  // Estado para el ID del idioma seleccionado, inicia con el ID del primer idioma (Español)
  const [selectedLangId, setSelectedLangId] = useState(languages[0].code);
  // Estado para controlar la paginación y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calcular el offset basado en la página actual
  const offset = (currentPage - 1) * itemsPerPage;

  // Consulta con RTK Query
  const { data: blogs, error, isLoading, isFetching } = useGetBlogsQuery({
    limit: itemsPerPage,
    offset: offset,
    search: searchTerm,
    idioma: selectedLangId
  }, { refetchOnMountOrArgChange: true });

  // Consulta con RTK Query Blogs destacados
  const { data: destacados, error: errorDestacados, isLoading: isLoadingDestacados, isFetching: isFetchingDestacados } = useGetDestacadosQuery({
    idioma: selectedLangId
  }, { refetchOnMountOrArgChange: true });

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

  // Manejar cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Manejar búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Resetear a la primera página cuando se busca
  };

  // Resetear la página cuando cambia el término de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  if (error) return <p>Hubo un error al cargar los blogs</p>;
  const totalItems = blogs?.total ? blogs?.total : 0;
  // Determinar si estamos en un estado de carga (inicial o actualización)
  const loading = isLoading || isFetching;
  const loadingDestacados = isLoadingDestacados || isFetchingDestacados;
  return (
    <div>
      <section>
        <Carousel className='' colorArrow='#FFFFFF' showIndicators={true} showArrows={true} autoPlay={false} interval={6000}>
          {loadingDestacados ? (
            // Mostrar skeletons mientras se están cargando datos
            Array(4).fill(0).map((_, index) => (
              <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[66vh]"
                className=""
                imageUrl='https://www.tucumanturismo.gob.ar/public/img/planviaje/activos.webp'
                key={index}
              >
                <div className="container mx-auto h-full text-white flex flex-col justify-end">
                  <div className='w-17/18 mx-auto mb-10 flex flex-col gap-4'>
                    <div className='animate-pulse w-2/5 h-10 bg-white rounded-xl'></div>
                    <div className='animate-pulse w-full h-5 bg-white rounded-xl'></div>
                    <div className='animate-pulse w-full h-5 bg-white rounded-xl'></div>
                  </div>
                </div>
              </ParallaxContainer>
            ))
          ) : (
            // Mostrar datos reales cuando no está cargando
            destacados.result?.map((blogDestacado) => (
              <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[66vh]"
                className=""
                imageUrl={process.env.URL_IMG + blogDestacado.imagen}
                key={blogDestacado.idArticulo}
              >
                <div className="md:container w-11/12 mx-auto h-full text-white flex flex-col justify-end">
                  <div className='w-17/18 mx-auto mb-10'>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 text-shadow-md line-clamp-3">
                      {blogDestacado.nombre}
                    </h2>
                    <p className='font-bold text-shadow-md line-clamp-3'>{blogDestacado.copete}</p>
                  </div>
                </div>
              </ParallaxContainer>
            ))
          )}
        </Carousel>
      </section>
      <div className='w-11/12 mx-auto pt-5'>
        <div className='mb-3'>
          <Breadcrumb items={
            [{ label: "Blog", href: '/blog' }]
          }></Breadcrumb>
        </div>
        <div>
          <h1 className='text-center text-5xl font-semibold mb-9'>Conocé Tucumán</h1>
          <div className='w-11/12 mx-auto'>
            {/* Componente de búsqueda */}
            <Buscador placeholder='Ej. Senderismo, Peñas, Vino, Pachamama...' onSearch={handleSearch} />
          </div>
        </div>
        <div className='w-11/12 mx-auto xl:container'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-7 mb-5">
            {loading ? (
              // Mostrar skeletons mientras se están cargando datos
              Array(itemsPerPage).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <CardPrestadores isLoading={true} />
                </div>
              ))
            ) : (
              // Mostrar datos reales cuando no está cargando
              blogs.result?.map((prestador) => (
                <div key={prestador.idArticulo} className="md:h-auto">
                  <CardBlog
                    blog={prestador}
                  />
                </div>
              ))
            )}
          </div>
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
