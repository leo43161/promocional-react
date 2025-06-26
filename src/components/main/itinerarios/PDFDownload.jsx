import {
  usePDF,
  Document,
  Page,
  PDFViewer,
  PDFDownloadLink,
  Text,
} from '@react-pdf/renderer';
import { ArrowDownToLine } from 'lucide-react';
import ItinerarioDoc from '@/utils/ItinerarioDoc'; // Importa tu documento
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function PDFGeneratorButton() {
  const favoritos = useSelector(state => state.itinerarioReducer.value.favoritos);

  const [instance, updateInstance] = usePDF({ document: null });

  useEffect(() => {
    if (instance.url && !instance.loading) {
      window.open(instance.url, '_blank');
    }
  }, [instance.url]);

  const handleOpenPdf = () => {
    if (!instance.loading) {
      updateInstance(window.innerWidth >= 1024 ? <ItinerarioDoc data={favoritos} /> : <ItinerarioDoc data={favoritos} />);
    }
  };

  return (
    <button
      onClick={handleOpenPdf}
      // Deshabilitamos el botón mientras el PDF se está generando.
      disabled={instance.loading}
      className="flex items-center px-4 text-white cursor-pointer h-full hover:bg-white hover:text-black transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      <ArrowDownToLine className="text-[26px]" />
      <p className="font-700 uppercase text-2xl ml-2">
        {instance.loading ? 'Generando...' : 'Descargar'}
      </p>
    </button>
  );
}