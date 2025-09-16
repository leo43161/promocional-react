import Carousel from '@/components/common/Carousel';
import ResponsiveVideo from '@/components/common/ResponsiveVideo';
import BlogHome from '@/components/main/BlogHome';
import Entumesa from '@/components/main/Entumesa';
import EventosHome from '@/components/main/EventosHome';
import Imperdible from '@/components/main/Imperdible';
import Itinerarios from '@/components/main/itinerarios';
import Planifica from '@/components/main/planifica';
import Rutas from '@/components/main/Rutas';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Importar useRouter
import Button from '../components/common/Button';

// Objeto para manejar los textos en diferentes idiomas
const content = {
  es: {
    unmissable: "IMPERDIBLES",
    featuredEvents: "EVENTOS DESTACADOS",
    learnMore: "Conocé más aqui"
  },
  en: {
    unmissable: "UNMISSABLE",
    featuredEvents: "FEATURED EVENTS",
    learnMore: "Learn more here"
  }
};

export default function Index() {
  const router = useRouter();
  const { lang } = router.query;
  const isEnglish = lang === 'EN';

  // Seleccionar el contenido según el idioma
  const currentContent = isEnglish ? content.en : content.es;

  // Generar el enlace para la página de eventos
  const eventsLink = isEnglish ? `${process.env.URL_LOCAL || ''}/eventos?lang=EN` : `${process.env.URL_LOCAL || ''}/eventos`;

  return (
    <div>
      <div className='mb-0'>
        {/* <a href="https://www.tucumanturismo.gob.ar/files/Actividades-Invierno-2025-TucumanTieneTodo.pdf" target="_blank" rel="noopener noreferrer" className='hidden'>
          <ResponsiveVideo
            desktopSrc="video/Tucuman_Tiene_Todo_INV.mp4"
            mobileSrc="video/Tucuman_Tiene_Todo_M_INV.mp4"
          />
        </a> */}
        <div>
          <ResponsiveVideo
            desktopSrc="video/Tucuman_Tiene_Todo.mp4"
            mobileSrc="video/Tucuman_Tiene_Todo_M.mp4"
          />
        </div>
      </div>
      <div className='mb-0'>
        <Itinerarios />
      </div>
      <div className='mb-10'>
        <div>
          <a href="https://www.tucumanturismo.gob.ar/files/AGENDA DE ACTIVIDADES mes del turismo.pdf" target="_blank">
            <img src={process.env.URL_IMG_LOCAL + "/images/banners/banner-mes-del-turismo-1900-x-450.jpg"} alt="Banner de Invierno" />
          </a>
        </div>
        <div>
          <a href="https://www.tucumanturismo.gob.ar/articulos/articulo/819/promociones" target="_blank" rel="noopener noreferrer">
            <ResponsiveVideo
              desktopSrc="video/Copa_Banner_1900_X_450.mp4"
            />
          </a>
        </div>
        <div>
          <a href="https://www.tucumanturismo.gob.ar/articulos/articulo/969/juegos-argentinos-en-altura-vientos-calchaquies-2025" target="_blank" rel="noopener noreferrer">
            <ResponsiveVideo
              desktopSrc="video/Calchaqui_Banner.mp4"
            />
          </a>
        </div>
      </div>
      <div>
        <div className='md:w-11/13 w-11/13 mx-auto'>
          <div className='relative flex md:justify-center justify-between items-center'>
            <h1 className="md:text-5xl text-4xl mb-7 text-gray-500/70">{currentContent.featuredEvents}</h1>
            <div className='md:absolute right-0 mb-7 md:pe-7'>
              <a href={eventsLink}>
                <Button className='shadow-lg' size='sm'>
                  {currentContent.learnMore}
                </Button>
              </a>
            </div>
          </div>
        </div>
        <EventosHome />
      </div>

      {/* <div className='mb-20'>
        <Entumesa />
      </div> */}
      <div className='mb-10'>
        <BlogHome />
      </div>
      <div className='mb-10'>
        <Rutas />
      </div>
      <div className='mb-20'>
        <a target='_blank' href='https://teatromercedessosa.com/' rel="noopener noreferrer">
          <img src={`${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/images/banners/TeatroMercedesSosa-desktop.jpg`} className='w-full' alt="Banner Teatro Mercedes Sosa" />
        </a>
      </div>
      {/* <div className='md:w-11/13 lg:w-10/13 w-full mx-auto mb-20'>
        <h1 className="text-5xl mb-12 text-center text-gray-500/70">{currentContent.unmissable}</h1>
        <Imperdible />
      </div> */}
    </div>
  )
}

