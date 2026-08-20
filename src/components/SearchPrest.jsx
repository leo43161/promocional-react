import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/utils';
import { useSearchTracker } from '@/hooks/useSearchTracker';

const Buscador = ({ onSearch, placeholder = "Buscar actividades, prestadores...", className, localidades = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { trackSearch } = useSearchTracker();

  const handleSubmit = (e) => {
    e.preventDefault();
    trackSearch(searchTerm);
    onSearch(searchTerm);
  };

  const handleSelectChange = (e) => {
    const selectedLocalidad = e.target.value;
    setSearchTerm(selectedLocalidad); 
    trackSearch(selectedLocalidad);   
    onSearch(selectedLocalidad);      
  };

  return (
    <div className={cn("md:w-8/12 mx-auto mb-6", className)}>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0 shadow-sm rounded-lg">
        
        {/* 1. INPUT (Ahora va primero, a la izquierda) */}
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full py-2 pl-3 pr-10 text-[1.1em] border border-gray-300 rounded-lg md:rounded-r-none md:rounded-l-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent h-10"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
        </div>

        {/* 2. SELECT (Ahora va en el medio, justo antes del botón) */}
        {localidades.length > 0 && (
          <select
            className="w-full md:w-auto py-2 pl-3 pr-8 text-[1.1em] border border-gray-300 md:border-l-0 rounded-lg md:rounded-none focus:outline-none focus:ring-2 focus:ring-secondary h-10 bg-white text-gray-700 cursor-pointer"
            onChange={handleSelectChange}
            value="" 
          >
            <option value="" disabled>Filtrar por localidad...</option>
            {localidades.map((loc) => (
              <option key={loc.id} value={loc.nombre}>
                {loc.nombre}
              </option>
            ))}
          </select>
        )}

        {/* 3. BOTÓN (Se mantiene al final, a la derecha) */}
        <div>
          <button
            type="submit"
            className="w-full md:w-auto py-2 px-6 bg-secondary/90 text-white font-medium rounded-lg md:rounded-l-none md:rounded-r-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 h-10 transition-colors"
          >
            Buscar
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default Buscador;
