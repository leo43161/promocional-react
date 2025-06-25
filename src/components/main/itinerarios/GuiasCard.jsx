import React, { useState } from 'react';
import Link from 'next/link'; // Se mantiene por si se necesita a futuro
import { MapPin, Mail, Globe, Facebook, Instagram, UserCheck, Star, CirclePlus, Check, UserRound } from 'lucide-react'; // Iconos relevantes para guías
import { useDispatch, useSelector } from "react-redux"; // Se comenta para el entorno de vista previa
import { setFavorito } from '@/redux/features/itinerarioSlice'; // Se comenta para el entorno de vista previa
import clsx from 'clsx'; // Utilidad para clases condicionales

// --- DATOS SIMULADOS PARA VISTA PREVIA ---
// En tu aplicación real, estos datos vendrán de Redux a través de `useSelector`.

const GuiaCard = ({ guia, isFavorite, isLoading = false }) => {

    // --- ESTADO DE CARGA (SKELETON) ---
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg duration-300 overflow-hidden border border-gray-200 md:flex-1 shadow min-w-[72vw] max-w-[72vw] md:min-w-auto md:max-w-auto animate-pulse">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex-shrink-0 rounded-full bg-gray-200 w-7 h-7"></div>
                </div>
                <div className="p-5 flex flex-col gap-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div> {/* Placeholder para tipo registro */}
                    <div className="h-5 bg-gray-200 rounded w-full mt-2"></div> {/* Placeholder para zonas */}
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex items-center text-gray-700 mt-3">
                        <MapPin className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <Mail className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                </div>
            </div>
        );
    }

    const dispatch = useDispatch();
    const { circuitoSelected } = useSelector(state => state.itinerarioReducer.value);

    const [zonasExpanded, setZonasExpanded] = useState(false);

    // Función para manejar la lógica de favoritos (simulada)
    const actualizarFavoritos = (item) => {
        dispatch(setFavorito({ type: 'guias', item }));
    };

    // Componente para renderizar las zonas con lógica de "Ver más"
    const RenderZonas = ({ zonasString }) => {
        if (!zonasString) return null;

        const zonas = zonasString.split(',').map(zona => zona.trim()).filter(Boolean);
        const MAX_ZONAS_VISIBLE = 8;

        if (zonas.length <= MAX_ZONAS_VISIBLE) {
            return (
                <div className="flex flex-wrap gap-2 justify-start mt-2">
                    {zonas.map((zona, index) => (
                        <span key={index} className="text-lg font-semibold px-3 py-0 rounded-full text-white" style={{ backgroundColor: circuitoSelected.color || '#6B7280' }}>
                            {zona}
                        </span>
                    ))}
                </div>
            );
        }

        const visibleZonas = zonas.slice(0, MAX_ZONAS_VISIBLE);
        const hiddenZonas = zonas.slice(MAX_ZONAS_VISIBLE);

        return (
            <div className="flex flex-wrap gap-1 items-center justify-start mt-2">
                {visibleZonas.map((zona, index) => (
                    <span key={index} className="text-lg font-semibold px-3 py-0 rounded-full text-white" style={{ backgroundColor: circuitoSelected.color || '#6B7280' }}>
                        {zona}
                    </span>
                ))}

                {/* --- Botón para expandir/colapsar zonas (Unificado para móvil y escritorio) --- */}
                <div className="w-full">
                    <button onClick={() => setZonasExpanded(!zonasExpanded)} className="text-lg font-bold mt-2 cursor-pointer underline" style={{ color: circuitoSelected.color || '#6B7280' }}>
                        {zonasExpanded ? 'Ver menos' : `Ver ${hiddenZonas.length} más...`}
                    </button>
                    {zonasExpanded && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {hiddenZonas.map((zona, index) => (
                                <span key={index} className="text-lg font-semibold px-3 py-0 rounded-full text-white" style={{ backgroundColor: circuitoSelected.color || '#6B7280' }}>
                                    {zona}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div key={guia.id} className="bg-white rounded-lg duration-300 overflow-hidden border border-gray-200 md:flex-1 shadow min-w-[72vw] max-w-[72vw] md:min-w-auto md:max-w-auto flex flex-col">

            {/* --- CABECERA: Nombre del Guía y Botón de Favoritos --- */}
            <div className="flex items-start justify-between gap-4 px-4 py-3">
                <div className='flex-1'>
                    <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 leading-tight capitalize">
                        {guia.nombre.toLowerCase()}
                    </h3>
                    {/* <p className="text-md font-semibold text-gray-600">
                        {guia.tipo_registro} ({guia.numero_registro.trim()})
                    </p> */}
                </div>
                <button
                    onClick={() => actualizarFavoritos(guia)}
                    className="flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none"
                    style={{ color: circuitoSelected.color }}
                    aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                    {isFavorite ? (
                        <div className='rounded-full w-7 h-7 flex justify-center items-center' style={{ backgroundColor: circuitoSelected.color }}>
                            <Check strokeWidth={3} color="#fff" className="w-4.5 h-4.5" />
                        </div>
                    ) : (
                        <CirclePlus className="w-7 h-7" />
                    )}
                </button>
            </div>

            {/* --- CUERPO DE LA CARD: Información del Guía --- */}
            <div className="px-4 pb-5 flex flex-col gap-3 flex-grow">

                {/* --- ÉNFASIS EN LOCALIDAD Y ZONAS DE OPERACIÓN --- */}
                <div>
                    <span className={`text-xl font-bold underline`} style={{ color: circuitoSelected.color }}>
                        {guia.nombre_localidad}
                    </span>
                    <div className="mt-2">
                        <h4 className="font-semibold text-lg text-gray-800 mb-1">
                            Zonas de Operación:
                        </h4>
                        <RenderZonas zonasString={guia.zona_operacion} />
                    </div>
                </div>

                {/* --- DATOS DE CONTACTO --- */}
                <div className="mt-2 flex flex-col gap-3">
                    {guia.domicilio && (
                        <div className="flex items-center text-gray-700">
                            <MapPin className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                            <span className="font-medium text-lg xl:text-xl line-clamp-1">
                                {guia.domicilio}
                            </span>
                        </div>
                    )}

                    {guia.email && (
                        <div className="flex items-center text-gray-700">
                            <Mail className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                            <a
                                href={`mailto:${guia.email}`}
                                className="font-medium text-lg xl:text-xl hover:underline line-clamp-1"
                                style={{ color: circuitoSelected.color }}
                            >
                                {guia.email}
                            </a>
                        </div>
                    )}

                    {guia.web && (
                        <div className="flex items-center text-gray-700">
                            <Globe className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                            <a
                                href={guia.web}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-lg xl:text-xl hover:underline line-clamp-1"
                                style={{ color: circuitoSelected.color }}
                            >
                                {guia.web.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]}
                            </a>
                        </div>
                    )}

                    {guia.facebook && (
                        <div className="flex items-center text-gray-700">
                            <Facebook className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                            <a
                                href={guia.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-lg xl:text-xl hover:underline line-clamp-1"
                                style={{ color: circuitoSelected.color }}
                            >
                                Facebook
                            </a>
                        </div>
                    )}

                    {guia.instagram && (
                        <div className="flex items-center text-gray-700">
                            <Instagram className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                            <a
                                href={guia.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-lg xl:text-xl hover:underline line-clamp-1"
                                style={{ color: circuitoSelected.color }}
                            >
                                Instagram
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuiaCard;