// import Carousel from '@/components/common/Carousel'
// import ResponsiveVideo from '@/components/common/ResponsiveVideo'
// import BlogHome from '@/components/main/BlogHome'
// import Entumesa from '@/components/main/Entumesa'
// import EventosHome from '@/components/main/EventosHome'
// import Imperdible from '@/components/main/Imperdible'
// import Itinerarios from '@/components/main/itinerarios'
// import Planifica from '@/components/main/planifica'
// import Rutas from '@/components/main/Rutas'
// import axios from 'axios'
// import dynamic from 'next/dynamic'
// import React, { useEffect, useState } from 'react'
// import Button from '../components/common/Button'

// export default function index() {
//   /* const PDFItinerario = dynamic(
//     () => import('@/pages/PDFItinerario'),
//     {
//       ssr: false,
//       loading: () => (
//         <div className="flex items-center px-4 text-white h-full">
//           <p className="font-700 uppercase text-2xl ml-2">Cargando...</p>
//         </div>
//       )
//     }
//   ); */
//   /* const [sessionData, setSessionData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSessionData = async () => {
//       try {
//         // Directly make the GET request to the external API
//         const response = await axios.get('http://10.15.15.151/api/api/session');
//         setSessionData(response.data);
//         console.log(response);
//       } catch (err) {
//         // Handle errors during the fetch
//         console.error('Error fetching session data:', err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSessionData();
//   }, []); // The empty dependency array ensures this runs only once after the initial render

//   if (loading) {
//     return <div>Cargando datos de sesión...</div>;
//   }

//   if (error) {
//     // You can display a more user-friendly error message here
//     return <div>Error al cargar los datos: {error.message}</div>;
//   } */
//   return (
//     <div>
//       <div className='mb-0'>
//         <ResponsiveVideo />
//       </div>
//       <div className='mb-0'>
//         <Itinerarios></Itinerarios>
//       </div>
//       <div>
//         <div>
//           <img src={process.env.URL_IMG_LOCAL + "/images/banners/BannerWeb1900x450Invierno2025-Desktop.jpg"} alt="" />
//         </div>
//       </div>
//       {/* <div className='border'>
//         <PDFItinerario></PDFItinerario>
//       </div> */}
//       {/* <div className='md:w-11/13 lg:w-11/13 w-full mx-auto md:mb-30 mb-15'>
//         <Planifica></Planifica>
//       </div> */}
//       <div className='mb-20'>
//         <Entumesa></Entumesa>
//       </div>
//       <div className='md:w-11/13 lg:w-10/13 w-full mx-auto mb-20'>
//         <h1 className="text-5xl mb-12 text-center text-gray-500/70">IMPERDIBLES</h1>
//         <Imperdible></Imperdible>
//       </div>
//       <div className='mb-10'>
//         <BlogHome></BlogHome>
//       </div>
//       <div className='mb-10'>
//         <Rutas></Rutas>
//       </div>
//       <div className='mb-20'>
//         <a target='_blank' href='https://teatromercedessosa.com/'>
//           <img src={`${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/images/banners/TeatroMercedesSosa-desktop.jpg`} className='w-full' alt="" />
//         </a>
//       </div>
//       <div className='md:w-11/13 w-full mx-auto'>
//         <div className='relative flex justify-center items-center'>
//           {/* El h1 se centra gracias a justify-center en el div padre */}
//           <h1 className="text-5xl mb-7 text-gray-500/70">EVENTOS DESTACADOS</h1>

//           {/* Este div se posiciona de forma absoluta a la derecha del contenedor padre */}
//           <div className='absolute right-0 mb-7 pe-7'>
//             <a href={`${process.env.URL_LOCAL || ''}/eventos`}>
//               <Button className='shadow-lg' size='sm'>
//                 Conocé más aqui
//               </Button>
//             </a>
//           </div>
//         </div>

//         <div>
//           <EventosHome></EventosHome>
//         </div>
//       </div>
//     </div>
//   )
// }
