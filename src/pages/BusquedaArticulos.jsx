import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGetArticulosQuery } from "@/redux/services/busquedaArtService";
import CardArticulosBusqueda from "@/components/articulos/CardArticulosBusqueda";
import Paginado from "@/components/common/Paginado";

const BusquedaArticulos = () => {
  const router = useRouter();
  const searchQuery = router.query.search || "";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: articulosResponse,
    error,
    isLoading,
    refetch,
  } = useGetArticulosQuery({
    search: searchQuery,
    //limit: maxTitems,
    offset:0,
    idioma: "ES",
    localidad: "",
  });
console.log("Artículos obtenidos:", articulosResponse?.data?.length || 0);
  useEffect(() => {
  if (searchQuery) {
    setCurrentPage(1);
    refetch();
  }
}, [searchQuery]);

const articulos = articulosResponse?.data || [];
const total = articulos.length;

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentArticulos = articulos.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
   
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
        {currentArticulos.map((articulo) => (
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
