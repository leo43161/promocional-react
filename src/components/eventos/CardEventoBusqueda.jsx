import React from 'react';
import Image from 'next/image'; // Asumiendo Next.js para el componente Image
import Link from 'next/link'; // Asumiendo Next.js para el componente Link
import { Clock, MapPin, Calendar } from 'lucide-react';
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
        direccion,
        descripcion,
        nombreCategoria,
        nombreLocalidad
    } = evento;

    // Ajusta la URL de la imagen según tus datos de evento
    const imageUrl = process.env.URL_IMG + (imagenMovil ? imagenMovil : imagen);

    return (
        <a className="relative flex flex-col md:flex-row w-full my-4 bg-white shadow-sm border border-slate-200 rounded-lg" href={`/eventos/evento?id=${id}`}>
            <div className="md:flex w-full">
                <div className="relative md:h-full md:min-w-70 md:max-w-70 h-65">
                    <Image
                        src={imageUrl}
                        alt={nombre}
                        style={{ objectFit: 'cover' }}
                        fill
                        className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none object-cover"
                    />
                    <div className='rounded-b-md absolute top-0 left-8 shadow-lg bg-white py-1 px-2 flex justify-center'>
                        <h4 className='font-bold text-xl'>{formatearFecha(fechaInicio)} - {formatearFecha(fechaFin)}</h4>
                    </div>
                </div>

                <div className="p-6 flex flex-col justify-between w-full">
                    <div className='w-full mb-4'>
                        <div className='flex justify-between w-full gap-2 mb-1'>
                            <h4 className="mb-2 text-slate-800 text-4xl font-bold">
                                {nombre}
                            </h4>
                            <div className="bg-secondary px-3 py-1 text-[1.1em] font-medium rounded mb-3 text-white text-nowrap h-fit hidden md:block">
                                {nombreCategoria || 'Evento'}
                            </div>
                        </div>

                        <div className='flex items-center gap-2 mb-2'>
                            <div>
                                <Clock className='font-bold text-lg' size={21} />
                            </div>
                            <span className='font-semibold text-xl'>{horaInicio.slice(0, 5)}</span>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <div>
                                <MapPin className='font-bold text-lg' size={21} />
                            </div>
                            <span className='font-semibold text-xl'>{direccion} - {nombreLocalidad}</span>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <div>
                                <Calendar className='font-bold text-lg' size={21} />
                            </div>
                            <span className='font-semibold text-xl'>{formatearFecha(fechaInicio)} - {formatearFecha(fechaFin)}</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='text-xl line-clamp-2'>{descripcion}</span>
                        </div>
                    </div>

                    <div>
                        {/* Asegúrate de que Button reciba 'href' para funcionar como Link de Next.js si es el caso */}
                        <Link href={`/eventos/evento?id=${id}`} passHref legacyBehavior>
                            <Button className='shadow-lg cursor-pointer'  size='sm'>
                                Conocé más aquí
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </a>
    );
}