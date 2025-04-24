/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL_PDF: "https://www.tucumanturismo.gob.ar/public/files/",
        URL_IMG: "https://www.tucumanturismo.gob.ar/public/img/",
        URL_SERVER: 'http://10.20.20.5/promocional25/api/'
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
