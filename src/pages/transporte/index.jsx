// src/pages/transporte/index.jsx
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import BuscadorTransporte from '@/components/transportes/DestinosModule';

export default function Transportes() {
    const router = useRouter();
    const siteBaseUrl = process.env.URL_LOCAL || 'https://www.tucumanturismo.gob.ar';
    const canonicalUrl = `${siteBaseUrl}${router.asPath.split("?")[0]}`;
    const imageUrl = 'https://www.tucumanturismo.gob.ar/public/img/planviaje/1920x650-Planifica-Transporte-Desktop.jpg'; //
    const pageTitle = "Transporte en Tucumán - Colectivos, Horarios y Destinos";
    const pageDescription = "Encuentra toda la información sobre cómo moverte en Tucumán: horarios de colectivos, empresas de transporte, y cómo llegar a los principales destinos turísticos de la provincia.";

    const pageMeta = {
        title: pageTitle,
        description: pageDescription,
        keywords: "transporte tucuman, colectivos tucuman, horarios transporte tucuman, viajar en tucuman, movilidad tucuman",
        ogType: 'website',
        ogTitle: pageTitle,
        ogDescription: pageDescription,
        ogImage: imageUrl,
        ogUrl: canonicalUrl,
        twitterCard: "summary_large_image",
        twitterTitle: pageTitle,
        twitterDescription: pageDescription,
        twitterImage: imageUrl,
    };

    // Schema.org para la página de servicio de transporte
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": pageTitle,
        "description": pageDescription,
        "url": canonicalUrl,
        "publisher": {
            "@type": "Organization",
            "name": "Ente Autárquico Tucumán Turismo",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.tucumanturismo.gob.ar/public/icons/main/logotuc.png"
            }
        },
        "mainEntity": {
            "@type": "Service",
            "serviceType": "Transporte Turístico",
            "provider": {
                "@type": "Organization",
                "name": "Empresas de Transporte de Tucumán"
            },
            "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Tucumán"
            },
            "name": "Servicio de Información de Transporte en Tucumán",
            "description": "Información sobre líneas de colectivo, horarios y destinos para el transporte público y turístico en la provincia de Tucumán."
        }
    };


    return (
        <div>
            <Head>
                <title>{pageMeta.title}</title>
                <meta name="description" content={pageMeta.description} />
                <meta name="keywords" content={pageMeta.keywords} />

                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:type" content={pageMeta.ogType} />
                <meta property="og:title" content={pageMeta.ogTitle} />
                <meta property="og:description" content={pageMeta.ogDescription} />
                <meta property="og:url" content={pageMeta.ogUrl} />
                <meta property="og:image" content={pageMeta.ogImage} />
                <meta property="og:site_name" content="Tucumán Turismo" />

                <meta name="twitter:card" content={pageMeta.twitterCard} />
                <meta name="twitter:site" content="@TucumanTurismo" />
                <meta name="twitter:creator" content="@TucumanTurismo" />
                <meta name="twitter:title" content={pageMeta.twitterTitle} />
                <meta name="twitter:description" content={pageMeta.twitterDescription} />
                <meta name="twitter:image" content={pageMeta.twitterImage} />

                {/* Hreflang - Asumiendo que esta página también puede tener versiones */}
                <link rel="alternate" hrefLang="es" href={`${siteBaseUrl}/transportes`} />
                <link rel="alternate" hrefLang="en" href={`${siteBaseUrl}/transportes?lang=EN`} /> {/* Ajustar si la URL en inglés es diferente */}
                <link rel="alternate" hrefLang="x-default" href={`${siteBaseUrl}/transportes`} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
                />
            </Head>

            <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[58vh] xl:h-[45vh]" //
                className="" //
                imageUrl={imageUrl} //
            >
                <div className="container mx-auto h-full text-white flex flex-col justify-end">
                    <div className='w-11/12 mx-auto pt-5'>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Transportes
                        </h2>
                    </div>
                </div>
            </ParallaxContainer>
            <div className='w-11/12 xl:w-11/16 mx-auto pt-5 mb-10 xl:mb-3'>
                <div className='mb-5'>
                    <Breadcrumb items={ //
                        [{ label: "Transportes", href: '/transportes' }]
                    }></Breadcrumb>
                </div>
            </div>

            <div className='mb-10 md:w-12/14 w-full mx-auto px-2'>
                <BuscadorTransporte></BuscadorTransporte>
            </div>
        </div>
    )
}