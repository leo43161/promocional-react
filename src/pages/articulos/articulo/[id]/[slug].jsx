// pages/articulos/articulo/[id]/[slug].js
import React from 'react'; // No necesitamos useEffect aquí ahora
// import { useRouter } from 'next/router'; // Ya no lo necesitamos para el ID inicial, pero puede ser útil DENTRO del componente si necesitas los params
import Head from 'next/head';

// Importa tu función para generar slugs
import { generateSlug } from '@/utils'; // Asegúrate que la ruta sea correcta

// Importa tus componentes visuales
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ImageGallery from '@/components/articulos/ImageGallery';
import ImperdiblesCard from '@/components/articulos/ImperdiblesCard';

// --- getStaticPaths (del primer bloque de código, sin cambios funcionales) ---
export async function getStaticPaths() {
    // 1. Obtener la lista de TODOS los artículos desde tu API
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    let articles = [];
    try {
        const res = await fetch(`${apiBaseUrl}/articulos`); // Ajusta el endpoint si es necesario
        if (!res.ok) throw new Error(`API Error fetching list: ${res.status}`);
        const data = await res.json();
        // --- NOTA: La línea de slice era para pruebas, quítala para producción ---
        /* data.result = data.result.slice(0, 5); */
        articles = data.result || [];
    } catch (error) {
        console.error("Error fetching article list for getStaticPaths:", error);
        return { paths: [], fallback: false };
    }

    // 2. Generar los 'paths'
    const paths = articles.map(article => {
        const articleId = article.idArticulo ? String(article.idArticulo) : null;
        const articleTitle = article.nombre || '';
        const slug = generateSlug(articleTitle) || 'sin-titulo';

        if (!articleId) {
            console.warn(`Article missing ID, skipping path generation:`, article);
            return null;
        }

        return {
            params: {
                id: articleId,
                slug: slug,
            },
        };
    })
        .filter(path => path !== null);

    // 3. Devolver los paths
    return { paths, fallback: false };
}

// --- getStaticProps (del primer bloque de código, sin cambios funcionales) ---
export async function getStaticProps(context) {
    const { id, slug } = context.params;
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    const imageBaseUrl = process.env.URL_IMG || '';
    const pdfBaseUrl = process.env.URL_PDF || '';

    try {
        const [articuloRes, galeriaRes, pdfsRes] = await Promise.all([
            fetch(`${apiBaseUrl}articulo/${id}`),
            fetch(`${apiBaseUrl}galeria_art/${id}`),
            fetch(`${apiBaseUrl}pdfs_art/${id}`)
        ]);

        if (!articuloRes.ok) {
            if (articuloRes.status === 404) return { notFound: true };
            throw new Error(`API Error Articulo ${id}: ${articuloRes.status}`);
        }

        const articuloData = await articuloRes.json();
        const galeriaData = galeriaRes.ok ? await galeriaRes.json() : { result: [] };
        const pdfsData = pdfsRes.ok ? await pdfsRes.json() : { result: [] };

        const articulo = articuloData?.result;

        // Validación de Slug
        const expectedSlug = generateSlug(articulo?.nombre || '') || 'sin-titulo';
        if (slug !== expectedSlug) {
            console.warn(`Slug mismatch for ID ${id}. URL slug: "${slug}", Expected slug: "${expectedSlug}". Returning 404.`);
            return { notFound: true };
            // Considerar redirección si es necesario en el futuro
        }

        const galeriaItemsRaw = galeriaData?.result || [];
        const pdfItemsRaw = pdfsData?.result || [];

        const galleryItemsForComponent = galeriaItemsRaw.map(item => ({
            img: imageBaseUrl + item.archivo,
            text: item.texto
        }));

        const pdfsForComponent = pdfItemsRaw.map(file => ({
            url: pdfBaseUrl + file.archivo,
            nombre: file.titulo
        }));

        const parallaxImageUrl = articulo?.imagen ? `${imageBaseUrl}${articulo.imagen}` : undefined;

        // Devolver los datos como props
        return {
            props: {
                // Pasamos los datos necesarios al componente
                articulo, // El objeto completo del artículo
                galleryItems: galleryItemsForComponent,
                pdfItems: pdfsForComponent,
                parallaxImageUrl,
                // Pasamos id y slug también por si se necesitan directamente en el componente (ej: para links)
                id,
                slug,
            },
        };

    } catch (error) {
        console.error(`Error fetching data for article ID ${id} (slug: ${slug}):`, error);
        return { notFound: true };
    }
}

