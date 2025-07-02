import React, { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useGetAlojamientosFiltersQuery } from '@/redux/services/alojamientosService';

export default function Filters({ filter, setFilter }) {
  // Consulta con RTK Query
  const { data: filters, error, isLoading, isFetching } = useGetAlojamientosFiltersQuery();
  const [searchInput, setSearchInput] = useState(filter.search || '');
  const [_categorias, setCategorias] = useState([]);
  const [_localidades, setLocalidades] = useState([]);

  useEffect(() => {
    if (filters) {
      setCategorias(filters.categorias);
      setLocalidades(filters.localidades);
    }
  }, [filters]);

  const [estrellaOptions] = useState([
    { value: 1, label: '1 Estrella' },
    { value: 2, label: '2 Estrellas' },
    { value: 3, label: '3 Estrellas' },
    { value: 4, label: '4 Estrellas' },
    { value: 5, label: '5 Estrellas' }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter({
      ...filter,
      search: searchInput
    });
  };

  const handleCategoriaChange = (categoriaId) => {
    setFilter({
      ...filter,
      categoria: categoriaId || ""
    });
  };

  const handleEstrellasChange = (estrellas) => {
    setFilter({
      ...filter,
      estrellas: estrellas || ""
    });
  };

  const handleLocalidadChange = (localidadId) => {
    setFilter({
      ...filter,
      localidad: localidadId || ""
    });
  };

  return isLoading || isFetching ? (
    <div className='flex flex-col md:flex-row gap-3 items-center mb-6'>
      <div className='flex-grow w-full md:w-auto bg-gray-400 animate-pulse h-7'></div>
      <div className='w-full md:w-44 bg-gray-400 animate-pulse h-7'></div>
      <div className='w-full md:w-44 bg-gray-400 animate-pulse h-7'></div>
      <div className='w-full md:w-44 bg-gray-400 animate-pulse h-7'></div>
    </div>
  ) : error ? (
    <div>Hubo un error</div>
  ) : (
    <div className="mb-8">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-3 items-end mb-6"
      >
        {/* Search Input */}
        <div className="flex-grow w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Nombre del hotel"
              className="w-full border-b-2 border-gray-300 px-4 py-2 focus:outline-none focus:border-primary ps-9 placeholder:text-gray-600 placeholder:italic"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Categorias Dropdown */}
        <div className="w-full md:w-44">
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filter.categoria || ''}
              onChange={(e) => handleCategoriaChange(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Categorías</option>
              {_categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Estrellas Dropdown */}
        <div className="w-full md:w-44">
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filter.estrellas || ''}
              onChange={(e) => handleEstrellasChange(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Estrellas</option>
              {estrellaOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Localidad Dropdown */}
        <div className="w-full md:w-44">
          <div className="relative">
            <select
              className="w-full appearance-none border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filter.localidad || ''}
              onChange={(e) => handleLocalidadChange(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Localidad</option>
              {_localidades.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.nombre}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Buscar Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-primary/90 text-white font-medium rounded hover:bg-primary transition-colors"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}