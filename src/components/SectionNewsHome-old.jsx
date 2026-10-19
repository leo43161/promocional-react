import React from 'react';
import Button from '@/components/common/Button'; 
import NewsHome from '@/components/news/NewsHome'; // Tu componente simplificado

export default function SeccionNoticiasContainer() {
    const currentContent = {
        featuredNews: "Últimas Noticias",
        learnMore: "Ver todas las noticias"
    };

    const newsLink = "/noticias"; // Ruta a tu página general de noticias

    return (
        <div className="py-8">
            {/* Cabecera de la sección */}
            <div className='md:w-11/13 w-11/13 mx-auto'>
                <div className='relative flex md:justify-center justify-between items-center'>
                    <h2 className="md:text-5xl text-4xl mb-7 text-gray-500/70 font-bold">
                        {currentContent.featuredNews}
                    </h2>
                    <div className='md:absolute right-0 mb-7 md:pe-7'>
                        <a href={newsLink}>
                            <Button className='shadow-lg' size='sm'>
                                {currentContent.learnMore}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Carrusel de noticias */}
            <NewsHome />
        </div>
    );
}