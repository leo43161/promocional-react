import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Phone, Mail, Globe, Hotel } from 'lucide-react';

const CardAlojamiento = ({ alojamiento, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="border rounded-lg shadow-md p-4 h-96 w-full animate-pulse bg-white">
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
            <img className='w-5 h-5' key={i} src={'svg/star.svg'}></img>

        ));
    };


    return (
        <div className="border rounded-lg shadow-lg p-4 flex flex-col h-full hover:shadow-lg transition-shadow bg-white">
            <div className="flex justify-center mb-4 h-52 items-center">
                {alojamiento.logo ? (
                    <div className="relative overflow-hidden rounded h-full">
                        <img
                            src={`${process.env.URL_IMG}alojamientos/${alojamiento.logo}`}
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

            <h3 className="text-2xl font-bold text-center mb-2">{alojamiento.nombre}</h3>

            <div className="flex justify-center mb-3">
                <div className="flex space-x-1">
                    {renderStars(alojamiento.estrellas)}
                </div>
            </div>

            <div className="flex items-center mb-2">
                <MapPin className="min-w-5 h-5 text-gray-500 mr-2" />
                {alojamiento.latitud && alojamiento.longitud ? (
                    <a
                        href={`https://www.google.com/maps/search/${alojamiento.latitud},+${alojamiento.longitud}`}
                        className="text-[1.1em] text-secondary hover:underline truncate font-semibold"
                    >

                        <span className="text-[1.1em]">
                            {alojamiento.domicilio}<br />
                            {alojamiento.localidad}
                        </span>
                    </a>
                ) : (<span className="text-[1.1em] text-gray-700">{alojamiento.domicilio} - {alojamiento.localidad}</span>)}
            </div>

            <div className="flex flex-wrap items-center mb-2">
                <Phone className="min-w-5 h-5 text-gray-500 mr-2" />
                {/* <a
                    href={`tel:${alojamiento.telefono}`}
                    className="text-[1.1em] text-secondary hover:underline truncate"
                > */}
                {alojamiento.telefono_final.split(',').map((telefono, index) => (
                    <a href={`tel:${telefono}`} key={index} className="text-[1.1em] text-secondary hover:underline font-semibold">
                        {telefono}<br />
                    </a>
                ))}
                <span className="text-[1.1em] text-gray-700">{alojamiento.telefono}</span>
                {/* </a> */}
            </div>

            {alojamiento.email && (
                <div className="flex items-center mb-2">
                    <Mail className="min-w-5 h-5 text-gray-500 mr-2" />
                    <a
                        href={`mailto:${alojamiento.email}`}
                        className="text-[1.1em] text-secondary hover:underline truncate font-semibold"
                    >
                        {alojamiento.email}
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
                        className="text-[1.1em] text-secondary hover:underline truncate font-semibold"
                    >
                        {alojamiento.web}
                    </a>
                </div>
            )}

            {/* <div className="mt-auto  pt-4">
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
