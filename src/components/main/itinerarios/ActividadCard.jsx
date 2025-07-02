import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Assuming you might want a detail page for providers later
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, ClipboardList, UserRound, Sparkles, CirclePlus, CircleCheck, Check } from 'lucide-react'; // Added relevant icons
import { useDispatch, useSelector } from "react-redux";
import { setFavorito } from '@/redux/features/itinerarioSlice';


const ActividadCard = ({ actividad, isFavorite, isLoading = false }) => {

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg duration-300 overflow-hidden border border-gray-200 md:flex-1 shadow min-w-[72vw] max-w-[72vw] md:min-w-auto md:max-w-auto animate-pulse">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex-shrink-0 rounded-full bg-gray-200 w-7 h-7"></div>
                </div>
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-50">
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                        <UserRound size={60} />
                    </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                    <div className="h-5 bg-gray-200 rounded w-full"></div> {/* For activities */}
                    <div className="flex items-center text-gray-700">
                        <MapPin className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <Phone className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <Mail className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <Globe className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                </div>
            </div>
        );
    }

    const [imageError, setImageError] = useState(false);
    const dispatch = useDispatch();

    // The 'actualizarFavoritos' function remains similar, just needs to pass the 'actividad' object
    const actualizarFavoritos = (item) => {
        dispatch(setFavorito({ type: 'prestadores', item })); // Changed type to 'prestadores'
    };

    // Reset imageError when the actividad.archivo changes
    useEffect(() => {
        setImageError(false);
    }, [actividad.archivo]);

    const { circuitoSelected } = useSelector(state => state.itinerarioReducer.value);

    // Function to render activities as badges
    const renderActivities = (activitiesString) => {
        if (!activitiesString) return null;
        const activities = activitiesString.split(',').map(activity => activity.trim());
        return (
            <div className="flex flex-wrap gap-2 justify-start">
                {activities.map((activity, index) => (
                    <span
                        key={index}
                        className="text-lg font-semibold px-3 py-0 rounded-full text-white"
                        style={{ backgroundColor: circuitoSelected.color }}
                    >
                        {activity}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div key={actividad.id} className="bg-white rounded-lg duration-300 overflow-hidden border border-gray-200 md:flex-1 shadow min-w-[72vw] max-w-[72vw] md:min-w-auto md:max-w-auto">
            {/* Header with Title and Favorite Button */}
            <div className="flex items-center justify-between gap-4 px-4 py-3">
                <h3 className="text-2xl xl:text-3xl font-bold text-gray-900 leading-tight line-clamp-3">
                    {actividad.titulo} -
                </h3>
                <button
                    onClick={() => actualizarFavoritos(actividad)}
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

            {/* Content Section */}
            <div className="px-4 pb-5 flex flex-col gap-3">
                <span style={{ color: circuitoSelected.color }} className={`text-xl font-bold underline`}>
                    {actividad.nombre_localidad}
                </span>
                {/* Activities Section - Emphasized */}
                {actividad.actividades && (
                    <div className="text-gray-800 text-center mb-1">
                        {/* <h4 className="font-semibold text-2xl underline mb-2">
                            Actividades
                        </h4> */}
                        {renderActivities(actividad.actividades)}
                    </div>
                )}

                {actividad.responsable && (
                    <div className="flex items-center text-gray-700">
                        <UserRound className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium text-lg xl:text-xl line-clamp-1">
                            {actividad.responsable}
                        </span>
                    </div>
                )}

                {actividad.direccion && (
                    <div className="flex items-center text-gray-700">
                        <MapPin className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium text-lg xl:text-xl line-clamp-1">
                            {actividad.direccion}, {actividad.nombre_localidad}
                        </span>
                    </div>
                )}

                {actividad.telefono && (
                    <div className="flex items-center text-gray-700">
                        <Phone className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <a
                            href={`tel:${actividad.telefono}`}
                            className="font-medium text-lg xl:text-xl hover:underline line-clamp-1"
                            style={{ color: circuitoSelected.color }}
                        >
                            {actividad.telefono}
                        </a>
                    </div>
                )}

                {actividad.email && (
                    <div className="flex items-center text-gray-700">
                        <Mail className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <a
                            href={`mailto:${actividad.email}`}
                            className="font-medium text-lg xl:text-xl hover:underline line-clamp-1"
                            style={{ color: circuitoSelected.color }}
                        >
                            {actividad.email}
                        </a>
                    </div>
                )}

                {actividad.web && (
                    <div className="flex items-center text-gray-700">
                        <Globe className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <a
                            href={actividad.web}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-lg xl:text-xl hover:underline line-clamp-1"
                            style={{ color: circuitoSelected.color }}
                        >
                            {actividad.web.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]}
                        </a>
                    </div>
                )}

                {actividad.facebook && (
                    <div className="flex items-center text-gray-700">
                        <Facebook className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <a
                            href={actividad.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-lg xl:text-xl hover:underline line-clamp-1"
                            style={{ color: circuitoSelected.color }}
                        >
                            Facebook
                        </a>
                    </div>
                )}

                {actividad.instagram && (
                    <div className="flex items-center text-gray-700">
                        <Instagram className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <a
                            href={actividad.instagram}
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

            {/* Optional: Details Link */}
            {/* <div className="px-5 pb-5 pt-3">
                <Link href={`/prestadores/${actividad.id}`}>
                    <a className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Ver Detalles
                    </a>
                </Link>
            </div> */}
        </div>
    )
};

export default ActividadCard;