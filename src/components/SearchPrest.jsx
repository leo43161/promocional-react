import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/utils';

const Buscador = ({ onSearch, placeholder = "Buscar actividades, prestadores...", className }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={cn("md:w-5/12 mx-auto mb-6", className )}>
      <form onSubmit={handleSubmit} className="flex items-stretch">
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent h-10"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
        </div>
        <div>

          <button
            type="submit"
            className="py-2 px-4 bg-secondary/90 text-white font-medium rounded-r-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 h-full"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Buscador;