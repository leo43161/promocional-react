import React, { useState, useEffect } from 'react';
import { ImageOff, AlertCircle } from 'lucide-react';
import { cn } from '@/utils';

// Helper component for image placeholders/error states (sin cambios)
const ImagePlaceholder = ({ size = 48, message = null }) => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 rounded-lg">
        <ImageOff size={size} />
        {message && <p className="mt-2 text-[1.1em] text-center">{message}</p>}
    </div>
);

// --- NUEVO: Componente Skeleton para la Galería ---
const GallerySkeleton = () => (
    <div className="w-full p-2 animate-pulse"> {/* Animar todo el skeleton */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Main Image Skeleton */}
            <div className="flex-grow md:w-6/7 aspect-w-16 aspect-h-9">
                <div className="relative md:min-h-[70vh] h-[360px] bg-gray-300 rounded-lg">
                    {/* Skeleton para el texto overlay */}
                    <div className='absolute bottom-0 bg-gray-400/50 w-full rounded-b-md pb-3 px-3 h-12'>
                        <div className="h-4 bg-gray-500 rounded w-3/4 mt-4"></div>
                    </div>
                </div>
            </div>
            {/* Thumbnails Skeleton */}
            <div className="flex flex-row md:flex-col gap-3 md:gap-4 md:w-1/7 pb-2 md:pb-0">
                {/* Renderiza 5 skeletons de miniaturas por defecto */}
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative h-20 md:w-full md:h-auto md:aspect-square flex-1 bg-gray-300 rounded-md"
                    ></div>
                ))}
            </div>
        </div>
    </div>
);
// --- FIN Skeleton ---

// Añadimos isLoading a las props, con valor por defecto false
export default function ImageGallery({ items = [], isLoading = false, className }) {
    const limitedImages = items.slice(0, 5);

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState(() => Array(limitedImages.length).fill(false));

    useEffect(() => {
        setImageErrors(Array(limitedImages.length).fill(false));
        setActiveImageIndex(0);
    }, [items]); // La dependencia sigue siendo 'items'

    // --- RENDERIZADO CONDICIONAL PRINCIPAL ---
    // Si isLoading es true, muestra el Skeleton
    if (isLoading) {
        return <GallerySkeleton />;
    }

    // --- Lógica existente si no está cargando ---
    if (limitedImages.length === 0) {
        return (
            <div className="w-full p-4">
                <ImagePlaceholder message="No hay imágenes disponibles" size={64} />
            </div>
        );
    }

    const handleImageError = (index) => {
        setImageErrors(prevErrors => {
            const newErrors = [...prevErrors];
            newErrors[index] = true;
            return newErrors;
        });
    };

    const handleThumbnailClick = (index) => {
        if (!imageErrors[index]) {
            setActiveImageIndex(index);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleThumbnailClick(index);
        }
    };

    const currentImageUrl = limitedImages[activeImageIndex];
    const hasCurrentError = imageErrors[activeImageIndex];

    // El JSX original de la galería se mantiene aquí sin cambios
    return (
        <div className={cn("w-full p-2 md:h-[90vh] xl:h-[55vh]", className)}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-stretch h-full">
                {/* Main Image Display Area */}
                <div className="md:w-6/7 flex-1">
                    <div className="relative overflow-hidden md:min-h-full h-[360px] shadow">
                        {hasCurrentError ? (
                            <ImagePlaceholder message="No se pudo cargar la imagen" />
                        ) : (
                            <img
                                key={currentImageUrl?.text} // Añadido optional chaining por si acaso
                                src={currentImageUrl?.img}  // Añadido optional chaining
                                alt={`Imagen de galería ${activeImageIndex + 1}`}
                                className="w-full h-full object-cover rounded"
                                onError={() => handleImageError(activeImageIndex)}
                                loading="lazy"
                            />
                        )}
                        {/* Overlay de texto, añadido optional chaining */}
                        {currentImageUrl?.text && (
                            <div
                                className='absolute bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/60 via-70% to-transparent w-full rounded-b-md pb-3 px-3'
                            >
                                <h1 className='text-2xl text-white font-semibold'>{currentImageUrl.text}</h1>
                            </div>
                        )}
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:w-1/7 pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent md:pr-1 h-full">
                    {limitedImages.length > 1 && [...limitedImages].map((imgUrl, index) => {
                        const hasError = imageErrors[index];
                        const isActive = activeImageIndex === index;

                        return (
                            <div
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                tabIndex={hasError ? -1 : 0}
                                className={`
                                    relative h-20 md:w-full md:h-30 aspect-3/2 flex-1 group
                                    transition-all duration-200 ease-in-out p-1
                                    ${hasError ? 'cursor-not-allowed' : 'cursor-pointer'}
                                    ${isActive && !hasError
                                        ? 'opacity-100'
                                        : hasError
                                            ? 'opacity-50'
                                            : 'opacity-60 hover:opacity-100'}
                                `}
                                aria-label={`Seleccionar imagen ${index + 1}${hasError ? ' (Error)' : ''}`}
                                role="button"
                                aria-pressed={isActive}
                            >
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                    {hasError ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-red-500 p-1">
                                            <AlertCircle size={20} />
                                            <span className="text-[1.1em] mt-1 text-center">Error</span>
                                        </div>
                                    ) : (
                                        <img
                                            src={imgUrl.img} // Aquí no necesita optional chaining porque limitedImages ya está filtrado
                                            alt={`Miniatura ${index + 1}`}
                                            className={"w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 rounded-md" + (isActive ? " border-2 border-primary scale-105" : "")}
                                            onError={() => handleImageError(index)}
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}