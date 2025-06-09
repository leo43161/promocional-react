import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Download } from 'lucide-react'; // Importar iconos necesarios (solo Descarga ahora)

const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    fullScreen = false,
    size = 'md', // 'sm', 'md', 'lg', 'xl', '2xl', 'full' (para casos específicos)
    showCloseButton = true,
    overlayColor = 'rgba(0, 0, 0, 0.75)',
    // Props para visualización de imagen
    imageUrl,
    imageAlt = 'Imagen',
    enableMouseZoom = true, // Nuevo prop para habilitar/deshabilitar zoom con rueda del ratón
}) => {
    const [mounted, setMounted] = useState(false);
    const [imageScale, setImageScale] = useState(100); // Estado para el porcentaje de zoom de la imagen
    const imageContainerRef = useRef(null); // Referencia al contenedor de la imagen para eventos

    // Efecto para manejar el montaje para el renderizado con portal
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Efecto para prevenir el scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        // Función de limpieza para resetear overflow cuando el componente se desmonta o isOpen cambia
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Resetear la escala de la imagen cuando el modal se abre o la imagen cambia
    useEffect(() => {
        if (isOpen && imageUrl) {
            setImageScale(100);
        }
    }, [isOpen, imageUrl]);

    // Manejar el cierre al presionar la tecla Escape
    const handleEscapeKeyPress = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKeyPress);
        } else {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        }
        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, [isOpen, handleEscapeKeyPress]);


    // Manejar la descarga
    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement('a');
            link.href = imageUrl;
            // Sugerir un nombre de archivo
            link.setAttribute('download', imageUrl.split('/').pop() || 'download');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    if (!isOpen || !mounted) {
        return null; // No renderizar si no está abierto o no está montado en el cliente
    }

    // Definir clases de tamaño del modal
    const sizeClasses = fullScreen
        ? 'w-screen h-screen max-w-none max-h-none rounded-none'
        : size === 'sm'
            ? 'max-w-sm'
            : size === 'md'
                ? 'max-w-md'
                : size === 'lg'
                    ? 'max-w-lg'
                    : size === 'xl'
                        ? 'max-w-xl'
                        : size === '2xl'
                            ? 'max-w-2xl'
                            : size === 'full'
                                ? 'w-screen max-w-screen h-full max-h-full'
                                : 'max-w-md'; // Predeterminado


    // Portal renderiza el modal fuera del flujo DOM principal
    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${fullScreen ? 'p-0' : 'p-4'} `}
            style={{ backgroundColor: overlayColor }}
            onClick={onClose} // Cerrar modal al hacer clic en el overlay
        >
            {/* Contenedor del Contenido del Modal */}
            {/* Prevenir clics dentro del contenido del modal de cerrarlo */}
            <div
                className={`relative bg-white rounded-lg shadow-xl flex flex-col max-h-[95vh] overflow-hidden ${sizeClasses}`}
                onClick={(e) => e.stopPropagation()} // Detener propagación para evitar cerrar al hacer clic dentro
            >
                {/* Encabezado */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900 pr-8">{title}</h3>
                    {showCloseButton && (
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            onClick={onClose}
                            aria-label="Cerrar modal"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Cuerpo - Renderizado condicional basado en imageUrl */}
                {/* Añadimos la ref al div si estamos en modo imagen */}
                <div
                    className={`flex-grow overflow-auto ${imageUrl ? 'flex justify-center items-center' : 'p-4'}`}
                    ref={imageUrl ? imageContainerRef : null} // Asignar ref solo si estamos en modo imagen
                    style={{ cursor: imageUrl && imageScale > 100 ? 'grab' : 'default' }} // Opcional: cambiar cursor si hay zoom
                >
                    {imageUrl ? (
                        // Modo Visualización de Imagen
                        <div className="relative w-full h-full flex flex-col items-center justify-center">
                             {/* Controles opcionales (solo descarga ahora) */}
                             <div className="absolute top-0 right-0 p-2 bg-black bg-opacity-50 rounded-bl-lg z-10 flex space-x-2">
                                {/* Botón de Descarga */}
                                <button
                                    onClick={handleDownload}
                                    className="p-1 rounded-full bg-gray-700 text-white hover:bg-gray-600"
                                     aria-label="Descargar imagen"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>

                             {/* Contenedor de Imagen con Scroll */}
                             {/* La ref se asigna al div padre del body */}
                                <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                    style={{ width: `auto`, height: '100%', objectFit: 'contain' }} // objectFit para evitar distorsión
                                    className="max-w-none max-h-none select-none" // Override defaults, evitar selección de texto
                                    // Considerar añadir estado de carga o manejo de errores para la imagen
                                />
                        </div>
                    ) : (
                        // Modo Contenido Estándar
                        children
                    )}
                </div>

                {/* Pie de página (opcional) */}
                {/* <div className="p-4 border-t">
                    <p className="text-[1.1em] text-gray-500">Pie de página del modal</p>
                </div> */}
            </div>
        </div>,
        document.body // Renderizar el modal dentro de la etiqueta body
    );
};

export default Modal;