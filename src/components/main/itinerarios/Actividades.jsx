import { useSelector } from "react-redux";
import { useGetActividadesQuery, useGetHotelesQuery } from "@/redux/services/itinerariosService";
import ActividadCard from "@/components/main/itinerarios/ActividadCard";
import { useEffect, useState } from "react";
import Paginado from "@/components/common/Paginado";
import { getCurrentLanguage } from "@/utils";
import { useRouter } from "next/router";

export default function Actividades() {
    const router = useRouter();
    const lenguaje = getCurrentLanguage(router.query);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    // Calcular el offset basado en la página actual
    const offset = (currentPage - 1) * itemsPerPage;

    // Manejar cambio de página

    const {
        circuitosEN_ES,
        favoritos,
        circuitoSelected,
    } = useSelector(state => state.itinerarioReducer.value);

    const { data: actividades, error, isLoading, isFetching } = useGetActividadesQuery({
        id: lenguaje.code === "EN" ? circuitosEN_ES[circuitoSelected.id] : circuitoSelected.id,
        limit: itemsPerPage,
        offset: offset,
    }, {
        refetchOnMountOrArgChange: true
    });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    if (error) return <p className="text-red-500 text-4xl">Hubo un error al cargar los alojamientos</p>;
    const totalItems = actividades?.result[0]?.total ? parseInt(actividades?.result[0]?.total) : 0;
    const loading = isLoading || isFetching;
    return (
        <div>
            <div className="flex justify-center">
                <Paginado
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    className={'pb-5 justify-start'}
                    accentColor={circuitoSelected.color}
                />
            </div>
            <div className="flex overflow-x-auto gap-4 xl:gap-6 py-3 md:flex-wrap md:grid md:grid-cols-4 xl:grid-cols-5 mb-3">
                {loading ? (
                    Array(itemsPerPage).fill(0).map((_, index) => {
                        return (<ActividadCard key={index} isLoading={true}></ActividadCard>)
                    })
                ) : (
                    actividades?.result.map((actividad) => {
                        const isFavorite = favoritos[circuitoSelected.name].prestadores.find((item) => item.id === actividad.id);
                        return (<ActividadCard key={actividad.id} actividad={actividad} isFavorite={isFavorite}></ActividadCard>)
                    })
                )}
            </div>
            <div className="flex justify-center">
                <Paginado
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    className={'pb-5 justify-start'}
                    accentColor={circuitoSelected.color}
                />
            </div>

        </div>
    )
}
