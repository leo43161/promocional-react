import React, { useEffect, useRef, useState } from 'react';

const ParallaxContainer = ({
  children,
  className = "",
  direction = "vertical",
  imageUrl = "https://www.tucumanturismo.gob.ar/public/img/1920x650-CircuitosTuristicos-Desktop.jpg",
  overlayOpacity = 40,
  minHeight = "h-96",
  speed = 0.5 // Factor de velocidad para el efecto parallax
}) => {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top } = containerRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Solo aplicar parallax cuando el elemento está en el viewport
      if (top < windowHeight && top > -containerRef.current.offsetHeight) {
        // Calcular el desplazamiento basado en la velocidad
        setOffset(scrollPosition * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Inicializar posición

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  // Convertir la opacidad (0-100) a formato decimal para rgba (0-1)
  const opacity = overlayOpacity / 100;
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${minHeight} ${className}`}
    >
      {/* Imagen de fondo con efecto parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          transform: direction === "vertical" ? `translateY(${offset}px)` : `translateX(${offset}px)`,
        }}
      />
      
      {/* Overlay semitransparente */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: opacity }}
      />
      
      {/* Contenido */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxContainer;