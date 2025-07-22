import React from "react";
import Image from "next/image"; // Asumiendo Next.js para el componente Image
import Link from "next/link"; // Asumiendo Next.js para el componente Link
import {
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  CircleSmall,
} from "lucide-react";

// Componente Skeleton genérico, adaptado para la nueva disposición
const CardPrestadoresSkeleton = () => {
  return (
    <div className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
      <div className="flex w-full animate-pulse">
        {/* Skeleton de la Imagen */}
        <div className="md:w-48 min-w-50 h-48 md:h-auto bg-gray-300"></div>

        {/* Skeleton del Contenido */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            {/* Skeleton de Título */}
            <div className="bg-gray-300 h-6 w-3/4 rounded mb-3"></div>

            {/* Skeleton de Detalles */}
            <div className="space-y-2 mb-4">
              <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
              <div className="bg-gray-300 h-4 w-full rounded"></div>
              <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
            </div>

            {/* Skeleton de Actividades */}
            <div className="space-y-2 mb-4">
              <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
              <div className="bg-gray-300 h-4 w-full rounded"></div>
              <div className="bg-gray-300 h-4 w-full rounded"></div>
            </div>

            {/* Skeleton de Contactos */}
            <div className="space-y-2 mb-4">
              <div className="bg-gray-300 h-4 w-3/5 rounded"></div>
              <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
            </div>
          </div>

          {/* Skeleton de Redes Sociales */}
          <div className="flex gap-2 mt-auto">
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CardPrestadoresBusqueda({
  prestador,
  isLoading = false,
}) {
  if (isLoading || !prestador) {
    return <CardPrestadoresSkeleton />;
  }

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
    actividades_texto_original,
    // Asumo que hay un campo de imagen similar a los artículos. Si no, necesitarás una imagen placeholder.
    imagen, // Agrega este campo o similar si existe para prestadores
  } = prestador;

  // URL de la imagen placeholder si no hay una imagen definida para el prestador
  const imageUrl = imagen ? `${process.env.URL_IMG}/${imagen}`
    : "/svg/itinerarios/prestadores.svg";

  return (
    <div className="flex flex-col md:flex-row w-full my-4 bg-white shadow-sm border border-slate-200 rounded-lg">
      <div className="md:flex">
        <div className="relative w-full h-full md:w-60 md:h-auto">
          <Image
            src={imageUrl}
            alt={titulo}
            style={{ objectFit: "" }}
            fill
            className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none bg-secondary"
          />
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h5 className="mb-2 text-primary text-2xl font-semibold">
              {titulo}
            </h5>
            <p className="text-gray-800 font-medium">{responsable}</p>
            <p className="text-gray-700 font-medium uppercase underline">{direccion}</p>
            <p className="text-gray-700 font-semibold">{localidad_nombre}</p>

            {actividades_texto_original && (
              <div className="mt-4">
                <p className="text-gray-800 font-bold uppercase text-xl mb-2">
                  Actividades habilitadas
                </p>
                <ul className="text-gray-700 flex flex-wrap gap-2">
                  {actividades_texto_original
                    .split(",")
                    .map((actividad, index) => (
                      <li
                        key={index}
                        className="flex items-center w-full md:w-[calc(50%-0.5rem)] mb-1"
                      >
                        {" "}
                        {/* Añadimos ancho para que quepan dos */}
                        <span className="text-primary mr-1">
                          <CircleSmall size={16} />
                        </span>
                        <span className="font-semibold">
                          {actividad.trim()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-4">
            {telefono_final && (
              <p className="flex items-center text-gray-700 font-medium text-lg mb-2">
                <Phone className="h-5 w-5 mr-2 text-gray-500 font-medium" />
                {telefono_final}
              </p>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center text-gray-700 hover:text-primary mb-2"
              >
                <Mail className="h-5 w-5 mr-2 text-gray-500" />
                {email}
              </a>
            )}

            {(web || facebook || instagram) && (
              <div className="mt-4">
                <p className="text-gray-800 text-base font-medium uppercase mb-2">
                  Encontranos en
                </p>
                <div className="flex gap-2">
                  {web && (
                    <a
                      href={web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/90 hover:text-secondary"
                    >
                      <Globe className="h-6 w-6" />
                    </a>
                  )}
                  {facebook && (
                    <a
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/90 hover:text-secondary"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                  )}
                  {instagram && (
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/90 hover:text-secondary"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
