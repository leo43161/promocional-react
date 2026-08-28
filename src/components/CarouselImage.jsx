'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * CarouselImages de banners promocionales.
 *
 * - Avance automático hacia la derecha (configurable con `interval`).
 * - Loop infinito real: clona el primer slide al final y resetea sin salto visible.
 * - Imagen distinta para mobile y desktop vía <picture>.
 * - Sin flechas ni botones. Los puntos son opcionales (`showDots`).
 * - Se pausa al pasar el mouse / al tocar y cuando la pestaña no está visible.
 * - Respeta `prefers-reduced-motion`: si está activo, no autoavanza.
 *
 * slides: [{ desktop, mobile?, alt, href?, target?, rel? }]
 */
export default function CarouselImages({
  slides = [],
  interval = 5000,
  transition = 700,
  autoPlay = true,
  pauseOnHover = true,
  showDots = true,
  adaptiveHeight = true,
  className = '',
}) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [height, setHeight] = useState(null);
  const resetRef = useRef(null);
  const slideRefs = useRef([]);
 
  // Con más de un slide clonamos el primero al final para cerrar el loop.
  const items = total > 1 ? [...slides, slides[0]] : slides;
 
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
 
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);
 
  useEffect(() => {
    if (!autoPlay || paused || reduceMotion || total <= 1) return;
    const id = setInterval(() => setIndex((i) => i + 1), interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, reduceMotion, total, interval]);
 
  // --- Altura adaptativa -----------------------------------------------------
  const measure = useCallback(() => {
    if (!adaptiveHeight) return;
    const el = slideRefs.current[index];
    if (el) setHeight(el.offsetHeight);
  }, [adaptiveHeight, index]);
 
  // Mide al cambiar de slide y cada vez que el slide activo cambia de tamaño
  // (cambio de breakpoint, rotación del dispositivo, imagen que termina de cargar).
  useEffect(() => {
    measure();
    const el = slideRefs.current[index];
    if (!adaptiveHeight || !el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [adaptiveHeight, index, measure]);
 
  // Al llegar al clon, saltamos al slide 0 con la transición apagada.
  const handleTransitionEnd = useCallback(
    (event) => {
      if (event.propertyName !== 'transform') return;
      if (index !== total) return;
      setAnimate(false);
      setIndex(0);
    },
    [index, total]
  );
 
  useEffect(() => {
    if (animate) return;
    resetRef.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true))
    );
    return () => cancelAnimationFrame(resetRef.current);
  }, [animate]);
 
  if (total === 0) return null;
 
  const active = index % total;
  const motionDuration = reduceMotion ? 0 : transition;
 
  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      aria-roledescription="carrusel"
      aria-label="Banners promocionales"
      style={{
        height: adaptiveHeight && height ? `${height}px` : undefined,
        transition: `height ${motionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="flex w-full items-start"
        style={{
          transform: `translate3d(-${index * 100}%, 0, 0)`,
          transition: animate
            ? `transform ${motionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {items.map((slide, i) => {
          const isClone = i === total;
          const Wrapper = slide.href ? 'a' : 'div';
          const wrapperProps = slide.href
            ? {
                href: slide.href,
                target: slide.target ?? '_blank',
                rel: slide.rel ?? 'noopener noreferrer',
              }
            : {};
 
          return (
            <div
              key={`${slide.desktop}-${i}`}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="w-full shrink-0 grow-0 basis-full"
              aria-hidden={isClone || i !== index ? 'true' : undefined}
            >
              <Wrapper
                {...wrapperProps}
                className="block w-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                tabIndex={isClone ? -1 : undefined}
              >
                <picture>
                  {slide.mobile && (
                    <source media="(max-width: 767px)" srcSet={slide.mobile} />
                  )}
                  <img
                    src={slide.desktop}
                    alt={slide.alt || ''}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    decoding="async"
                    draggable={false}
                    onLoad={measure}
                    className="block w-full h-auto"
                  />
                </picture>
              </Wrapper>
            </div>
          );
        })}
      </div>
 
      {showDots && total > 1 && (
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((slide, i) => (
            <span
              key={`dot-${i}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
 