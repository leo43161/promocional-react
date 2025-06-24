import Carousel from '@/components/common/Carousel'
import ResponsiveVideo from '@/components/common/ResponsiveVideo'
import BlogHome from '@/components/main/BlogHome'
import Entumesa from '@/components/main/Entumesa'
import EventosHome from '@/components/main/EventosHome'
import Imperdible from '@/components/main/Imperdible'
import Itinerarios from '@/components/main/itinerarios'
import Planifica from '@/components/main/planifica'
import Rutas from '@/components/main/Rutas'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function index() {
  /* const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        // Directly make the GET request to the external API
        const response = await axios.get('http://10.15.15.151/api/api/session');
        setSessionData(response.data);
        console.log(response);
      } catch (err) {
        // Handle errors during the fetch
        console.error('Error fetching session data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, []); // The empty dependency array ensures this runs only once after the initial render

  if (loading) {
    return <div>Cargando datos de sesión...</div>;
  }

  if (error) {
    // You can display a more user-friendly error message here
    return <div>Error al cargar los datos: {error.message}</div>;
  } */
  return (
    <div>
      <div className='mb-0'>
        <ResponsiveVideo />
      </div>
      <div className='mb-0'>
        <Itinerarios></Itinerarios>
      </div>
      {/* <div className='md:w-11/13 lg:w-11/13 w-full mx-auto md:mb-30 mb-15'>
        <Planifica></Planifica>
      </div> */}
      <div className='mb-20'>
        <Entumesa></Entumesa>
      </div>
      <div className='md:w-11/13 lg:w-10/13 w-full mx-auto mb-20'>
        <h1 className="text-5xl mb-12 text-center text-gray-500/70">IMPERDIBLES</h1>
        <Imperdible></Imperdible>
      </div>
      <div className='mb-10'>
        <BlogHome></BlogHome>
      </div>
      <div className='mb-10'>
        <Rutas></Rutas>
      </div>
      <div className='mb-20'>
        <a target='_blank' href='https://teatromercedessosa.com/'>
          <img src={`${process.env.URL_LOCAL_SERVER}${process.env.URL_LOCAL}/images/banners/TeatroMercedesSosa-desktop.jpg`} className='w-full' alt="" />
        </a>
      </div>
      <div className='md:w-11/13 w-full mx-auto'>
        <h1 className="text-5xl mb-7 text-center text-gray-500/70">EVENTOS DESTACADOS</h1>
        <div>
          <EventosHome></EventosHome>
        </div>
      </div>
    </div>
  )
}
