import dynamic from 'next/dynamic';
import { useGetItinerarioQuery } from '@/redux/services/itinerarioService';
import { useRouter } from 'next/router';
import ItinerarioDoc from '@/components/ItinerarioDoc';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
// --- Icono de Carga (Loader) ---
// Un simple SVG que podemos animar con Tailwind.
const LoaderIcon = () => (
  <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Componente de la Página ---
export default function Itinerario() {
  const [isMobile, setIsMobile] = useState();
  const router = useRouter();
  /* const isMobile = useIsMobile(); */
  const { id } = router.query;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    handleResize();
  }, []);

  const ItinerarioViewer = dynamic(
    () => import('@/components/ItinerarioViewer'),
    {
      loading: () => (
        <div className="flex flex-col justify-center items-center h-screen bg-background text-foreground">
          <LoaderIcon />
          <h2 className="text-2xl font-bold mt-6">Preparando el visor...</h2>
          <p className="text-foreground/80 mt-2">Cargando la interfaz del PDF.</p>
        </div>
      ),
      ssr: false,
    }
  );

  const { data, isLoading, isFetching, isError, error } = useGetItinerarioQuery(id, {
    skip: !id,
  });

  if (!id && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background text-center p-4">
        {/* <h2 className="text-2xl font-bold text-red-500">No se encontró el itinerario</h2>
        <p className="text-foreground/80 mt-2">El enlace parece estar incompleto. Por favor, verifica la URL.</p> */}
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background">
        <LoaderIcon />
        <h2 className="text-2xl font-bold text-foreground mt-6">Generando tu Itinerario</h2>
        <p className="text-foreground/80 mt-2 text-center">Recopilando tus selecciones. ¡Un momento, por favor!</p>
      </div>
    );
  }

  if (isError) {
    console.error("Error al obtener el itinerario:", error);
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background text-center p-4">
        <h2 className="text-2xl font-bold text-red-500">¡Ups! Algo salió mal</h2>
        <p className="text-foreground/80 mt-2">No pudimos cargar tu itinerario. Intenta refrescar la página.</p>
      </div>
    );
  }


  try {
    const dataArray = JSON.parse(data.result[0].ItinerarioJSON);
    const itinerarioDocumento = <ItinerarioDoc data={dataArray} />;
    if (Object.keys(dataArray).every(key => Object.values(dataArray[key]).every(arr => arr.length === 0))) {
      return (
        <div className="flex flex-col justify-center items-center h-screen bg-background text-center p-4">
          <h2 className="text-2xl font-bold text-secondary">Tu itinerario está vacío</h2>
          <p className="text-foreground/80 mt-2">Aún no has agregado favoritos. ¡Comienza a explorar y planificar tu viaje!</p>
        </div>
      );
    }

    return (
      <div className="h-screen w-full bg-background">
        {isMobile ? (
          // --- VISTA PARA MÓVIL ---
          <div className="flex flex-col justify-center items-center h-full text-center p-8">
            <svg className="w-24 h-24 text-secondary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h2 className="text-3xl font-bold text-foreground">Tu Itinerario está Listo</h2>
            <p className="text-foreground/80 mt-2 mb-8">Haz clic en el botón para ver o descargar tu PDF.</p>
            <PDFDownloadLink
              document={itinerarioDocumento}
              fileName={`Itinerario-Tucuman-${id}.pdf`}
              /* className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105" */
            >
              {({ blob, url, loading, error }) => (
                <button
                  onClick={() => {
                    // Esta es la línea clave:
                    // Si la URL existe, la abre en una nueva pestaña.
                    if (url) {
                      window.open(url, '_blank');
                    }
                  }}
                  disabled={loading}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105 disabled:bg-gray-400"
                >
                  {loading ? 'Generando...' : (error ? 'Error al descargar intente de nuevo' : 'Abrir Itinerario')}
                </button>
              )
              }
            </PDFDownloadLink>
          </div>
        ) : (
          // --- VISTA PARA ESCRITORIO ---
          <ItinerarioViewer data={dataArray} />
        )}
      </div>
    );
  } catch (e) {
    console.error("Error al procesar los datos del itinerario:", e);
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background text-center p-4">
        <h2 className="text-2xl font-bold text-red-500">Error en los datos</h2>
        <p className="text-foreground/80 mt-2">Recibimos la información de tu itinerario, pero tiene un formato incorrecto.</p>
      </div>
    );
  }
}

// Deshabilita el Layout principal para esta página
Itinerario.getLayout = function getLayout(page) {
  return page;
};