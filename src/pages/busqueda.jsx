import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useGetArticulosQuery } from "@/redux/services/busquedaArtService";
import { useGetPrestadoresQuery, useGetGuiasQuery } from "@/redux/services/prestadoresService";
import { useGetEventosQuery } from "@/redux/services/eventosService";

import CardArticulosBusqueda from "@/components/articulos/CardArticulosBusqueda";
import CardPrestadoresBusqueda from "@/components/prestadores/CardPrestadoresBusqueda";
import CardGuiaBusqueda from "@/components/prestadores/CardGuiaBusqueda";
import CardEventoBusqueda from "@/components/eventos/CardEventoBusqueda";
import Paginado from "@/components/common/Paginado";
import { Search } from "lucide-react";
import { getCurrentLanguage, languages } from "@/utils";
import BotonesBusqueda from "@/components/BotonesBusqueda";

const Busqueda = () => {
    const dispatch = useDispatch();
    const selectedButton = useSelector((state) => state.busqueda.selectedButton);

    const [selectedLang, setSelectedLang] = useState(languages[0]);
    const router = useRouter();
    const searchQuery = router.query.search || "";

    const [currentPage, setCurrentPage] = useState(1);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchQuery);

    const itemsPerPage = 10;
    const offset = (currentPage - 1) * itemsPerPage;

    const queryParams = {
        limit: itemsPerPage,
        offset: offset,
        search: localSearchTerm,
    };

    const {
        data: articulosResponse,
        error: errorArticulos,
        isLoading: isLoadingArticulos,
        isFetching: isFetchingArticulos,
    } = useGetArticulosQuery(
        { ...queryParams, idioma: selectedLang.code, localidad: "" },
        { skip: selectedButton !== 'articulos', refetchOnMountOrArgChange: true }
    );

    const {
        data: prestadoresResponse,
        error: errorPrestadores,
        isLoading: isLoadingPrestadores,
        isFetching: isFetchingPrestadores,
    } = useGetPrestadoresQuery(
        queryParams,
        { skip: selectedButton !== 'prestadores', refetchOnMountOrArgChange: true }
    );

    const {
        data: guiasResponse,
        error: errorGuias,
        isLoading: isLoadingGuias,
        isFetching: isFetchingGuias,
    } = useGetGuiasQuery(
        queryParams,
        { skip: selectedButton !== 'guias', refetchOnMountOrArgChange: true }
    );

    const {
        data: eventosResponse,
        error: errorEventos,
        isLoading: isLoadingEventos,
        isFetching: isFetchingEventos,
    } = useGetEventosQuery(
        queryParams,
        { skip: selectedButton !== 'eventos', refetchOnMountOrArgChange: true }
    );

    const isLoading = useMemo(() => {
        switch (selectedButton) {
            case 'articulos': return isLoadingArticulos || isFetchingArticulos;
            case 'prestadores': return isLoadingPrestadores || isFetchingPrestadores;
            case 'guias': return isLoadingGuias || isFetchingGuias;
            case 'eventos': return isLoadingEventos || isFetchingEventos;
            default: return false;
        }
    }, [selectedButton, isLoadingArticulos, isFetchingArticulos, isLoadingPrestadores, isFetchingPrestadores, isLoadingGuias, isFetchingGuias, isLoadingEventos, isFetchingEventos]);

    const error = useMemo(() => {
        switch (selectedButton) {
            case 'articulos': return errorArticulos;
            case 'prestadores': return errorPrestadores;
            case 'guias': return errorGuias;
            case 'eventos': return errorEventos;
            default: return null;
        }
    }, [selectedButton, errorArticulos, errorPrestadores, errorGuias, errorEventos]);

    const { currentResults, total } = useMemo(() => {
        let items = [];
        let currentTotal = 0;

        switch (selectedButton) {
            case 'articulos':
                if (articulosResponse?.data) {
                    items = articulosResponse.data.map(item => ({ ...item, type: 'articulo' }));
                    currentTotal = articulosResponse.total || 0;
                }
                break;
            case 'prestadores':
                if (prestadoresResponse?.result && Array.isArray(prestadoresResponse.result)) {
                    items = prestadoresResponse.result.map(item => ({ ...item, type: 'prestador' }));
                    currentTotal = parseInt(prestadoresResponse.result[0]?.total, 10) || 0;
                }
                break;
            case 'guias':
                if (guiasResponse?.result && Array.isArray(guiasResponse.result)) {
                    items = guiasResponse.result.map(item => ({ ...item, type: 'guia' }));
                    currentTotal = parseInt(guiasResponse.result[0]?.total, 10) || 0;
                }
                break;
            case 'eventos':
                if (eventosResponse?.result && Array.isArray(eventosResponse.result)) {
                    items = eventosResponse.result.map(item => ({ ...item, type: 'evento' }));
                    currentTotal = parseInt(eventosResponse.result[0]?.total, 10) || 0;
                }
                break;
            default:
                if (articulosResponse?.data) {
                    items = articulosResponse.data.map(item => ({ ...item, type: 'articulo' }));
                    currentTotal = articulosResponse.total || 0;
                }
                break;
        }
        return { currentResults: items, total: currentTotal };
    }, [articulosResponse, prestadoresResponse, guiasResponse, eventosResponse, selectedButton]);


    useEffect(() => {
        if (router.isReady) {
            const currentLangObject = getCurrentLanguage(router.query);
            setSelectedLang(currentLangObject);
            setLocalSearchTerm(searchQuery);
        }
    }, [router.isReady, router.query, searchQuery, dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [localSearchTerm, selectedButton]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const newQuery = { ...router.query, search: localSearchTerm, category: selectedButton };
        router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true });
    };

    const renderCard = (item) => {
        switch (item.type) {
            case 'articulo':
                return <CardArticulosBusqueda key={item.idArticulo || item.id} articulo={item} />;
            case 'prestador':
                return <CardPrestadoresBusqueda key={item.idPrestador || item.id} prestador={item} />;
            case 'guia':
                return <CardGuiaBusqueda key={item.idGuia || item.id} guia={item} />;
            case 'evento':
                return <CardEventoBusqueda key={item.idEvento || item.id} evento={item} />;
            default:
                return null;
        }
    };

    const renderSkeletons = () => {
        return Array.from({ length: itemsPerPage }).map((_, index) => (
            <CardArticulosBusqueda key={`skeleton-${index}`} isLoading={true} />
        ));
    };

    const divClassConatiner = {
        'articulo': 'col max-w-6xl',
        'prestador': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-10/11 mx-auto mb-4',
        'guia': 'col max-w-6xl',
        'evento': 'col max-w-6xl',
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className='flex flex-col justify-center items-center mb-6'>

                <h3 className="text-2xl font-bold text-center md:text-left mb-4 md:mb-4">
                    Resultados de búsqueda para:{" "}
                    <span className="text-secondary">{localSearchTerm}</span>
                </h3>
                <BotonesBusqueda />
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

            {/* Este es el div restaurado a su estado original */}
            {isLoading ? ( // Usamos el isLoading único
                <div className="col max-w-6xl">
                    {renderSkeletons()}
                </div>
            ) : error ? (
                <p className="text-center text-red-600">Error al cargar resultados.</p>
            ) : currentResults.length === 0 ? (
                <p className="text-center text-lg text-gray-500 mt-4">
                    No se encontraron resultados para <span className="font-semibold text-secondary">"{localSearchTerm}"</span> en la categoría seleccionada.
                </p>
            ) : (
                <div className={divClassConatiner[currentResults[0].type]}>
                    {currentResults.map(renderCard)}
                </div>
            )}

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