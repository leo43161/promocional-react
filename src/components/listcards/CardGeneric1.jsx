import React from 'react';
import { userRoute} from 'next/router';

const iconsCard = {
    calendarDays: "/icons/listas/calendar-days.svg",
    circleAlert: "/icons/listas/circle-alert.svg",
    circleDollar:"/icons/listas/circle-dollar.svg",
    clock: "/icons/listas/clock.svg",
    diamondMinus: "/icons/listas/diamond-minus.svg",
    instagram:"/icons/listas/instagram.svg",
    locationDot: "/icons/listas/location-dot.svg",
    mail: "/icons/listas/mail.svg",
    mapPin:"/icons/listas/map-pin.svg",
    mapPinned:"/icons/listas/map-pinned.svg",
    phone: "/icons/listas/phone.svg",
    triangleAlert: "/icons/listas/triangle-alert.svg",
    wine: "/icons/listas/wine.svg",       
    
};
/**
 * Función auxiliar para obtener el ícono de Font Awesome
 * basado en el título del campo.
 */
const getIcon = (titulo) => {
    const lowerCaseTitulo = titulo?.toLowerCase();
    if (!lowerCaseTitulo) return null;
    if (lowerCaseTitulo.includes('dirección')) return locationDot;
    if (lowerCaseTitulo.includes('teléfono')) return phone;
    if (lowerCaseTitulo.includes('mail')) return mail;
    if (lowerCaseTitulo.includes('horarios') || lowerCaseTitulo.includes('atención')) return clock;
    if (lowerCaseTitulo.includes('fecha')) return calendarDays;
    //if (lowerCaseTitulo.includes('sitioweb') || lowerCaseTitulo.includes('web')) return faGlobe;
    if (lowerCaseTitulo.includes('instagram')) return instagram;
    if (lowerCaseTitulo.includes('wine')) return wine ;
    if (lowerCaseTitulo.includes('pago')) return circleDollar;
    return null;
};
/**
 * Componente genérico para renderizar una tarjeta de artículo.
 * @param {object} articulo - El objeto de datos del artículo.
 */
const CardGeneric = ({ articulo }) => {
    const { Titulo, Img, campos, id_ListaCard } = articulo;    
    // Construye la ruta de la imagen asumiendo que el archivo está en la carpeta /public/img/listas
    const cardImgUrl = `public/img/listas/${Img}`;
    // Encuentra la URL del artículo si existe en los campos o en la propiedad id_Articulo
    const articuloUrl = campos?.find(c => c.Url)?.Url || (id_ListaCard ? `/articulos/${id_ListaCard}` : null);
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
            <div className="relative h-48 sm:h-56 w-full">
                <img
                    src={cardImgUrl}
                    alt={Titulo}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{Titulo}</h3>
                    <hr className="mb-4 border-gray-200" />
                    <ul className="space-y-3 text-sm text-gray-700">
                        {campos?.map((campo, index) => (
                            <li key={index} className="flex items-start">
                                {getIcon(campo.Titulo) && (
                                    <img icon={getIcon(campo.Titulo)} className="text-gray-500 mr-3 mt-1 w-4 h-4 flex-shrink-0" />
                                )}
                                <div className="flex-grow">
                                    <span className="font-semibold text-gray-800">{campo.Titulo}:</span>
                                    <span className="ml-2">
                                        {/* Renderiza un enlace si el campo tiene una URL */}
                                        {campo.Url ? (
                                            <a href={campo.Url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {campo.Texto || campo.Url}
                                            </a>
                                        ) : (
                                            campo.Texto
                                        )}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Botón condicional para enlaces externos, ahora más dinámico */}
                {articuloUrl && (
                    <div className="mt-4">
                        <a
                            href={articuloUrl}
                            target={articuloUrl.startsWith('http') ? '_blank' : '_self'}
                            rel={articuloUrl.startsWith('http') ? 'noopener noreferrer' : ''}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 w-full"
                        >
                            Ver más
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardGeneric;