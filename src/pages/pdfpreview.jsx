'use client';
import ItinerarioDoc from '@/components/ItinerarioDoc';
import favoritos from '@/data/favoritosExample';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando previsualización del PDF...</p>
  }
);

export default function PDFItinerario() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PDFViewer width="100%" height="100%">
        <ItinerarioDoc data={favoritos} />
      </PDFViewer>
    </div>
  );
}