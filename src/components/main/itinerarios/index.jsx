import { useState } from "react";
import icons from '@/utils/icons'
import dynamic from 'next/dynamic';
import Image from "next/image";
import { CircleArrowRight, ChevronDown, Check } from 'lucide-react';
import circuitos from "@/data/circuitos";
import CircuitoSec from "./CircuitoSec";
import { useSelector, useDispatch } from "react-redux";
import { setActiveComponent, setCircuitoSelected } from "@/redux/features/itinerarioSlice";
import PlanificaDoc from "@/components/ItinerarioDoc";

const circuitosData = circuitos();

const { LogoGobtuc } = icons;

console.log(LogoGobtuc);

const PDFDownload = dynamic(
    () => import('./PDFDownload'),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center px-4 text-white h-full">
                <p className="font-700 uppercase text-2xl ml-2">Cargando...</p>
            </div>
        )
    }
);

export default function Itinerarios() {
    const dispatch = useDispatch();
    const {
        progress,
        circuitoSelected,
        circuitos
    } = useSelector(state => state.itinerarioReducer.value);
    const [isOpen, setIsOpen] = useState(false);
    const dias = Math.ceil(progress / 100);
    const progressText = `${dias} día${dias > 1 ? "s" : ""}`;
    const progressWidth = progress > 100 ? 100 : progress;

    // Función para manejar la selección de un nuevo circuito
    const handleSelectCircuit = (id) => {
        dispatch(setActiveComponent("destinos"));
        dispatch(setCircuitoSelected(id));
        setIsOpen(false);   // Cierra el menú desplegable
    };
    return (
        <div className="relative">
            {/* Header que ya tenías */}
            <div className="md:py-3 flex flex-row items-center justify-between md:shadow-md mb-0 lg:gap-5 px-6 lg:mb-0 border">
                <div>
                    <p className="hidden lg:block text-neutral-400 text-[42px] font-semibold text-center">
                        Planificá tu viaje al Corazón del Norte Argentino
                    </p>
                </div>
                <div>
                    <Image
                        src={LogoGobtuc}
                        alt="logo gob tuc"
                        className="h-[65px] w-auto hidden md:block"
                    />
                </div>
            </div>
            <div className="w-full">
                <div className="grid grid-cols-6 justify-center w-full">
                    <div className="bg-[#206C60] col-span-6 md:col-span-1 flex items-center p-2 xl:pl-12 justify-center lg:p-3">
                        <p className="col-span-2 xl:col-span-3 text-[24px] lg:text-[26px] xl:text-[30px] leading-7 pr-2 font-400 text-white xl:shrink-0 lg:ms-2">
                            Elegí tu destino y <br className="hidden xl:block" /> planifica
                            tu viaje
                        </p>
                        <CircleArrowRight className="text-white hidden lg:block lg:size-12 xl:text-[40px]" />
                    </div>

                    <div className="hidden lg:col-span-5 xl:col-span-5 lg:flex lg:flex-row overflow-hidden">
                        {circuitos.map((circuito, index) => {
                            const isActive = circuito.id === circuitoSelected?.id;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelectCircuit(circuito.id)}
                                    className={`w-full h-full p-4 mb-4 flex items-center justify-center bg-stone-400 hover:bg-${circuito.color} shadow-xl`}
                                    style={{ backgroundColor: isActive ? circuito.bg : "" }}
                                >
                                    <Image
                                        src={circuito.logo}
                                        alt={`Logo ${circuito.nombre}`}
                                        className="h-[60px]"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* --- INICIO DEL NUEVO COMPONENTE SELECTOR DE CIRCUITOS --- */}
                    <div className="w-full max-w-lg mx-auto col-span-6 lg:hidden xl:col-span-1 flex items-center justify-center">
                        {/* El contenedor necesita 'relative' para que el menú desplegable se posicione correctamente */}
                        <div className="relative w-full">
                            {/* Botón que muestra la opción seleccionada y abre/cierra el menú */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                style={{ backgroundColor: circuitoSelected?.bg }}
                                className="w-full flex items-center justify-center p-4 transition-colors duration-300"
                            >
                                {/* Usamos Next Image para mostrar el logo del circuito seleccionado */}
                                {circuitoSelected?.mb &&
                                    <Image
                                        src={circuitoSelected?.mb}
                                        alt={`Logo ${circuitoSelected?.nombre}`}
                                        className="h-[45px] w-auto"
                                    />
                                }
                                {/* Ícono de flecha que rota según el estado 'isOpen' */}
                                <ChevronDown
                                    className={`absolute right-6 text-white h-8 w-8 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Menú desplegable que se muestra solo si 'isOpen' es true */}
                            {isOpen && (
                                <div className="absolute top-full left-0 right-0 bg-neutral-100 z-20000 shadow-lg border-t border-neutral-300">
                                    {/* Mapeamos el objeto 'circuitos' para crear cada una de las opciones */}
                                    {circuitos.map((circuit) => (
                                        <button
                                            key={circuit.nombre}
                                            onClick={() => handleSelectCircuit(circuit.id)}
                                            // Cambiamos el color de fondo para la opción seleccionada
                                            className={`w-full flex items-center justify-center p-4 transition-colors duration-200`}
                                            style={{ backgroundColor: circuitoSelected?.id === circuit.id ? circuit.bg : '#A3A3A3' }}
                                        >
                                            {/* Logo de la opción */}
                                            {circuit.mb &&
                                                <Image
                                                    src={circuit.mb}
                                                    alt={`Logo ${circuit.nombre}`}
                                                    className="h-[30px]  w-auto"
                                                />
                                            }
                                            {/* Ícono de check que aparece solo en la opción seleccionada */}
                                            {circuitoSelected?.id === circuit.id && (
                                                <Check className="absolute right-6 text-gray-100 h-8 w-8" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <CircuitoSec
                    circuitosData={circuitosData}
                    circuitoSeleccionado={circuitoSelected?.nombre}
                />
            </div>
            {/* barra de itinerario */}
            <div className="flex items-center justify-between w-full h-[45px] bg-neutral-500 sticky rounded-t-lg bottom-0 right-0 z-20" style={{ backgroundColor: circuitoSelected.bg }}>
                <p className="font-700 uppercase text-2xl text-white shrink-0 pl-6">
                    Tu itinerario
                </p>
                <div className="w-full h-[30px] bg-neutral-200 rounded-full mx-2 md:flex hidden items-center">
                    {progressWidth > 0 && (
                        <div
                            style={{
                                width: `${progressWidth}%`,
                                backgroundColor: `${circuitoSelected?.bg}`
                            }}
                            className={`h-full rounded-full bg-[#206C60] border-4 border-neutral-200`}

                        ></div>
                    )}
                </div>
                <p className="font-700 uppercase text-2xl text-white shrink-0 md:mr-4">
                    {progressText}
                </p>

                <PDFDownload></PDFDownload>
            </div>
        </div>
    )
}
