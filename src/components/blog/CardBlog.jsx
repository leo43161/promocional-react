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
export default function CardBlog({
    blog,
    loading,
    className = ""
}) {
    const { idArticulo, nombre, imagen, imagenMovil, copete } = blog
    return (
        <div className={cn("bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full", className)}>
            <div className="relative w-full md:h-full h-50"> {/* Altura aumentada para la tarjeta grande */}
                <Image src={process.env.URL_IMG + (imagenMovil ? imagenMovil : imagen)} alt={nombre} style={{ objectFit: 'cover', objectPosition: 'top' }} fill className="object-cover" />
            </div>
            <div className="md:p-6 p-4 flex flex-col md:h-135 justify-between ">
                <h3 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-3 leading-tight line-clamp-3">
                    {nombre}
                </h3>
                <p className="text-gray-600 text-md mb-4 line-clamp-2">
                    {copete}
                </p>
                <div className="flex justify-between items-center">
                    <a
                        href={`${process.env.URL_LOCAL}/articulos/articulo/${idArticulo}`}
                        className="inline-block bg-primary hover:bg-primary/85 text-white text-[1.1em] font-medium py-2 px-4 rounded-md transition-colors"
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
