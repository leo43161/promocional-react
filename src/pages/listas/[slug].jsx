import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { generateSlug } from '@/utils'; // Asegúrate que la ruta sea correcta
import Head from 'next/head';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import CardGeneric from '@/components/listcards/CardGeneric';
import { listLists } from '@/data/listas';

const SkeletonText = ({ width = 'w-full', height = 'h-4', className = '' }) => (
    <div className={`bg-gray-300 rounded ${height} ${width} animate-pulse ${className}`}></div>
);

// 1. getStaticPaths para generar solo las rutas con ID
export async function getStaticPaths() {

    const paths = Object.keys(listLists).map(lista => {
        const listaId = listLists[lista] ? listLists[lista] : null;
        if (!listaId) return null;
        return {
            params: { slug: generateSlug(lista) || 'sin-titulo' },
        };
    })
        .filter(path => path !== null);
    return { paths, fallback: false };
}

// 2. getStaticProps para obtener el slug correspondiente al ID
export async function getStaticProps(context) {
    const { slug } = context.params;
    const id = listLists[slug] ? listLists[slug] : null;
    const imageBaseUrl = process.env.URL_IMG || '';
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    const siteBaseUrl = process.env.URL_LOCAL_SERVER + process.env.URL_LOCAL || '';
    let listaData = null;
    try {
        const res = await fetch(`${apiBaseUrl}listas?lista=${id}`);
        if (!res.ok) {
            if (res.status === 404) return { notFound: true };
            throw new Error(`API Error Lista ${id}: ${res.status}`);
        }
        listaData = await res.json();
    } catch (error) {
        console.error(`Error fetching lista for ID ${id}:`, error);
        return { notFound: true };
    }

    const lista = listaData?.result?.lista;
    const cards = listaData?.result?.cards || [];
    const parallaxImageUrl = lista?.img ? `${imageBaseUrl}${lista.img}` : undefined;
    const defaultOgImage = `${siteBaseUrl}/public/icons/main/logotuc.png`;

    if (!lista || !lista.nombre) {
        console.warn(`Lista not found for ID ${id}`);
        return { notFound: true };
    }

    // Construcción del pageMeta
    const pageMeta = {
        title: `${lista.nombre} - Tucumán Turismo`,
        description: `Descubre ${lista.nombre.toLowerCase()} en Tucumán. Información turística oficial completa y actualizada.`,
        keywords: `Tucumán, turismo, ${lista.nombre}, información turística, Argentina, oficinas`,
        ogType: 'website',
        ogTitle: `${lista.nombre} - Tucumán Turismo`,
        ogDescription: `Descubre ${lista.nombre.toLowerCase()} en Tucumán. Información turística oficial completa y actualizada.`,
        ogImage: parallaxImageUrl || defaultOgImage,
        ogUrl: `${siteBaseUrl}/listas/${id}/${slug}`,
        twitterCard: "summary_large_image",
        twitterTitle: `${lista.nombre} - Tucumán Turismo`,
        twitterDescription: `Descubre ${lista.nombre.toLowerCase()} en Tucumán.`,
        twitterImage: parallaxImageUrl || `${siteBaseUrl}/public/icons/tucturwide.png`,
    };

    // Schema.org para Lista - Usamos ItemList con elementos LocalBusiness
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": lista.nombre,
        "description": `Lista completa de ${lista.nombre.toLowerCase()} en Tucumán`,
        "numberOfItems": cards.length,
        "itemListElement": cards.map((card, index) => {
            // Extraer información de los campos
            const camposMap = {};
            card.campos?.forEach(campo => {
                if (campo.Titulo.toLowerCase().includes('dirección')) {
                    camposMap.direccion = campo.Texto;
                } else if (campo.Titulo.toLowerCase().includes('teléfono') || campo.Titulo.toLowerCase().includes('telefono')) {
                    camposMap.telefono = campo.Texto;
                } else if (campo.Titulo.toLowerCase().includes('email') || campo.Titulo.toLowerCase().includes('mail')) {
                    camposMap.email = campo.Texto;
                } else if (campo.Titulo.toLowerCase().includes('horario')) {
                    camposMap.horarios = campo.Texto;
                }
            });

            // Esquema para cada oficina turística
            return {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "LocalBusiness",
                    "name": card.Titulo,
                    "image": card.Img ? `${imageBaseUrl}${card.Img}` : undefined,
                }
            };
        })
    };

    // Schema adicional de organización (opcional pero recomendado)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "GovernmentOrganization",
        "name": "Ente Autárquico Tucumán Turismo",
        "logo": {
            "@type": "ImageObject",
            "url": `${siteBaseUrl}/public/icons/main/logotuc.png`
        },
        "url": siteBaseUrl,
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Información Turística",
            "areaServed": "AR-T",
            "availableLanguage": ["Spanish"]
        }
    };

    // Combinar ambos schemas en un array
    const combinedSchema = [itemListSchema, organizationSchema];

    return {
        props: {
            id,
            slug,
            cards,
            lista,
            parallaxImageUrl,
            pageMeta,
            schema: combinedSchema
        },
    };
}

