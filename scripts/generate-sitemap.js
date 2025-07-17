// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const { generateSlug } = require('../src/utils'); // Asegúrate que la ruta sea correcta a tu utils/index.js

const SITE_URL = 'https://www.tucumanturismo.gob.ar'; // URL base SIN el basePath
const API_BASE_URL = 'https://www.tucumanturismo.gob.ar/api/v1/api/'; // URL de tu API

// Función para obtener datos de tu API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            console.error(`Error fetching ${endpoint}: ${response.status}`);
            return [];
        }
        const data = await response.json();
        return data.result || [];
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
    }
}

function formatDate(dateString) {
    // Asume que tu API devuelve fechas en un formato que puede ser parseado por Date
    // o si no, usa una fecha fija o la fecha actual.
    try {
        return new Date(dateString || Date.now()).toISOString().split('T')[0];
    } catch (e) {
        return new Date().toISOString().split('T')[0];
    }
}


async function generateSitemap() {
    console.log("Generating sitemap...");

    const articles = await fetchData('articulos'); // Endpoint de tu API para todos los artículos
    const subsecciones = await fetchData('subseccion_all'); // Endpoint para todas las subsecciones
    const eventos = await fetchData('evento'); // Endpoint para todos los eventos

    // Páginas estáticas (añade todas las que tengas)
    const staticPages = [
        '', // Homepage
        '/eventos',
        '/alojamientos',
        '/transporte',
        '/guias',
        '/prestadores',
        '/autos',
        '/agencias',
        '/blog', // si es una página estática y no un listado dinámico desde API en el sitemap
        // ... otras páginas estáticas
    ];

    const sitemapEntries = [];

    // Función para crear entradas de URL con hreflang
    function createUrlEntry(pathSegment, lastmod, changefreq = 'weekly', priority = 0.7) {
        const fullPathEs = `${SITE_URL}${pathSegment}`;
        const fullPathEn = `${SITE_URL}${pathSegment}${pathSegment.includes('?') ? '&' : '?'}lang=EN`;

        // Limpieza para el caso de la homepage
        let cleanFullPathEn = fullPathEn;
        if (pathSegment === '' || pathSegment === '/') {
            cleanFullPathEn = `${SITE_URL}/?lang=EN`;
        }


        let entry = `<url>\n`;
        entry += `  <loc>${fullPathEs}</loc>\n`;
        if (lastmod) entry += `  <lastmod>${lastmod}</lastmod>\n`;
        entry += `  <changefreq>${changefreq}</changefreq>\n`;
        entry += `  <priority>${priority}</priority>\n`;
        entry += `  <xhtml:link rel="alternate" hreflang="es" href="${fullPathEs}" />\n`;
        entry += `  <xhtml:link rel="alternate" hreflang="en" href="${cleanFullPathEn}" />\n`;
        entry += `  <xhtml:link rel="alternate" hreflang="x-default" href="${fullPathEs}" />\n`; // Asume español como default
        entry += `</url>`;
        return entry;
    }

    // Páginas estáticas
    staticPages.forEach(page => {
        sitemapEntries.push(createUrlEntry(page, formatDate(), 'daily', page === '' ? 1.0 : 0.8));
    });

    // Páginas de Artículos
    articles.forEach(article => {
        if (article.idArticulo && article.nombre) {
            const slug = generateSlug(article.nombre) || 'sin-titulo';
            sitemapEntries.push(
                createUrlEntry(
                    `/articulos/articulo/${article.idArticulo}/${slug}`,
                    formatDate(article.fecha_mod || article.fecha_alta), // Usa fecha de modificación o creación
                    'monthly',
                    0.7
                )
            );
        }
    });

    // Páginas de Subsecciones
    subsecciones.forEach(subseccion => {
        if (subseccion.id && subseccion.nombre) {
            const slug = generateSlug(subseccion.nombre) || 'sin-titulo';
            sitemapEntries.push(
                createUrlEntry(
                    `/subsecciones/lista/${subseccion.id}/${slug}`,
                    formatDate(subseccion.fecha_mod), // Asume que tienes una fecha de mod
                    'weekly',
                    0.6
                )
            );
        }
    });

    // Páginas de Detalle de Eventos (si aplica y si tienes una URL dedicada por evento)
    // Este es un ejemplo, necesitas adaptar la URL y la obtención de datos
    eventos.forEach(evento => {
        if (evento.id && evento.nombre) { // Asumiendo que usas el ID para la URL y tienes el nombre
            const eventoPath = `/eventos/evento?id=${evento.id}`; // Ajusta esta ruta si es diferente
            sitemapEntries.push(
                createUrlEntry(
                    eventoPath,
                    formatDate(evento.fecha_mod || evento.fecha_inicio),
                    'weekly',
                    0.6
                )
            );
        }
    });


    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemapEntries.join('\n  ')}</urlset>`;

    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
}

generateSitemap().catch(err => {
    console.error("Error generating sitemap:", err);
    process.exit(1);
});
``