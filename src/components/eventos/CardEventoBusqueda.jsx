import React from 'react';
import Image from 'next/image'; // Asumiendo Next.js para el componente Image
import Link from 'next/link'; // Asumiendo Next.js para el componente Link
import { Clock, MapPin } from 'lucide-react';
import Button from '../common/Button'; // Asegúrate de que esta ruta sea correcta

// Componente Skeleton genérico, adaptado para la nueva disposición
const CardEventoSkeleton = () => {
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

                        {/* Skeleton de Fechas */}
                        <div className="bg-gray-300 h-4 w-1/2 rounded mb-3"></div>

                        {/* Skeleton de Hora */}
                        <div className="flex items-center mb-3">
                            <div className="h-5 w-5 mr-2 bg-gray-300 rounded"></div>
                            <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                        </div>

                        {/* Skeleton de Dirección */}
                        <div className="flex items-center mb-3">
                            <div className="h-5 w-5 mr-2 bg-gray-300 rounded"></div>
                            <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                        </div>
                    </div>

                    {/* Skeleton del Botón "Conocé más aquí" */}
                    <div className="mt-6">
                        <div className="bg-gray-300 h-10 w-36 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CardEventoBusqueda({ evento, isLoading = false }) {
    function formatearFecha(fechaStr) {
        if (!fechaStr) return '';
        const [año, mes, día] = fechaStr.split('-').map(Number);
        const fecha = new Date(año, mes - 1, día); // ¡Mes va de 0 a 11!
        const dia = fecha.getDate(); // día sin cero a la izquierda
        const mesAbrev = fecha.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
        return `${dia} ${mesAbrev}`;
    }

    if (isLoading || !evento) {
        return <CardEventoSkeleton />;
    }

    const {
        id,
        nombre,
        imagen,
        imagenMovil, // Si aplica también a eventos
        fechaInicio,
        fechaFin,
        horaInicio,
        direccion
    } = evento;

    // Ajusta la URL de la imagen según tus datos de evento
    const imageUrl = process.env.URL_IMG + (imagenMovil ? imagenMovil : imagen);

    return (
        <div className="relative flex flex-col md:flex-row w-full my-4 bg-white shadow-sm border border-slate-200 rounded-lg">
            <div className="md:flex">
                <div className="relative md:h-full md:min-w-70 md:max-w-70 h-48">
                    <Image
                        src={imageUrl}
                        alt={nombre}
                        style={{ objectFit: 'cover' }}
                        fill
                        className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none object-cover"
                    />
                     <div className='rounded-b-md absolute top-0 left-8 shadow-lg bg-white py-1 px-1 flex justify-center'>
                         <h4 className='font-bold text-sm'>{formatearFecha(fechaInicio)} - {formatearFecha(fechaFin)}</h4>
                     </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                        <h4 className="mb-2 text-slate-800 text-3xl font-semibold">
                            {nombre}
                        </h4>

                        <div className='flex items-center gap-2 mb-2'>
                            <div>
                                <Clock className='font-bold text-lg' size={17} />
                            </div>
                            <span>{horaInicio.slice(0, 5)}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div>
                                <MapPin className='font-bold text-lg' size={17} />
                            </div>
                            <span className='text-base'>{direccion}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        {/* Asegúrate de que Button reciba 'href' para funcionar como Link de Next.js si es el caso */}
                        <Link href={`/eventos/evento?id=${id}`} passHref legacyBehavior>
                            <Button className='shadow-lg' size='sm'>
                                Conocé más aquí
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}