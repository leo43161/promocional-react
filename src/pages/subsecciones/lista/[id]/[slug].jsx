import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ItemLista from '@/components/lista/ItemLista';
import { generateSlug } from '@/utils';


export async function getStaticPaths() {
    // 1. Obtener la lista de TODOS los artículos desde tu API
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    let subsecciones = [];
    try {
        const res = await fetch(`${apiBaseUrl}/subseccion`); // Ajusta el endpoint si es necesario
        if (!res.ok) throw new Error(`API Error fetching list: ${res.status}`);
        const data = await res.json();
        // --- NOTA: La línea de slice era para pruebas, quítala para producción ---
        /* data.result = data.result.slice(0, 5); */
        subsecciones = data.result || [];
    } catch (error) {
        console.error("Error fetching subseccion list for getStaticPaths:", error);
        return { paths: [], fallback: false };
    }

    // 2. Generar los 'paths'
    const paths = subsecciones.map(subseccion => {
        const subseccionId = subseccion.id ? String(subseccion.id) : null;
        const subseccionTitle = subseccion.nombre || '';
        const slug = generateSlug(subseccionTitle) || 'sin-titulo';

        if (!subseccionId) {
            console.warn(`Article missing ID, skipping path generation:`, subseccion);
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

    // 3. Devolver los paths
    return { paths, fallback: false };
}


export async function getStaticProps(context) {
    const { id, slug } = context.params;
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    const imageBaseUrl = process.env.URL_IMG || '';

    try {
        const [seccionRes] = await Promise.all([
            fetch(`${apiBaseUrl}subseccion_id/${id}`),
        ]);

        if (!seccionRes.ok) {
            if (seccionRes.status === 404) return { notFound: true };
            throw new Error(`API Error Articulo ${id}: ${seccionRes.status}`);
        }

        const seccionData = await seccionRes.json();

        const subseccion = seccionData?.result.subseccion;
        const articulos = seccionData?.result.articulos;

        // Validación de Slug
        const expectedSlug = generateSlug(subseccion?.nombre || '') || 'sin-titulo';
        if (slug !== expectedSlug) {
            console.warn(`Slug mismatch for ID ${id}. URL slug: "${slug}", Expected slug: "${expectedSlug}". Returning 404.`);
            return { notFound: true };
            // Considerar redirección si es necesario en el futuro
        }

        const parallaxImageUrl = subseccion?.portada ? `${imageBaseUrl}${subseccion.portada}` : null;
        const parallaxImageUrlMobile = subseccion?.portadaMovil ? `${imageBaseUrl}${subseccion.portadaMovil}` : null;

        // Devolver los datos como props
        return {
            props: {
                // Pasamos los datos necesarios al componente
                subseccion, // El objeto completo del artículo
                articulos,
                parallaxImageUrl,
                parallaxImageUrlMobile,
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

export default function SubseccionPage({ subseccion, articulos, parallaxImageUrl, id, slug }) {
    return (
        <div>
            <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[58vh]"
                className="bg-gray-400" // Color de fondo si no hay imagen
                imageUrl={parallaxImageUrl} // Usa el prop directamente
            >
                <div className="container mx-auto h-full text-white flex flex-col justify-end">
                    <div className='w-11/12 mx-auto pt-5'>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {subseccion?.nombre || 'Título no disponible'}
                        </h2>
                    </div>
                </div>
            </ParallaxContainer>
            <div className='w-11/12 mx-auto pt-5 mb-10'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: "Prestadores activos", href: '/prestadores' }]
                    }></Breadcrumb>
                </div>
            </div>

            <div className='mb-10 md:w-11/14 w-full mx-auto flex flex-col gap-15 px-5'>
                {articulos.map((articulo, index) => (
                    <ItemLista articulo={articulo} key={articulo.index} right={index % 2 === 0}></ItemLista>
                ))}
            </div>

        </div>
    )
}
