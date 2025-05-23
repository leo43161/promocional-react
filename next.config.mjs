/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL_PDF: "https://www.tucumanturismo.gob.ar/public/files/",
        URL_IMG: "https://www.tucumanturismo.gob.ar/public/img/",
        URL_IMG_LOCAL: process.env.NODE_ENV === 'production' ? "/reactdev" : "",
        URL_SERVER: process.env.NODE_ENV !== 'production' ? "http://10.0.15.36/promocional/api/" : "https://www.tucumanturismo.gob.ar/api/"
    },
    output: 'export',
    images: {
        unoptimized: true
    },
};

if (process.env.IS_CPANEL_DEPLOY === 'true') {
    console.log("Aplicando basePath para despliegue en cPanel...");
    nextConfig.basePath = '/reactdev';
} else {
    console.log("No aplicando basePath.");
}

export default nextConfig;
