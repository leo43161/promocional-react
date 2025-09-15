import React from "react";
import { useGetlistaCardsQuery } from "@/redux/services/listaCardService";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Breadcrumb from "@/components/common/Breadcrumb";
import CardGeneric from "@/components/listcards/CardGeneric";

export default function OficinasPage() {
  const OFICINAS_ID = 1; 
  // Usamos useGetlistaCardsQuery de Redux Toolkit Query
  const { data, error, isLoading } = useGetlistaCardsQuery(OFICINAS_ID);

  // Extraemos las cards de la respuesta si la consulta es exitosa
  const articulos = data?.result
    ? JSON.parse(data.result).filter((item) => item.Activo && item.Visible)
    : [];

  // Mostramos un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <div className="text-center text-lg mt-10">Cargando oficinas...</div>
    );
  }

  // Mostramos un mensaje de error si la consulta falla
  if (error) {
    return (
      <div className="text-center text-lg mt-10 text-red-500">
        Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.
      </div>
    );
  }
  return (
    <div>
      <section>
        <ParallaxContainer
          speed={0.2}
          minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
          className=""
          imageUrl="https://www.tucumanturismo.gob.ar/public/img/1920x650-Tucuman-Oficinas-Desktop_t4eelyer_02-07-2024.jpg"
        >
          <div className="container mx-auto h-full text-white flex flex-col justify-end">
            <div className="w-11/12 mx-auto pt-5">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Oficinas de Informes</h2>
            </div>
          </div>
        </ParallaxContainer>
      </section>
      <div className="w-11/12 mx-auto pt-5">
        <div className="mb-5">
          <Breadcrumb
            items={[{ label: "Oficinas", href: "/oficinas" }]}
          ></Breadcrumb>
        </div>
        <div className="container mt-5">
          <h1 className="text-center mb-4 text-3xl font-semibold">
            Oficinas de informes de la provincia de Tucumán
          </h1>
        </div>
        <div className="row g-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articulos.length > 0 ? (
            articulos.map((articulo) => (
              <CardGeneric key={articulo.id_LC} articulo={articulo} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted">
              No se encontraron Oficinas de Informes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
