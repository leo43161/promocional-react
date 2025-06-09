import Image from "next/image";
import { Heart } from "lucide-react";
import icons from "@/utils/icons";
const { Prestadores, Transporte, Alojamiento, Mapa } = icons;

const BotonesPlanifica = ({ circuito, favoritos }) => {
  return (
    <div className="flex justify-center items-center gap-2 lg:gap-4">
      <button className="bg-[#9b988d] hover:bg-[#d42727] h-12 w-12 xl:h-14 xl:w-14 lg:h-11 lg:w-11 rounded-full items-center justify-center flex relative group">
        <Image
          src={Alojamiento}
          width={32}
          height={32}
          alt="alojamientos"
          className="w-6 h-6 xl:w-8 xl:h-8"
        />
        <span className="hidden lg:block absolute -bottom-[36px] left-1/2 bg-[#d42727] transform p-1 px-2 rounded-lg -translate-x-1/2 text-s text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Alojamientos
        </span>
      </button>
      <button className="bg-[#9b988d] hover:bg-[#ff9f31] h-12 w-12 xl:h-14 xl:w-14 lg:h-11 lg:w-11 rounded-full items-center justify-center flex relative group">
        <Image
          src={Transporte}
          width={32}
          height={32}
          alt="transporte"
          className="w-6 h-6 xl:w-8 xl:h-8"
        />
        <span className="hidden lg:block absolute -bottom-[36px] left-1/2 bg-[#ff9f31] transform p-1 px-2 rounded-lg -translate-x-1/2 text-s text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Transportes
        </span>
      </button>
      <button className="bg-[#9b988d] hover:bg-[#248b46] h-12 w-12 xl:h-14 xl:w-14 lg:h-11 lg:w-11 rounded-full items-center justify-center flex relative group">
        <Image
          src={Prestadores}
          width={32}
          height={32}
          alt="prestadores"
          className="w-6 h-6 xl:w-8 xl:h-8"
        />
        <span className="hidden lg:block absolute -bottom-[36px] left-1/2 bg-[#248b46] transform p-1 px-2 rounded-lg -translate-x-1/2 text-s text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Prestadores
        </span>
      </button>
      <button className="bg-[#9b988d] hover:bg-[#6d6b63] h-12 w-12 xl:h-14 xl:w-14 lg:h-11 lg:w-11 rounded-full items-center justify-center flex relative group">
        <Image 
        src={Mapa}
        width={32} 
        height={32} 
        alt="planifica" 
        className="w-6 h-6 xl:w-8 xl:h-8" 
        />
        <span className="hidden lg:block absolute -bottom-[36px] left-1/2 bg-[#6d6b63] transform p-1 px-2 rounded-lg -translate-x-1/2 text-s text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Mapas
        </span>
      </button>
      <div className="relative">
        {favoritos.length !== 0 ? (
          <div>
            <Heart
              className={`text-${circuito.color} rounded-full bg-white border border-neutral-200 p-2  h-12 w-12 xl:h-14 xl:w-14 lg:h-11 lg:w-11  shadow-lg`}
            />
            <p
              className={` absolute h-4 w-4 lg:h-6 lg:w-6 rounded-full font-700 right-0 top-9 lg:top-12 pt-[2px] text-white text-[10px] lg:text-[15px] text-center bg-${circuito.color}`}
            >
              {favoritos.length}
            </p>
          </div>
        ) : (
          <Heart
            className={`text-${circuito.color} rounded-full bg-white border border-neutral-200 p-2 t h-12 w-12 xl:h-14 xl:w-14 lg:h-11 lg:w-11 shadow-lg`}
          />
        )}
      </div>
    </div>
  );
};

export default BotonesPlanifica;
