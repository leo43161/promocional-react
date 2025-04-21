/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        URL_PDF: "https://www.tucumanturismo.gob.ar/public/files/",
        URL_IMG: "https://www.tucumanturismo.gob.ar/public/img/",
        URL_SERVER: 'http://10.20.20.5/promocional25/api/'
    },
    output: 'export'
};

export default nextConfig;
