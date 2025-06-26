import { setActiveComponent } from "@/redux/features/itinerarioSlice";
import { MapPin, BedDouble, Bike, Milestone, Check, Plus, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// No changes needed here
const ButtonsSecciones = [
  {
    id: "destinos",
    name: "Destinos",
    icon: MapPin,
    color: "#206C60",
  },
  {
    id: "alojamientos",
    name: "Alojamientos",
    icon: BedDouble,
    color: "#d42727",
  },
  {
    id: "prestadores",
    name: "Actividades",
    icon: Bike,
    color: "#ff9f31",
  },
  {
    id: "guias",
    name: "Guias",
    icon: UserRound,
    color: "#6d6b63",
  },
];

const BotonesPlanifica = () => {
  const {
    activeComponent,
    circuitoSelected,
    favoritos
  } = useSelector(state => state.itinerarioReducer.value);
  const dispatch = useDispatch();
  const handleSelect = (id) => dispatch(setActiveComponent(id));
  return (
    <div className="flex justify-center items-center gap-2 lg:gap-4">
      <div className="relative">
        <Plus
          className={`text-${circuitoSelected.color} rounded-full bg-white border border-neutral-200 p-2 t h-12 w-12 xl:h-14 xl:w-14 lg:h-11 lg:w-11 shadow-lg`}
          color={circuitoSelected.color}
        />
      </div>
      {ButtonsSecciones.map((ButtonS, index) => {
        const isSelected = ButtonS.id === activeComponent;
        return (
          <button
            className={`bg-[#73716a] hover:bg-[${ButtonS.color}] h-12 w-12 xl:h-14 xl:w-14 lg:h-11 lg:w-11 rounded-full items-center justify-center flex relative group`}
            key={index}
            id={index}
            style={{ backgroundColor: isSelected && ButtonS.color, }}
            onClick={() => handleSelect(ButtonS.id)}
          >
            <ButtonS.icon
              alt="Destinos"
              className="w-6 h-6 xl:w-8 xl:h-8 text-white "
            />
            <span
              className={`hidden lg:block absolute -bottom-[36px] left-1/2 bg-[${ButtonS.color}] transform p-1 px-2 rounded-lg -translate-x-1/2 text-s text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              style={{ opacity: isSelected && 1, backgroundColor: ButtonS.color }}
            >
              {ButtonS.name}
            </span>
            <p
              className={`absolute h-4 w-4 lg:h-5 lg:w-5 rounded-full font-[700] -right-1 top-9 lg:top-6 xl:top-12 text-[10px] lg:text-[15px] text-center bg-white flex justify-center items-center border`}
              style={{ color: ButtonS.color }}
            >
              {favoritos[circuitoSelected.name][ButtonS.id].length}
            </p>
          </button>
        )
      })}

    </div>
  );
};

export default BotonesPlanifica;
