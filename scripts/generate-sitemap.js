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
    try {
        return new Date(dateString || Date.now()).toISOString().split('T')[0];
    } catch (e) {
        return new Date().toISOString().split('T')[0];
    }
}

// Nueva función para escapar caracteres especiales para XML
function escapeXml(url) {
    return url.replace(/&/g, '&amp;')
              .replace(/'/g, '&apos;')
              .replace(/"/g, '&quot;')
              .replace(/>/g, '&gt;')
              .replace(/</g, '&lt;');
}


async function generateSitemap() {
    console.log("Generating sitemap...");

    const articles = await fetchData('articulos');
    const subsecciones = await fetchData('subseccion_all');
    const eventos = await fetchData('evento');

    const staticPages = [
        '', // Homepage
        '/eventos',
        '/alojamientos',
        '/transporte',
        '/guias',
        '/prestadores',
        '/autos',
        '/agencias',
        '/blog',
    ];

    const sitemapEntries = [];

    // Función para crear entradas de URL con hreflang
    function createUrlEntry(pathSegment, lastmod, changefreq = 'weekly', priority = 0.7) {
        let fullPathEs = `${SITE_URL}${pathSegment}`;
        let fullPathEn = `${SITE_URL}${pathSegment}${pathSegment.includes('?') ? '&' : '?'}lang=EN`;

        if (pathSegment === '' || pathSegment === '/') {
            fullPathEs = `${SITE_URL}/`;
            fullPathEn = `${SITE_URL}/?lang=EN`;
        }

        // Escapamos las URLs antes de insertarlas en el XML
        const escapedFullPathEs = escapeXml(fullPathEs);
        const escapedFullPathEn = escapeXml(fullPathEn);

        let entry = `<url>\n`;
        entry += `  <loc>${escapedFullPathEs}</loc>\n`;
        if (lastmod) entry += `  <lastmod>${lastmod}</lastmod>\n`;
        entry += `  <changefreq>${changefreq}</changefreq>\n`;
        entry += `  <priority>${priority}</priority>\n`;
/*         entry += `  <xhtml:link rel="alternate" hreflang="es" href="${escapedFullPathEs}" />\n`;
        entry += `  <xhtml:link rel="alternate" hreflang="en" href="${escapedFullPathEn}" />\n`;
        entry += `  <xhtml:link rel="alternate" hreflang="x-default" href="${escapedFullPathEs}" />\n`; */ // Asume español como default
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
                    formatDate(article.fecha_mod || article.fecha_alta),
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
                    formatDate(subseccion.fecha_mod),
                    'weekly',
                    0.6
                )
            );
        }
    });

    // Páginas de Detalle de Eventos
    eventos.forEach(evento => {
        if (evento.id && evento.nombre) {
            const eventoPath = `/eventos/evento?id=${evento.id}`;
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

    // CAMBIO: Se reincorporó el namespace faltante 'xmlns:xhtml'.
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${sitemapEntries.join('\n')}\n</urlset>`;

    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
}

generateSitemap().catch(err => {
    console.error("Error generating sitemap:", err);
    process.exit(1);
});