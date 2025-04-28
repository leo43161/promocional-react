import React from 'react'
import { generateSlug } from '@/utils'

export async function getStaticPaths() {
    // 1. Obtener la lista de TODOS los artículos desde tu API
    //    Debe devolver al menos 'id' y 'nombre' (o el campo del título)
    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    let articles = [];
    try {
        // Asegúrate que este endpoint devuelva la lista completa que necesitas pre-renderizar
        const res = await fetch(`${apiBaseUrl}/articulos`); // O el endpoint correcto
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();
        //Quiero cortar el array data para que solo haya 2 elementos
        data.result = data.result.slice(0, 2);
        /* console.log("API Response:", data); */
        // Asume que los artículos están en un array dentro de 'data.result' o similar
        articles = data.result || [];
    } catch (error) {
        console.error("Error fetching article list for getStaticPaths:", error);
        return { paths: [], fallback: false }; // No generar páginas si la lista falla
    }
    console.log("Articulos:" + articles[0].idArticulo);
    // 2. Generar los 'paths' con los 'params' correctos ({ id: '...', slug: '...' })
    const paths = articles.map(article => {
        // Asegúrate que 'id' y 'nombre' existan y no sean null/undefined
        const articleId = article.idArticulo ? String(article.idArticulo) : null; // Convertir ID a string
        const articleTitle = article.nombre || ''; // Usar título o string vacío
        const slug = generateSlug(articleTitle) || 'sin-titulo'; // Generar slug o usar fallback

        if (!articleId) {
            console.warn(`Article missing ID, skipping path generation:`, article);
            return null; // Saltar este artículo si no tiene ID
        }

        return {
            params: {
                id: articleId,   // El ID del artículo como string
                slug: slug,      // El slug generado
            },
        };
    })
        .filter(path => path !== null); // Filtrar los artículos que se saltaron

    // 3. Devolver los paths y fallback: false (esencial para `next export`)
    return { paths, fallback: false };
}

export async function getStaticProps(context) {
    /* console.log("context.params:", context.params); */
    // context.params contendrá { id: '...', slug: '...' }
    const { id, slug } = context.params; // Obtenemos ambos, pero usaremos principalmente el ID para el fetch

    const apiBaseUrl = process.env.URL_SERVER || 'URL_POR_DEFECTO_DE_TU_API';
    const imageBaseUrl = process.env.URL_IMG || '';
    const pdfBaseUrl = process.env.URL_PDF || '';
    // 1. Obtener los datos específicos del artículo USANDO EL ID
    try {
        // Usamos Promise.all para hacer las llamadas en paralelo si es posible
        const [articuloRes, galeriaRes, pdfsRes] = await Promise.all([
            fetch(`${apiBaseUrl}articulos_id/${id}`), // Endpoint del artículo por ID
            fetch(`${apiBaseUrl}galeria_art/${id}`),   // Endpoint de galería por ID (ajusta si es necesario)
            fetch(`${apiBaseUrl}pdfs_art/${id}`)       // Endpoint de PDFs por ID (ajusta si es necesario)
        ]);
        // Verificar respuesta del artículo principal (crítico)
        if (!articuloRes.ok) {
            // Si el artículo específico no se encuentra para este ID, devuelve 404
            if (articuloRes.status === 404) {
                return { notFound: true };
            }
            // Otro error de API
            throw new Error(`API Error Articulo ${id}: ${articuloRes.status}`);
        }
        /* console.log(articuloRes); */
        // Obtener JSONs (manejar errores opcionales para galería/pdfs)
        const articuloData = await articuloRes.json();
        const galeriaData = galeriaRes.ok ? await galeriaRes.json() : { result: [] };
        const pdfsData = pdfsRes.ok ? await pdfsRes.json() : { result: [] };

        // 2. Extraer y procesar los datos para el componente
        const articulo = articuloData?.result;
        console.log("articulo:", articulo);
        // ¡Importante! Verificar si el slug de la URL coincide con el slug generado del artículo encontrado
        // Esto evita que URLs con ID correcto pero slug incorrecto muestren contenido (bueno para SEO).
        const expectedSlug = generateSlug(articulo?.nombre || '') || 'sin-titulo';

        if (slug !== expectedSlug) {
            console.warn(`Slug mismatch for ID ${id}. URL slug: "${slug}", Expected slug: "${expectedSlug}". Redirecting or 404.`);
            // Puedes devolver notFound o redirigir a la URL correcta (redirigir es más complejo en SSG puro)
            return { notFound: true };
            // O para redirigir (más avanzado, requiere configuración extra o manejo en cliente):
            // return { redirect: { destination: `/articulos/articulo/${id}/${expectedSlug}`, permanent: false } };
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

        const parallaxImageUrl = articulo?.imagen ? `${imageBaseUrl}/${articulo.imagen}` : undefined;

        // 3. Devolver los datos necesarios como props
        return {
            props: {
                articulo,
                galleryItems: galleryItemsForComponent,
                pdfItems: pdfsForComponent,
                parallaxImageUrl,
                // Ya no necesitamos pasar currentSlug porque podemos obtenerlo del router si es necesario
                // o reconstruirlo a partir del articulo.nombre dentro del componente si se quiere.
            },
        };

    } catch (error) {
        console.error(`Error fetching data for article ID ${id} (slug: ${slug}):`, error);
        // Si falla cualquier fetch crítico, devuelve 404
        return { notFound: true };
    }
}

export default function ArticuloPage() {
    return (
        <div>
            <h3>Articulo</h3>
        </div>
    )
}
