import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { generateSlug } from "@/utils";
import { idListList } from "@/data/listas";
import { List } from "lucide-react";

const CardSkeleton = () => {
  return (
    // La estructura principal y el espaciado deben ser idénticos a la card real
    // para evitar que la página "salte" cuando se carga el contenido.
    <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
      {/* El div 'animate-pulse' aplica la animación a todos los elementos hijos grises */}
      <div className="flex w-full animate-pulse">
        {/* Skeleton de la Imagen */}
        <div className="md:w-48 min-w-50 h-48 md:h-auto bg-gray-300"></div>

        {/* Skeleton del Contenido */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            {/* Skeleton de los Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="bg-gray-300 h-4 w-16 rounded-full"></div>
              <div className="bg-gray-300 h-4 w-20 rounded-full"></div>
            </div>

            {/* Skeleton del Título */}
            <div className="bg-gray-300 h-6 w-3/4 rounded mb-3"></div>

            {/* Skeleton del Copete/Descripción */}
            <div className="space-y-2">
              <div className="bg-gray-300 h-4 w-full rounded"></div>
              <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
              <div className="bg-gray-300 h-4 w-full rounded"></div>
            </div>
          </div>

          {/* Skeleton del Botón "ver más" */}
          <div className="mt-6">
            <div className="bg-gray-300 h-5 w-24 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardArticulosBusqueda = ({ articulo, isLoading = false }) => {
  const [tags, setTags] = useState([]);
  const listOfLists = idListList();


  useEffect(() => {
    if (articulo?.tags) {
      const arr = articulo.tags.split(',').filter(t => t.trim() !== '').slice(0, 5);
      setTags(arr);
    }
  }, [articulo]);

  if (!articulo) return null;
  const { idArticulo, nombre, imagen, imagenMovil, copete, idioma } = articulo;
  const idiomaCode = parseInt(idioma) !== 1 && languages.find(lang => lang.id === parseInt(idioma))?.code;
  const urlArt = listOfLists[parseInt(articulo.lista)] ?
    `${process.env.URL_LOCAL}/listas/${listOfLists[parseInt(articulo.lista)]}${idiomaCode ? `?lang=${idiomaCode}` : ''}` :
    `${process.env.URL_LOCAL}/articulos/articulo/${idArticulo}/${generateSlug(nombre)}${idiomaCode ? `?lang=${idiomaCode}` : ''}`
  return isLoading ? <CardSkeleton /> : (
    <a href={urlArt} className="text-primary font-bold text-sm flex items-center">
      <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg ">
        <div className="md:flex">
          <div className="relative md:h-full md:min-w-70 md:max-w-70 h-48">
            <Image
              src={process.env.URL_IMG + (imagenMovil ? imagenMovil : imagen)}
              alt={nombre}
              style={{ objectFit: 'cover' }} fill
              className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none object-cover"
            />
          </div>

          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Renderizar solo si hay tags en cliente */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-secondary text-white text-lg px-3 py-0 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <h4 className="mb-0 text-slate-800 text-4xl font-semibold">
                  {nombre}
                </h4>
                {listOfLists[parseInt(articulo.lista)] && <>
                  <div className="bg-secondary text-white text-lg px-3 py-1 rounded-full flex items-center gap-1">
                    <List className="size-5" />
                    Lista
                  </div>
                </>}
              </div>

              <p className="mb-6 text-slate-600 leading-normal font-light line-clamp-3">
                {copete}
              </p>
            </div>

            <div>
              <a
                href={`articulos/articulo/${idArticulo}`}
                className="text-primary font-bold text-sm hover:underline flex items-center"
              >
                Ver más...
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CardArticulosBusqueda;

