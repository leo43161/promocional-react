import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGetArticulosQuery } from "@/redux/services/busquedaArtService";
import CardArticulosBusqueda from "@/components/articulos/CardArticulosBusqueda";
import Paginado from "@/components/common/Paginado";

const BusquedaArticulos = () => {
  const router = useRouter();
  const searchQuery = router.query.search || "";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Límite de artículos por página

  //Calculamos el offset para la llamada a la API
  const offset = (currentPage - 1) * itemsPerPage;

  //Consulta a la API con limit y offset
  // La consulta se ejecuta automáticamente al cambiar `searchQuery` o `offset`.
  const {
    data: articulosResponse,
    error,
    isLoading,
  } = useGetArticulosQuery({
    search: searchQuery,
    limit: itemsPerPage, // Se envía el límite para la paginación
    offset: offset,      // Se envía el offset para la página actual
    idioma: "ES",
    localidad: "",
  });
  
  //Reiniciamos la página a 1 cuando el término de búsqueda cambia
  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  // Obtenemos el array de artículos y el total desde la respuesta de la API.
  // La API solo devuelve los 10 artículos de la página actual.
  const articulos = articulosResponse?.data || [];
  // Usamos el 'total' que la API nos indica, NO la longitud del array de la página.
  const total = articulosResponse?.total || 0;

  // Esta función actualiza la página actual.
  // Al cambiar `currentPage`, la consulta a la API se dispara con el nuevo `offset`.
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