import React from 'react';
import { Phone, Mail, Globe, Facebook, Instagram, CircleSmall } from 'lucide-react';

export default function CardPrestadores({ prestador, isLoading = false }) {
  // Si está cargando, mostrar el skeleton
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse">
        {/* Encabezado skeleton */}
        <div className="bg-gray-200 p-4">
          <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
        </div>

        {/* Contenido skeleton */}
        <div className="p-4 space-y-4">
          {/* Datos del prestador skeleton */}
          <div className="space-y-2">
            <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>

          {/* Actividades skeleton */}
          <div className="space-y-2">
            <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>

          {/* Contactos skeleton */}
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="h-5 w-5 mr-2 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center">
              <div className="h-5 w-5 mr-2 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Redes sociales skeleton */}
          <div className="space-y-2">
            <div className="h-5 w-1/2 bg-gray-200 rounded mb-2"></div>
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no está cargando, mostrar el contenido real
  const {
    titulo,
    responsable,
    direccion,
    localidad_nombre,
    telefono_final,
    email,
    web,
    facebook,
    instagram,
    actividades_texto_original
  } = prestador;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Encabezado verde */}
      <div className="bg-secondary p-4 text-white font-medium">
        <h3 className="text-lg font-bold">{titulo}</h3>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-4">
        {/* Datos del prestador */}
        <div>
          <p className="text-gray-800 font-medium">{responsable}</p>
          <p className="text-gray-700 uppercase underline">{direccion}</p>
          <p className="text-gray-700 font-semibold">{localidad_nombre}</p>
        </div>

        {/* Actividades */}
        <div>
          <p className="text-gray-800 font-bold uppercase">Actividades habilitadas</p>
          <ul className="text-gray-700">
            {actividades_texto_original.split(",").map((actividad, index) => (
              <li key={index} className="flex items-center">
                <span className="text-primary mr-1">
                  <CircleSmall size={16} />
                </span>
                <span className='font-semibold'>{actividad}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contactos */}
        <div className="space-y-2">
          {telefono_final && (
            <p className="flex items-center text-gray-700">
              <Phone className="h-5 w-5 mr-2 text-gray-500" />
              {telefono_final}
            </p>
          )}

          {email && (
            <p className="flex items-center text-gray-700">
              <Mail className="h-5 w-5 mr-2 text-gray-500" />
              {email}
            </p>
          )}
        </div>

        {/* Redes sociales */}
        <div>
          <p className="text-gray-800 font-medium uppercase mb-2">Encontranos en</p>
          <div className="flex gap-2">
            {web && (
              <a href={web} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary">
                <Globe className="h-6 w-6" />
              </a>
            )}

            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary">
                <Facebook className="h-6 w-6" />
              </a>
            )}

            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-secondary/90 hover:text-secondary">
                <Instagram className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}