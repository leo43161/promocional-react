import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import {
    useGetEventoIdQuery,
} from '@/redux/services/eventosService'; // Ajusta la ruta si es necesario
import { Calendar, CalendarIcon, Clock, Info, MapPin } from 'lucide-react';
import { GoogleMapsEmbed } from '@next/third-parties/google'
import Modal, { ImageModal } from '@/components/common/Modal';

// --- Componentes Skeleton Simples ---

const SkeletonBlock = ({ width = 'w-full', height = 'h-4', className = '' }) => (
    <div className={`bg-gray-300 rounded ${height} ${width} animate-pulse ${className}`}></div>
);

const SkeletonText = ({ lines = 3, className = '' }) => (
    <div className={className}>
        {[...Array(lines)].map((_, i) => (
            <SkeletonBlock key={i} className="mb-2 last:mb-0" width={`w-${Math.floor(Math.random() * (100 - 75) + 75)}%`} />
        ))}
    </div>
);

const SkeletonImage = ({ className = 'w-full h-48' }) => (
    <div className={`bg-gray-300 rounded animate-pulse ${className}`}></div>
);


export default function Evento() {
    // Estado para controlar la visibilidad del modal de imagen
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const router = useRouter();

    const { id } = router.query;

    const {
        data: eventoData,
        isLoading: isLoadingEvento,
        isError: isErrorEvento,
        error: errorEvento,
    } = useGetEventoIdQuery({ id }, { skip: !id });

    const isLoading = isLoadingEvento;

    // --- Extracción de Datos ---

    // Usamos optional chaining ?. para acceder de forma segura a 'result'
    const evento = eventoData?.result[0];

    if (isErrorEvento) {
        console.error("Error fetching event data:", errorEvento);
        return <div className="container mx-auto p-5 text-center text-red-600">Error: {"No se pudo cargar el evento."}</div>;
    }

    if (!id && !isLoadingEvento) { // Basta con chequear isLoadingEvento aquí
        return <div className="container mx-auto p-5 text-center">ID de evento no especificado en la URL.</div>;
    }


    // --- Manejo de Evento No Encontrado (después de cargar) ---
    if (!evento && !isLoadingEvento && id) {
        return <div className="container mx-auto p-5 text-center">No se encontró el evento solicitado.</div>;
    }

    // --- Formateo de Fechas y Horas ---
    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';
        try {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        } catch (e) {
            console.error("Error formatting date:", e);
            return dateString; // Return original if formatting fails
        }
    };

    const formatTime = (timeString) => {
        if (!timeString || timeString === '00:00:00') return ''; // Handle default or empty time
        try {
            const [hour, minute] = timeString.split(':');
            return `${hour}:${minute} hs`;
        } catch (e) {
            console.error("Error formatting time:", e);
            return timeString; // Return original if formatting fails
        }
    };

    const fechaInicioFormatted = formatDate(evento?.fechaInicio);
    const fechaFinFormatted = formatDate(evento?.fechaFin);
    const horaInicioFormatted = formatTime(evento?.horaInicio);
    const horaFinFormatted = formatTime(evento?.horaFin);

    const dateRange = fechaInicioFormatted === fechaFinFormatted
        ? fechaInicioFormatted
        : `${fechaInicioFormatted} - ${fechaFinFormatted}`;

    const timeRange = horaInicioFormatted || horaFinFormatted
        ? `${horaInicioFormatted}${horaInicioFormatted && horaFinFormatted ? ' - ' : ''}${horaFinFormatted}`
        : 'Hora no disponible';

    return (
        <>
            <div>
                <Head>
                    {/* Título: Usa 'nombre' del evento */}
                    <title>{isLoading ? 'Cargando...' : (evento?.nombre || 'Detalle del Evento')}</title>
                    {/* Descripción: Usa 'descripcion' del evento si está disponible, si no, usa una genérica */}
                    <meta name="description" content={evento?.descripcion?.substring(0, 160) + '...' || `Detalles del evento ${evento?.nombre || ''} en ${evento?.nombreLocalidad || 'Tucumán'}`} />
                </Head>

                {/* Banner con Parallax */}
                <ParallaxContainer
                    speed={0.2}
                    minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
                    className=""
                    imageUrl={process.env.URL_IMG + (evento?.imagen || '') || "https://www.tucumanturismo.gob.ar/public/img/eventos/banner-eventos.jpg"}
                >
                    <div className="container mx-auto h-full text-white flex flex-col justify-end">
                        <div className='w-11/12 mx-auto pt-5 pb-10'>
                            <div className="inline-block bg-secondary px-3 py-1 text-sm font-medium rounded mb-3">
                                {isLoadingEvento ?
                                    <SkeletonBlock width='w-24' height='h-4'></SkeletonBlock> :
                                    evento?.nombreCategoria || 'Evento'
                                }
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                                {isLoadingEvento ?
                                    <SkeletonBlock width='w-4/8' height='h-8'></SkeletonBlock> :
                                    evento?.nombre || 'Detalle del evento'
                                }
                            </h1>
                            {!isLoadingEvento && evento?.fechaInicio && (
                                <div className="flex items-center text-white text-lg mt-3">
                                    <CalendarIcon size={20} className="mr-2" />
                                    {fechaInicioFormatted}
                                    {evento.fechaInicio !== evento.fechaFin && (
                                        <>
                                            <span className="mx-2">-</span>
                                            {fechaFinFormatted}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </ParallaxContainer>

                {/* Breadcrumb */}
                <div className='w-11/12 mx-auto pt-5 mb-10'>
                    <div className='mb-5'>
                        <Breadcrumb items={[
                            { label: "Eventos", href: '/eventos' },
                            { label: isLoading ? 'Cargando...' : (evento?.nombre || 'Detalle'), href: router.asPath }
                        ]}></Breadcrumb>
                    </div>
                </div>

                {/* Contenido Principal: Descripción, Fechas, Ubicación, etc. */}
                <div className='lg:mb-10 lg:w-12/14 w-full mx-auto flex px-2 flex-wrap flex-col lg:flex-row'>

                    {/* Columna Izquierda: Detalles del Evento */}
                    <div className='w-full mb-6 lg:mb-4 lg:pr-4 order-2 lg:order-1 lg:w-7/11'>
                        {/* Título en el contenido si es necesario (puede duplicar el del banner o ser más pequeño) */}
                        <div className='mb-5 hidden lg:block'> {/* Ocultar en desktop si el banner ya tiene el título */}
                            <h2 className="text-3xl md:text-4xl font-bold">
                                {isLoading ? <SkeletonBlock width='w-full' height='h-8'></SkeletonBlock> : (evento?.nombre || 'Detalle')}
                            </h2>
                        </div>

                        {/* Información del Evento */}
                        <div className='mb-6'>
                            {/* <h3 className='text-xl font-bold mb-3'>Información del Evento</h3> */}
                            {isLoading ? (
                                <div className='space-y-3'>
                                    <SkeletonBlock width='w-3/4' height='h-5' />
                                    <SkeletonBlock width='w-1/2' height='h-5' />
                                    <SkeletonBlock width='w-full' height='h-5' />
                                    <SkeletonBlock width='w-2/3' height='h-5' />
                                </div>
                            ) : (
                                <div className='space-y-3 text-gray-700'>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 my-8 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <Calendar className="text-secondary flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <h3 className="font-medium text-gray-900">Fecha</h3>
                                                <p className="text-gray-700">
                                                    {dateRange && (<>
                                                        <span className="mr-2 font-semibold">Fecha{fechaInicioFormatted !== fechaFinFormatted ? 's' : ''}:</span>
                                                        <span>{dateRange}</span>
                                                    </>)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <Clock className="text-secondary flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <h3 className="font-medium text-gray-900">Horario</h3>
                                                <p className="text-gray-700">
                                                    {evento.horaInicio === '00:00:00' ? (
                                                        'Horario a confirmar'
                                                    ) : (
                                                        <>Desde {evento.horaInicio.substring(0, 5)} hs
                                                            {evento.horaFin !== '00:00:00' ? ` hasta ${evento.horaFin.substring(0, 5)} hs` : ''}
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        {(evento?.direccion || evento?.nombreLocalidad) && (
                                            <div className="flex items-start space-x-3">
                                                <MapPin className="text-secondary flex-shrink-0 mt-1" size={20} />
                                                <div>
                                                    <h3 className="font-medium text-gray-900">Ubicación</h3>
                                                    {evento?.direccion && <p className="text-gray-700">{evento.direccion}</p>}
                                                    {evento?.nombreLocalidad && <p className="text-gray-600">{evento.nombreLocalidad}</p>}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-start space-x-3">
                                            <Info className="text-secondary flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <h3 className="font-medium text-gray-900">Categoría</h3>
                                                <p className="text-gray-700">{evento.nombreCategoria}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {evento?.url && ( // Display URL if available
                                        <div className='flex items-center'>
                                            <span className="mr-2 font-semibold">Más Info:</span>
                                            <a href={evento.url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Sitio Web del Evento</a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Descripción del Evento */}
                        <div className='mb-6'>
                            <h3 className='text-xl font-bold mb-3'>Descripción</h3>
                            {isLoading ? (
                                <SkeletonText lines={5} />
                            ) : (
                                <div className='text-gray-800 leading-relaxed' dangerouslySetInnerHTML={{ __html: evento?.descripcion || '<p>No hay descripción disponible para este evento.</p>' }}>
                                    {/* Using dangerouslySetInnerHTML assumes the description HTML is safe.
                                If not, consider a library to sanitize it or render as plain text. */}
                                </div>
                            )}
                        </div>

                        {/* Mapa de Ubicación (Placeholder) */}
                        {(evento?.latitud && evento?.longitud) ? (
                            <div className='mb-6'>
                                <h3 className='text-xl font-bold mb-3'>Ubicación en el Mapa</h3>
                                {/* Placeholder para el mapa. Aquí integrarías tu componente de mapa (ej: Google Maps, Leaflet) */}
                                {isLoading ? (
                                    <SkeletonImage className='w-full h-64' />
                                ) : (
                                    <div className="w-full h-80 bg-gray-200 flex items-stretch justify-center text-gray-500">
                                        <div className='w-full h-full *:h-full'>
                                            <GoogleMapsEmbed
                                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                                                height="100%"
                                                width="100%"
                                                mode="place"
                                                q={`${evento?.latitud},${evento?.longitud}`}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            !isLoading && <p className="text-gray-500 italic">Coordenadas de mapa no disponibles.</p>
                        )}

                    </div>

                    {/* Columna Derecha: Imagen Principal */}
                    <div className='lg:w-4/11 w-full lg:ps-4 order-1 lg:order-2 mb-6 lg:mb-4'>
                        <div className='mb-6'>
                            <h3 className='text-xl font-bold mb-3 sr-only'>Imagen del Evento</h3> {/* Ocultar visualmente si el banner ya la muestra */}
                            {isLoading ? (
                                <SkeletonImage className='w-full h-64 lg:h-96 object-cover rounded-lg shadow-md' />
                            ) : (
                                <img
                                    src={process.env.URL_IMG + (evento?.imagen || '')}
                                    alt={`Imagen del evento ${evento?.nombre || 'Detalle'}`}
                                    className='w-full h-auto object-cover rounded-lg shadow-md'
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://www.tucumanturismo.gob.ar/public/img/eventos/banner-eventos.jpg"; }} // Fallback image on error
                                    onClick={() => setIsImageModalOpen(true)}
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <Modal
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                imageUrl={process.env.URL_IMG + (evento?.imagen || '') || "https://www.tucumanturismo.gob.ar/public/img/eventos/banner-eventos.jpg"}
                altText="Imagen de ejemplo"
                title="Vista previa de imagen"
                imageAlt="Vista previa de imagen"
                enableMouseZoom={true}
                downloadable={true}
                fullScreen={true}
            />
        </>
    )
}