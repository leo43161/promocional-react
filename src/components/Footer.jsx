import React from "react";

const mountainSVG = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
    width="100%" height="auto" viewBox="0 0 1040.18 166.71">
    <style type="text/css">
        
    </style>
    <defs>
    </defs>
    <path fill="#85BD77" d="M39.33,20.58c3.27-1.25,4.66,3.44,6.15,3.14c1.48-0.3,12.39,0.64,15.95,0.39c3.55-0.24,14.69,4.35,19.96,6.47 c5.28,2.12,28.04,1.36,31.01,0.77c2.96-0.59,15.18-5.94,18.45-6.85c3.27-0.92,31.42-5.2,50.33-5.4c18.91-0.19,27.9,8.66,32.08,6.44c4.18-2.22,19.95,7.14,24.68,7.03c4.73-0.11,13.81,4.22,18.82,4.67c5.01,0.45,18.16,8.42,20.52,8.15 c2.37-0.27,12.09,1.63,15.92,1.72c3.84,0.09-0.27-1,2.41-2.27c2.68-1.26,21.57-0.46,26.3-0.35c4.72,0.12,7.62,2.84,16.76,4.07 c9.14,1.22,18.6,0.79,23.01,2.23c4.4,1.44,2,3.37,5.26,2.79c3.26-0.58,5.56,2.79,7.61,3.51c2.05,0.71,6.5,0.16,6.5,0.16 c1.77,0.05,2.14-3.93,5.08-2.86c2.93,1.07,22.62-8.41,24.42-9.7c1.8-1.28,6.88-4.15,9.85-5.07c2.97-0.92,12.49-4.34,18.19-8.52 c5.7-4.18,12.49-4.01,15.74-3.93c3.25,0.08,3.81,1.42,7.05,2.17c3.24,0.74,7.69-0.14,9.76-0.42c2.07-0.28,7.62,3.18,10.57,3.25 c2.95,0.07,15.38-0.62,19.25-2.18c3.87-1.57,15.17-4.94,21.07-4.46c5.9,0.48,23.1-2.75,26.08-3.81c2.97-1.06,19.27-3.38,19.27-3.38 c1.48,0.03,7.12-1.49,13.67-4.32c6.56-2.82,23.37-1.42,26.36-3c2.99-1.59,12.17-2.69,16.33-4.25c4.17-1.56,11.53-0.38,14.48-0.31 c2.96,0.07,3.79,3.08,6.43,3.81c2.65,0.73,4.46-1.22,8.88-0.78c4.42,0.44,4.67,2.78,7.04,2.83c2.36,0.06,2.04,1.38,7.67,0.52 c5.64-0.86,18.54,4.11,20.61,3.5c2.08-0.61,11.51,0.62,20.07,1.49c8.55,0.87,22.99,2.89,27.73,2.34c4.74-0.54,12.7,0.32,17.17-1.23 c4.46-1.55,21.24,1.52,23.32,0.57c2.09-0.94,7-4.71,7-4.71c1.31,0.03,4.37-0.63,7.23-1.52c2.86-0.88,3.98-2.87,8.36-3.5 c4.38-0.63,7.64-0.05,12.01-0.19c4.37-0.14,16.51,3.84,20.21,4.07c3.71,0.23,17.86,1.78,20.29,0.5c2.42-1.27,0.93-1.73,2.89-2.76 c5.48-2.9,12.46-4.12,16.67-4.5c5.72-0.52,7.4,1.17,13.52,0.58c6.12-0.58,8.98-1.74,13.16-3.11c4.17-1.37,14.62-0.13,17.26-1.04 c2.64-0.92,8.51-0.04,10.48-0.23c1.97-0.2,2.47-3.62,5.51-3.05c3.04,0.56,32.51,0.31,38.1,4.87c5.58,4.55,17.94,9.03,22.51,9.39 c4.58,0.36,7.81,2.65,11.3,2.73c3.49,0.09,4.76,2.08,9.6,0.24c4.84-1.84,9.29-6.4,12.38-8.03c3.09-1.64,9.32,3.42,12.18,2.02 c1.04-0.51,2.41-0.71,2.41-0.71v156.15H0V15.28c0,0,22.87,0.9,26.07,3.64C29.26,21.66,36.06,21.83,39.33,20.58"/>
</svg>
`;

const Footer = () => {
  {
    /* Fondo SVG decorativo */
  }
  return (
    <div
      className="h-auto bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(
          mountainSVG
        )}')`,
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-center pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-5 lg:grid-cols-5 sm:text-center md:text-start gap-6 text-white text-9 mt-5">
          {/* Contenido del footer */}

          <div className="col-span-2 sm:col-span-1 sm:justify-center mt-5 p-4">
            <strong>Enlaces útles</strong>
            <ul className="list-disc mt-2">
              <li>
                <a href="" className="text-white hover:text-gray-300">
                  Rutas temáticas
                </a>
              </li>
              <li>
                <a href="" className="text-white hover:text-gray-300">
                  Tafí del Valle
                </a>
              </li>
              <li>
                <a href="" className="text-white hover:text-gray-300">
                  Áreas protegidas
                </a>
              </li>
              <li>
                <a href="" className="text-white hover:text-gray-300">
                  Museo Casa Histórica
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1 sm:justify-center mt-5 p-4">
            <ul className="list-disc mt-5">
              <li>
                <a href="" className="text-white hover:text-gray-300">
                  Circuitos Turísticos
                </a>
              </li>
              <li>
                <a href="" className="text-white hover:text-gray-300">
                  Transporte urbano
                </a>
              </li>
              <li>
                <a href="" className="text-white hover:text-gray-300">
                  Sabores tucumanos
                </a>
              </li>
              <li>
                <a href="" className="text-white hover:text-gray-300">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-3 sm:col-span-1 sm:justify-center mt-5 p-4">
            <strong className="text-9 font-semibold">
              Casa de Tucumán
              <br />
              en Buenos Aires
            </strong>
            <ul>
              <li className="mt-2">Suipacha 140 - C.A.B.A.</li>
              <li>Provincia de Buenos Aires - Argentina</li>
              <li>Código Postal: C1008AAD</li>
              <li>(011) - 43220562</li>
              <li>casaenbsas@tucumanturismo.gob.ar</li>
            </ul>
          </div>
          <div className="col-span-3 sm:col-span-1 sm:justify-center mt-5 p-4">
            <strong className="text-9 font-semibold">
              Anexo Ente Tucumán turismo
            </strong>
            <ul>
              <li className="mt-2">
                Santa Fe 2121 - San Miguel de Tucumán
              </li>
              <li>Tucumán- Argentina</li>
              <li>Código Postal: 4000</li>
              <li>+54 (0381)-2621377</li>
              <li>informes@tucumanturismo.gob.ar</li>
            </ul>
          </div>
         <div className="col-span-2 sm:col-span-1 sm:justify-center mt-5">
                                                        
            <img src="/svg/eatt2024blancohorizontal.svg" alt="Logo Gobierno Tucumán" className="w-40 mx-auto py-auto m-5"/>
            <img src="/svg/logo-tuctur-w.svg" alt="Logo Tucumán Turismo" className="w-40 mx-auto py-auto m-5"/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
