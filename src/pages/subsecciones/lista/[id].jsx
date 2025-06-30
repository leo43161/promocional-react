import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { generateSlug } from '@/utils'; // Asegúrate que la ruta sea correcta
import Head from 'next/head';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import ImageGallery from '@/components/articulos/ImageGallery';

const SkeletonText = ({ width = 'w-full', height = 'h-4', className = '' }) => (
  <div className={`bg-gray-300 rounded ${height} ${width} animate-pulse ${className}`}></div>
);

const SkeletonListItem = ({ className = '' }) => (
  <div className={`flex items-center gap-3 p-2 border border-gray-200 rounded ${className}`}>
    <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
    <div className="flex-1 space-y-1">
      <SkeletonText height="h-3" width="w-1/3" />
      <SkeletonText height="h-4" width="w-2/3" />
    </div>
  </div>
);

export async function getStaticPaths() {
  const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
  let subsecciones = [];
  try {
    // Llama a tu endpoint que devuelve la lista (necesitas al menos id)
    const res = await fetch(`${apiBaseUrl}/subseccion_all`);
    if (!res.ok) throw new Error(`API Error fetching list: ${res.status}`);
    const data = await res.json();
    subsecciones = data.result || [];
  } catch (error) {
    console.error("Error fetching subseccion list for [id].jsx getStaticPaths:", error);
    return { paths: [], fallback: false };
  }

  const paths = subsecciones.map(subseccion => {
    const subseccionId = subseccion.id ? String(subseccion.id) : null;
    if (!subseccionId) return null;
    return {
      params: { id: subseccionId },
    };
  })
    .filter(path => path !== null);

  return { paths, fallback: false };
}

// 2. getStaticProps para obtener el slug correspondiente al ID
export async function getStaticProps(context) {
  const { id } = context.params;
  const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
  let subseccionData = null;

  try {
    // Llama al endpoint para obtener los detalles (o uno más ligero que solo devuelva el nombre)
    const res = await fetch(`${apiBaseUrl}subseccion/${id}`);
    if (!res.ok) {
      if (res.status === 404) return { notFound: true }; // Si el ID no existe, 404
      throw new Error(`API Error Articulo ${id}: ${res.status}`);
    }
    subseccionData = await res.json();
  } catch (error) {
    console.error(`Error fetching subseccion name/slug for ID ${id} in [id].jsx getStaticProps:`, error);
    return { notFound: true }; // Si falla el fetch, 404
  }

  const subseccion = subseccionData?.result.subseccion;
  if (!subseccion || !subseccion.nombre) {
    // Si la API no devuelve el artículo o el nombre, no podemos redirigir
    console.warn(`Article or subseccion name not found for ID ${id} in [id].jsx`);
    return { notFound: true };
  }

  const slug = generateSlug(subseccion.nombre) || 'sin-titulo';

  return {
    props: {
      id, // Pasa el ID
      slug, // Pasa el slug obtenido
      idioma: subseccion.idioma,
    },
  };
}

export default function SubseccionLoades({ id, slug, idioma }) {
  const router = useRouter();

   useEffect(() => {
    if (id && slug) {
      const idiomaCode = {
        1: 'ES',
        2: 'EN'
    }
      let targetUrl = `${process.env.URL_LOCAL}/subsecciones/lista/${id}/${slug}`;
      if (parseInt(idioma) !== 1) {
        targetUrl += `?lang=${idiomaCode[parseInt(idioma)] || idioma}`
      }
      console.log(`Redirecting from /subsecciones/lista/${id} to ${targetUrl}`);
      router.replace(targetUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, slug]); // Depende de id y slug

  // Muestra un mensaje de carga o nada mientras redirige
  return (
    <div>
      <Head>
        {/* Título: Usa 'nombre' del artículo */}
        <title>{slug ? 'Cargando...' : (slug || 'Detalle')}</title>
        {/* Descripción: Usa 'copete' del artículo */}
        {slug && <meta name="description" content={slug} />}
      </Head>
      <div className='mb-16'>
        <ParallaxContainer
          speed={0.2}
          minHeight="h-96 md:h-[58vh]"
          className="bg-gray-400" // Color de fondo mientras carga o si no hay imagen
        // Aplica la imagen de fondo dinámicamente
        >
          <div className="container mx-auto h-full text-white flex flex-col justify-end"> {/* Añadido gradiente para legibilidad */}
            <div className='w-11/12 mx-auto pt-5 py-4'> {/* Ajustado padding */}
              {/* Título dentro del Parallax: Usa 'nombre' */}
              <SkeletonText width="w-1/2" height="h-10 md:h-12" className="bg-gray-200/50 mb-6" />
            </div>
          </div>
        </ParallaxContainer>
      </div>
      <div className='mb-10 md:w-11/14 w-full mx-auto flex flex-col gap-15 px-5'>
        <div className={`flex flex-col md:flex-row items-stretch md:gap-12 gap-7 ${false && "md:flex-row-reverse"}`}>
          <div className="md:w-3/6 md:h-[60vh] h-[45vh] w-full bg-gray-300 rounded animate-pulse">

          </div>
          <div className={`md:w-3/6 flex flex-col justify-center md:gap-5 gap-7 ${false ? "md:items-end" : "md:items-start"}`}>
            <SkeletonText width="w-full" height="h-10 md:h-12" className="bg-gray-200/50 mb-6" />
            <div className='w-full'>
              <SkeletonText width="w-full" height="h-10 md:h-5" className="bg-gray-200/50 mb-6" />
              <SkeletonText width="w-full" height="h-10 md:h-5" className="bg-gray-200/50 mb-6" />
              <SkeletonText width="w-full" height="h-10 md:h-5" className="bg-gray-200/50 mb-6" />
            </div>
            <div className='w-full '>
              <SkeletonText
                width="w-1/4"
                height="h-10 md:h-5"
                className="bg-gray-200/50 mb-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
