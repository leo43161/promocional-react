import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import ItinerarioDoc from '@/components/ItinerarioDoc';

// Este componente contiene toda la lógica que solo debe correr en el navegador.
const ItinerarioViewer = ({ data }) => {

    return (
        <PDFViewer className="w-full h-svh">
            <ItinerarioDoc data={data} isViewer={true} />
        </PDFViewer>
    );
};

export default ItinerarioViewer;