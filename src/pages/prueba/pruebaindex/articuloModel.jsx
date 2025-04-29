import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Importa tus componentes
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ImageGallery from '@/components/articulos/ImageGallery';
import ImperdiblesCard from '@/components/articulos/ImperdiblesCard';


// Importa los hooks de RTK Query (principal, galería, pdfs)
import {
    useGetArticuloIdQuery,
    useGetGaleriaQuery, // <-- Nuevo hook
    useGetPdfsQuery, // <-- Nuevo hook
} from '@/redux/services/articulosService'; // Ajusta la ruta si es necesario

// --- Componentes Skeleton Simples (sin cambios) ---

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

// --- FIN Skeletons ---



// --- Componente Principal ---

export default function Articulo() {

    const router = useRouter();

    const { id } = router.query;



    // --- Llamadas a los Hooks RTK Query ---

    const {

        data: articuloData,

        isLoading: isLoadingArticulo,

        isError: isErrorArticulo,

        error: errorArticulo,

    } = useGetArticuloIdQuery({ id }, { skip: !id });



    const {

        data: galeriaData,

        isLoading: isLoadingGaleria,

        isError: isErrorGaleria, // Podrías manejar errores específicos si quieres

    } = useGetGaleriaQuery({ id }, { skip: !id });



    const {

        data: pdfsData,

        isLoading: isLoadingPdfs,

        isError: isErrorPdfs, // Podrías manejar errores específicos si quieres

    } = useGetPdfsQuery({ id }, { skip: !id });



    // --- Estado de Carga Combinado ---

    // Los skeletons se mostrarán hasta que todos los datos necesarios estén cargados

    const isLoading = isLoadingArticulo || isLoadingGaleria || isLoadingPdfs;



    // --- Extracción de Datos ---

    // Usamos optional chaining ?. para acceder de forma segura a 'result'

    const articulo = articuloData?.result;

    const galeriaItemsRaw = galeriaData?.result; // Datos crudos de la galería

    const pdfItemsRaw = pdfsData?.result;       // Datos crudos de los PDFs



    // --- Manejo de Errores Globales (prioriza error del artículo principal) ---

    if (isErrorArticulo) {

        console.error("Error fetching article data:", errorArticulo);

        return <div className="container mx-auto p-5 text-center text-red-600">Error: {"No se pudo cargar el artículo."}</div>;

    }

    // Aquí podrías añadir manejo para isErrorGaleria, isErrorPdfs si necesitas mensajes más específicos



    // --- Manejo de Sin ID ---

    if (!id && !isLoadingArticulo) { // Basta con chequear isLoadingArticulo aquí

        return <div className="container mx-auto p-5 text-center">ID de artículo no especificado en la URL.</div>;

    }



    // --- Manejo de Artículo No Encontrado (después de cargar) ---

    if (!articulo && !isLoadingArticulo && id) {

        return <div className="container mx-auto p-5 text-center">No se encontró el artículo solicitado.</div>;

    }



    // --- Preparación de Datos para Componentes ---



    const imageBaseUrl = process.env.URL_IMG || '';

    const pdfBaseUrl = process.env.URL_PDF || '';

    // Mapeo para ImageGallery (asumiendo estructura de galeriaData.result)

    const galleryItemsForComponent = isLoading ? [] : (galeriaItemsRaw?.map(item => ({

        img: imageBaseUrl + item.archivo, // Asume que esto es una URL completa

        text: item.texto

    })) || []);



    // Mapeo para lista de PDFs (asumiendo estructura de pdfsData.result)

    const pdfsForComponent = isLoading ? [] : (pdfItemsRaw?.map(file => ({

        url: pdfBaseUrl + file.archivo, // Asume que esto es una URL completa

        nombre: file.titulo

    })) || []);



    // URL para la imagen del Parallax (usando 'imagen' del articuloData.result)

    const parallaxImageUrl = articulo?.imagen ? `${imageBaseUrl}/${articulo.imagen}` : undefined;



    console.log(articulo);

    // --- Renderizado Principal ---

    return (

        <div> {/* Contenedor principal */}

            <Head>

                {/* Título: Usa 'nombre' del artículo */}

                <title>{isLoading ? 'Cargando...' : (articulo?.nombre || 'Detalle')}</title>

                {/* Descripción: Usa 'copete' del artículo */}

                {articulo?.copete && <meta name="description" content={articulo.copete} />}

            </Head>



            {/* --- Parallax --- */}

            <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[58vh]"
                className="bg-gray-400" // Color de fondo mientras carga o si no hay imagen
                // Aplica la imagen de fondo dinámicamente
                imageUrl={parallaxImageUrl}
            >
                <div className="container mx-auto h-full text-white flex flex-col justify-end"> {/* Añadido gradiente para legibilidad */}
                    <div className='w-11/12 mx-auto pt-5 py-4'> {/* Ajustado padding */}
                        {/* Título dentro del Parallax: Usa 'nombre' */}
                        {isLoading ? (
                            <SkeletonText width="w-1/2" height="h-10 md:h-12" className="bg-gray-200/50 mb-6" />
                        ) : (
                            <h2 className="text-4xl md:text-5xl font-bold mb-6"> {/* Añadido drop-shadow */}
                                {articulo?.nombre || 'Título no disponible'}
                            </h2>
                        )}
                    </div>
                </div>
            </ParallaxContainer>



            {/* --- Breadcrumb y Contenido Principal --- */}

            <div className='w-11/12 mx-auto pt-5 mb-10'>
                <div className='mb-5'>
                    {/* Breadcrumb Dinámico */}
                    <Breadcrumb items={
                        [
                            // Muestra la subsección si existe
                            ...(articulo?.nomSubseccion ? [{ label: articulo.nomSubseccion, href: `/seccion/${articulo.idSubseccion}` }] : []), // Ajusta el href según tu routing
                            // Muestra el nombre del artículo actual
                            ...(isLoading ?
                                [{ label: '...', href: '#' }] :
                                articulo ? [{ label: articulo.nombre || "Detalle", href: `/articulos/${id}` }] : []) // O /articulo/${id}
                        ]
                    } />
                </div>
            </div>

            <div className='mb-10 md:w-12/14 w-full mx-auto flex px-2 flex-wrap'>
                {/* --- Columna Izquierda (Contenido Principal) --- */}
                <div className={`${pdfsForComponent?.length > 0 && 'md:w-8/11'} w-full mb-6 md:mb-4 md:pr-4`}> {/* Añadido padding derecho en desktop */}
                    {/* Título Principal del Artículo: Usa 'nombre' */}
                    {isLoading ? (
                        <SkeletonText width="w-3/4" height="h-8" className="mb-6" />
                    ) : (
                        <h1 className='text-3xl font-bold mb-6'>{articulo?.nombre || 'Artículo sin título'}</h1>
                    )}
                    {!isLoading && articulo?.copete && (
                        <div className='w-full px-2 mb-3'>

                            <p className='text-lg font-semibold'>{articulo.copete}</p>
                        </div>

                    )}



                    {/* Galería de Imágenes: Usa datos de getGaleria */}

                    <ImageGallery
                        isLoading={isLoading} // Pasa el estado de carga combinado
                        items={galleryItemsForComponent} // Pasa los items mapeados
                    />

                    {/* Cuerpo del Artículo: Usa 'cuerpo' */}

                    <div className={`prose prose-slate max-w-none w-full px-4 mt-3 mb-4 ${!pdfsForComponent?.length > 0 && 'md:w-8/11 md:mt-3'}`}>
                        {isLoading ? (
                            <SkeletonBlock lines={8} /> // Más líneas para el cuerpo
                        ) : (
                            // Renderiza el HTML del campo 'cuerpo'
                            articulo?.cuerpo ? (
                                <div dangerouslySetInnerHTML={{ __html: articulo.cuerpo }} />
                            ) : (
                                <p>Contenido no disponible.</p>
                            )
                        )}
                    </div>

                    {!isLoading && articulo?.imagenTexto && (
                        <div className={`w-full mb-6 p-3 md:p-5 md:h-[100vh] ${!pdfsForComponent?.length > 0 && 'md:w-8/11'}`}>
                            <img
                                src={imageBaseUrl + articulo.imagenTexto}
                                alt={articulo.pieImagen || articulo.nombre}
                                className='object-cover md:object-contain rounded'
                            />
                            {articulo.pieImagen && (
                                <p className='text-sm text-gray-600 mt-2 italic'>{articulo.pieImagen}</p>
                            )}
                        </div>
                    )}
                </div>

                {(isLoading || pdfsForComponent.length > 0) && (
                    <>
                        {/* --- Columna Derecha (Descargas, Imperdibles) --- */}
                        <div className='md:w-3/11 w-full md:ps-4'>
                            {/* Sección "Para Descargar": Usa datos de getPdfs */}
                            {/* Mostramos solo si está cargando O si hay PDFs después de cargar */}
                            <div className='mb-6'>
                                <h2 className='text-xl font-bold mb-3'>Para Descargar</h2>
                                <div className='flex flex-col gap-3'>
                                    {isLoading ? (
                                        <>
                                            <SkeletonListItem />
                                            <SkeletonListItem />
                                        </>
                                    ) : (
                                        pdfsForComponent.map((file, index) => (
                                            <a key={index}
                                                className="w-full flex items-center gap-3 px-4 py-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={file.url} // URL del archivo mapeado
                                                aria-label={`Descargar ${file.nombre}`} // Nombre del archivo mapeado
                                            >
                                                <div className="w-1/10 flex-shrink-0">
                                                    <img src="https://www.tucumanturismo.gob.ar/public/iconssvg/articulo/pdf-1.svg" className="w-full h-auto" alt="Icono de archivo" />
                                                </div>
                                                <div className="flex-1 overflow-hidden">
                                                    <p className="m-0 text-sm text-gray-600">Hacé click para descargar</p>
                                                    <p className="m-0 font-bold text-base truncate" title={file.nombre}>{file.nombre}</p> {/* Nombre del archivo mapeado */}
                                                </div>
                                            </a>

                                        ))

                                    )}
                                </div>
                            </div>
                            {/* Si no está cargando y no hay PDFs, no se muestra la sección */}

                            {/* Sección "Imperdibles" (Se mantiene estática) */}
                            <div className='hidden'>
                                <h2 className='text-xl font-bold mb-4'>Imperdibles</h2>
                                <div className='flex flex-col gap-5'>
                                    <ImperdiblesCard
                                        img={"https://www.tucumanturismo.gob.ar/public/img/galeriacadillal_j0kpht3j_12-06-2024.jpg"}
                                        titulo={"El Cadillal"}
                                    />
                                    <ImperdiblesCard
                                        img={"https://www.tucumanturismo.gob.ar/public/img/cristo.jpg"}
                                        titulo={"San Javier"}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>

    );

}