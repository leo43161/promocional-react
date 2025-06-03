import React from 'react'
// components/SocialIcons.tsx
import { Facebook, Twitter, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { cn, encode, generateSlug } from '@/utils';

const SocialIcons = ({ url, title, className = '' }) => {
    if (!url || !title) {
        return null; // No mostrar si no hay URL o título
    }

    const encodedUrl = encode(url);
    const encodedTitle = encode(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        // WhatsApp: usa el protocolo wa.me y necesita un texto que incluya la URL
        // Las previsualizaciones en WhatsApp se generan automáticamente si la URL tiene las meta OG correctas.
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%0A${encodedUrl}`, // %0A es un salto de línea codificado
    };
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <a
                aria-label="Compartir en Facebook"
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
            >
                <Facebook size={18} />
            </a>
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en X (Twitter)"
                className="text-gray-600 hover:text-black"
            >
                <Twitter size={18} />
            </a>
            <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en WhatsApp"
                className="text-gray-600 hover:text-green-500"
            >
                <MessageCircle size={18} /> {/* Usando MessageCircle como placeholder para WhatsApp */}
            </a>
        </div>
    );
};
export default function BlogCard({
    blog,
    loading,
    variant = 'small',
    className = ""
}) {
    const { idArticulo, nombre, imagen, imagenMovil, copete } = blog
    if (variant === 'large') {
        return (
            <div className={cn("bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full", className)}>
                <div className="relative w-full md:h-full h-50"> {/* Altura aumentada para la tarjeta grande */}
                    <Image src={process.env.URL_IMG + (imagenMovil ? imagenMovil : imagen)} alt={nombre} style={{ objectFit: 'cover', objectPosition: 'top' }} fill className="object-cover" />
                </div>
                <div className="md:p-6 p-4 flex flex-col flex-grow justify-between">
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-800 mb-3 leading-tight line-clamp-3">
                        {nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                        {copete}
                    </p>
                    <div className="flex justify-between items-center">
                        <a
                            href={idArticulo}
                            className="inline-block bg-primary hover:bg-primary/85 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Conocé más aquí
                        </a>
                        <SocialIcons
                            url={`${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/articulos/articulo/${idArticulo}/${generateSlug(nombre)}`}
                            title={nombre}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Variante 'small' (tarjetas de la derecha)
    return (
        <div className={cn("bg-white shadow-lg rounded-lg overflow-hidden flex h-auto md:h-56", className)}> {/* Altura fija para consistencia */}
            <div className="w-1/3 md:w-2/5 relative flex-shrink-0">
                <Image src={process.env.URL_IMG + (imagenMovil ? imagenMovil : imagen)} alt={nombre} style={{ objectFit: 'cover' }} fill className="object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow w-2/3 md:w-3/5 justify-between">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-tight line-clamp-3">
                    {nombre}
                </h3>
                <p className="text-gray-600 text-xs mb-3 overflow-hidden text-ellipsis line-clamp-3 md:line-clamp-4">
                    {copete}
                </p>
                <div className="flex justify-between items-center">
                    <a
                        href={idArticulo}
                        className="inline-block bg-primary hover:bg-primary/85 text-white text-xs font-medium py-1.5 px-3 rounded-md transition-colors"
                    >
                        Conocé más aquí
                    </a>
                    <SocialIcons
                        url={`${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/articulos/articulo/${idArticulo}/${generateSlug(nombre)}`}
                        title={nombre}
                    />
                </div>
            </div>
        </div>
    );
}
