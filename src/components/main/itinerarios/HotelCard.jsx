import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BedDouble, Star, MapPin, Phone, Mail, Globe, CircleCheck, CirclePlus, Check } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { setFavorito } from '@/redux/features/itinerarioSlice';


const HotelCard = ({ hotel, isFavorite, isLoading = false }) => {
console.log(hotel);
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg duration-300 overflow-hidden border border-gray-200 md:flex-1 shadow min-w-[72vw] max-w-[72vw] md:min-w-auto md:max-w-auto animate-pulse">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div
                        className="flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none animate-pulse"
                    >
                        <CirclePlus className="w-7 h-7" />
                    </div>
                </div>
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-50">
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                        <BedDouble size={60} />
                    </div>
                </div>

                <div className="p-5 flex flex-col gap-3">

                    <div className="h-4 bg-gray-200 rounded w-5/10 mx-auto"></div>

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
    const actualizarFavoritos = (item) => {
        dispatch(setFavorito({ type: 'alojamientos', item }));
    };
    // Mapping the provided data to more descriptive property names
    const hotelData = {
        id: hotel.id,
        nombre: hotel.nombre,
        estrellas: parseInt(hotel.estrellas), // Convert stars to a number
        logo: hotel.logo, // Assuming 'archivo' is the logo file name
        ubicacion: hotel.ubicacion,
        descripcion: hotel.descripcion,
        direccion: hotel.direccion,
        telefono: hotel.telefono,
        email: hotel.mail,
        web: hotel.web,
        latitud: hotel.latitud,
        longitud: hotel.longitud,
        localidad: hotel.nombreLocalidad,
        // Using 'telefono' for general display, and 'telefono_final' could be used if multiple numbers are comma-separated elsewhere
        // For this example, I'm using the 'telefono' directly for display.
        telefono_final: hotel.telefono.split(',').map(tel => tel.trim()), // Split and trim if multiple numbers are expected
    };

    useEffect(() => {
        setImageError(false);
    }, [hotelData.logo]);

    const renderStars = (count) => {
        return Array.from({ length: count }, (_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ));
    };

    const {
        circuitoSelected,
    } = useSelector(state => state.itinerarioReducer.value);

    return (
        <div key={hotelData.id} className="bg-white rounded-lg duration-300 overflow-hidden border border-gray-200 md:flex-1 shadow min-w-[72vw] max-w-[72vw] md:min-w-auto md:max-w-auto">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
                <h3 className="text-2xl xl:text-3xl font-semibold text-gray-900 line-clamp-1 leading-tight">
                    {hotelData.nombre}
                </h3>
                <button
                    onClick={() => actualizarFavoritos(hotel)}
                    className="flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none"
                    style={{ color: circuitoSelected.color }}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-50">
                {hotelData.logo && !imageError ? (
                    <Image
                        src={`https://www.tucumanturismo.gob.ar/public/img/alojamientos/${hotelData.logo}`}
                        alt={hotelData.nombre}
                        layout="fill"
                        objectFit="cover"
                        onError={() => setImageError(true)} // Set imageError to true on error
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                        <BedDouble size={60} />
                    </div>
                )}
                <div
                    className={`font-bold rounded text-white text-2xl lg:text-2xl w-fit px-3 absolute bottom-2 left-2 z-10`}
                    style={{ backgroundColor: circuitoSelected.color }}
                >
                    {hotelData.localidad}
                </div>
            </div>

            <div className="p-5 flex flex-col gap-3">

                {hotelData.estrellas > 0 && (
                    <div className="flex items-center gap-1 justify-center">
                        {renderStars(hotelData.estrellas)}
                    </div>
                )}

                <div className="flex items-center text-gray-700">
                    <MapPin className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                    {hotelData.latitud && hotelData.longitud ? (
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${hotelData.latitud},${hotelData.longitud}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-lg xl:text-2xl hover:underline line-clamp-1"
                            style={{ color: circuitoSelected.color }}
                        >
                            {hotelData.direccion}, {hotelData.localidad}
                        </a>
                    ) : (
                        <span className="font-medium text-lg xl:text-2xl line-clamp-1">
                            {hotelData.direccion}, {hotelData.localidad}
                        </span>
                    )}
                </div>

                {hotelData.telefono && hotelData.telefono_final.length > 0 && (
                    <div className="flex items-center text-gray-700">
                        <Phone className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <div className="flex flex-wrap gap-x-2">
                            {hotelData.telefono_final.map((tel, index) => (
                                <div
                                    key={index}
                                    href={`tel:${tel}`}
                                    className="font-medium text-lg xl:text-2xl"
                                    style={{ color: circuitoSelected.color }}

                                >
                                    {tel}
                                    {index < hotelData.telefono_final.length - 1 && ','}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {hotelData.email && (
                    <div className="flex items-center text-gray-700">
                        <Mail className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <a
                            href={`mailto:${hotelData.email}`}
                            className="font-medium text-lg xl:text-2xl hover:underline line-clamp-1"
                            style={{ color: circuitoSelected.color }}

                        >
                            {hotelData.email}
                        </a>
                    </div>
                )}

                {hotelData.web && (
                    <div className="flex items-center text-gray-700">
                        <Globe className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2" />
                        <a
                            href={hotelData.web}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-lg xl:text-2xl hover:underline line-clamp-1"
                            style={{ color: circuitoSelected.color }}

                        >
                            {hotelData.web.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelCard;