import React, { useState, useEffect, useMemo } from 'react';
import Carousel from '../common/Carousel';
import CardNewsHome from './CardNewsHome';

export default function NewsHome() {
    const [noticias, setNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://www.institucionalturismotuc.gob.ar/api-news/api-news.php')
            .then((res) => {
                if (!res.ok) throw new Error('Error al obtener noticias');
                return res.json();
            })
            .then((data) => {
                // Verificamos que la data devuelta sea un array antes de guardarla
                if (Array.isArray(data)) {
                    setNoticias(data);
                } else {
                    setNoticias([]);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error NewsHome:', err);
                setError(err);
                setIsLoading(false);
            });
    }, []);

    // Agrupación segura para el carrusel
    const noticiasAgrupadas = useMemo(() => {
        // Validamos estrictamente que 'noticias' sea un array con elementos
        if (!Array.isArray(noticias) || noticias.length === 0) return [];
        
        const sliceItems = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 1;
        
        const grouped = noticias.reduce((acc, item) => {
            const lastGroup = acc[acc.length - 1];
            if (lastGroup && lastGroup.length < sliceItems) {
                lastGroup.push(item);
            } else {
                acc.push([item]);
            }
            return acc;
        }, []);
        
        return grouped;
    }, [noticias]);

    if (isLoading) {
        return <div className="text-center py-10 text-gray-500">Cargando noticias...</div>;
    }

    // Fuente externa: si falla, no se muestra el carrusel (queda el link a "Ver todas las noticias")
    if (error) return null;

    return (
        <div className='mb-10'>
            <Carousel
                autoPlay={false}
                showIndicators={false}
                showArrows={true}
                interval={6000}
            >
                {noticiasAgrupadas.map((group, indexGroup) => (
                    <div key={indexGroup} className="flex h-full w-full">
                        <div className='flex justify-around w-full'>
                            {group.map((noticia, index) => (
                                <div className="md:w-4/15 w-13/16 relative" key={noticia.id || index}>
                                    <CardNewsHome 
                                        id={noticia.id}
                                        titulo={noticia.titulo}
                                        extracto={noticia.extracto}
                                        imagen={noticia.imagen}
                                        fecha={noticia.fecha}
                                        enlace={noticia.enlace}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}