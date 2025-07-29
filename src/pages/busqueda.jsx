import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGetArticulosQuery } from "@/redux/services/busquedaArtService";
import CardArticulosBusqueda from "@/components/articulos/CardArticulosBusqueda";
import Paginado from "@/components/common/Paginado";
import { Search } from "lucide-react"; // Importamos el ícono para el botón
import { getCurrentLanguage, languages } from "@/utils";

const Busqueda = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const router = useRouter();
  const searchQuery = router.query.search || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchQuery);

  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    if (router.isReady) {
      const currentLangObject = getCurrentLanguage(router.query);
      setSelectedLang(currentLangObject);
    }
  }, [router.isReady, router.query]);

  const {
    data: articulosResponse,
    error,
    isLoading
  } = useGetArticulosQuery({
    search: searchQuery,
    limit: itemsPerPage,
    offset: offset,
    idioma: selectedLang.code,
    localidad: "",
  }, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    setLocalSearchTerm(searchQuery);
    setCurrentPage(1);
  }, [searchQuery]);

  const articulos = articulosResponse?.data || [];
  const total = articulosResponse?.total || 0;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // [-- NUEVO --] Manejador para el nuevo formulario de búsqueda
  const handleNewSearch = (e) => {
    e.preventDefault();
    if (!localSearchTerm.trim() || localSearchTerm === searchQuery) return;
    const langCode = selectedLang.code !== "ES" ? selectedLang.code : ""
    router.push(`/busqueda/?search=${encodeURIComponent(localSearchTerm.trim())}&lang=${langCode}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-3xl font-bold mb-2 text-center">
        Resultados de Búsqueda
      </h3>

      {/* [-- NUEVO --] Formulario para realizar otra búsqueda */}
      <form onSubmit={handleNewSearch} className="flex items-stretch w-full max-w-lg mx-auto mb-8">
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          placeholder="Realizar otra búsqueda..."
          className="w-full bg-gray-100 border-1 focus:ring-2 focus:ring-secondary/50 rounded-l-md px-4 py-2 text-gray-800 placeholder-gray-500 transition-all text-xl shadow-2xs"
        />
        <button
          type="submit"
          className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-r-md flex items-center justify-center"
          aria-label="Buscar"
        >
          <Search size={25} />
        </button>
      </form>

      {/* [-- MODIFICADO --] Lógica de carga y renderizado */}
      <div className="col max-w-6xl">
        {isLoading ? (
          // Si está cargando, muestra una lista de skeletons
          // Array.from crea un array con una longitud definida para mapearlo
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index}>
              <CardArticulosBusqueda isLoading={true} key={index} />
            </div>
          ))
        ) : error ? (
          // Si hay un error, muestra el mensaje de error
          <p className="text-center text-red-600">Error al cargar artículos.</p>
        ) : articulos.length > 0 ? (
          // Si hay artículos, muéstralos
          articulos.map((articulo, key) => (
            <div key={key}>
              <CardArticulosBusqueda key={articulo.id} articulo={articulo} />
            </div>
          ))
        ) : (
          // Si no hay artículos (y no está cargando), muestra el mensaje de "no encontrados"
          <p className="text-center text-lg text-gray-500 mt-4">
            No se encontraron resultados para <span className="font-semibold text-secondary">"{searchQuery}"</span>.
          </p>
        )}
      </div>

      {/* El paginado solo se muestra si no está cargando y hay resultados */}
      {!isLoading && articulos.length > 0 && (
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