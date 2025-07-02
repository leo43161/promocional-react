import React from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { lang } = router.query;
  const baseUrl = process.env.URL_LOCAL;

  const usefulLinks = {
    es: [
      {
        text: "Rutas temáticas",
        href: "/subsecciones/lista/17/productos-turisticos",
      },
      { text: "Tafí del Valle", href: "/articulos/articulo/76/tafi-del-valle" },
      {
        text: "Áreas protegidas",
        href: "/articulos/articulo/100/areas-protegidas",
      },
      {
        text: "Museo Casa Histórica",
        href: "/articulos/articulo/121/museo-casa-historica-de-la-independencia",
      },
      {
        text: "Experiencias Turísticas",
        href: "/subsecciones/lista/1/experiencias-turisticas",
      },
      { text: "Transporte urbano", href: "/transporte" },
      {
        text: "Sabores tucumanos",
        href: "/subsecciones/lista/37/tradicion-regional",
      },
      { text: "Política de Privacidad", href: "/privacidad" },
    ],
    en: [
      {
        text: "Thematic Routes",
        href: "/subsecciones/lista/52/touristic-products?lang=EN",
      },
      {
        text: "Tafí del Valle",
        href: "/articulos/articulo/184/tafi-del-valle?lang=EN",
      },
      {
        text: "Protected Areas",
        href: "/articulos/articulo/209/protected-areas?lang=EN",
      },
      {
        text: "Historic House Museum",
        href: "/articulos/articulo/232/historic-house-of-independence-museum?lang=EN",
      },
      {
        text: "Tourist Experiences",
        href: "/subsecciones/lista/3/tourist-experiences?lang=EN",
      },
      { text: "Urban Transport", href: "/transporte?lang=EN" },
      {
        text: "Tucuman Flavors",
        href: "/subsecciones/lista/79/regional-tradition?lang=EN",
      },
      { text: "Privacy Policy", href: "/privacidad?lang=EN" },
    ],
  };

  const links = lang === "EN" ? usefulLinks.en : usefulLinks.es;
  const linkChunks = [];
  for (let i = 0; i < links.length; i += 4) {
    linkChunks.push(links.slice(i, i + 4));
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
      <div className="max-w-7xl mx-auto flex justify-center pt-30">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 sm:text-center md:text-start gap-6 text-white text-[1.1em] mt-5">
          <div className="col-span-2 sm:col-span-1 sm:justify-center md:mt-5 md:p-4">
            <strong>Enlaces útiles</strong>
            <ul className="list-none md:list-disc mt-2">
              {linkChunks[0] &&
                linkChunks[0].map((link, index) => (
                  <li className="mt-1" key={index}>
                    <a
                      href={`${baseUrl}${link.href}`}
                      className="text-white hover:text-gray-300"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 sm:justify-center md:mt-5 md:p-4">
            <ul className="list-none md:list-disc mt-5">
              {linkChunks[1] &&
                linkChunks[1].map((link, index) => (
                  <li className="mt-1" key={index}>
                    <a
                      href={`${baseUrl}${link.href}`}
                      className="text-white hover:text-gray-300"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-span-3 sm:col-span-1 sm:justify-center md:mt-5 md:p-4">
            <strong className="text-[1.1em] font-semibold">
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
          <div className="col-span-3 sm:col-span-1 sm:justify-center md:mt-5 md:p-4">
            <strong className="text-[1.1em] font-semibold">
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
          <div className="col-span-1 sm:col-span-1 sm:justify-center md:mt-5 md:p-2">
            <img
              src={
                process.env.URL_IMG_LOCAL + "/svg/eatt2024blancohorizontal.svg"
              }
              alt="Logo Gobierno Tucumán"
              className="w-60 mx-auto py-auto md:m-5 ms:m-2"
            />
            <img
              src={process.env.URL_IMG_LOCAL + "/svg/logo-tuctur-w.svg"}
              alt="Logo Tucumán Turismo"
              className="w-50 mx-auto py-auto md:m-5 ms:m-2"
            />
          </div>
        </div>
      </div>
      <div className="w-full text-center p-1">
        <hr className="bg-white text-center"></hr>
        <p className="text-center text-[1.1em] text-white p-2">
          <strong>Ente Autárquico Tucumán Turismo - 2024 | </strong>
          <a
            href="https://www.google.com/maps/place/Ente+Tucum%C3%A1n+Turismo/@-26.8311125,-65.2109502,16z/data=!4m10!1m2!2m1!1stucuman+turismo!3m6!1s0x94225c10470c56c9:0x7016910ca98c12c1!8m2!3d-26.8311131!4d-65.2045773!15sCg90dWN1bWFuIHR1cmlzbW9aESIPdHVjdW1hbiB0dXJpc21vkgEadG91cmlzdF9pbmZvcm1hdGlvbl9jZW50ZXKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUlBhV1l0VW1wUlJSQULgAQA!16s%2Fg%2F1tzvxnh6?entry=ttu"
            className="text-white"
          >
            24 de Septiembre 484
          </a>{" "}
          | C.P. 4000 San Miguel de Tucumán - Argentina | Tel:
          <a href="tel:+543814303644" className="">
            +54 (0381)4303644
          </a>
          -
          <a href="tel:+543814222199" className="">
            +54 (0381)4222199
          </a>
          | Email:
          <a
            href="mailto:informes@tucumanturismo.gob.ar"
            className="text-decoration-none"
          >
            informes@tucumanturismo.gob.ar{" "}
          </a>
        </p>
        <div className="text-center text-white text-[1.1em] p-2">
          <p className="text-base">
            Desarrollado por Dpto. Informatica EATT 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

// import React from "react";

// const mountainSVG = `
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
//     width="100%" height="auto" viewBox="0 0 1040.18 166.71">
//     <style type="text/css">
        
//     </style>
//     <defs>
//     </defs>
//     <path fill="#85BD77" d="M39.33,20.58c3.27-1.25,4.66,3.44,6.15,3.14c1.48-0.3,12.39,0.64,15.95,0.39c3.55-0.24,14.69,4.35,19.96,6.47 c5.28,2.12,28.04,1.36,31.01,0.77c2.96-0.59,15.18-5.94,18.45-6.85c3.27-0.92,31.42-5.2,50.33-5.4c18.91-0.19,27.9,8.66,32.08,6.44c4.18-2.22,19.95,7.14,24.68,7.03c4.73-0.11,13.81,4.22,18.82,4.67c5.01,0.45,18.16,8.42,20.52,8.15 c2.37-0.27,12.09,1.63,15.92,1.72c3.84,0.09-0.27-1,2.41-2.27c2.68-1.26,21.57-0.46,26.3-0.35c4.72,0.12,7.62,2.84,16.76,4.07 c9.14,1.22,18.6,0.79,23.01,2.23c4.4,1.44,2,3.37,5.26,2.79c3.26-0.58,5.56,2.79,7.61,3.51c2.05,0.71,6.5,0.16,6.5,0.16 c1.77,0.05,2.14-3.93,5.08-2.86c2.93,1.07,22.62-8.41,24.42-9.7c1.8-1.28,6.88-4.15,9.85-5.07c2.97-0.92,12.49-4.34,18.19-8.52 c5.7-4.18,12.49-4.01,15.74-3.93c3.25,0.08,3.81,1.42,7.05,2.17c3.24,0.74,7.69-0.14,9.76-0.42c2.07-0.28,7.62,3.18,10.57,3.25 c2.95,0.07,15.38-0.62,19.25-2.18c3.87-1.57,15.17-4.94,21.07-4.46c5.9,0.48,23.1-2.75,26.08-3.81c2.97-1.06,19.27-3.38,19.27-3.38 c1.48,0.03,7.12-1.49,13.67-4.32c6.56-2.82,23.37-1.42,26.36-3c2.99-1.59,12.17-2.69,16.33-4.25c4.17-1.56,11.53-0.38,14.48-0.31 c2.96,0.07,3.79,3.08,6.43,3.81c2.65,0.73,4.46-1.22,8.88-0.78c4.42,0.44,4.67,2.78,7.04,2.83c2.36,0.06,2.04,1.38,7.67,0.52 c5.64-0.86,18.54,4.11,20.61,3.5c2.08-0.61,11.51,0.62,20.07,1.49c8.55,0.87,22.99,2.89,27.73,2.34c4.74-0.54,12.7,0.32,17.17-1.23 c4.46-1.55,21.24,1.52,23.32,0.57c2.09-0.94,7-4.71,7-4.71c1.31,0.03,4.37-0.63,7.23-1.52c2.86-0.88,3.98-2.87,8.36-3.5 c4.38-0.63,7.64-0.05,12.01-0.19c4.37-0.14,16.51,3.84,20.21,4.07c3.71,0.23,17.86,1.78,20.29,0.5c2.42-1.27,0.93-1.73,2.89-2.76 c5.48-2.9,12.46-4.12,16.67-4.5c5.72-0.52,7.4,1.17,13.52,0.58c6.12-0.58,8.98-1.74,13.16-3.11c4.17-1.37,14.62-0.13,17.26-1.04 c2.64-0.92,8.51-0.04,10.48-0.23c1.97-0.2,2.47-3.62,5.51-3.05c3.04,0.56,32.51,0.31,38.1,4.87c5.58,4.55,17.94,9.03,22.51,9.39 c4.58,0.36,7.81,2.65,11.3,2.73c3.49,0.09,4.76,2.08,9.6,0.24c4.84-1.84,9.29-6.4,12.38-8.03c3.09-1.64,9.32,3.42,12.18,2.02 c1.04-0.51,2.41-0.71,2.41-0.71v156.15H0V15.28c0,0,22.87,0.9,26.07,3.64C29.26,21.66,36.06,21.83,39.33,20.58"/>
// </svg>
// `;

// const Footer = () => {
//   {
//     /* Fondo SVG decorativo */
//   }
//   return (
//     <div
//       className="h-auto bg-cover bg-no-repeat"
//       style={{
//         backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(
//           mountainSVG
//         )}')`,
//       }}
//     >
//       <div className="max-w-7xl mx-auto flex justify-center pt-30">
//         <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-5 lg:grid-cols-5 sm:text-center md:text-start gap-6 text-white text-[1.1em] mt-5">
//           {/* Contenido del footer */}

//           <div className="col-span-2 sm:col-span-1 sm:justify-center md:mt-5 md:p-4">
//             <strong>Enlaces útles</strong>
//             <ul className="list-none md:list-disc mt-2">
//               <li className="mt-2">
//                 <a href="" className="text-white hover:text-gray-300">
//                   Rutas temáticas
//                 </a>
//               </li>
//               <li className="mt-1">
//                 <a href="" className="text-white hover:text-gray-300">
//                   Tafí del Valle
//                 </a>
//               </li>
//               <li className="mt-1">
//                 <a href="" className="text-white hover:text-gray-300">
//                   Áreas protegidas
//                 </a>
//               </li>
//               <li className="mt-1">
//                 <a href="" className="text-white hover:text-gray-300">
//                   Museo Casa Histórica
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div className="col-span-2 sm:col-span-1 sm:justify-center md:mt-5 md:p-4">
//             <ul className="list-none md:list-disc mt-5">
//               <li className="mt-2">
//                 <a href="" className="text-white hover:text-gray-300">
//                   Circuitos Turísticos
//                 </a>
//               </li>
//               <li className="mt-1">
//                 <a href="" className="text-white hover:text-gray-300">
//                   Transporte urbano
//                 </a>
//               </li>
//               <li className="mt-1">
//                 <a href="" className="text-white hover:text-gray-300">
//                   Sabores tucumanos
//                 </a>
//               </li>
//               <li className="mt-1">
//                 <a href="" className="text-white hover:text-gray-300">
//                   Política de Privacidad
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div className="col-span-3 sm:col-span-1 sm:justify-center md:mt-5 md:p-4">
//             <strong className="text-[1.1em] font-semibold">
//               Casa de Tucumán
//               <br />
//               en Buenos Aires
//             </strong>
//             <ul>
//               <li className="mt-2">Suipacha 140 - C.A.B.A.</li>
//               <li>Provincia de Buenos Aires - Argentina</li>
//               <li>Código Postal: C1008AAD</li>
//               <li>(011) - 43220562</li>
//               <li>casaenbsas@tucumanturismo.gob.ar</li>
//             </ul>
//           </div>
//           <div className="col-span-3 sm:col-span-1 sm:justify-center md:mt-5 md:p-4">
//             <strong className="text-[1.1em] font-semibold">
//               Anexo Ente Tucumán turismo
//             </strong>
//             <ul>
//               <li className="mt-2">Santa Fe 2121 - San Miguel de Tucumán</li>
//               <li>Tucumán- Argentina</li>
//               <li>Código Postal: 4000</li>
//               <li>+54 (0381)-2621377</li>
//               <li>informes@tucumanturismo.gob.ar</li>
//             </ul>
//           </div>
//           <div className="col-span-1 sm:col-span-1 sm:justify-center md:mt-5 md:p-2">
//             <img
//               src={process.env.URL_IMG_LOCAL + "/svg/eatt2024blancohorizontal.svg"}
//               alt="Logo Gobierno Tucumán"
//               className="w-60 mx-auto py-auto md:m-5 ms:m-2"
//             />
//             <img
//               src={process.env.URL_IMG_LOCAL + "/svg/logo-tuctur-w.svg"}
//               alt="Logo Tucumán Turismo"
//               className="w-50 mx-auto py-auto md:m-5 ms:m-2"
//             />
//           </div>
//         </div>

//       </div>
//       <div className="w-full text-center p-1">
//         <hr className="bg-white text-center"></hr>
//         <p className="text-center text-[1.1em] text-white p-2">
//           <strong>Ente Autárquico Tucumán Turismo - 2024 | </strong>
//           <a href="https://www.google.com/maps/place/Ente+Tucum%C3%A1n+Turismo/@-26.8311125,-65.2109502,16z/data=!4m10!1m2!2m1!1stucuman+turismo!3m6!1s0x94225c10470c56c9:0x7016910ca98c12c1!8m2!3d-26.8311131!4d-65.2045773!15sCg90dWN1bWFuIHR1cmlzbW9aESIPdHVjdW1hbiB0dXJpc21vkgEadG91cmlzdF9pbmZvcm1hdGlvbl9jZW50ZXKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUlBhV1l0VW1wUlJSQULgAQA!16s%2Fg%2F1tzvxnh6?entry=ttu" className="text-white">24 de Septiembre 484</a> | C.P. 4000
//           San Miguel de Tucumán - Argentina | Tel:
//           <a href="tel:+543814303644" className="">+54 (0381)4303644</a>
//           -
//           <a href="tel:+543814222199" className="">+54 (0381)4222199</a>
//           | Email:
//           <a href="mailto:informes@tucumanturismo.gob.ar" className="text-decoration-none" >informes@tucumanturismo.gob.ar </a>
//         </p>

//         <div className="text-center text-white text-[1.1em] p-2">
//           <p className="text-base">Desarrollado por Dpto. Informatica EATT 2024</p>
//         </div>
//       </div>
//       {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-400 z-50 w-screen">
//         <div className="text-center text-black mb-2 md:mb-0 text-[1.1em]">
//           <p className="m-0">
//             Para ofrecerte una mejor experiencia, este sitio utiliza cookies. Al continuar navegando, aceptas nuestra{' '}
//             <a href="/privacidad" className="text-blue-600 underline">política de privacidad</a>.
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <button className="bg-primary text-white px-4 py-2 rounded-lg text-[1.1em]"
//           >Aceptar</button>
//           <button className="bg-primary text-white px-4 py-2 rounded-lg text-[1.1em]"
//           >Rechazar</button>
//         </div>
//       </div> */}

//     </div>
//   );
// };

// export default Footer;
