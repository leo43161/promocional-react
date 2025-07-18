import React from 'react';
import Image from 'next/image'; // Asumiendo Next.js para el componente Image
import Link from 'next/link'; // Asumiendo Next.js para el componente Link
import { Mail, Globe, Facebook, Instagram, CircleSmall, FileText } from 'lucide-react';

// Componente Skeleton genérico, adaptado para la nueva disposición
const CardGuiaSkeleton = () => {
    return (
        <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex w-full animate-pulse">
                {/* Skeleton de la Imagen */}
                <div className="md:w-48 min-w-50 h-48 md:h-auto bg-gray-300"></div>

                {/* Skeleton del Contenido */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                        {/* Skeleton de Título */}
                        <div className="bg-gray-300 h-6 w-3/4 rounded mb-3"></div>

                        {/* Skeleton de Subtítulos/Detalles */}
                        <div className="space-y-2 mb-4">
                            <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
                            <div className="bg-gray-300 h-4 w-full rounded"></div>
                            <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
                        </div>

                        {/* Skeleton de Zonas de Operación */}
                        <div className="space-y-2 mb-4">
                            <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                            <div className="bg-gray-300 h-4 w-full rounded"></div>
                        </div>

                        {/* Skeleton de Contacto */}
                        <div className="bg-gray-300 h-4 w-3/5 rounded mb-4"></div>
                    </div>

                    {/* Skeleton de Redes Sociales */}
                    <div className="flex gap-2 mt-auto">
                        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
                        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
                        <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
                    </div>
                     {/* Skeleton del botón PDF */}
                    <div className="mt-4">
                        <div className="bg-gray-300 h-10 w-full rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CardGuiaBusqueda({
    guia,
    pdfBaseUrl = 'https://www.tucumanturismo.gob.ar/files/guias',
    isLoading = false
}) {
    if (isLoading || !guia) {
        return <CardGuiaSkeleton />;
    }

    const {
        nombre,
        tipo_registro,
        numero_registro,
        domicilio,
        nombre_localidad,
        email,
        web,
        facebook,
        instagram,
        zona_operacion,
        archivo
    } = guia;

    // URL de la imagen placeholder si no hay una imagen definida para la guía
   
    return (
    <div className="flex flex-col md:flex-row w-full my-4 bg-white shadow-sm border border-slate-200 rounded-lg p-6">
        {/* Información principal: Ocupa 2/3 del ancho en pantallas md y mayores */}
        <div className="flex flex-col justify-between flex-grow md:w-2/3 md:pr-4"> {/* Añadimos pr-4 para un poco de espacio entre columnas */}
            <div>
                <h4 className="mb-2 text-secondary text-2xl font-bold text-center uppercase">
                    {nombre}
                </h4>
                <p className="text-gray-800 font-medium text-xl">{tipo_registro} ({numero_registro})</p>
                {domicilio && <p className="text-gray-700">{domicilio}</p>}
                {nombre_localidad && <p className="text-gray-700 font-semibold">{nombre_localidad}</p>}

                {zona_operacion && (
                    <div className="mt-4">
                        <p className="text-gray-800 font-bold uppercase text-xl mb-2">Zonas de Operación</p>
                        <ul className="text-gray-700 flex flex-wrap gap-2">
                            {zona_operacion.split(",").map((zona, index) => (
                                <li key={index} className="flex items-center w-full md:w-[calc(50%-0.5rem)] mb-1">
                                    {" "}
                                    <span className="text-primary mr-1"><CircleSmall size={16} /></span>
                                    <span className='font-semibold'>{zona.trim()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>

        {/* Contacto y botón: Ocupa 1/3 del ancho en pantallas md y mayores */}
        <div className="flex flex-col justify-center items-center md:w-1/3 mt-4 md:mt-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0"> {/* Añadimos pl-4 y un borde para separar visualmente */}
            {email && (
                <a href={`mailto:${email}`} className="flex items-center text-gray-700 hover:text-primary mb-2">
                    <Mail className="h-5 w-5 mr-2 text-gray-500" />
                    {email}
                </a>
            )}

            {(web || facebook || instagram) && (
                <div className="mt-4">
                    <p className="text-gray-800 text-base font-medium uppercase mb-2">Encontranos en</p>
                    <div className="flex gap-2">
                        {web && (<a href={web} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary"><Globe className="h-6 w-6" /></a>)}
                        {facebook && (<a href={facebook} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary"><Facebook className="h-6 w-6" /></a>)}
                        {instagram && (<a href={instagram} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary"><Instagram className="h-6 w-6" /></a>)}
                    </div>
                </div>
            )}

            {archivo && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                    <a
                        href={`${pdfBaseUrl}/${archivo.trim()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <FileText className="w-5 h-5 mr-2" />
                        Ver Ficha del Guía
                    </a>
                </div>
            )}
        </div>
    </div>
);
}