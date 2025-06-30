import React from 'react'
// components/SocialIcons.tsx
import { Facebook, Twitter, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/utils';

const SocialIcons = () => {
    return (
        <div className="flex items-center space-x-2">
            <a href="#" aria-label="Compartir en Facebook" className="text-gray-600 hover:text-blue-600">
                <Facebook size={18} />
            </a>
            <a href="#" aria-label="Compartir en X" className="text-gray-600 hover:text-black">
                <Twitter size={18} />
            </a>
            <a href="#" aria-label="Compartir en WhatsApp" className="text-gray-600 hover:text-green-500">
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
    const {idArticulo, nombre, imagen, imagenMovil, copete } = blog
    return (
        <div className={cn("bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full", className)}>
            <div className="relative w-full md:h-full h-50"> {/* Altura aumentada para la tarjeta grande */}
                <Image src={process.env.URL_IMG + (imagenMovil ? imagenMovil : imagen)} alt={nombre} style={{ objectFit: 'cover', objectPosition: 'top' }} fill className="object-cover" />
            </div>
            <div className="md:p-6 p-4 flex flex-col md:h-135 justify-between ">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 leading-tight line-clamp-3">
                    {nombre}
                </h3>
                <p className="text-gray-600 text-md mb-4 line-clamp-3">
                    {copete}
                </p>
                <div className="flex justify-between items-center">
                    <a
                        href={`${idArticulo}`}
                        className="inline-block bg-primary hover:bg-primary/85 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Conocé más aquí
                    </a>
                    <SocialIcons />
                </div>
            </div>
        </div>
    );
}
