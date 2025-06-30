import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const CardArticulosBusqueda = ({ articulo, loading }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (articulo?.tags) {
      const arr = articulo.tags.split(',').filter(t => t.trim() !== '').slice(0, 5);
      setTags(arr);
    }
  }, [articulo]);

  if (!articulo) return null;

  const { idArticulo, nombre, imagen, imagenMovil, copete } = articulo;

  return (
    <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg ">
      <div className="md:flex">
        <div className="relative md:h-full min-w-50 md:w-48 h-48">
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
                    className="bg-secondary text-white text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h4 className="mb-2 text-slate-800 text-xl font-semibold">
              {nombre}
            </h4>

            <p className="mb-6 text-slate-600 leading-normal font-light line-clamp-3">
              {copete}
            </p>
          </div>

          <div>
            <Link
              href={`articulos/articulo/${idArticulo}`}
              className="text-primary font-bold text-sm hover:underline flex items-center"
            >
              ver más...
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardArticulosBusqueda;

