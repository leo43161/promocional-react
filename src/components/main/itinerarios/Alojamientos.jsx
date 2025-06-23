import { useSelector, useDispatch } from "react-redux";
import { useGetHotelesQuery } from "@/redux/services/itinerariosService";
import HotelCard from "@/components/main/itinerarios/HotelCard";
import { setFavorito } from "@/redux/features/itinerarioSlice";

export default function Alojamientos() {
  const dispatch = useDispatch();
  const {
    favoritos,
    circuitoSelected,
  } = useSelector(state => state.itinerarioReducer.value);

  const { data: hoteles, errorDest, isLoading, isFetching } = useGetHotelesQuery({
    id: circuitoSelected.id
  }, {
    refetchOnMountOrArgChange: true
  });

  const actualizarFavoritos = (item) => {
    dispatch(setFavorito({ type: 'alojamientos', item }));
  };
  const loading = isLoading || isFetching;
  return (
    <div>
      <div className="flex overflow-x-auto gap-4 xl:gap-6 py-3 md:flex-wrap md:grid md:grid-cols-4 xl:grid-cols-5">
        {loading ? (
          Array(5).fill(0).map((_, index) => {
            return (<HotelCard key={index} isLoading={true}></HotelCard>)
          })
        ) : (
          hoteles?.result.map((hotel) => {
            const isFavorite = favoritos.alojamientos.find((item) => item.id === hotel.id);
            return (<HotelCard key={hotel.id} hotel={hotel} isFavorite={isFavorite}></HotelCard>)
          })
        )}
      </div>
    </div>
  )
}
