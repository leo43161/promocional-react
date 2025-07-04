/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL_PDF: "https://www.tucumanturismo.gob.ar/public/files/",
        URL_IMG: "https://www.tucumanturismo.gob.ar/public/img/",
        URL_IMG_LOCAL: process.env.NODE_ENV === 'production' ? "" : "",
        URL_SERVER: "https://www.tucumanturismo.gob.ar/api/v1/api/",
        URL_LOCAL: process.env.NODE_ENV === 'production' ? "" : "",
        URL_LOCAL_SERVER: process.env.NODE_ENV === 'production' ? "https://www.tucumanturismo.gob.ar" : "http://localhost:3000",
    },
    output: 'export',
    images: {
        unoptimized: true
    },
    basePath: process.env.NODE_ENV === 'production' ? "" : "",
};

if (process.env.IS_CPANEL_DEPLOY === 'true') {
    console.log("Aplicando basePath para despliegue en cPanel...");
    nextConfig.basePath = '';
} else {
    console.log("No aplicando basePath.");
}

export default nextConfig;
