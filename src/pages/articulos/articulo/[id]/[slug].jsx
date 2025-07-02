// pages/articulos/articulo/[id]/[slug].js
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'; // Importa useRouter

// Importa tu función para generar slugs
import { cn, generateSlug, encode } from '@/utils'; // Asegúrate que la ruta sea correcta/[slug].jsx]

// Importa tus componentes visuales
import ParallaxContainer from '@/components/common/ParallaxContainer'; ///[slug].jsx]
import Breadcrumb from '@/components/common/Breadcrumb'; ///[slug].jsx]
import ImageGallery from '@/components/articulos/ImageGallery'; ///[slug].jsx]
import { Facebook, MessageCircle, Twitter } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
// import ImperdiblesCard from '@/components/articulos/ImperdiblesCard'; // Comentado si no se usa directamente en esta página

// --- getStaticPaths ---
export async function getStaticPaths() {
    // 1. Obtener la lista de TODOS los artículos desde tu API
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    let articles = [];
    try {
        const res = await fetch(`${apiBaseUrl}/articulos`);
        if (!res.ok) throw new Error(`API Error fetching list: ${res.status}`);
        const data = await res.json();
        articles = data.result || [];
    } catch (error) {
        console.error("Error fetching article list for getStaticPaths:", error);
        return { paths: [], fallback: false };//
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

    return { paths, fallback: false };
}

// --- getStaticProps ---
export async function getStaticProps(context) {
    const { id, slug } = context.params;
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    const imageBaseUrl = process.env.URL_IMG || '';
    const pdfBaseUrl = process.env.URL_PDF || '';
    const siteBaseUrl = process.env.URL_LOCAL || 'https://www.tucumanturismo.gob.ar/reactdev'; // Asume un valor por defecto si no está

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

        const expectedSlug = generateSlug(articulo?.nombre || '') || 'sin-titulo';
        if (slug !== expectedSlug) {
            console.warn(`Slug mismatch for ID ${id}. URL slug: "${slug}", Expected slug: "${expectedSlug}". Returning 404.`);
            return { notFound: true };
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
        const defaultOgImage = `${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/public/icons/main/logotuc.png`; // Imagen por defecto para OG

        // Construcción del pageMeta
        const pageMeta = {
            title: `${articulo?.nombre || 'Artículo'} - Tucumán Turismo`,
            description: articulo?.copete || `Descubre más sobre ${articulo?.nombre || 'este destino'} en Tucumán. Información turística oficial.`,
            keywords: `Tucumán, turismo, ${articulo?.nombre || ''}, ${articulo?.nomSubseccion || ''}, ${articulo?.localidad || ''}, Argentina`,
            ogType: 'article',
            ogTitle: `${articulo?.nombre || 'Artículo'} - Tucumán Turismo`,
            ogDescription: articulo?.copete || `Descubre más sobre ${articulo?.nombre || 'este destino'} en Tucumán.`,
            ogImage: parallaxImageUrl || defaultOgImage,
            ogUrl: `${siteBaseUrl}/articulos/articulo/${id}/${slug}`, // URL Canónica para OG
            twitterCard: "summary_large_image",
            twitterTitle: `${articulo?.nombre || 'Artículo'} - Tucumán Turismo`,
            twitterDescription: articulo?.copete || `Descubre más sobre ${articulo?.nombre || 'este destino'} en Tucumán.`,
            twitterImage: parallaxImageUrl || `${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/public/icons/tucturwide.png`, // Imagen específica para Twitter si es diferente
        };
        // Schema.org para Artículo
        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${siteBaseUrl}/articulos/articulo/${id}/${slug}`
            },
            "headline": articulo?.nombre || "Artículo sobre Tucumán",
            "image": parallaxImageUrl || defaultOgImage,
            "datePublished": articulo?.fecha_alta || new Date().toISOString(), // Asume que tienes una fecha de publicación, sino usa la actual
            "dateModified": articulo?.fecha_mod || articulo?.fecha_alta || new Date().toISOString(), // Asume fecha de modificación o publicación
            "author": {
                "@type": "Organization",
                "name": "Ente Autárquico Tucumán Turismo"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Ente Autárquico Tucumán Turismo",
                "logo": {
                    "@type": "ImageObject",
                    "url": `${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/public/icons/main/logotuc.png`
                }
            },
            "description": articulo?.copete || `Descubre más sobre ${articulo?.nombre || 'este destino'} en Tucumán.`,
            "articleBody": articulo?.cuerpo ? articulo.cuerpo.replace(/<[^>]*>?/gm, '').substring(0, 500) + "..." : "Contenido detallado del artículo." // Extrae texto plano para articleBody
        };


        return {
            props: {
                articulo,
                galleryItems: galleryItemsForComponent,
                pdfItems: pdfsForComponent,
                parallaxImageUrl,
                id,
                slug,
                pageMeta, // Pasar pageMeta a la página
                articleSchema, // Pasar el schema del artículo
            },
        };

    } catch (error) {
        console.error(`Error fetching data for article ID ${id} (slug: ${slug}):`, error);
        return { notFound: true };
    }
}

const SocialIcons = ({ url, title, className = '' }) => {
    if (!url || !title) {
        return null; // No mostrar si no hay URL o título
    }

    const encodedUrl = encode(url);
    const encodedTitle = encode(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        // WhatsApp: usa el protocolo wa.me y necesita un texto que incluya la URL
        // Las previsualizaciones en WhatsApp se generan automáticamente si la URL tiene las meta OG correctas.
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%0A${encodedUrl}`, // %0A es un salto de línea codificado
    };
    return (
        <div className={cn("flex items-center gap-5", className)}>
            <a
                className="text-secondary/90 hover:text-secondary"
                aria-label="Compartir en Facebook"
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Facebook size={24} />
            </a>
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en X (Twitter)"
                className="text-secondary/90 hover:text-secondary"
            >
                <Twitter size={24} />
            </a>
            <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en WhatsApp"
                className="text-secondary/90 hover:text-secondary"
            >
                <MessageCircle size={24} /> {/* Usando MessageCircle como placeholder para WhatsApp */}
            </a>
        </div>
    );
};

// --- Componente Principal ---
export default function ArticuloPage({ articulo, galleryItems, pdfItems, parallaxImageUrl, id, slug, pageMeta, articleSchema }) {
    const router = useRouter(); // Necesario para la URL canónica y hreflang si se implementa aquí

    const { lang } = router.query;

    if (!articulo) {
        // Esta comprobación es más para robustez, getStaticProps debería devolver notFound: true
        return <div className="container mx-auto p-5 text-center">Artículo no disponible.</div>;
    }

    const imageBaseUrl = process.env.URL_IMG || '';
    const siteBaseUrl = process.env.URL_LOCAL || 'https://www.tucumanturismo.gob.ar/reactdev';

    const breadcrumbItems = [
        ...(articulo?.nomSubseccion ? [{ label: articulo.nomSubseccion, href: `${siteBaseUrl}/subsecciones/lista/${articulo.idSubseccion}/${generateSlug(articulo.nomSubseccion)}` }] : []), ///[slug].jsx]
        { label: articulo.nombre || "Detalle", href: `${siteBaseUrl}/articulos/articulo/${id}/${slug}` } ///[slug].jsx]
    ];
    
    // Definir la URL canónica completa
    const canonicalUrl = `${siteBaseUrl}${router.asPath.split("?")[0]}`;

    const shareUrl = pageMeta?.ogUrl || canonicalUrl; // Usa la ogUrl si está definida, sino la canónica
    const shareTitle = pageMeta?.ogTitle || articulo?.nombre || 'Artículo de Tucumán Turismo';

    const activeRightSidebar = pdfItems?.length > 0;
    return (
        <div>
            <Head>
                <title>{pageMeta?.title || `${articulo?.nombre || 'Detalle del Artículo'} - Tucumán Turismo`}</title>
                <meta name="description" content={pageMeta?.description || articulo?.copete} />
                {pageMeta?.keywords && <meta name="keywords" content={pageMeta.keywords} />}

                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:type" content={pageMeta?.ogType || "article"} />
                <meta property="og:title" content={pageMeta?.ogTitle || pageMeta?.title} />
                <meta property="og:description" content={pageMeta?.ogDescription || pageMeta?.description} />
                <meta property="og:url" content={pageMeta?.ogUrl || canonicalUrl} />
                <meta property="og:image" content={pageMeta?.ogImage || (parallaxImageUrl || `${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}public/icons/main/logotuc.png`)} />
                <meta property="og:site_name" content={pageMeta?.ogSiteName || "Tucumán Turismo"} />

                {/* Twitter Card */}
                <meta name="twitter:card" content={pageMeta?.twitterCard || "summary_large_image"} />
                <meta name="twitter:site" content="@TucumanTurismo" />
                <meta name="twitter:creator" content="@TucumanTurismo" />
                <meta name="twitter:title" content={pageMeta?.twitterTitle || pageMeta?.title} />
                <meta name="twitter:description" content={pageMeta?.twitterDescription || pageMeta?.description} />
                <meta name="twitter:image" content={pageMeta?.twitterImage || (parallaxImageUrl || `${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}public/icons/tucturwide.png`)} />

                {/* Hreflang tags (Ejemplo básico, ajustar según tu estructura de idiomas) */}
                {/* Asumiendo que 'articulo.idioma' te da el código de idioma (ej: 'es', 'en')
                    y que tienes URLs distintas para cada idioma. */}
                {articulo?.idioma === 1 && ( // Español
                    <>
                        <link rel="alternate" hrefLang="es" href={`${siteBaseUrl}/articulos/articulo/${id}/${slug}`} />
                        <link rel="alternate" hrefLang="en" href={`${siteBaseUrl}/articulos/articulo/${id}/${slug}?lang=EN`} /> {/* O tu estructura para inglés */}
                        <link rel="alternate" hrefLang="x-default" href={`${siteBaseUrl}/articulos/articulo/${id}/${slug}`} />
                    </>
                )}
                {articulo?.idioma === 2 && ( // Inglés
                    <>
                        <link rel="alternate" hrefLang="en" href={`${siteBaseUrl}/articulos/articulo/${id}/${slug}?lang=EN`} />
                        <link rel="alternate" hrefLang="es" href={`${siteBaseUrl}/articulos/articulo/${id}/${slug}`} /> {/* O tu estructura para español */}
                        <link rel="alternate" hrefLang="x-default" href={`${siteBaseUrl}/articulos/articulo/${id}/${slug}?lang=EN`} />
                    </>
                )}


                {/* Schema.org JSON-LD */}
                {articleSchema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                    />
                )}
            </Head>

            <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
                className="bg-gray-400"
                imageUrl={parallaxImageUrl}
            >
                <div className="container mx-auto h-full text-white flex flex-col justify-end">
                    <div className='w-11/12 mx-auto pt-5 py-4'>
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            {articulo?.nombre || 'Título no disponible'}
                        </h2>
                    </div>
                </div>
            </ParallaxContainer>

            <div className='w-11/12 xl:w-11/16 mx-auto pt-5 lg:mb-5'>
                <div className='mb-5'>
                    <Breadcrumb items={breadcrumbItems} />
                </div>
            </div>

            <div className='lg:mb-10 lg:w-12/14 xl:w-11/16 w-full mx-auto flex px-2 flex-wrap flex-col lg:flex-row'>
                <div className={`${activeRightSidebar ? 'lg:w-8/11' : 'w-full'} w-full mb-6 lg:mb-4 lg:pr-4 order-2 lg:order-1`}>
                    <h1 className='text-4xl font-bold mb-6'>{articulo?.nombre || 'Artículo sin título'}</h1>
                    {articulo?.copete && (
                        <div className='w-full px-2 mb-3'>
                            <p className='text-lg font-semibold'>{articulo.copete}</p>
                        </div>
                    )}
                    {galleryItems?.length > 0 && (
                        <ImageGallery
                            isLoading={false}
                            items={galleryItems}
                            className='md:p-0 md:mb-4 mb-2 md:h-[85vh]'
                        />
                    )}
                    <div className='order-1 lg:order-2 mb-6 md:ps-1 px-3'>
                        <div className='flex justify-between md:w-4/14 xl:w-5/14 2xl:w-3/14 w-full border shadow px-4 py-2 md:px-3 md:py-1 rounded-md'>
                            <h2 className='text-lg font-semibold'>{lang === 'EN' ? 'Share' : 'Compartir'}</h2>
                            <SocialIcons url={shareUrl} title={shareTitle} />
                        </div>
                    </div>

                    {articulo?.iframe && (
                        <div className='mb-6'>
                            <div className='flex flex-col gap-3 px-2 md:px-0'>
                                {/* div para colocar un Iframe */}
                                <div dangerouslySetInnerHTML={{ __html: articulo?.iframe }}>

                                </div>
                            </div>
                        </div>
                    )}

                    <div className={`prose prose-slate max-w-none w-full px-4 mt-3 mb-4 ${pdfItems?.length === 0 ? 'md:w-8/11 md:mt-3' : ''}`}>
                        {articulo?.cuerpo ? (
                            <div dangerouslySetInnerHTML={{ __html: articulo.cuerpo }} />
                        ) : (
                            <p>Contenido no disponible.</p>
                        )}
                    </div>
                    {articulo?.imagenTexto && (
                        <div className={`w-full mb-6 p-3 md:p-5 ${pdfItems?.length === 0 ? 'md:w-8/11' : ''}`}>
                            <img
                                src={imageBaseUrl + articulo.imagenTexto} ///[slug].jsx]
                                alt={articulo.pieImagen || articulo.nombre}
                                className='object-cover md:object-contain rounded'
                                loading="lazy"
                            />
                            {articulo.pieImagen && (
                                <p className='text-[1.1em] text-gray-600 mt-2 italic'>{articulo.pieImagen}</p>
                            )}
                        </div>
                    )}
                </div>

                {activeRightSidebar && (
                    <div className='lg:w-3/11 w-full lg:ps-4 order-1 lg:order-2'>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-bold mb-3'>Para Descargar</h2>
                            <div className='flex flex-col gap-3 px-2 md:px-0'>
                                {pdfItems.map((file, index) => (
                                    <a key={index}
                                        className="w-full flex items-center gap-3 px-4 py-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={file.url}
                                        aria-label={`Descargar ${file.nombre}`}
                                    >
                                        <div className="w-1/10 flex-shrink-0">
                                            <img src={`${process.env.URL_IMG_LOCAL || ''}/icons/pdf-1.svg`} className="w-full h-auto" alt="Icono de archivo PDF" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="m-0 text-[1.1em] text-gray-600">Hacé click para descargar</p>
                                            <p className="m-0 font-bold text-[1.1em] truncate" title={file.nombre}>{file.nombre}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}