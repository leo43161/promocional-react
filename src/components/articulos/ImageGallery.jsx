import React, { useState, useEffect } from 'react';
import { ImageOff, AlertCircle } from 'lucide-react'; // Added AlertCircle for errors

// Helper component for image placeholders/error states
const ImagePlaceholder = ({ size = 48, message = null }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 rounded-lg">
    <ImageOff size={size} />
    {message && <p className="mt-2 text-xs text-center">{message}</p>}
  </div>
);

export default function ImageGallery({ items = [] }) {
  // Limit to using only the first 5 images
  const limitedImages = items.slice(0, 5);
  console.log(limitedImages);

  // State for the active image index
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // State to track loading errors for each image URL
  const [imageErrors, setImageErrors] = useState(() => Array(limitedImages.length).fill(false));

  // Effect to reset errors if items prop changes
  useEffect(() => {
    setImageErrors(Array(limitedImages.length).fill(false));
    setActiveImageIndex(0); // Reset active image as well
  }, [items]); // Rerun effect if the items prop changes


  // If no images after limiting, show an empty state
  if (limitedImages.length === 0) {
    return (
      <div className="w-full p-4">
        <ImagePlaceholder message="No hay imágenes disponibles" size={64} />
      </div>
    );
  }

  // Handle image loading errors by updating state
  const handleImageError = (index) => {
    setImageErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[index] = true;
      return newErrors;
    });
  };

  // Change the active image
  const handleThumbnailClick = (index) => {
    // Only change if the image hasn't errored
    if (!imageErrors[index]) {
      setActiveImageIndex(index);
    }
  };

  // Handle keyboard navigation for thumbnails
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThumbnailClick(index); // Reuse click handler logic
    }
  };

  const currentImageUrl = limitedImages[activeImageIndex];
  const hasCurrentError = imageErrors[activeImageIndex];

  return (
    <div className="w-full p-2 "> {/* Added padding */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6"> {/* Increased gap */}

        {/* Main Image Display Area */}
        <div className="flex-grow md:w-6/7 aspect-w-16 aspect-h-9"> {/* Enforce aspect ratio */}
          <div className="relative overflow-hidden md:min-h-[70vh] h-[360px] shadow"> {/* Softer bg, larger radius, subtle shadow */}
            {hasCurrentError ? (
              <ImagePlaceholder message="No se pudo cargar la imagen" />
            ) : (
              <img
                key={currentImageUrl.text} // Add key to force re-render on change (for potential transitions later)
                src={currentImageUrl.img}
                alt={`Imagen de galería ${activeImageIndex + 1}`}
                className="w-full h-full object-cover rounded" // Keep contain to see full image
                onError={() => handleImageError(activeImageIndex)}
                loading="lazy" // Add lazy loading
              />
            )}
            <div
              className='absolute bottom-0 z-50 bg-gradient-to-t from-black/80 via-black/60 via-70% to-transparent w-full rounded-b-md pb-3 px-3'
            >
              <h1 className='text-xl text-white font-semibold'>{currentImageUrl.text}</h1>
            </div>
          </div>
        </div>

        {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
        {/* Added scrollbar-hide utility class example (requires tailwindcss-scrollbar-hide plugin or custom CSS) */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:w-1/7 pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent md:pr-1"> {/* Adjusted gap, padding, scrollbar styling hint */}
          {limitedImages.map((imgUrl, index) => {
            const hasError = imageErrors[index];
            const isActive = activeImageIndex === index;

            return (
              <div
                key={index}
                onClick={() => handleThumbnailClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={hasError ? -1 : 0} // Make non-interactive if errored
                className={`
                  relative h-20 md:w-full md:h-auto md:aspect-square flex-1  /* Sizing */
                  rounded-md overflow-hidden cursor-pointer group /* Base styles */
                  transition-all duration-200 ease-in-out /* Transitions */
                  ${hasError ? 'cursor-not-allowed' : 'cursor-pointer'}
                  ${isActive && !hasError
                    ? 'border-2 border-primary opacity-100' /* Active state */
                    : hasError
                      ? 'opacity-50' /* Error state */
                      : 'opacity-60 hover:opacity-100' /* Inactive state */}
                `}
                aria-label={`Seleccionar imagen ${index + 1}${hasError ? ' (Error)' : ''}`}
                role="button"
                aria-pressed={isActive}
              >
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  {hasError ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-red-500 p-1">
                      <AlertCircle size={20} />
                      <span className="text-xs mt-1 text-center">Error</span>
                    </div>
                  ) : (
                    <img
                      src={imgUrl.img}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" // Subtle zoom on hover
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
      {/* Note: To hide scrollbars effectively cross-browser, you might need a plugin like `tailwindcss-scrollbar-hide`
           or add custom CSS like:
           .scrollbar-hide::-webkit-scrollbar { display: none; }
           .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
           Then add `scrollbar-hide` class to the thumbnail container div.
           The example above uses `scrollbar-thin` which might need configuration or might not work standalone.
       */}
    </div>
  );
}
