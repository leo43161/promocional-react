import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useGetArticulosQuery } from "@/redux/services/busquedaArtService";
import { useGetPrestadoresQuery, useGetGuiasQuery } from "@/redux/services/prestadoresService";
import { useGetEventosQuery } from "@/redux/services/eventosService";

import CardArticulosBusqueda from "@/components/articulos/CardArticulosBusqueda";
import CardPrestadores from "@/components/prestadores/CardPrestadores";
import CardGuia from "@/components/prestadores/CardGuia";
import CardEvento from "@/components/eventos/CardEvento";
import Paginado from "@/components/common/Paginado";
import { Search } from "lucide-react";
import { getCurrentLanguage, languages } from "@/utils";

const Busqueda = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const router = useRouter();
  const searchQuery = router.query.search || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchQuery);

  // Ajustado a 15, ya que indicas que el backend devuelve 15 ítems por página.
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  const {
    data: articulosResponse,
    error: errorArticulos,
    isLoading: isLoadingArticulos,
    isFetching: isFetchingArticulos,
  } = useGetArticulosQuery({
    limit: itemsPerPage,
    offset: offset,
    search: localSearchTerm,
    idioma: selectedLang.code,
    localidad: "",
  }, { refetchOnMountOrArgChange: true });

  const {
    data: prestadoresResponse,
    error: errorPrestadores,
    isLoading: isLoadingPrestadores,
    isFetching: isFetchingPrestadores,
  } = useGetPrestadoresQuery({
    limit: itemsPerPage,
    offset: offset,
    search: localSearchTerm,
  }, { refetchOnMountOrArgChange: true });

  const {
    data: guiasResponse,
    error: errorGuias,
    isLoading: isLoadingGuias,
    isFetching: isFetchingGuias,
  } = useGetGuiasQuery({
    limit: itemsPerPage,
    offset: offset,
    search: localSearchTerm,
  }, { refetchOnMountOrArgChange: true });

  const {
    data: eventosResponse,
    error: errorEventos,
    isLoading: isLoadingEventos,
    isFetching: isFetchingEventos,
  } = useGetEventosQuery({
    limit: itemsPerPage,
    offset: offset,
    search: localSearchTerm,
  }, { refetchOnMountOrArgChange: true });

  const isLoading = isLoadingArticulos || isLoadingPrestadores || isLoadingGuias || isLoadingEventos;
  const error = errorArticulos || errorPrestadores || errorGuias || errorEventos;
  const isFetching = isFetchingArticulos || isFetchingPrestadores || isFetchingGuias || isFetchingEventos;

  const allCurrentPageResults = useMemo(() => {
    const combined = [];

    // Artículos: `data` ya es el array debido a su transformResponse
    if (articulosResponse?.data) {
      articulosResponse.data.forEach(item => combined.push({ ...item, type: 'articulo' }));
    }
    // Prestadores, Guías, Eventos: `data` es el objeto raw de la API,
    // y los items están en `data.result`.
    // Asegurarse de que `data.result` sea un array antes de iterar.
    if (prestadoresResponse?.result && Array.isArray(prestadoresResponse.result)) {
      prestadoresResponse.result.forEach(item => combined.push({ ...item, type: 'prestador' }));
    }
    if (guiasResponse?.result && Array.isArray(guiasResponse.result)) {
      guiasResponse.result.forEach(item => combined.push({ ...item, type: 'guia' }));
    }
    if (eventosResponse?.result && Array.isArray(eventosResponse.result)) {
      eventosResponse.result.forEach(item => combined.push({ ...item, type: 'evento' }));
    }

    return combined;
  }, [articulosResponse, prestadoresResponse, guiasResponse, eventosResponse]);

  const total = useMemo(() => {
    const totalArticulos = articulosResponse?.total || 0; // Este es el total que viene del transformResponse de articulosService.js
                                                         // Puede ser la cantidad de ítems de la página actual si el total global está anidado.

    // **** CAMBIOS AQUI: Acceder al 'total' anidado dentro del primer objeto de 'result'
    const totalPrestadores = parseInt(prestadoresResponse?.result?.[0]?.total, 10) || 0;
    const totalGuias = parseInt(guiasResponse?.result?.[0]?.total, 10) || 0;
    const totalEventos = parseInt(eventosResponse?.result?.[0]?.total, 10) || 0; // Asumiendo estructura similar a guias/prestadores para eventos

    return totalArticulos + totalPrestadores + totalGuias + totalEventos;
  }, [articulosResponse, prestadoresResponse, guiasResponse, eventosResponse]);


  const currentArticulos = allCurrentPageResults;

  useEffect(() => {
    if (router.isReady) {
      const currentLangObject = getCurrentLanguage(router.query);
      setSelectedLang(currentLangObject);
      setLocalSearchTerm(searchQuery);
    }
  }, [router.isReady, router.query, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [localSearchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newQuery = { ...router.query, search: localSearchTerm };
    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
  };

  const renderCard = (item) => {
    
    switch (item.type) {
      case 'articulo':
        return <CardArticulosBusqueda key={item.idArticulo || item.id} articulo={item} />;
      case 'prestador':
       
        return (<div className="w-1/3 p-3" ><CardPrestadores key={item.idPrestador || item.id} prestador={item} /> </div>);
      case 'guia':
        return(<div className="w-1/3 p-3" ><CardGuia key={item.idGuia || item.id} guia={item} /></div>);
      case 'evento':
        return (<div className="w-1/3 p-3" ><CardEvento key={item.idEvento || item.id} evento={item} /></div>);
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
        <h3 className="text-2xl font-bold text-center md:text-left mb-4 md:mb-0">
          Resultados de búsqueda para:{" "}
          <span className="text-secondary">{searchQuery}</span>
        </h3>  
   
    </div>

      <div className='w-11/12 mx-auto'>
        <form onSubmit={handleSearch} className="flex items-center justify-center gap-2 mb-8">
          <input
            type="text"
            placeholder="Buscar..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full md:w-96"
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded flex items-center justify-center">
            <Search size={20} className="mr-2" /> Buscar
          </button>
        </form>
      </div>

      <div className="col max-w-6xl">
        {isLoading || isFetching ? (
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <div className="" key={index}>
              <CardArticulosBusqueda isLoading={true} />
            </div>
          ))
        ) : error ? (
          <p className="text-center text-red-600">Error al cargar resultados.</p>
        ) : allCurrentPageResults.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mt-4">
            No se encontraron resultados para <span className="font-semibold text-secondary">"{searchQuery}"</span>.
          </p>
        ) : (
          currentArticulos.map(renderCard)
        )}
      </div>

      {!isLoading && total > 0 && (
        <div className="pb-2">
          <Paginado
            currentPage={currentPage}
            totalItems={total}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Busqueda;