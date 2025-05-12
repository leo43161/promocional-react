import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Phone, Mail, Globe, Hotel } from 'lucide-react';

const CardAlojamiento = ({ alojamiento, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="border rounded-lg shadow-md p-4 h-96 w-full animate-pulse">
                <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-center mb-3">
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
            </div>
        );
    }

    const renderStars = (count) => {
        return [...Array(Number(count))].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ));
    };

    return (
        <div className="border rounded-lg shadow-md p-4 flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 h-52 items-center">
                {alojamiento.archivo ? (
                    <div className="relative overflow-hidden rounded h-full">
                        <img
                            src={`https://www.tucumanturismo.gob.ar/carga/image/${alojamiento.archivo}`}
                            alt={alojamiento.nombre}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ) : (
                    <div className="w-34 h-34 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500">
                            <Hotel size={40}></Hotel>
                        </span>
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold text-center mb-2">{alojamiento.nombre}</h3>

            <div className="flex justify-center mb-3">
                <div className="flex space-x-1">
                    {renderStars(alojamiento.estrellas)}
                </div>
            </div>

            <div className="flex items-center mb-2">
                <MapPin className="min-w-5 h-5 text-gray-500 mr-2" />
                {alojamiento.latitude && alojamiento.longitude ? (
                    <a
                        href={`https://www.google.com/maps/search/${alojamiento.latitude},+${alojamiento.longitude}`}
                        className="text-sm text-secondary hover:underline truncate"
                    >
                        
                        <span className="text-sm">
                            {alojamiento.direccion}<br />
                            {alojamiento.localidad}
                        </span>
                    </a>
                ) : (<span className="text-sm text-gray-700">{alojamiento.direccion}</span>)}
            </div>

            <div className="flex items-center mb-2">
                <Phone className="min-w-5 h-5 text-gray-500 mr-2" />
                {/* <a
                    href={`tel:${alojamiento.telefono}`}
                    className="text-sm text-secondary hover:underline truncate"
                > */}

                <span className="text-sm text-gray-700">{alojamiento.telefono}</span>
                {/* </a> */}
            </div>

            {alojamiento.mail && (
                <div className="flex items-center mb-2">
                    <Mail className="min-w-5 h-5 text-gray-500 mr-2" />
                    <a
                        href={`mailto:${alojamiento.mail}`}
                        className="text-sm text-secondary hover:underline truncate"
                    >
                        {alojamiento.mail}
                    </a>
                </div>
            )}

            {alojamiento.web && (
                <div className="flex items-center mb-2">
                    <Globe className="min-w-5 h-5 text-gray-500 mr-2" />
                    <a
                        href={alojamiento.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-secondary hover:underline truncate"
                    >
                        {alojamiento.web}
                    </a>
                </div>
            )}

            {/* <div className="mt-auto pt-4">
                <Link
                    href={`/alojamientos/${alojamiento.id}`}
                    className="block text-center bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition-colors"
                >
                    Ver Detalles
                </Link>
            </div> */}
        </div>
    );
};

export default CardAlojamiento;