import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGetArticulosQuery } from "@/redux/services/busquedaArtService";
import CardArticulosBusqueda from "@/components/articulos/CardArticulosBusqueda";
import Paginado from "@/components/common/Paginado";

const BusquedaArticulos = () => {
  const router = useRouter();
  const searchQuery = router.query.search || "";
  const pageQuery = parseInt(router.query.page) || 1;

  const [currentPage, setCurrentPage] = useState(pageQuery);
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  const {
    data: articulosResponse,
    error,
    isLoading,
    refetch,
  } = useGetArticulosQuery({
    search: searchQuery,
    limit: itemsPerPage,
    offset,
    idioma: "ES",
    localidad: "",
  });

  useEffect(() => {
  if (searchQuery) {
    setCurrentPage(1);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 },
    });
  }
}, [searchQuery]);

  const articulos = articulosResponse?.data || [];
  const total = articulosResponse?.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Resultados de búsqueda para:{" "}
        <span className="text-secondary">{searchQuery}</span>
      </h3>

      {isLoading && <p className="text-center">Cargando artículos...</p>}
      {error && (
        <p className="text-center text-red-600">Error al cargar artículos.</p>
      )}
      {!isLoading && articulos.length === 0 && (
        <p className="text-center">No se encontraron artículos.</p>
      )}

      <div className="col max-w-6xl">
        {articulos.map((articulo) => (
          <CardArticulosBusqueda key={articulo.id} articulo={articulo} />
        ))}
      </div>
      <div className="pb-2">
        <Paginado
          currentPage={currentPage}
          totalItems={total}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BusquedaArticulos;
