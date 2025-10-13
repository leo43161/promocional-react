import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';
import { CircleArrowRight, ChevronDown, Check } from 'lucide-react';
import circuitos from "@/data/circuitos";
import CircuitoSec from "./CircuitoSec";
import { useSelector, useDispatch } from "react-redux";
import { setActiveComponent, setCircuitoSelected, setFavorito, setFavReset } from "@/redux/features/itinerarioSlice";
import { getCurrentLanguage } from "@/utils";
import { useRouter } from "next/router";

const circuitosData = circuitos();
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
    const [AUTOPLAY_DURATION, setAutoplay] = useState(20000)
    const [INACTIVITY_THRESHOLD, setInactivity] = useState(17000)
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        if (window.innerWidth >= 1024) {
            setAutoplay(17000);
            setInactivity(15000);
        } else {
            setAutoplay(40000);
            setInactivity(13000);
        }
    }, []);
    const {
        progress,
        circuitoSelected,
        circuitos,
        circuitosEN
    } = useSelector(state => state.itinerarioReducer.value);

    const [circuitosIdioma, setCircuitosIdioma] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // Estados para controlar el autoplay y la interacción del usuario
    const [autoPlayActive, setAutoPlayActive] = useState(true);
    const [userInteracted, setUserInteracted] = useState(false);
    const [currentAutoplayIndex, setCurrentAutoplayIndex] = useState(0);

    // Estado para la anchura de la barra de progreso (controlada por JS)
    const [currentProgressBarWidth, setCurrentProgressBarWidth] = useState(0);

    // Refs para los timers y la animación de la barra
    const autoplayTimerRef = useRef(null);
    const inactivityTimerRef = useRef(null);
    const animationFrameIdRef = useRef(null);
    const startTimeRef = useRef(null);

    const dias = Math.ceil(progress / 100);
    const progressText = `${dias} día${dias > 1 ? "s" : ""}`;
    const progressWidth = progress > 100 ? 100 : progress;
    const lenguaje = getCurrentLanguage(router.query);

    // Función para reiniciar el timer de inactividad
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimerRef.current);
        setUserInteracted(true);
        setAutoPlayActive(false); // Detiene el autoplay
        // Detener y resetear la animación de la barra inmediatamente
        cancelAnimationFrame(animationFrameIdRef.current);
        setCurrentProgressBarWidth(0);
        inactivityTimerRef.current = setTimeout(() => {
            setUserInteracted(false);
            setAutoPlayActive(true);
            setCurrentProgressBarWidth(0); // Reiniciar barra al reanudar autoplay
        }, INACTIVITY_THRESHOLD);
    };

    // Efecto para inicializar los circuitos por idioma y el estado de autoplay en la carga inicial
    useEffect(() => {
        if (!router.isReady) return;

        const langCircuitos = lenguaje.code === "EN" ? circuitosEN : circuitos;
        setCircuitosIdioma(langCircuitos);

        // Si es la carga inicial y no ha habido interacción
        if (!userInteracted) {
            dispatch(setCircuitoSelected(langCircuitos[0].id));
            setCurrentAutoplayIndex(0);
            setAutoPlayActive(true);
            setCurrentProgressBarWidth(0); // Asegurar que la barra inicie en 0
        } else {
            // Si ya hubo interacción, busca el índice del circuito seleccionado por el usuario
            const selectedIdx = langCircuitos.findIndex(c => c.id === circuitoSelected.id);
            if (selectedIdx !== -1) {
                setCurrentAutoplayIndex(selectedIdx);
            } else {
                // Fallback si el circuito seleccionado no se encuentra (ej. cambio de idioma con circuito no existente)
                dispatch(setCircuitoSelected(langCircuitos[0].id));
                setCurrentAutoplayIndex(0);
            }
        }
        dispatch(setFavReset());
        resetInactivityTimer();
        setUserInteracted(false);
        setAutoPlayActive(true);
        setCurrentProgressBarWidth(0);
    }, [router.isReady, router.query.lang, circuitos, circuitosEN]);


    // Efecto para gestionar el autoplay de los circuitos
    useEffect(() => {
        clearTimeout(autoplayTimerRef.current);

        if (!autoPlayActive || userInteracted || circuitosIdioma.length === 0) {
            cancelAnimationFrame(animationFrameIdRef.current); // Detener animación de barra
            setCurrentProgressBarWidth(0); // Resetear barra
            return;
        }

        const currentCircuit = circuitosIdioma[currentAutoplayIndex];
        if (circuitoSelected?.id !== currentCircuit.id) {
            dispatch(setCircuitoSelected(currentCircuit.id));
        }

        // Reiniciar la barra de progreso al cambiar de circuito
        setCurrentProgressBarWidth(0);
        startTimeRef.current = null; // Reiniciar el tiempo de inicio para la animación de la barra

        // Función de animación para la barra de progreso
        const animateProgressBar = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(1, elapsed / AUTOPLAY_DURATION);
            setCurrentProgressBarWidth(progress * 100);

            if (progress < 1) {
                animationFrameIdRef.current = requestAnimationFrame(animateProgressBar);
            } else {
                // Si la animación se completa, asegura que la barra esté al 100%
                setCurrentProgressBarWidth(100);
            }
        };

        // Iniciar la animación de la barra de progreso
        animationFrameIdRef.current = requestAnimationFrame(animateProgressBar);

        // Configura el temporizador para pasar al siguiente circuito
        autoplayTimerRef.current = setTimeout(() => {
            const nextIndex = (currentAutoplayIndex + 1) % circuitosIdioma.length;
            setCurrentAutoplayIndex(nextIndex);
        }, AUTOPLAY_DURATION);

        // Función de limpieza
        return () => {
            clearTimeout(autoplayTimerRef.current);
            cancelAnimationFrame(animationFrameIdRef.current);
            setCurrentProgressBarWidth(0); // Asegurar que la barra se resetea al limpiar
        };
    }, [autoPlayActive, userInteracted, currentAutoplayIndex, circuitosIdioma, dispatch, circuitoSelected]);


    // Función para manejar la selección de un nuevo circuito por el usuario
    const handleSelectCircuit = (id) => {
        dispatch(setActiveComponent("destinos"));
        dispatch(setCircuitoSelected(id));
        setIsOpen(false);

        // Sincroniza el índice interno del autoplay con la selección del usuario
        const selectedIdx = circuitosIdioma.findIndex(c => c.id === id);
        if (selectedIdx !== -1) {
            setCurrentAutoplayIndex(selectedIdx);
        }

        resetInactivityTimer(); // Reinicia el timer de inactividad
    };

    return (
        <div className="relative" onMouseOver={() => resetInactivityTimer()}>
            <div className="w-full">
                <div className="grid grid-cols-6 justify-center w-full">
                    <div className="bg-[#206C60] col-span-6 md:col-span-1 flex items-center p-2 xl:pl-12 justify-center lg:p-3">
                        {lenguaje && lenguaje.code !== "EN" && <p className="col-span-2 xl:col-span-3 text-[24px] lg:text-[26px] xl:text-[30px] leading-7 pr-2 font-400 text-white xl:shrink-0 lg:ms-2">
                            Elegí tu destino y <br className="hidden xl:block" /> planifica tu viaje
                        </p>}
                        {lenguaje && lenguaje.code === "EN" && <p className="col-span-2 xl:col-span-3 text-[24px] lg:text-[26px] xl:text-[30px] leading-7 pr-2 font-400 text-white xl:shrink-0 lg:ms-2">
                            Choose your destination and<br className="hidden xl:block" /> plan your trip
                        </p>}
                        <CircleArrowRight className="text-white hidden lg:block lg:size-12 xl:text-[40px]" />
                    </div>

                    <div className="hidden lg:col-span-5 xl:col-span-5 lg:flex lg:flex-row overflow-hidden">
                        {circuitosIdioma.map((circuito, index) => {
                            const isActive = circuito.id === circuitoSelected?.id;
                            // Determina si este circuito está siendo auto-reproducido actualmente
                            const isCurrentlyAutoPlayingThisCircuit =
                                isActive && autoPlayActive && !userInteracted;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelectCircuit(circuito.id)}
                                    className={`w-full h-full p-4 mb-4 flex items-center justify-center bg-stone-400 hover:bg-${circuito.color} shadow-xl relative overflow-hidden`}
                                    style={{ backgroundColor: isActive ? (autoPlayActive ? circuito.bg + "d2" : circuito.bg) : "" }}
                                >
                                    {/* Barra de progreso */}
                                    {isCurrentlyAutoPlayingThisCircuit && (
                                        <div
                                            className="absolute top-0 left-0 h-full bg-gray-400 "
                                            style={{
                                                width: `${currentProgressBarWidth}%`,
                                                backgroundColor: circuito.bg
                                            }}
                                        ></div>
                                    )}
                                    <img
                                        src={process.env.URL_IMG_LOCAL + "/svg/itinerarios/" + circuito.logo}
                                        alt={`Logo ${circuito.nombre}`}
                                        className="h-[60px] relative z-10"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* --- INICIO DEL NUEVO COMPONENTE SELECTOR DE CIRCUITOS --- */}
                    <div className="w-full max-w-lg mx-auto col-span-6 lg:hidden xl:col-span-1 flex items-center justify-center">
                        <div className="relative w-full">
                            <button
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    setUserInteracted(true);
                                    setAutoPlayActive(false);
                                    cancelAnimationFrame(animationFrameIdRef.current); // Detener animación de barra al abrir dropdown
                                    setCurrentProgressBarWidth(0); // Resetear barra
                                    resetInactivityTimer();
                                }}
                                style={{ backgroundColor: autoPlayActive ? circuitoSelected?.bg + "d2" : circuitoSelected?.bg }}
                                className="w-full flex items-center justify-center p-4 transition-colors duration-300"
                            >
                                {circuitoSelected?.mb &&
                                    <img
                                        src={process.env.URL_IMG_LOCAL + "/svg/itinerarios/" + circuitoSelected?.mb}
                                        alt={`Logo ${circuitoSelected?.nombre}`}
                                        className="h-[45px] w-auto z-10"
                                    />
                                }

                                <div
                                    className="absolute top-0 left-0 h-full bg-gray-400"
                                    style={{
                                        width: `${currentProgressBarWidth}%`,
                                        backgroundColor: circuitoSelected.bg
                                    }}
                                ></div>
                                <ChevronDown
                                    className={`absolute right-6 text-white h-8 w-8 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {isOpen && (
                                <div className="absolute top-full left-0 right-0 bg-neutral-100 z-20000 shadow-lg border-t border-neutral-300">
                                    {circuitosIdioma.map((circuit) => (
                                        <button
                                            key={circuit.nombre}
                                            onClick={() => handleSelectCircuit(circuit.id)}
                                            className={`w-full flex items-center justify-center p-4 transition-colors duration-200`}
                                            style={{ backgroundColor: circuitoSelected?.id === circuit.id ? circuit.bg : '#A3A3A3' }}
                                        >
                                            {circuit.mb &&
                                                <img
                                                    src={process.env.URL_IMG_LOCAL + "/svg/itinerarios/" + circuit.mb}
                                                    alt={`Logo ${circuit.nombre}`}
                                                    className="h-[30px] w-auto"
                                                />
                                            }
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
            <div className="flex items-center justify-between w-full h-[45px] bg-neutral-500 sticky rounded-t-lg bottom-0 right-0 z-20" style={{ backgroundColor: circuitoSelected?.bg }}>
                <p className="font-700 uppercase text-2xl text-white shrink-0 pl-6">
                    {lenguaje.code === 'ES' ? 'Tu itinerario' : 'Your itinerary'}
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