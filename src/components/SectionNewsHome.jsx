import React from 'react';
import Button from '@/components/common/Button'; 
import NewsHome from '@/components/news/NewsHome';

export default function SeccionNewsHome() { // O el nombre que uses en tu archivo contenedor
    const currentContent = {
        featuredNews: "Últimas Noticias",
        learnMore: "Ver todas las noticias"
    };

    const newsLink = "https://www.institucionalturismotuc.gob.ar/noticias";

    return (
        <div className="py-8">
            <div className='md:w-11/13 w-11/13 mx-auto'>
                <div className='relative flex md:justify-center justify-between items-center'>
                    <h2 className="md:text-5xl text-4xl mb-7 text-gray-500/70 font-bold">
                        {currentContent.featuredNews}
                    </h2>
                    <div className='md:absolute right-0 mb-7 md:pe-7'>
                        <a href={newsLink} target="_blank" rel="noopener noreferrer">
                            <Button className='shadow-lg' size='sm'>
                                {currentContent.learnMore}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            <NewsHome />
        </div>
    );
}
