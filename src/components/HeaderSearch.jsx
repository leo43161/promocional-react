import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react'; // Importamos el ícono

// Este componente es específico para el header, por eso quitamos el padding exterior.
const HeaderSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        const encodedSearch = encodeURIComponent(searchTerm.trim());
        const nextPath = `/BusquedaArticulos/?search=${encodedSearch}`;

        if (router.asPath !== nextPath) {
            router.push(nextPath);
        }
    };

    return (
        // Ajustamos el formulario para que se integre mejor en el header
        <form onSubmit={handleSearch} className="flex items-stretch w-full">
            <input
                type="text"
                placeholder="¿Qué estás buscando?" // Texto un poco más amigable
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // Estilos que combinan con tu header: sin borde, fondo sutil, focus claro
                className="w-full bg-gray-100 border-0 focus:ring-2 focus:ring-secondary/50 rounded-l-md px-4 py-2 text-gray-800 placeholder-gray-500 transition-all duration-300"
            />
            {/* Botón con el mismo estilo que tu botón "Institucional" pero con un ícono */}
            <button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-r-md flex items-center justify-center"
                aria-label="Buscar"
            >
                <Search size={20} />
            </button>
        </form>
    );
};

export default HeaderSearch;