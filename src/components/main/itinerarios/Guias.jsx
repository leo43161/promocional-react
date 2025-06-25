import { useSelector } from "react-redux";
import { useGetActividadesQuery, useGetGuiasQuery, useGetHotelesQuery } from "@/redux/services/itinerariosService";
import GuiasCard from "@/components/main/itinerarios/GuiasCard";
import { useEffect, useState } from "react";
import Paginado from "@/components/common/Paginado";

export default function Guias() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    // Calcular el offset basado en la página actual
    const offset = (currentPage - 1) * itemsPerPage;

    // Manejar cambio de página

    const {
        favoritos,
        circuitoSelected,
    } = useSelector(state => state.itinerarioReducer.value);

    const { data: guias, error, isLoading, isFetching } = useGetGuiasQuery({
        id: circuitoSelected.id,
        limit: itemsPerPage,
        offset: offset,
    }, {
        refetchOnMountOrArgChange: true
    });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    console.log(guias);
    if (error) return <p className="text-red-500 text-4xl">Hubo un error al cargar los alojamientos</p>;
    const totalItems = guias?.result[0]?.total ? parseInt(guias?.result[0]?.total) : 0;
    const loading = isLoading || isFetching;
    return (
        <div>
            <div>
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
                    Array(10).fill(0).map((_, index) => {
                        return (<GuiasCard key={index} isLoading={true}></GuiasCard>)
                    })
                ) : (
                    guias?.result.map((guia) => {
                        const isFavorite = favoritos.guias.find((item) => item.id === guia.id);
                        return (<GuiasCard key={guia.id} guia={guia} isFavorite={isFavorite}></GuiasCard>)
                    })
                )}
            </div>

        </div>
    )
}
