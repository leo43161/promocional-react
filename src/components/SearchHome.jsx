import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    const encodedSearch = encodeURIComponent(searchTerm.trim());
    const nextPath = `/BusquedaArticulos/?search=${encodedSearch}`;

    // Evitar navegar si ya estamos en la misma URL
    if (router.asPath !== nextPath) {
      router.push(nextPath);
    }
  };

  return (
    <div  className="max-w-6xl mx-auto px-4 py-8">
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-2">
      <input
        type="text"
        placeholder="Buscar artículos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded w-full md:w-96"
      />
      <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">
          Buscar
        </button>
    </form>
    </div>
  );
};

export default SearchHome;
