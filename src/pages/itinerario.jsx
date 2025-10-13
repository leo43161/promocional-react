import dynamic from 'next/dynamic';
import { useGetItinerarioQuery } from '@/redux/services/itinerarioService';
import { useRouter } from 'next/router';
import ItinerarioMobile from '@/components/ItinerarioMobile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { getCurrentLanguage } from '@/utils';

const LoaderIcon = () => (
  <svg className="animate-spin h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function Itinerario() {
  const router = useRouter();
  const { id } = router.query;
  const language = getCurrentLanguage(router.query);
  const isSpanish = language.code === 'ES';

  const ItinerarioViewer = dynamic(
    () => import('@/components/ItinerarioViewer'),
    {
      loading: () => (
        <div className="flex flex-col justify-center items-center h-screen bg-background text-foreground">
          <LoaderIcon />
          <h2 className="text-2xl font-bold mt-6">{isSpanish ? 'Preparando el visor...' : 'Preparing the viewer...'}</h2>
          <p className="text-foreground/80 mt-2">{isSpanish ? 'Cargando la interfaz del PDF.' : 'Loading the PDF interface.'}</p>
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
        <h2 className="text-2xl font-bold text-red-500">{isSpanish ? 'Itinerario no encontrado' : 'Itinerary not found'}</h2>
        <p className="text-foreground/80 mt-2">{isSpanish ? 'El enlace parece estar incompleto. Por favor, verifica la URL.' : 'The link seems to be incomplete. Please check the URL.'}</p>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background">
        <LoaderIcon />
        <h2 className="text-2xl font-bold text-foreground mt-6">{isSpanish ? 'Preparando tu itinerario...' : 'Preparing your itinerary...'}</h2>
        <p className="text-foreground/80 mt-2 text-center">{isSpanish ? 'Recopilando tus selecciones. ¡Un momento, por favor!' : 'Gathering your selections. Just a moment, please!'}</p>
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching itinerary:", error);
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background text-center p-4">
        <h2 className="text-2xl font-bold text-red-500">{isSpanish ? '¡Ups! Algo salió mal' : 'Oops! Something went wrong'}</h2>
        <p className="text-foreground/80 mt-2">{isSpanish ? 'No pudimos cargar tu itinerario. Intenta refrescar la página.' : "We couldn't load your itinerary. Please try refreshing the page."}</p>
      </div>
    );
  }

  try {
    const dataArray = JSON.parse(data.result[0].ItinerarioJSON);
    const itinerarioDocumento = <ItinerarioMobile data={dataArray} />;
    
    // Check if all arrays within the data are empty
    const isEmpty = Object.values(dataArray).every(arr => Array.isArray(arr) && arr.length === 0);

    if (isEmpty) {
      return (
        <div className="flex flex-col justify-center items-center h-screen bg-background text-center p-4">
          <h2 className="text-2xl font-bold text-secondary">{isSpanish ? 'Tu itinerario está vacío' : 'Your itinerary is empty'}</h2>
          <p className="text-foreground/80 mt-2">{isSpanish ? 'Aún no has agregado favoritos. ¡Comienza a explorar y planificar tu viaje!' : 'You haven\'t added any favorites yet. Start exploring and planning your trip!'}</p>
        </div>
      );
    }

    return (
      <div className="h-screen w-full bg-background">
        {window.innerWidth < 1024 ? (
          // --- MOBILE VIEW ---
          <div className="flex flex-col justify-center items-center h-full text-center p-8">
            <svg className="w-24 h-24 text-secondary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h2 className="text-3xl font-bold text-foreground">{isSpanish ? 'Tu Itinerario Está Listo' : 'Your Itinerary is Ready'}</h2>
            <p className="text-foreground/80 mt-2 mb-8">{isSpanish ? 'Haz clic en el botón para ver o descargar tu PDF.' : 'Click the button to view or download your PDF.'}</p>
            <PDFDownloadLink
              document={itinerarioDocumento}
              fileName={`Itinerario-Tucuman-${id}.pdf`}
            >
              {({ blob, url, loading, error }) => (
                <button
                  onClick={() => {
                    if (url) {
                      window.open(url, '_blank');
                    }
                  }}
                  disabled={loading || error}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105 disabled:bg-gray-400"
                >
                  {loading ? (isSpanish ? 'Generando...' : 'Generating...') : (error ? (isSpanish ? 'Error, intente de nuevo' : 'Error, please try again') : (isSpanish ? 'Abrir Itinerario' : 'Open Itinerary'))}
                </button>
              )}
            </PDFDownloadLink>
          </div>
        ) : (
          // --- DESKTOP VIEW ---
          <ItinerarioViewer data={dataArray} />
        )}
      </div>
    );
  } catch (e) {
    console.error("Error processing itinerary data:", e);
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-background text-center p-4">
        <h2 className="text-2xl font-bold text-red-500">{isSpanish ? 'Error en los datos' : 'Data error'}</h2>
        <p className="text-foreground/80 mt-2">{isSpanish ? 'Recibimos la información de tu itinerario, pero tiene un formato incorrecto.' : 'We received your itinerary information, but it is in an incorrect format.'}</p>
      </div>
    );
  }
}

// Disable the main layout for this page
Itinerario.getLayout = function getLayout(page) {
  return page;
};