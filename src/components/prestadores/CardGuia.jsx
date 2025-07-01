import React from 'react';
// Se importa el nuevo icono FileText
import { Mail, Globe, Facebook, Instagram, CircleSmall, FileText } from 'lucide-react';

// Se añade el nuevo prop 'pdfBaseUrl'
export default function CardGuia({
    guia,
    pdfBaseUrl = 'https://www.tucumanturismo.gob.ar/files/guias',
    isLoading = false
}) {
    // Si está cargando, mostrar el skeleton (vista esqueleto)
    if (isLoading) {
        return (
            <div className="overflow-hidden h-full rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse">
                <div className="bg-gray-200 p-4">
                    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                </div>
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <div className="h-5 w-5 mr-2 bg-gray-200 rounded"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-5 w-1/2 bg-gray-200 rounded mb-2"></div>
                        <div className="flex gap-2">
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    {/* INICIO: Skeleton para el nuevo botón de PDF */}
                    <div className="pt-4 mt-4 border-t border-gray-200">
                        <div className="h-10 w-full bg-gray-200 rounded-md"></div>
                    </div>
                    {/* FIN: Skeleton para el nuevo botón de PDF */}
                </div>
            </div>
        );
    }

    // Se de-estructura 'archivo' para usarlo
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
        archivo // <-- Nuevo campo
    } = guia;

    return (
        <div className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Encabezado */}
            <div className="bg-secondary p-4 text-white">
                <h3 className="text-lg font-bold uppercase">{nombre}</h3>
            </div>

            {/* Contenido (ocupa el espacio restante) */}
            <div className="flex-grow p-4 space-y-4">
                {/* Datos del Guía */}
                <div>
                    <p className="text-gray-800 font-medium">{tipo_registro} ({numero_registro})</p>
                    {domicilio && <p className="text-gray-700">{domicilio}</p>}
                    {nombre_localidad && <p className="text-gray-700 font-semibold">{nombre_localidad}</p>}
                </div>

                {/* Zonas de Operación */}
                {zona_operacion && (
                    <div>
                        <p className="text-gray-800 font-bold uppercase">Zonas de Operación</p>
                        <ul className="text-gray-700">
                            {zona_operacion.split(",").map((zona, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="text-primary mr-1"><CircleSmall size={16} /></span>
                                    <span className='font-semibold'>{zona.trim()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Contacto */}
                <div className="space-y-2">
                    {email && (
                        <a href={`mailto:${email}`} className="flex items-center text-gray-700 hover:text-primary">
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
                            {web && (<a href={web} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary"><Globe className="h-6 w-6" /></a>)}
                            {facebook && (<a href={facebook} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary"><Facebook className="h-6 w-6" /></a>)}
                            {instagram && (<a href={instagram} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary"><Instagram className="h-6 w-6" /></a>)}
                        </div>
                    </div>
                )}
            </div>

            {/* INICIO: Nueva sección para el botón del PDF */}
            {/* Se muestra solo si 'archivo' y 'pdfBaseUrl' existen */}
            {archivo && (
                <div className="p-4 mt-auto border-t border-gray-200">
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
            {/* FIN: Nueva sección para el botón del PDF */}
        </div>
    );
}