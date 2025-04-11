import React from 'react';
import { MessageCircle, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Header() {
    return (
        <div className="w-full sticky top-0">
            {/* Top navigation bar - gray background */}
            <div className='w-full bg-[#D6D3D1] flex justify-center'>
                <div className="px-4 pt-1 flex justify-between items-center w-11/12">
                    {/* Date and weather */}
                    <div className="bg-white px-3 py-1 rounded-t-md">
                        11 de Abril 2025°
                        <span className="ml-1 text-yellow-500">☀️</span>
                    </div>

                    {/* Contact info and social media */}
                    <div className="flex items-center space-x-2 text-sm pb-1 text-black">
                        <span>Comunicate y conocé Tucumán: </span>
                        <a href="tel:+54-0381-4303644" className="hover:underline">+54-0381-4303644</a>
                        <span>|</span>
                        <a href="tel:4222199" className="hover:underline">4222199</a>
                        <a href="/contacto" className="ml-2 font-bold text-gray-700">CONTACTO</a>
                        <span>|</span>
                        <div className="flex space-x-2 items-center">
                            <a href="https://wa.me/5493812133639" target="_blank" rel="noopener noreferrer">
                                <MessageCircle size={16} className="text-gray-700" />
                            </a>
                            <a href="https://www.facebook.com/tucumanturismo" target="_blank" rel="noopener noreferrer">
                                <Facebook size={16} className="text-gray-700" />
                            </a>
                            <a href="https://www.instagram.com/tucumanturismo" target="_blank" rel="noopener noreferrer">
                                <Instagram size={16} className="text-gray-700" />
                            </a>
                            <a href="https://twitter.com/TucumanTurismo" target="_blank" rel="noopener noreferrer">
                                <Twitter size={16} className="text-gray-700" />
                            </a>
                            <a href="https://www.youtube.com/TucumanTurismoOficial" target="_blank" rel="noopener noreferrer">
                                <Youtube size={16} className="text-gray-700" />
                            </a>
                        </div>
                        <a href="https://www.institucionalturismotuc.gob.ar/"
                            className="bg-blue-800 text-white px-2 py-1 rounded-sm"
                            target="_blank" rel="noopener noreferrer">
                            Institucional
                        </a>
                    </div>
                </div>
            </div>

            {/* Main navigation bar - white background */}
            <div className='flex justify-center bg-white shadow-md'>
                <div className=" flex justify-between items-center px-4 py-2  w-11/12">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="flex items-center">
                            <span className="text-green-700 font-bold text-xl">TUCUMÁN</span>
                            <span className="text-orange-500 font-bold text-xl ml-1">TURISMO</span>
                        </a>
                    </div>

                    {/* Main navigation menu */}
                    <div className="flex space-x-6 text-gray-700 font-medium">
                        <a href="/tucuman" className="hover:text-green-700">TUCUMÁN</a>
                        <a href="/planifica" className="hover:text-green-700">PLANIFICA</a>
                        <a href="/imperdibles" className="hover:text-green-700">IMPERDIBLES</a>
                        <a href="/naturaleza" className="hover:text-green-700">NATURALEZA</a>
                        <a href="/historia-y-cultura" className="hover:text-green-700">HISTORIA Y CULTURA</a>
                        <a href="/entretenimiento" className="hover:text-green-700">ENTRETENIMIENTO</a>
                        <a href="/gastronomia" className="hover:text-green-700">GASTRONOMÍA</a>
                        <a href="/blog" className="hover:text-green-700">BLOG</a>
                    </div>

                    {/* Language selector */}
                    <div className="flex items-center">
                        <button className="flex items-center">
                            <span className="mr-1">🇦🇷</span>
                            <span>ES</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}