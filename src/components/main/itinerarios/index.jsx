import { useState, useCallback } from "react";
import icons from '@/utils/icons'
import Image from "next/image";
import { CircleArrowRight, ArrowDownToLine, CircleX, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import Modal from "@/components/common/Modal";
import circuitos from "@/data/circuitos";
import CircuitoSec from "./CircuitoSec";

const circuitosData = circuitos();

const { LogoGobtuc, TucumanLogo, HistoricaLogo, HistoricaLogoMb, YungasLogo, YungasLogoMb, ChoromoroLogo, ChoromoroLogoMb, CalchaquiLogo, CalchaquiLogoMb, SurLogoMb, SurLogo } = icons;

export default function Itinerarios() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectCircuit, setSelectCircuit] = useState(1);
    const [favoritos, setFavoritos] = useState([]);
    const [itinerarioProgress, setItinerarioProgress] = useState(0);
    const dias = Math.ceil(itinerarioProgress / 100);
    const progressText = `${dias} día${dias > 1 ? "s" : ""}`;
    const progressWidth = itinerarioProgress > 100 ? 100 : itinerarioProgress;

    const circuitosB = [{
        id: 1,
        nombre: "Historica",
        logo: HistoricaLogo,
        img: "casah",
        color: "historica",
        bg: "#01415C",
        mb: HistoricaLogoMb
    }, {
        id: 4,
        nombre: "Yungas",
        logo: YungasLogo,
        mb: YungasLogoMb,
        img: "quetipi-inicio",
        color: "yungas",
        bg: "#66ac7c",
    }, {
        id: 2,
        nombre: "Choromoro",
        logo: ChoromoroLogo,
        mb: ChoromoroLogoMb,
        img: "pozoindio-inicio",
        color: "choromoro",
        bg: "#FD5901",
    }, {
        id: 3,
        nombre: "Calchaqui",
        logo: CalchaquiLogo,
        mb: CalchaquiLogoMb,
        img: "menhires-inicio",
        color: "calchaqui",
        bg: "#9E2D2C",
    }, {
        id: 5,
        nombre: "Sur",
        logo: SurLogo,
        mb: SurLogoMb,
        img: "sur",
        color: "sur",
        bg: "#508E6D",
    },
    ];

    const selectedCircuit = circuitosB.find((c) => c.id === selectCircuit);
    const actualizarFavoritos = useCallback(
        (nombre) => {
            const nuevosFavoritos = [...favoritos];
            const existe = nuevosFavoritos.includes(nombre);
            if (existe) {
                nuevosFavoritos.splice(nuevosFavoritos.indexOf(nombre), 1);
            } else {
                nuevosFavoritos.push(nombre);
            }
            setFavoritos(nuevosFavoritos);
            const progress =
                (nuevosFavoritos.length / 3) * 100;
            setItinerarioProgress(progress);
        },
        [favoritos]
    );

    const handleDownloadClick = () => {
        setIsOpen(true);
    };


    const handleCloseModal = () => {
        setIsOpen(false);
    };

    // Función para manejar la selección de un nuevo circuito
    const handleSelectCircuit = (key) => {
        setSelectCircuit(key); // Actualiza el circuito seleccionado
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
                        {circuitosB.map((logo, index) => {
                            const isActive = logo.nombre === selectedCircuit?.nombre;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelectCircuit(logo.id)}
                                    className={`w-full h-full p-4 mb-4 flex items-center justify-center bg-stone-400 hover:bg-${logo.color} shadow-xl`}
                                    style={{ backgroundColor: isActive ? logo.bg : "" }}
                                >
                                    <Image
                                        src={logo.logo}
                                        alt={`Logo ${index}`}
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
                                style={{ backgroundColor: selectedCircuit?.bg }}
                                className="w-full flex items-center justify-center p-4 transition-colors duration-300"
                            >
                                {/* Usamos Next Image para mostrar el logo del circuito seleccionado */}
                                {selectedCircuit?.mb &&
                                    <Image
                                        src={selectedCircuit?.mb}
                                        alt={`Logo ${selectedCircuit?.nombre}`}
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
                                    {/* Mapeamos el objeto 'circuitosB' para crear cada una de las opciones */}
                                    {circuitosB.map((circuit) => (
                                        <button
                                            key={circuit.nombre}
                                            onClick={() => handleSelectCircuit(circuit.id)}
                                            // Cambiamos el color de fondo para la opción seleccionada
                                            className={`w-full flex items-center justify-center p-4 transition-colors duration-200`}
                                            style={{ backgroundColor: selectCircuit === circuit.id ? circuit.bg : '#A3A3A3' }}
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
                                            {selectCircuit === circuit.id && (
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
                    favoritos={favoritos}
                    actualizarFavoritos={actualizarFavoritos}
                    circuitoSeleccionado={selectedCircuit?.nombre}
                />
            </div>
            {/* barra de itinerario */}
            <div className="flex items-center w-full h-[45px] bg-neutral-500 sticky rounded-t-lg bottom-0 right-0" style={{ backgroundColor: selectedCircuit.bg }}>
                <p className="font-700 uppercase text-2xl text-white shrink-0 pl-6">
                    Tu itinerario
                </p>
                <div className="w-full h-[30px] bg-neutral-200 rounded-full mx-2 flex items-center ">
                    {progressWidth > 0 && (
                        <div
                            style={{
                                width: `${progressWidth}%`,
                                backgroundColor: `${selectedCircuit?.bg}`
                            }}
                            className={`h-full rounded-full bg-[#206C60] border-4 border-neutral-200`}

                        ></div>
                    )}
                </div>
                <p className="font-700 uppercase text-2xl text-white shrink-0 mr-4">
                    {progressText}
                </p>

                <button
                    className="flex items-center px-4 text-white cursor-pointer h-full hover:bg-white hover:text-black transition-all duration-300"
                    onClick={handleDownloadClick}
                >
                    <ArrowDownToLine className="text-[26px]" />{" "}
                    <p className="font-700 uppercase text-2xl  ml-2">Descargar</p>
                </button>
            </div>


        </div>
    )
}
