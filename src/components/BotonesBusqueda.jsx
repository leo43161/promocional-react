import { CalendarClock, Bike, UserRound, FileHeart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedButton } from "@/redux/features/busquedaSlice"; // Asegúrate de que esta ruta sea correcta

const ButtonsBusqueda = [
  {
    id: "articulos",
    name: "Articulos",
    icon: FileHeart,
    color: "#206C60",
  },
  {
    id: "prestadores", // Corresponde al tipo 'prestador' en tu API
    name: "Actividades",
    icon: Bike,
    color: "#ff9f31",
  },
  {
    id: "eventos",
    name: "Eventos",
    icon: CalendarClock,
    color: "#d42727",
  },
  {
    id: "guias",
    name: "Guias",
    icon: UserRound,
    color: "#333446",
  },
];

const BotonesBusqueda = () => {
  const dispatch = useDispatch();
  const selectedButton = useSelector((state) => state.busqueda.selectedButton); // Obtiene el botón seleccionado de Redux

  const handleSelect = (buttonId) => {
    dispatch(setSelectedButton(buttonId));
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6"> {/* Ajustado el gap y flex-wrap para responsividad */}
      {ButtonsBusqueda.map((buttonS) => {
        const isSelected = selectedButton === buttonS.id;
        return (
          <button
            className={`
              flex items-center justify-center gap-2 px-4 py-2 rounded-full
              text-white font-semibold whitespace-nowrap
              transition-all duration-300 ease-in-out
              ${isSelected ? '' : 'bg-[#73716a] hover:opacity-80'} 
            `}
            key={buttonS.id}
            onClick={() => handleSelect(buttonS.id)}
            style={{ backgroundColor: isSelected ? buttonS.color : '#73716a' }} // Asegura el color de fondo
          >
            {/* Icono del botón */}
            <buttonS.icon
              className={`
                h-5 w-5 lg:h-6 lg:w-6
                ${isSelected ? "text-white" : "text-gray-300"}
              `}
            />
            {/* Nombre del botón siempre visible y fijo */}
            <span className="text-sm lg:text-base">
              {buttonS.name}
            </span>

           
          </button>
        );
      })}
    </div>
  );
};

export default BotonesBusqueda;