// --- Componente Principal (Basado en el segundo bloque, adaptado para usar props) ---
// Renombramos a ArticuloPage para claridad
export default function ArticuloPage({ articulo, galleryItems, pdfItems, parallaxImageUrl, id, slug }) {
console.log(articulo);
    if (!articulo) {
        return <div className="container mx-auto p-5 text-center">Artículo no disponible.</div>;
    }

    // --- Construcción del Breadcrumb usando los props ---
    // Necesitamos la base de la URL de las imágenes y PDFs si no vienen completas
    const imageBaseUrl = process.env.URL_IMG || ''; // Usa NEXT_PUBLIC_ si la necesitas en el cliente también
    const pdfBaseUrl = process.env.URL_PDF || '';

    const breadcrumbItems = [
        // Muestra la subsección si existe en el objeto 'articulo'
        ...(articulo?.nomSubseccion ? [{ label: articulo.nomSubseccion, href: `/subsecciones/lista/${articulo.idSubseccion}/${generateSlug(articulo.nomSubseccion)}` }] : []), // Ajusta el href según tu routing real
        // Muestra el nombre del artículo actual (usando el slug y el id pasados como props)
        { label: articulo.nombre || "Detalle", href: `/articulos/articulo/${id}/${slug}` }
    ];


    // --- Renderizado Principal (Usando directamente las props) ---
    return (
        <div> {/* Contenedor principal */}
            <Head>
                {/* Título: Usa 'nombre' del prop articulo */}
                <title>{articulo?.nombre || 'Detalle del Artículo'}</title>
                {/* Descripción: Usa 'copete' del prop articulo */}
                {articulo?.copete && <meta name="description" content={articulo.copete} />}
                {/* Puedes añadir más meta tags específicos aquí */}
            </Head>

            {/* --- Parallax --- */}
            <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[58vh]"
                className="bg-gray-400" // Color de fondo si no hay imagen
                imageUrl={parallaxImageUrl} // Usa el prop directamente
            >
                <div className="container mx-auto h-full text-white flex flex-col justify-end">
                    <div className='w-11/12 mx-auto pt-5 py-4'>
                        {/* Título dentro del Parallax: Usa 'nombre' del prop articulo */}
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {articulo?.nombre || 'Título no disponible'}
                        </h2>
                    </div>
                </div>
            </ParallaxContainer>

            {/* --- Breadcrumb y Contenido Principal --- */}
            <div className='w-11/12 mx-auto pt-5 lg:mb-10'>
                <div className='mb-5'>
                    {/* Breadcrumb Dinámico */}
                    <Breadcrumb items={breadcrumbItems} />
                </div>
            </div>

            <div className='lg:mb-10 lg:w-12/14 w-full mx-auto flex px-2 flex-wrap flex-col lg:flex-row'>
                {/* --- Columna Izquierda (Contenido Principal) --- */}
                {/* Ajusta el width basado en si hay PDFs (usando pdfItems de props) */}
                <div className={`${pdfItems?.length > 0 ? 'lg:w-8/11' : 'w-full'} w-full mb-6 lg:mb-4 lg:pr-4 order-2 lg:order-1`}>
                    {/* Título Principal del Artículo: Usa 'nombre' del prop articulo */}
                    <h1 className='text-3xl font-bold mb-6'>{articulo?.nombre || 'Artículo sin título'}</h1>

                    {/* Copete: Usa 'copete' del prop articulo */}
                    {articulo?.copete && (
                        <div className='w-full px-2 mb-3'>
                            <p className='text-lg font-semibold'>{articulo.copete}</p>
                        </div>
                    )}

                    {/* Galería de Imágenes: Usa 'galleryItems' de props */}
                    {/* isLoading es siempre false aquí porque la página es estática */}
                    <ImageGallery
                        isLoading={false}
                        items={galleryItems}
                    />

                    {/* Cuerpo del Artículo: Usa 'cuerpo' del prop articulo */}
                    <div className={`prose prose-slate max-w-none w-full px-4 mt-3 mb-4 ${pdfItems?.length === 0 ? 'md:w-8/11 md:mt-3' : ''}`}>
                        {/* Renderiza el HTML del campo 'cuerpo' */}
                        {articulo?.cuerpo ? (
                            <div dangerouslySetInnerHTML={{ __html: articulo.cuerpo }} />
                        ) : (
                            <p>Contenido no disponible.</p>
                        )}
                    </div>

                    {/* Imagen Texto: Usa 'imagenTexto' del prop articulo */}
                    {articulo?.imagenTexto && (
                        <div className={`w-full mb-6 p-3 md:p-5 md:h-[100vh] ${pdfItems?.length === 0 ? 'md:w-8/11' : ''}`}>
                            <img
                                // Construye la URL completa si es necesario
                                src={imageBaseUrl + articulo.imagenTexto}
                                alt={articulo.pieImagen || articulo.nombre}
                                className='object-cover md:object-contain rounded'
                                loading="lazy" // Buena idea añadir lazy loading
                            />
                            {/* Pie de Imagen: Usa 'pieImagen' del prop articulo */}
                            {articulo.pieImagen && (
                                <p className='text-sm text-gray-600 mt-2 italic'>{articulo.pieImagen}</p>
                            )}
                        </div>
                    )}
                </div>

                {/* --- Columna Derecha (Descargas, Imperdibles) --- */}
                {/* Mostramos solo si hay PDFs (usando pdfItems de props) */}
                {pdfItems.length > 0 && (
                    <div className='lg:w-3/11 w-full lg:ps-4 order-1 lg:order-2'>
                        {/* Sección "Para Descargar": Usa 'pdfItems' de props */}
                        <div className='mb-6'>
                            <h2 className='text-xl font-bold mb-3'>Para Descargar</h2>
                            <div className='flex flex-col gap-3  px-2 md:px-0'>
                                {pdfItems.map((file, index) => (
                                    <a key={index}
                                        className="w-full flex items-center gap-3 px-4 py-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={file.url} // Ya viene completa desde getStaticProps
                                        aria-label={`Descargar ${file.nombre}`}
                                    >
                                        <div className="w-1/10 flex-shrink-0">
                                            {/* Considera poner este icono en /public o usar un componente Icon */}
                                            <img src={process.env.URL_IMG_LOCAL + "/icons/pdf-1.svg"} className="w-full h-auto" alt="Icono de archivo" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="m-0 text-sm text-gray-600">Hacé click para descargar</p>
                                            <p className="m-0 font-bold text-base truncate" title={file.nombre}>{file.nombre}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Sección "Imperdibles" (Mantenida estática como en tu ejemplo) */}
                        {/* <div className='hidden'> ... </div> */}
                        {/* Si necesitas que "Imperdibles" sea dinámico, tendrías que pasarlo también desde getStaticProps */}

                    </div>
                )}
            </div>
        </div>
    );
}
