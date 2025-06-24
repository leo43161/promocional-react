import { useSelector } from "react-redux";
import { useGetHotelesQuery } from "@/redux/services/itinerariosService";
import HotelCard from "@/components/main/itinerarios/HotelCard";
import { useEffect, useState } from "react";
import Paginado from "@/components/common/Paginado";

export default function Alojamientos() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Calcular el offset basado en la página actual
  const offset = (currentPage - 1) * itemsPerPage;

  // Manejar cambio de página
  
  const {
    favoritos,
    circuitoSelected,
  } = useSelector(state => state.itinerarioReducer.value);
  
  const { data: hoteles, error, isLoading, isFetching } = useGetHotelesQuery({
    id: circuitoSelected.id,
    limit: itemsPerPage,
    offset: offset,
  }, {
    refetchOnMountOrArgChange: true
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(hoteles);
  if (error) return <p className="text-red-500 text-4xl">Hubo un error al cargar los alojamientos</p>;
  const totalItems = hoteles?.result[0]?.total ? parseInt(hoteles?.result[0]?.total) : 0;
  const loading = isLoading || isFetching;
  return (
    <div>
      <div className="flex overflow-x-auto gap-4 xl:gap-6 py-3 md:flex-wrap md:grid md:grid-cols-4 xl:grid-cols-5 mb-3">
        {loading ? (
          Array(10).fill(0).map((_, index) => {
            return (<HotelCard key={index} isLoading={true}></HotelCard>)
          })
        ) : (
          hoteles?.result.map((hotel) => {
            const isFavorite = favoritos.alojamientos.find((item) => item.id === hotel.id);
            return (<HotelCard key={hotel.id} hotel={hotel} isFavorite={isFavorite}></HotelCard>)
          })
        )}
      </div>
      <div>
        <Paginado
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          className={'pb-5'}
        />
      </div>
    </div>
  )
}
