import React, { useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useSearchTracker } from '@/hooks/useSearchTracker';

export default function Filters({ filter, setFilter }) {
  const [searchInput, setSearchInput] = useState(filter.search || '');
  const { trackSearch } = useSearchTracker();

  const [diaOptions] = useState([
    { value: "todos", label: "Todos los eventos" },
    { value: "hoy", label: "Eventos de hoy" },
    { value: "manana", label: "Eventos de mañana" }
  ]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilter({
      ...filter,
      search: searchInput
    });
    // The actual search/data fetching is typically triggered in the parent component
    // when the 'filter' state changes or after this submit.
  };

  const handleDiaChange = (diaValue) => {
    if (!!diaValue) {
      trackSearch(diaValue || null);
    }
    setFilter({
      ...filter,
      dia: diaValue || "" // Ensure it's an empty string if null/undefined
    });
  };

  const handleFechaIniChange = (e) => {
    if (!!e.target.value) {
      trackSearch(`ini:${e.target.value}/fin:${filter.fechaFin}` || null);
    }
    setFilter({
      ...filter,
      fechaIni: e.target.value
    });
  };

  const handleFechaFinChange = (e) => {
    if (!!e.target.value) {
      trackSearch(`ini:${filter.fechaIni}/fin:${e.target.value}` || null);
    }
    setFilter({
      ...filter,
      fechaFin: e.target.value
    });
  };

  useEffect(() => {
    //Quiero que cuando la propiedad dia de filter cambie, se resetee la fechaIni y la fechaFin a ""
    setFilter({ ...filter, fechaIni: "", fechaFin: "" });
  }, [filter.dia]);

  // Common class for input elements for consistent styling
  const inputBaseClass = "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-600 placeholder:italic";
  const selectClass = `${inputBaseClass} appearance-none`; // For selects to remove default arrow
  const searchInputClass = `${inputBaseClass} ps-9`; // Extra left padding for search icon

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col md:flex-row gap-4 items-end mb-6"
      >
        {/* Search Input */}
        <div className="flex-grow w-full md:w-auto">
          {/* Label can be visually hidden or use placeholder as label */}
          {/* <label htmlFor="search-event" className="block text-[1.1em] font-medium text-gray-500 mb-1 uppercase">Buscar Evento</label> */}
          <div className="relative">
            <input
              id="search-event"
              type="text"
              placeholder="Nombre del Evento"
              className={searchInputClass}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Dia Dropdown */}
        <div className="w-full md:w-56"> {/* Adjusted width */}
          <label htmlFor="filter-dia" className="block text-[1.1em] font-medium text-gray-500 mb-1 uppercase">
            Filtrar por:
          </label>
          <div className="relative">
            <select
              id="filter-dia"
              className={selectClass}
              value={filter.dia || ''} // Use filter.dia directly
              onChange={(e) => handleDiaChange(e.target.value)}
            >
              {/* If an initial "empty" or "default" option is desired and filter.dia can be "", add it here:
                 e.g. <option value="">Todos los días</option> 
                 However, based on provided diaOptions, one of them will be selected if filter.dia matches.
                 If filter.dia is "" and no such option exists, behavior might vary.
                 Assuming filter.dia will be one of "todos", "hoy", "manana".
              */}
              {diaOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* FechaIni Input */}
        <div className="w-full md:w-52"> {/* Adjusted width */}
          <label htmlFor="filter-fechaIni" className="block text-[1.1em] font-medium text-gray-500 mb-1 uppercase">
            Busca por fecha:
          </label>
          <div className="relative">
            <input
              id="filter-fechaIni"
              type="date"
              // Placeholder for type="date" is browser-dependent and often not shown like text inputs
              // The label "dd/mm/aaaa" in the image serves as a format hint.
              className={inputBaseClass}
              value={filter.fechaIni || ''}
              onChange={handleFechaIniChange}
            />
            {/* Standard date inputs have a built-in calendar icon */}
          </div>
        </div>

        {/* FechaFin Input */}
        <div className="w-full md:w-52"> {/* Adjusted width */}
          <label htmlFor="filter-fechaFin" className="block text-[1.1em] font-medium text-gray-500 mb-1 uppercase">
            Hasta:
          </label>
          <div className="relative">
            <input
              id="filter-fechaFin"
              type="date"
              className={inputBaseClass}
              value={filter.fechaFin || ''}
              onChange={handleFechaFinChange}
            />
          </div>
        </div>

        {/* Buscar Button */}
        <button
          type="submit"
          // Tailwind class for button height typically comes from padding (py-2) and font size.
          // Explicit height `h-[42px]` can be used if needed to match other elements perfectly if their heights are fixed.
          // Standardizing on py-2 and border should make heights consistent.
          className="w-full md:w-auto px-6 py-2 bg-primary/90 text-white font-medium rounded hover:bg-primary transition-colors"
          style={{ height: '42px' }} // Added explicit height to match inputs if py-2 isn't enough due to text differences
        >
          Buscar
        </button>
      </form>
    </div>
  );
}