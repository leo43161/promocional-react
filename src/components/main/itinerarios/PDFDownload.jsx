import { PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import { ArrowDownToLine, QrCode, LoaderCircle, AlertCircle } from 'lucide-react';
import ItinerarioDoc from '@/components/ItinerarioDoc';
import ItinerarioMobile from '@/components/ItinerarioMobile';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import Modal from '@/components/common/Modal';
import { QRCodeSVG } from 'qrcode.react';
import { setCookie, getCookie, encriptar, desencriptar } from '@/utils/cookie';
import { useGetIdSessionMutation, useGuardarItinerarioMutation } from '@/redux/services/itinerarioService';
import { useRouter } from 'next/router';
import { getCurrentLanguage } from '@/utils';

export default function PDFGeneratorButton() {
  const router = useRouter();
  const lenguaje = getCurrentLanguage(router.query);

  const favoritos = useSelector(state => state.itinerarioReducer.value.favoritos);
  const [instance, updateInstance] = usePDF({ document: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [guardarItinerario, { isLoading: isSaving }] = useGuardarItinerarioMutation();
  const [getIdSession] = useGetIdSessionMutation();
  const scrollContentRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);

  const isFavoritosEmpty = (favs) => {
    if (!favs) return true;
    // Comprueba si todos los arrays dentro de cada circuito están vacíos.
    return Object.values(favs).every(circuito =>
      (circuito.destinos?.length || 0) === 0 &&
      (circuito.alojamientos?.length || 0) === 0 &&
      (circuito.prestadores?.length || 0) === 0 &&
      (circuito.guias?.length || 0) === 0
    );
  };
  const handleOpenModalClick = () => {
    if (isFavoritosEmpty(favoritos)) {
      setShowTooltip(true);
      // Oculta el tooltip después de 3 segundos
      setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    console.log(instance);
    if (instance.url && !instance.loading) {
      setIsDownloading(false);
      window.open(instance.url, '_blank');
      updateInstance(null);
      handleCloseModal();
    }
  }, [instance.url, instance.loading]);



  const handleCookieAndSave = async () => {
    let id_session;
    const cookie = getCookie('__cookieSesion');
    const idSession = await getIdSession().unwrap();
    if (!cookie) {
      id_session = idSession.result[0].id;
      console.log(id_session);
      const cookieData = { permiso: true, id: id_session };
      const encryptedValue = encriptar(JSON.stringify(cookieData));
      setCookie('__cookieSesion', encryptedValue, 60);
    } else {
      const cookieDecrypted = JSON.parse(desencriptar(cookie));
      id_session = cookieDecrypted.id || idSession.result[0].id;
    }
    const payload = {
      id_session,
      destinos: Object.values(favoritos).flatMap(circuito => circuito.destinos.map(d => ({ id_dest: d.idArticulo }))),
      alojamientos: Object.values(favoritos).flatMap(circuito => circuito.alojamientos.map(h => ({ id_hotel: h.id }))),
      prestadores: Object.values(favoritos).flatMap(circuito => circuito.prestadores.map(p => ({ id_prestador: p.id }))),
      guias: Object.values(favoritos).flatMap(circuito => circuito.guias.map(g => ({ id_guia: g.id }))),
    };
    try {
      const response = await guardarItinerario(payload).unwrap();
      setPdfUrl(process.env.URL_LOCAL_SERVER + "/itinerario?id=" + response.id_itinerario);
    } catch (error) {
      console.error('Error al guardar el itinerario:', error);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    await handleCookieAndSave();
    setShowQR(false);
    updateInstance(<ItinerarioDoc data={favoritos} />);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowQR(false);
    setPdfUrl(null);
    updateInstance(null);
  };

  const handleGenerateQR = async () => {
    await handleCookieAndSave();
    setShowQR(true);
  };

  const isLoading = instance.loading || isSaving;
  const itinerarioDocumento = <ItinerarioMobile data={favoritos} />;
  return (
    // --- Contenedor relativo para posicionar el tooltip ---
    <div className="relative h-full">
      <button
        onClick={handleOpenModalClick}
        disabled={isLoading}
        className="flex items-center px-4 text-white cursor-pointer h-full hover:bg-white hover:text-black transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        <ArrowDownToLine className="text-[26px]" />
        <p className="font-700 uppercase text-2xl ml-2">
          {isLoading && !isModalOpen ? lenguaje.code === 'ES' ? 'Generando...' : 'Generating...' : lenguaje.code === 'ES' ? 'Descargar' : 'Download'}
        </p>
      </button>

      {/* --- Tooltip de advertencia --- */}
      {showTooltip && (
        <div className="absolute -top-12 right-1 mt-2 w-max bg-primary text-white text-sm font-semibold rounded-md shadow-lg px-3 py-2 z-50 flex items-center">
          <AlertCircle className="mr-1.5" size={20} />
          <span>{ lenguaje.code === 'ES' ? "Debes agregar items a tu itinerario." : "You must add items to your itinerary."}</span>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Descargar Itinerario"
        scrollContentRef={scrollContentRef}
        backgroundColor={'#206C60'}
        classNameHeader='text-white'
      >
        <div className="p-4 text-center flex flex-col justify-between h-full">
          {lenguaje.code === 'ES' ? <p className="text-sm text-white my-auto">
            Al descargar o generar el QR, aceptas nuestra política de cookies. Puedes leer más en nuestros <a href="/privacidad" className="underline text-primary">términos y condiciones</a>.
          </p> : <p className="text-sm text-white my-auto"> By downloading or generating the QR, you accept our cookie policy. You can read more in our <a href="/privacidad" className="underline text-primary">terms and conditions</a>.
          </p>}

          {showQR && (
            <div className="flex flex-col items-center justify-center min-h-[250px] my-4 transition-all duration-300 text-white">
              {pdfUrl ? (
                <>
                  <h3 className="text-lg font-bold mb-2"> {lenguaje.code === 'ES' ? '¡Tu QR está listo!' : 'Your QR is ready!'}</h3>
                  <p className='text-xs mb-4'>{lenguaje.code === 'ES' ? 'Escanea el código QR para ver tu itinerario' : 'Scan the codeQR to view your itinerary'}</p>
                  <QRCodeSVG value={pdfUrl} size={180} includeMargin={true} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <LoaderCircle className="animate-spin mb-4" size={48} />
                  <p className="font-semibold">{lenguaje.code === 'ES' ? 'Generando tu itinerario...' : 'Generating your itinerary...'}</p>
                  <p className="text-sm"> {lenguaje.code === 'ES' ? 'Esto puede tardar unos segundos.' : 'This may take a few seconds.'}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200 mt-4 justify-between">
            <button
              onClick={handleGenerateQR}
              disabled={isLoading || showQR}
              className="flex items-center justify-center px-4 py-1.5 bg-primary/90 text-white rounded-md hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xl"
            >
              <QrCode className="mr-2" />
              {lenguaje.code === 'ES' ? 'Generar QR' : 'Generate QR'}
            </button>
            {window.innerWidth < 1024 ? <PDFDownloadLink
              document={itinerarioDocumento}
              fileName={`Itinerario-Tucuman-Tiene-Todo.pdf`}
            >
              {({ blob, url, loading, error }) => (
                <button
                  onClick={async () => {
                    // Si la URL existe, la abre en una nueva pestaña.
                    if (url) {
                      window.open(url, '_blank');
                      await handleCookieAndSave();
                      setShowQR(false);
                    }
                  }}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-1.5 bg-primary/90 text-white rounded-md hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xl w-full"
                >
                  <ArrowDownToLine size={25} className="mr-2" />
                  {loading ?
                    (lenguaje.code === 'ES' ? 'Generando...' : 'Generating...') :
                    (error ? (lenguaje.code === 'ES' ? 'Error al descargar intente de nuevo' : 'Error while downloading, try again') :
                      (lenguaje.code === 'ES' ? 'Descargar Itinerario' : 'Descargar Itinerario'))}
                </button>
              )
              }
            </PDFDownloadLink> :
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center px-4 py-1.5 bg-primary/90 text-white rounded-md hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xl"
              >
                <ArrowDownToLine size={25} className="mr-2" />
                {isDownloading ?
                  (lenguaje.code === 'ES' ? "Cargando Itinerario..." : "Loading Itinerary...") :
                  (lenguaje.code === 'ES' ? "Descargar Itinerario" : "Descargar Itinerario")
                }
              </button>
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}