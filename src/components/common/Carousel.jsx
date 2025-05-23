import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';


export default function Carousel({
  children,
  showIndicators = true,
  showArrows = true,
  interval = 5000,
  autoPlay = true,
  className = ""
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef(null);
  const childrenArray = React.Children.toArray(children);
  const totalSlides = childrenArray.length;

  // Función para mover al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para mover al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Función para ir a un slide específico
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Configurar el autoplay
  useEffect(() => {
    if (autoPlay && !isHovering) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoPlay, interval, isHovering, totalSlides]);

  return (
    <div
      className={cn(
        // Clases base/default del componente
        "relative w-full overflow-hidden min-h-40 h-full", // bg-sky-100 para ver el área
        // Clases pasadas por props (estas sobreescribirán las anteriores si hay conflicto)
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Container de los slides */}
      <div
        className="flex transition-transform duration-800 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Flechas de navegación */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-3 -translate-y-1/2 p-2 rounded-full"
            aria-label="Anterior"
          >
            <ChevronLeft className='text-[#006E66bf] hover:text-[#006E66] transition-colors duration-400' size={40} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-3 -translate-y-1/2 p-2 rounded-full"
            aria-label="Siguiente"
          >
            <ChevronRight className='text-[#006E66bf] hover:text-[#006E66] transition-colors duration-400' size={40} />
          </button>
        </>
      )}

      {/* Indicadores */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}