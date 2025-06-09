// src/pages/subsecciones/lista/[id]/[slug].jsx
import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ItemLista from '@/components/lista/ItemLista';
import { generateSlug } from '@/utils';

export async function getStaticPaths() {
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    let subsecciones = [];
    try {
        const res = await fetch(`${apiBaseUrl}/subseccion_all`);
        if (!res.ok) throw new Error(`API Error fetching list: ${res.status}`);
        const data = await res.json();
        subsecciones = data.result || [];
    } catch (error) {
        console.error("Error fetching subseccion list for getStaticPaths:", error);
        return { paths: [], fallback: false };
    }

    const paths = subsecciones.map(subseccion => {
        const subseccionId = subseccion.id ? String(subseccion.id) : null;
        const subseccionTitle = subseccion.nombre || '';
        const slug = generateSlug(subseccionTitle) || 'sin-titulo';

        if (!subseccionId) {
            console.warn(`Subseccion missing ID, skipping path generation:`, subseccion);
            return null;
        }

        return {
            params: {
                id: subseccionId,
                slug: slug,
            },
        };
    })
        .filter(path => path !== null);

    return { paths, fallback: false };
}


export async function getStaticProps(context) {
    const { id, slug } = context.params;
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    const imageBaseUrl = process.env.URL_IMG || '';
    const siteBaseUrl = process.env.URL_LOCAL || 'https://www.tucumanturismo.gob.ar';

    try {
        const [seccionRes] = await Promise.all([
            fetch(`${apiBaseUrl}subseccion/${id}`),
        ]);

        if (!seccionRes.ok) {
            if (seccionRes.status === 404) return { notFound: true };
            throw new Error(`API Error Subseccion ${id}: ${seccionRes.status}`);
        }

        const seccionData = await seccionRes.json();
        const subseccion = seccionData?.result.subseccion;
        const articulos = seccionData?.result.articulos;

        const expectedSlug = generateSlug(subseccion?.nombre || '') || 'sin-titulo';
        if (slug !== expectedSlug) {
            console.warn(`Slug mismatch for ID ${id}. URL slug: "${slug}", Expected slug: "${expectedSlug}". Returning 404.`);
            return { notFound: true };
        }

        const parallaxImageUrl = subseccion?.portada ? `${imageBaseUrl}${subseccion.portada}` : null;
        const parallaxImageUrlMobile = subseccion?.portadaMovil ? `${imageBaseUrl}${subseccion.portadaMovil}` : null;
        const defaultOgImage = "https://www.tucumanturismo.gob.ar/public/icons/main/logotuc.png";

        // Construcción del pageMeta para la subsección (lista de artículos)
        const pageMeta = {
            title: `${subseccion?.nombre || 'Contenidos'} - Tucumán Turismo`,
            description: subseccion?.descripcion || `Explora ${subseccion?.nombre || 'nuestros contenidos'} sobre Tucumán. Artículos, guías y más.`,
            keywords: `Tucumán, turismo, ${subseccion?.nombre || ''}, artículos, guías, ${subseccion?.localidad || ''}`,
            ogType: 'website', // O 'object' si representa una colección
            ogTitle: `${subseccion?.nombre || 'Contenidos'} - Tucumán Turismo`,
            ogDescription: subseccion?.descripcion || `Explora ${subseccion?.nombre || 'nuestros contenidos'} sobre Tucumán.`,
            ogImage: parallaxImageUrl || defaultOgImage,
            ogUrl: `${siteBaseUrl}/subsecciones/lista/${id}/${slug}`,
            twitterCard: "summary_large_image",
            twitterTitle: `${subseccion?.nombre || 'Contenidos'} - Tucumán Turismo`,
            twitterDescription: subseccion?.descripcion || `Explora ${subseccion?.nombre || 'nuestros contenidos'} sobre Tucumán.`,
            twitterImage: parallaxImageUrl || "https://www.tucumanturismo.gob.ar/public/icons/tucturwide.png",
        };

        // Schema.org para CollectionPage (lista de artículos)
        const collectionPageSchema = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": subseccion?.nombre || "Lista de Artículos",
            "description": subseccion?.descripcion || `Una colección de artículos sobre ${subseccion?.nombre || 'Tucumán'}.`,
            "url": `${siteBaseUrl}/subsecciones/lista/${id}/${slug}`,
            "publisher": {
                "@type": "Organization",
                "name": "Ente Autárquico Tucumán Turismo",
                "logo": {
                    "@type": "ImageObject",
                    "url": defaultOgImage
                }
            },
            // Opcional: Listar algunos de los artículos como 'mainEntity' si es relevante
            // "mainEntity": {
            //     "@type": "ItemList",
            //     "itemListElement": articulos.slice(0, 5).map((articulo, index) => ({ // Muestra los primeros 5
            //         "@type": "ListItem",
            //         "position": index + 1,
            //         "item": {
            //             "@type": "Article",
            //             "headline": articulo.nombre,
            //             "url": `${siteBaseUrl}/articulos/articulo/${articulo.idArticulo}/${generateSlug(articulo.nombre)}`
            //         }
            //     }))
            // }
        };


        return {
            props: {
                subseccion,
                articulos,
                parallaxImageUrl,
                parallaxImageUrlMobile,
                id,
                slug,
                pageMeta,
                collectionPageSchema,
            },
        };

    } catch (error) {
        console.error(`Error fetching data for subseccion ID ${id} (slug: ${slug}):`, error);
        return { notFound: true };
    }
}

