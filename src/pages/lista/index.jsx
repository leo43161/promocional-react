import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Asegúrate de tener axios instalado e importado
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
       </div>
    // </Layout>
  );
}

// ¡IMPORTANTE! Esta página NO necesita getStaticPaths ni getStaticProps
// porque la obtención de datos es puramente del lado del cliente.