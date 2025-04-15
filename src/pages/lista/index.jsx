import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Asegúrate de tener axios instalado e importado
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import Button from '@/components/common/Button';
import ItemLista from '@/components/lista/ItemLista';
// Importa tus componentes de UI, layout, etc.
// import Layout from '../../components/Layout';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import ErrorMessage from '../../components/ErrorMessage';

export default function Lista() {
  const router = useRouter();
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // router.isReady se asegura de que router.query esté poblado (importante en Next.js)
    if (router.isReady) {
      const { id } = router.query; // Obtiene el 'id' de la URL (?id=...)

      if (id) {
        setLoading(true);
        setError(null);
        setArticulo(null); // Limpia el artículo anterior si hubiera

        // Construye la URL de tu API externa
        //const apiUrl = `https://tu-servidor-api.com/api/articulos/${id}`;
        const apiUrl = `https://www.tucumanturismo.gob.ar/api/prestadores`;

        axios.get(apiUrl)
          .then(response => {
            console.log(response.data);
            setArticulo(response.data);
            // Opcional: Actualizar el título de la página dinámicamente
            document.title = response.data.titulo || 'Detalle del Artículo';
          })
          .catch(err => {
            console.error("Error fetching data:", err);
            setError("No se pudo cargar el artículo.");
          })
          .finally(() => {
            setLoading(false);
          });

      } else {
        // No hay ID en la URL
        setError("ID de artículo no especificado en la URL.");
        setLoading(false);
      }
    }
  }, [router.isReady, router.query]); // Dependencias del useEffect

  // Renderizado condicional basado en el estado
  let content;
  if (loading) {
    // content = <LoadingSpinner />; // Tu componente de carga
    content = <div>Cargando...</div>;
  } else if (error) {
    // content = <ErrorMessage message={error} />; // Tu componente de error
    content = <div>Error: {error}</div>;
  } else if (articulo) {
    // Renderiza la información del artículo
    content = (
      <div>
        <h1>{articulo.titulo}</h1>
        <p>{articulo.contenido}</p>
        {/* ... más detalles del artículo ... */}
      </div>
    );
  } else {
    // Estado inicial o caso inesperado
    content = <div>No se encontró el artículo.</div>;
  }

  return (
    // <Layout> {/* Envuelve con tu layout si tienes uno */}
    <div> {/* Contenedor principal */}
      {content}
      <ParallaxContainer
        speed={0.2}
        minHeight="h-96 md:h-[58vh]"
        className=""
      >
        <div className="container mx-auto h-full text-white flex flex-col justify-end">
          <div className='w-11/12 mx-auto pt-5'>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Segunda Sección
            </h2>
          </div>
        </div>
      </ParallaxContainer>
      <div className='w-11/12 mx-auto pt-5 mb-10'>
        <div className='mb-5'>
          <Breadcrumb items={
            [{ label: "Prestadores activos", href: '/prestadores' }]
          }></Breadcrumb>
        </div>
      </div>

      <div className='mb-10 md:w-11/14 w-full mx-auto flex flex-col gap-15 px-5'>
        <ItemLista id="10" titulo="Conocé Tucumán en 2 días" img="guia.jpg"></ItemLista>
        <ItemLista id="10" titulo="Conocé Tucumán en 2 días" img="guia.jpg" right={true}></ItemLista>
        <ItemLista id="10" titulo="Conocé Tucumán en 2 días" img="guia.jpg"></ItemLista>
      </div>

    </div>
    // </Layout>
  );
}

// ¡IMPORTANTE! Esta página NO necesita getStaticPaths ni getStaticProps
// porque la obtención de datos es puramente del lado del cliente.