export default function SubseccionPage({ subseccion, articulos, parallaxImageUrl, id, slug, pageMeta, collectionPageSchema }) {
    const router = useRouter();
    const siteBaseUrl = process.env.URL_LOCAL || 'https://www.tucumanturismo.gob.ar';
    const canonicalUrl = `${siteBaseUrl}${router.asPath.split("?")[0]}`;

    // Si la subsección no existe (aunque getStaticProps debería manejar esto con notFound)
    if (!subseccion) {
        return <div className="container mx-auto p-5 text-center">Contenido no disponible.</div>;
    }

    return (
        <div>
            <Head>
                <title>{pageMeta?.title || `${subseccion?.nombre || 'Contenidos'} - Tucumán Turismo`}</title>
                <meta name="description" content={pageMeta?.description || subseccion?.descripcion || `Explora ${subseccion?.nombre || 'nuestros contenidos'} sobre Tucumán.`} />
                {pageMeta?.keywords && <meta name="keywords" content={pageMeta.keywords} />}

                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:type" content={pageMeta?.ogType || "website"} />
                <meta property="og:title" content={pageMeta?.ogTitle || pageMeta?.title} />
                <meta property="og:description" content={pageMeta?.ogDescription || pageMeta?.description} />
                <meta property="og:url" content={pageMeta?.ogUrl || canonicalUrl} />
                <meta property="og:image" content={pageMeta?.ogImage || parallaxImageUrl || "https://www.tucumanturismo.gob.ar/public/icons/main/logotuc.png"} />
                <meta property="og:site_name" content={pageMeta?.ogSiteName || "Tucumán Turismo"} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content={pageMeta?.twitterCard || "summary_large_image"} />
                <meta name="twitter:site" content="@TucumanTurismo" />
                <meta name="twitter:creator" content="@TucumanTurismo" />
                <meta name="twitter:title" content={pageMeta?.twitterTitle || pageMeta?.title} />
                <meta name="twitter:description" content={pageMeta?.twitterDescription || pageMeta?.description} />
                <meta name="twitter:image" content={pageMeta?.twitterImage || parallaxImageUrl || "https://www.tucumanturismo.gob.ar/public/icons/tucturwide.png"} />

                {/* Hreflang - Asume que subseccion.idioma contiene el ID del idioma (1 para ES, 2 para EN) */}
                {subseccion?.idioma === 1 && ( // Español
                    <>
                        <link rel="alternate" hrefLang="es" href={`${siteBaseUrl}/subsecciones/lista/${id}/${slug}`} />
                        <link rel="alternate" hrefLang="en" href={`${siteBaseUrl}/subsecciones/lista/${id}/${slug}?lang=EN`} />
                        <link rel="alternate" hrefLang="x-default" href={`${siteBaseUrl}/subsecciones/lista/${id}/${slug}`} />
                    </>
                )}
                {subseccion?.idioma === 2 && ( // Inglés
                    <>
                        <link rel="alternate" hrefLang="en" href={`${siteBaseUrl}/subsecciones/lista/${id}/${slug}?lang=EN`} />
                        <link rel="alternate" hrefLang="es" href={`${siteBaseUrl}/subsecciones/lista/${id}/${slug}`} />
                        <link rel="alternate" hrefLang="x-default" href={`${siteBaseUrl}/subsecciones/lista/${id}/${slug}?lang=EN`} />
                    </>
                )}

                {/* Schema.org JSON-LD para CollectionPage */}
                {collectionPageSchema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
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
                    <div className='w-11/12 mx-auto pt-5'>
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">
                            {subseccion?.nombre || 'Título no disponible'}
                        </h2>
                    </div>
                </div>
            </ParallaxContainer>
            <div className='w-11/12 mx-auto pt-5 mb-10 md:w-11/14 xl:w-11/16'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: subseccion?.nombre, href: `${siteBaseUrl}/subsecciones/lista/${id}/${slug}` }]
                    }></Breadcrumb>
                </div>
            </div>

            <div className='mb-10 md:w-11/14 xl:w-11/16 w-full mx-auto flex flex-col gap-15 px-5'>
                {articulos && articulos.length > 0 ? (
                    articulos.map((articulo, index) => (
                        <Fragment key={articulo.idArticulo || index}> {/* Usa un ID único del artículo si está disponible */}
                            <ItemLista articulo={articulo} right={!(index % 2 === 0)}></ItemLista>
                        </Fragment>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No hay artículos disponibles en esta sección.</p>
                )}
            </div>

        </div>
    )
}