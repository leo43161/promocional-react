import React from 'react';
import { ChevronDown,Search} from 'lucide-react';
import { useState } from 'react';


export default function SearchHome({ categorias = [], localidades = [] }) {
  const [searchHome, setSearchHome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [localidad, setLocalidad] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí puedes usar el router para redirigir o hacer fetch
    console.log({ searchHome, categoria, localidad })
  }

  const handleClear = () => {
    setSearchHome('')
    setCategoria('')
    setLocalidad('')
  }
  return (
    <div className="absolute w-full">
      <div className="bg-white w-full lg:w-11/12 xl:w-11/12 2xl:w-9/12 mx-auto">
        <form onSubmit={handleSubmit} className="mx-2">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4">
            
            {/* Campo de búsqueda */}
            <div className="w-full md:w-1/2 flex items-center gap-2 border-b border-gray-300">
              <i className="bi bi-search text-xl text-gray-600"><Search></Search></i>
              <input
                type="search" id="searchHome" name="searchhome"placeholder="Ej: Tafí del Valle" className="w-full outline-none"
                value={searchHome}
                onChange={(e) => setSearchHome(e.target.value)}
              />
            </div>

            {/* Selects */}
            <div className="flex flex-col md:flex-row items-stretch gap-2 w-full md:w-auto">
              <select
                name="categoria"
                id="categoria"
                className="border rounded px-3 py-2"
                value="Categoria"
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Categoría</option>
                <option value="">Todas</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              <select
                name="localidad"
                id="localidad"
                className="border rounded px-3 py-2"
                value="Localidad"
                onChange={(e) => setLocalidad(e.target.value)}
              >
                <option value="">Localidad</option>
                <option value="">Todas</option>
                {localidades.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.nombre}
                  </option>
                ))}
              </select>

              {/* Botón Buscar */}
              <button
                type="submit"
                className="bg-secondary text-white rounded px-4 py-2 flex items-center gap-1"
              >
                <i className="bi bi-search text-sm"></i>
                Buscar
              </button>             
            
            </div>
          </div>
        </form>
        </div>
    </div>
  )
}
