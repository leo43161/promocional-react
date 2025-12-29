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
import ContadorFit from '@/components/main/ContadorFit';
import ModalVivo from '@/components/stream/ModalVivo';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalVivo, openModalVivo } from '@/redux/features/uiSlice';

// Objeto para manejar los textos en diferentes idiomas #
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
  const showModal = useSelector((state) => state.ui.visibleModal);
  const dispatch = useDispatch();
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
        <div className='relative'>
          <a href="https://www.tucumanturismo.gob.ar/short/actverano2026" target="_blank" rel="noopener noreferrer">
            <ResponsiveVideo
              desktopSrc="video/Tucuman_Tiene_Todo_Verano.mp4"
              mobileSrc="video/Tucuman_Tiene_Todo_Verano_M.mp4"
            />
          </a>
          <div className='md:bottom-4 md:right-4 md:absolute md:w-6/12 flex justify-end w-full'>
            <ContadorFit></ContadorFit>
          </div>
        </div>
      </div>
      <div className='mb-0'>
        <Itinerarios />
      </div>
      <div className='mb-10'>
        {/* <div>
          <a href="https://www.tucumanturismo.gob.ar/files/AGENDA DE ACTIVIDADES mes del turismo.pdf" target="_blank">
            <img src={process.env.URL_IMG_LOCAL + "/images/banners/banner-mes-del-turismo-1900-x-450.jpg"} alt="Banner de Invierno" />
          </a>
        </div> */}
        <div>
          <a href="https://www.tucumanturismo.gob.ar/articulos/articulo/819/promociones" target="_blank" rel="noopener noreferrer">
            <ResponsiveVideo
              desktopSrc="video/Copa_Banner_1900_X_450.mp4"
            />
          </a>
        </div>

        {/* <div>
          <a href="https://www.tucumanturismo.gob.ar/articulos/articulo/969/juegos-argentinos-en-altura-vientos-calchaquies-2025" target="_blank" rel="noopener noreferrer">
            <ResponsiveVideo
              desktopSrc="video/Calchaqui_Banner.mp4"
            />
          </a>
        </div> */}
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
        <h1 className="text-5xl mb-12 text-center te+xt-gray-500/70">{currentContent.unmissable}</h1>
        <Imperdible />
      </div> */}
      <ModalVivo isOpen={showModal} handleCloseModal={()=> dispatch(closeModalVivo())} />
    </div>
  )
}