import { usePDF, Document, Page, Text } from '@react-pdf/renderer';
import { ArrowDownToLine } from 'lucide-react';
import PlanificaDoc from '@/utils/PlanificaDoc'; // Importa tu documento
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Este componente ahora contiene toda la lógica de generación de PDF.
export default function PDFGeneratorButton() {
  const favoritos = useSelector(state => state.itinerarioReducer.value.favoritos);
  const MyDoc = (
    <Document>
      <Page>
        <Text>{JSON.stringify(favoritos.alojamientos)}</Text>
      </Page>
    </Document>
  );

  const [instance, updateInstance] = usePDF({
    document: MyDoc,
    /* document: <PlanificaDoc data={favoritos} />, */
  });

  // Si los datos del itinerario cambian, le decimos al hook que regenere el PDF.
  useEffect(() => {
    updateInstance();
  }, [favoritos, updateInstance]);


  const handleOpenPdf = async () => {
    console.log(instance);
    await updateInstance();
    // Si la instancia se está generando o hay un error, no hacemos nada.
    if (instance.loading || !instance.url) return

    // Si ya tenemos la URL del Blob, la abrimos en una nueva pestaña.
    window.open(instance.url, '_blank');
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