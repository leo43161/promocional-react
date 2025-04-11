import { useEffect, useRef } from 'react';

const ResponsiveVideo = ({
    desktopSrc = "/video/Tucuman_Tiene_Todo.mp4",
    mobileSrc = "/video/Tucuman_Tiene_Todo_M.mp4",
    posterSrc = "/images/banner-video.jpg",
    isBackgroundVideo = true,
    className = "",
}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Intentar reproducir el video automaticamente cuando sea visible
        if (videoRef.current && isBackgroundVideo) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            videoRef.current.play().catch((error) => {
                                // Si falla la reproducción automática, no es crítico para videos decorativos
                                console.log("Autoplay prevented:", error);
                            });
                        }
                    });
                },
                { threshold: 0.1 }
            );

            observer.observe(videoRef.current);

            return () => {
                if (videoRef.current) {
                    observer.unobserve(videoRef.current);
                }
            };
        }
    }, [isBackgroundVideo]);

    // Configuración de clases Tailwind CSS
    const defaultClasses = "w-full h-auto";
    const backgroundVideoClasses = isBackgroundVideo ? "object-cover" : "";
    const combinedClasses = `${defaultClasses} ${backgroundVideoClasses} ${className}`.trim();

    return (
        <video
            ref={videoRef}
            className={combinedClasses}
            poster={posterSrc}
            loading="lazy"
            muted
            playsInline
            {...(isBackgroundVideo
                ? { autoPlay: true, loop: true }
                : { controls: true }
            )}
        >
            {/* El navegador seleccionará automáticamente la fuente adecuada basada en media query */}
            <source
                src={desktopSrc}
                type="video/mp4"
                media="(min-width: 768px)"
            />
            <source
                src={mobileSrc}
                type="video/mp4"
            />
            Tu navegador no soporta la reproducción de videos.
        </video>
    );
};

export default ResponsiveVideo;