import { usePDF } from '@react-pdf/renderer';
import { ArrowDownToLine, QrCode, LoaderCircle } from 'lucide-react';
import ItinerarioDoc from '@/components/ItinerarioDoc';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import Modal from '@/components/common/Modal';
import { QRCodeSVG } from 'qrcode.react';
import { setCookie, getCookie, encriptar, desencriptar } from '@/utils/cookie';
import { useGuardarItinerarioMutation } from '@/redux/services/itinerarioService';

export default function PDFGeneratorButton() {
    const favoritos = useSelector(state => state.itinerarioReducer.value.favoritos);
    const [instance, updateInstance] = usePDF({ document: null });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [guardarItinerario, { isLoading: isSaving }] = useGuardarItinerarioMutation();
    const scrollContentRef = useRef(null);
    
    // --- CAMBIO 1: Lógica anti-apertura accidental ---
    // Este estado rastrea la intención explícita de descargar el archivo.
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (instance.url && !instance.loading) {
            setPdfUrl(instance.url);
            // Solo abrimos la ventana si la intención era descargar.
            if (isDownloading) {
                window.open(instance.url, '_blank');
                handleCloseModal(); // Cerramos y reseteamos todo.
            }
        }
    }, [instance.url, instance.loading]);

    // Lógica principal de guardado de datos (sin cambios)
    const handleCookieAndSave = async () => {
        let id_session;
        const cookie = getCookie('__cookieSesion');
        if (!cookie) {
            id_session = Math.floor(Math.random() * 1000000);
            const cookieData = { permiso: true, id: id_session };
            const encryptedValue = encriptar(JSON.stringify(cookieData));
            setCookie('__cookieSesion', encryptedValue, 60);
        } else {
            const cookieDecrypted = JSON.parse(desencriptar(cookie));
            id_session = cookieDecrypted.id || Math.floor(Math.random() * 1000000);
        }
        const payload = {
            id_session,
            destinos: Object.values(favoritos).flatMap(circuito => circuito.destinos.map(d => ({ id_dest: d.idArticulo }))),
            alojamientos: Object.values(favoritos).flatMap(circuito => circuito.alojamientos.map(h => ({ id_hotel: h.id }))),
            prestadores: Object.values(favoritos).flatMap(circuito => circuito.prestadores.map(p => ({ id_prestador: p.id }))),
            guias: Object.values(favoritos).flatMap(circuito => circuito.guias.map(g => ({ id_guia: g.id }))),
        };
        try {
            await guardarItinerario(payload).unwrap();
        } catch (error) {
            console.error('Error al guardar el itinerario:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShowQR(false);
        setPdfUrl(null);
        updateInstance(null);
        setIsDownloading(false); // Reseteamos la intención de descarga.
    };

    const handleDownload = async () => {
        setIsDownloading(true); // Marcamos la intención de descargar.
        await handleCookieAndSave();
        setShowQR(false);
        updateInstance(<ItinerarioDoc data={favoritos} />);
    };

    const handleGenerateQR = async () => {
        setShowQR(true);
        await handleCookieAndSave();
        if (!pdfUrl) {
            updateInstance(<ItinerarioDoc data={favoritos} />);
        }
    };

    const isLoading = instance.loading || isSaving;

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className="flex items-center px-4 text-white cursor-pointer h-full hover:bg-white hover:text-black transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                <ArrowDownToLine className="text-[26px]" />
                <p className="font-700 uppercase text-2xl ml-2">
                    {isLoading && !isModalOpen ? 'Generando...' : 'Descargar'}
                </p>
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Descargar Itinerario"
                scrollContentRef={scrollContentRef}
            >
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-600 mb-4">
                        Al descargar o generar el QR, aceptas nuestra política de cookies. Puedes leer más en nuestros <a href="/privacidad" className="underline text-blue-600">términos y condiciones</a>.
                    </p>

                    {/* El área del QR solo se muestra si showQR es true */}
                    {showQR && (
                        <div className="flex flex-col items-center justify-center min-h-[250px] my-4 transition-all duration-300">
                            {pdfUrl ? (
                                <>
                                    <h3 className="text-lg font-bold mb-2">¡Tu QR está listo!</h3>
                                    <p className='text-xs text-gray-500 mb-4'>Escanea el código para ver tu itinerario.</p>
                                    <QRCodeSVG value={pdfUrl} size={180} includeMargin={true} />
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-500">
                                    <LoaderCircle className="animate-spin mb-4" size={48} />
                                    <p className="font-semibold">Generando tu itinerario...</p>
                                    <p className="text-sm">Esto puede tardar unos segundos.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- CAMBIO 2: Botones siempre visibles --- */}
                    <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200 mt-4">
                        <button
                            onClick={handleDownload}
                            disabled={isLoading}
                            className="flex items-center justify-center px-4 py-2 bg-primary/90 text-white rounded-md hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ArrowDownToLine className="mr-2" />
                            Descargar PDF
                        </button>
                        <button
                            onClick={handleGenerateQR}
                            // Se deshabilita si algo está cargando O si el QR ya se mostró.
                            disabled={isLoading || showQR}
                            className="flex items-center justify-center px-4 py-2 bg-secondary/90 text-white rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <QrCode className="mr-2" />
                            Generar QR
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}