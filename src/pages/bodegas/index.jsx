// src/pages/BodegasPage.jsx
import React from "react";
import { useGetlistaCardsQuery } from "@/redux/services/listaCardService";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Breadcrumb from "@/components/common/Breadcrumb";
import CardGeneric from "@/components/listcards/CardGeneric";

export default function BodegasPage() {
    const BODEGAS_ID = 7;
    const { data, error, isLoading } = useGetlistaCardsQuery(BODEGAS_ID);

    const articulos = data?.result
        ? JSON.parse(data.result).filter((item) => item.Activo && item.Visible)
        : [];

    if (isLoading) {
        return (
            <div className="text-center text-lg mt-10">Cargando bodegas... 🍷</div>
        );
    }

    if (error) {
        console.error("Error fetching bodegas:", error);
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
                    imageUrl="https://www.tucumanturismo.gob.ar/public/img/bodega chico zossi (183)_8bk75jig_17-07-2025.JPG"
                >
                    <div className="container mx-auto h-full text-white flex flex-col justify-end">
                        <div className="w-11/12 mx-auto pt-5">
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">Bodegas</h2>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <div className="w-11/12 mx-auto pt-5">
                <div className="mb-5">
                    <Breadcrumb items={[{ label: "Bodegas", href: "/bodegas" }]}></Breadcrumb>
                </div>

                <div className="container mt-5">
                    <h1 className="text-center mb-4 text-3xl font-semibold">
                        Bodegas Destacadas
                    </h1>
                </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articulos.length > 0 ? (
                        articulos.map((articulo) => (
                            <CardGeneric key={articulo.id_LC} articulo={articulo} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-muted">
                            No se encontraron bodegas.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}