import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { generateSlug } from '@/utils'; // Asegúrate que la ruta sea correcta
import Head from 'next/head';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import ImageGallery from '@/components/articulos/ImageGallery';

const SkeletonText = ({ width = 'w-full', height = 'h-4', className = '' }) => (
    <div className={`bg-gray-300 rounded ${height} ${width} animate-pulse ${className}`}></div>
);

const SkeletonBlock = ({ lines = 3, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <SkeletonText key={i} width={i === lines - 1 ? 'w-5/6' : 'w-full'} />
        ))}

    </div>

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

// 1. getStaticPaths para generar solo las rutas con ID
export async function getStaticPaths() {
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    let articles = [];
    try {
        // Llama a tu endpoint que devuelve la lista (necesitas al menos idArticulo)
        const res = await fetch(`${apiBaseUrl}/articulos`);
        if (!res.ok) throw new Error(`API Error fetching list: ${res.status}`);
        const data = await res.json();
        articles = data.result || [];
    } catch (error) {
        console.error("Error fetching article list for [id].jsx getStaticPaths:", error);
        return { paths: [], fallback: false };
    }

    const paths = articles.map(article => {
        const articleId = article.idArticulo ? String(article.idArticulo) : null;
        if (!articleId) return null;
        return {
            params: { id: articleId },
        };
    })
        .filter(path => path !== null);

    return { paths, fallback: false };
}

// 2. getStaticProps para obtener el slug correspondiente al ID
export async function getStaticProps(context) {
    const { id } = context.params;
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    let articleData = null;

    try {
        // Llama al endpoint para obtener los detalles (o uno más ligero que solo devuelva el nombre)
        const res = await fetch(`${apiBaseUrl}articulo/${id}`);
        if (!res.ok) {
            if (res.status === 404) return { notFound: true }; // Si el ID no existe, 404
            throw new Error(`API Error Articulo ${id}: ${res.status}`);
        }
        articleData = await res.json();
    } catch (error) {
        console.error(error)
        console.error(`Error fetching article name/slug for ID ${id} in [id].jsx getStaticProps:`, error);
        return { notFound: true }; // Si falla el fetch, 404
    }

    const articulo = articleData?.result;
    if (!articulo || !articulo.nombre) {
        // Si la API no devuelve el artículo o el nombre, no podemos redirigir
        console.warn(`Article or article name not found for ID ${id} in [id].jsx`);
        return { notFound: true };
    }

    const slug = generateSlug(articulo.nombre) || 'sin-titulo';

    return {
        props: {
            id, // Pasa el ID
            slug, // Pasa el slug obtenido
            idioma: articulo.idioma,
        },
    };
}

// 3. Componente que realiza la redirección en el cliente
export default function ArticuloRedirectPage({ id, slug, idioma }) {
    const router = useRouter();

    useEffect(() => {
        if (id && slug) {
            const idiomaCode = {
                1: 'ES',
                2: 'EN'
            }
            let targetUrl = `${process.env.URL_LOCAL}/articulos/articulo/${id}/${slug}`;
            if (parseInt(idioma) !== 1) {
                targetUrl += `?lang=${idiomaCode[parseInt(idioma)] || idioma}`
            }
            console.log(`Redirecting from /articulos/articulo/${id} to ${targetUrl}`);
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
            <div className='mb-10'>
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
            <div className='mb-10 md:w-12/14 w-full mx-auto flex px-2 flex-wrap'>
                {/* --- Columna Izquierda (Contenido Principal) --- */}
                <div className={`md:w-8/11 w-full mb-6 md:mb-4 md:pr-4`}>
                    {/* Título Principal del Artículo*/}
                    <SkeletonText width="w-3/4" height="h-8" className="mb-6" />
                    {/* Galería de Imágenes: Usa datos de getGaleria */}
                    <ImageGallery
                        isLoading={true} // Pasa el estado de carga combinado
                        items={[]} // Pasa los items mapeados
                    />
                    {/* Cuerpo del Artículo: Usa 'cuerpo' */}
                    <div className={`prose prose-slate max-w-none w-full px-4 mt-3 mb-4 md:w-8/11 md:mt-3`}>
                        <SkeletonBlock lines={8} /> // Más líneas para el cuerpo
                    </div>

                </div>

                <div className='md:w-3/11 w-full md:ps-4'>
                    {/* Sección "Para Descargar": Usa datos de getPdfs */}
                    {/* Mostramos solo si está cargando O si hay PDFs después de cargar */}
                    <div className='mb-6'>
                        <h2 className='text-xl font-bold mb-3'>Para Descargar</h2>
                        <div className='flex flex-col gap-3'>
                            <>
                                <SkeletonListItem />
                                <SkeletonListItem />
                            </>
                        </div>
                    </div>
                </div>
            </div>

            {/* Podrías añadir un <Head> con noindex aquí si quieres ser extra cuidadoso */}
        </div>
    );
}