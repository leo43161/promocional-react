/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL_PDF: "https://www.tucumanturismo.gob.ar/public/files/",
        URL_IMG: "https://www.tucumanturismo.gob.ar/public/img/",
        URL_IMG_LOCAL: process.env.NODE_ENV === 'production' ? "/reactdev" : "",
        URL_SERVER: "https://www.tucumanturismo.gob.ar/api/v1/api/",
        URL_LOCAL: process.env.NODE_ENV === 'production' ? "/reactdev" : "",
    },
    output: 'export',
    images: {
        unoptimized: true
    },
    basePath: process.env.NODE_ENV === 'production' ? "/reactdev" : "",
};

if (process.env.IS_CPANEL_DEPLOY === 'true') {
    console.log("Aplicando basePath para despliegue en cPanel...");
    nextConfig.basePath = '/reactdev';
} else {
    console.log("No aplicando basePath.");
}

export default nextConfig;
