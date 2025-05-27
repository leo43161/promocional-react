// src/components/Layout.jsx
import React from 'react';
import Head from 'next/head'; //
import { useRouter } from 'next/router';
import Header from './Header'; //
import SmoothView from './common/SmoothView'; //
import Footer from './Footer'; //
import { languages } from '@/utils'; //

export default function Layout({ children, className, pageProps }) {
    const router = useRouter();
    const { lang } = router.query; // Obtener el idioma actual de la URL

    const siteBaseUrl = 'https://www.tucumanturismo.gob.ar' + process.env.URL_LOCAL;
    console.log(process.env.URL_LOCAL);
    const defaultOgImage = `${process.env.URL_IMG_LOCAL || siteBaseUrl}/images/main/og-image-tucuman.png`;
    const defaultFaviconBase = `${process.env.URL_IMG_LOCAL || siteBaseUrl}/icons/main/`;

    // Metadatos por defecto que pueden ser sobrescritos por `pageProps.pageMeta`
    const defaultMeta = {
        title: "Tucumán Turismo - Sitio Oficial del Ente Tucumán Turismo",
        description: "Descubrí Tucumán, el Jardín de la República. Información oficial sobre destinos, qué hacer, dónde dormir, gastronomía, eventos y más para planificar tu viaje.",
        keywords: "Tucumán, turismo, Argentina, viajar, vacaciones, Jardín de la República, San Miguel de Tucumán, Tafí del Valle, Yerba Buena, San Javier",
        ogType: 'website',
        ogSiteName: 'Tucumán Turismo',
        ogImage: defaultOgImage,
        twitterCard: 'summary_large_image',
        twitterSite: '@TucumanTurismo', // Reemplaza con tu handle de Twitter/X
        twitterCreator: '@TucumanTurismo', // Reemplaza con tu handle de Twitter/X
        twitterImage: `${process.env.URL_IMG_LOCAL || siteBaseUrl}/icons/tucturwide.png`, // Imagen para Twitter
        themeColor: '#006E66', // Un color de tu marca, ej: secundario
    };
    /* console.log("pageProps");
    console.log(pageProps); */
    // Fusionar metadatos por defecto con los específicos de la página (si existen en pageProps)
    const meta = { ...defaultMeta, ...(pageProps?.pageMeta || {}) };

    // Construir URL canónica y URLs para hreflang
    const pathWithoutQuery = router.asPath.split('?')[0];
    const canonicalUrl = `${siteBaseUrl}${pathWithoutQuery}`;

    const currentLangCode = (lang || languages[0].code).toUpperCase();
    const alternativeLangCode = currentLangCode === 'ES' ? 'EN' : 'ES';

    let esUrl = `${siteBaseUrl}${pathWithoutQuery}`;
    let enUrl = `${siteBaseUrl}${pathWithoutQuery}?lang=EN`;

    // Si la URL actual ya tiene ?lang=ES, no lo agregamos de nuevo
    if (router.asPath.includes('?lang=ES') || !router.asPath.includes('?lang=')) {
        esUrl = `${siteBaseUrl}${pathWithoutQuery}${router.asPath.includes('?lang=ES') ? '' : (pathWithoutQuery.endsWith('/') ? '' : '')}`;
        if (!esUrl.endsWith('/') && !esUrl.includes('?')) esUrl += ''; // Evitar ?lang=ES si no hay otros queries.
    } else if (router.asPath.includes('?lang=')) {
        esUrl = `${siteBaseUrl}${pathWithoutQuery}`;
    }


    // Schema.org para WebSite (global)
    const webSiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": siteBaseUrl,
        "name": "Tucumán Turismo",
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteBaseUrl}/buscar?q={search_term_string}`, // Si tienes una página de búsqueda
            "query-input": "required name=search_term_string"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Ente Autárquico Tucumán Turismo",
            "url": "https://www.tucumanturismo.gob.ar",
            "logo": {
                "@type": "ImageObject",
                "url": `${defaultFaviconBase}logotuc.png` // URL del logo de la organización
            }
        }
    };


    return (
        <div className={"bg-neutral-50 min-h-screen " + className}>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <title>{meta.title}</title>
                <meta name="description" content={meta.description} />
                {meta.keywords && <meta name="keywords" content={meta.keywords} />}
                <meta name="author" content="Ente Autárquico Tucumán Turismo" />
                <meta name="copyright" content={`Ente Autárquico Tucumán Turismo - ${new Date().getFullYear()}`} />

                <link rel="canonical" href={canonicalUrl} />

                {/* Favicons - Asegúrate de que estos archivos existan en tu carpeta /public */}
                <link rel="icon" href={`${defaultFaviconBase}favicon.ico`} sizes="any" />
                <link rel="icon" href={`${defaultFaviconBase}logotuc.svg`} type="image/svg+xml" />
                <link rel="apple-touch-icon" href={`${defaultFaviconBase}apple-touch-icon.png`} /> {/* 180x180 */}
                <link rel="manifest" href={`${defaultFaviconBase}site.webmanifest`} />


                {/* Open Graph */}
                <meta property="og:type" content={meta.ogType} />
                <meta property="og:title" content={meta.ogTitle || meta.title} />
                <meta property="og:description" content={meta.ogDescription || meta.description} />
                <meta property="og:url" content={meta.ogUrl || canonicalUrl} />
                <meta property="og:image" content={meta.ogImage} />
                <meta property="og:site_name" content={meta.ogSiteName} />
                {alternativeLangCode === 'ES' && <meta property="og:locale" content="es_AR" />}
                {alternativeLangCode === 'EN' && <meta property="og:locale" content="en_US" />}


                {/* Twitter Card */}
                <meta name="twitter:card" content={meta.twitterCard} />
                <meta name="twitter:site" content={meta.twitterSite} />
                <meta name="twitter:creator" content={meta.twitterCreator} />
                <meta name="twitter:title" content={meta.twitterTitle || meta.title} />
                <meta name="twitter:description" content={meta.twitterDescription || meta.description} />
                <meta name="twitter:image" content={meta.twitterImage} />

                <meta name="theme-color" content={meta.themeColor} />

                {/* Hreflang tags */}
                <link rel="alternate" hrefLang="es" href={esUrl} />
                <link rel="alternate" hrefLang="en" href={enUrl} />
                <link rel="alternate" hrefLang="x-default" href={alternativeLangCode === 'ES' ? esUrl : enUrl} />

                {/* Schema.org for WebSite */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
                />
                {/* Script de Google Tag Manager (ya lo tienes en _app.jsx, solo si decides moverlo aquí) */}

            </Head>
            <SmoothView>
                <div className='relative'>
                    <Header />
                    <main>
                        {children}
                    </main>
                </div>
            </SmoothView>
            <Footer />
        </div>
    )
}