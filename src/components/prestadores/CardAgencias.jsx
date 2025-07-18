import React from 'react';
import { Phone, Mail, Globe, Facebook, Instagram, MapPin } from 'lucide-react';

export default function CardGuias({ prestador, isLoading = false }) {
    // Si está cargando, mostrar el skeleton
    if (isLoading) {
        return (
            <div className="overflow-hidden h-full rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse">
                {/* Encabezado skeleton */}
                <div className="bg-gray-200 p-4">
                    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                </div>

                {/* Contenido skeleton */}
                <div className="p-4 space-y-4">
                    {/* Datos del prestador skeleton */}
                    <div className="space-y-2">
                        <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                    </div>

                    {/* Actividades skeleton */}
                    <div className="space-y-2">
                        <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    </div>

                    {/* Contactos skeleton */}
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <div className="h-5 w-5 mr-2 bg-gray-200 rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex items-center">
                            <div className="h-5 w-5 mr-2 bg-gray-200 rounded"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    {/* Redes sociales skeleton */}
                    <div className="space-y-2">
                        <div className="h-5 w-1/2 bg-gray-200 rounded mb-2"></div>
                        <div className="flex gap-2">
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Si no está cargando, mostrar el contenido real
    const {
        nombre,
        responsable,
        direccion,
        localidad_nombre,
        telefonos,
        email,
        web,
        facebook,
        instagram,
        legajo
    } = prestador;

    return (
        <div className="overflow-hidden h-full rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Encabezado verde */}
            <div className="bg-secondary p-4 text-white font-medium">
                <h3 className="text-lg font-bold">{nombre}</h3>
            </div>

            {/* Contenido */}
            <div className="p-4">
                {/* Datos del prestador */}
                <div className='flex flex-col gap-3 mb-4'>
                    <p className="text-gray-700 uppercase font-bold">Legajo: {legajo}</p>
                    <p className="text-gray-700 uppercase font-medium">{direccion}</p>
                    <p className="text-gray-700 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-gray-500"></MapPin>
                        {localidad_nombre}
                    </p>
                </div>


                {/* Contactos */}
                <div className="flex flex-col gap-4 mb-4">
                    {telefonos && (
                        <p className="flex items-center text-gray-700 text-xl">
                            <Phone className="h-5 w-5 mr-2 text-gray-500" />
                            {telefonos}
                        </p>
                    )}

                    {email && (
                        <a href={`mailto:${email}`} className="flex items-center text-gray-700 hover:text-primary text-xl">
                                                    <Mail className="h-5 w-5 mr-2 text-gray-500" />
                                                    {email}
                                                </a>
                    )}
                </div>

                {/* Redes sociales */}
                {(web || facebook || instagram) && (
                    <div>
                        <p className="text-gray-800 font-medium uppercase mb-2">Encontranos en</p>
                        <div className="flex gap-2">
                            {web && (
                                <a href={web} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-primary">
                                    <Globe className="h-6 w-6" />
                                </a>
                            )}

                            {facebook && (
                                <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-primary">
                                    <Facebook className="h-6 w-6" />
                                </a>
                            )}

                            {instagram && (
                                <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-primary">
                                    <Instagram className="h-6 w-6" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}