/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL_PDF: "https://www.tucumanturismo.gob.ar/public/files/",
        URL_IMG: "https://www.tucumanturismo.gob.ar/public/img/",
        URL_IMG_LOCAL: process.env.NODE_ENV === 'production' ? "" : "",
        URL_SERVER: "https://www.tucumanturismo.gob.ar/api/v1/api/",
        URL_LOCAL: process.env.NODE_ENV === 'production' ? "" : "",
        URL_LOCAL_SERVER: process.env.NODE_ENV === 'production' ? "https://www.tucumanturismo.gob.ar" : "http://10.20.20.5:3000",
    },
    output: 'export',
    images: {
        unoptimized: true
    },
    basePath: process.env.NODE_ENV === 'production' ? "" : "",
};

if (process.env.NEXT_PUBLIC_IS_DEV === 'dev') {
    console.log("Aplicando basePath para despliegue en cPanel...");
    nextConfig.env.URL_IMG_LOCAL = "/reactdev";
    nextConfig.env.URL_LOCAL = "/reactdev";
    nextConfig.env.URL_LOCAL_SERVER = "https://www.tucumanturismo.gob.ar/reactdev";
    nextConfig.basePath = '/reactdev';
} else {
    console.log("No aplicando basePath.");
}

export default nextConfig;