// 3. Componente que realiza la redirección en el cliente
export default function ArticuloRedirectPage({ id, slug, cards, lista, parallaxImageUrl, pageMeta, schema }) {
    const siteBaseUrl = `${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}` || '';
    const canonicalUrl = `${siteBaseUrl}/listas/${id}/${slug}`;
    const router = useRouter();

    // Muestra un mensaje de carga o nada mientras redirige
    return (
        <div>
            <Head>
                <title>{pageMeta?.title || `${lista?.nombre || 'Lista'} - Tucumán Turismo`}</title>
                <meta name="description" content={pageMeta?.description || `Descubre ${lista?.nombre || 'esta lista'} en Tucumán`} />
                {pageMeta?.keywords && <meta name="keywords" content={pageMeta.keywords} />}

                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta property="og:type" content={pageMeta?.ogType || "website"} />
                <meta property="og:title" content={pageMeta?.ogTitle || pageMeta?.title} />
                <meta property="og:description" content={pageMeta?.ogDescription || pageMeta?.description} />
                <meta property="og:url" content={pageMeta?.ogUrl || canonicalUrl} />
                <meta property="og:image" content={pageMeta?.ogImage || (parallaxImageUrl || `${siteBaseUrl}/public/icons/main/logotuc.png`)} />
                <meta property="og:site_name" content={pageMeta?.ogSiteName || "Tucumán Turismo"} />
                <meta property="og:locale" content="es_AR" />

                {/* Twitter Card */}
                <meta name="twitter:card" content={pageMeta?.twitterCard || "summary_large_image"} />
                <meta name="twitter:site" content="@TucumanTurismo" />
                <meta name="twitter:creator" content="@TucumanTurismo" />
                <meta name="twitter:title" content={pageMeta?.twitterTitle || pageMeta?.title} />
                <meta name="twitter:description" content={pageMeta?.twitterDescription || pageMeta?.description} />
                <meta name="twitter:image" content={pageMeta?.twitterImage || (parallaxImageUrl || `${siteBaseUrl}/public/icons/tucturwide.png`)} />

                {/* Hreflang tags para listas */}
                <link rel="alternate" hrefLang="es" href={`${siteBaseUrl}/listas/${id}/${slug}`} />
                <link rel="alternate" hrefLang="en" href={`${siteBaseUrl}/en/listas/${id}/${slug}`} />
                <link rel="alternate" hrefLang="x-default" href={`${siteBaseUrl}/listas/${id}/${slug}`} />

                {/* Viewport y otras meta tags esenciales */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Ente Autárquico Tucumán Turismo" />

                {/* Información adicional para search engines */}
                <meta property="og:image:width" content="1920" />
                <meta property="og:image:height" content="650" />
                <meta property="og:image:alt" content={lista?.nombre || 'Tucumán Turismo'} />

                {/* Schema.org JSON-LD */}
                {schema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                    />
                )}

                {/* BreadcrumbList Schema adicional */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Inicio",
                                    "item": siteBaseUrl
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Listas",
                                    "item": `${siteBaseUrl}/listas`
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": lista?.nombre || "Lista",
                                    "item": canonicalUrl
                                }
                            ]
                        })
                    }}
                />
            </Head>
            <section>
                <ParallaxContainer
                    speed={0.2}
                    minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
                    className=""
                    imageUrl={parallaxImageUrl}
                >
                    <div className="container mx-auto h-full text-white flex flex-col justify-end">
                        <div className="w-11/12 mx-auto pt-5">
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">{lista?.nombre}</h2>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <div className="w-11/12 mx-auto pt-5">
                <div className="mb-5">
                    <Breadcrumb
                        items={[{ label: lista?.nombre, href: `/listas/${id}` }]}
                    />
                </div>
                <div className="w-full mt-5">
                    <h1 className="text-center mb-6 text-5xl font-bold ">
                        {lista?.nombre}
                    </h1>
                </div>
                <div className="row g-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.length > 0 ? (
                        cards.map((articulo) => (
                            <CardGeneric key={articulo.id_LC} articulo={articulo} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-muted">
                            No se encontraron {lista?.nombre}.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}