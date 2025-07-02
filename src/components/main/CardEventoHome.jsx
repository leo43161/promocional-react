import { Clock, MapPin } from 'lucide-react';
import React from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/router';
import { generateSlug } from '@/utils'; // Se asume que tienes esta utilidad

// Objeto con los textos para internacionalización
const content = {
    es: {
        buttonText: "Conocé más aquí",
        timeSuffix: "hs.",
        locale: 'es-ES',
        timeNotAvailable: "Hora no disp.",
        imageAlt: "Imagen del evento"
    },
    en: {
        buttonText: "Learn more here",
        timeSuffix: "", // En inglés no se suele usar 'hs.'
        locale: 'en-US',
        timeNotAvailable: "Time N/A",
        imageAlt: "Event Image"
    }
};

export default function CardEventoHome({ evento }) {
    const router = useRouter();
    const { lang } = router.query;
    const isEnglish = lang === 'EN';
    
    // Selecciona el conjunto de textos correcto según el idioma
    const currentContent = isEnglish ? content.en : content.es;

    const {
        idEvento, // Se asume que el objeto evento tiene un ID
        nombre,
        fechaInicio,
        fechaFin,
        horaInicio,
        imagen,
        direccion,
        nombreLocalidad
    } = evento;

    // Función para formatear la fecha que ahora usa el 'locale' dinámico
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString + 'T00:00:00');
        const day = date.getDate();
        const month = date.toLocaleString(currentContent.locale, { month: 'short' }).toUpperCase().replace('.', '');
        return `${day} ${month}`;
    };

    const formattedStartDate = formatDate(fechaInicio);
    const formattedEndDate = formatDate(fechaFin);

    let displayDate;
    if (formattedStartDate === formattedEndDate || !formattedEndDate) {
        displayDate = formattedStartDate;
    } else {
        displayDate = `${formattedStartDate} - ${formattedEndDate}`;
    }

    // Formatear la hora con texto dinámico
    const formattedTime = horaInicio ? `${horaInicio.substring(0, 5)} ${currentContent.timeSuffix}`.trim() : currentContent.timeNotAvailable;

    // Generar el enlace dinámico para el botón
    const eventLink = () => {
        if (!idEvento) return '#'; // Enlace de fallback si no hay ID
        let baseUrl = `/eventos/evento/${idEvento}/${generateSlug(nombre)}`;
        if (isEnglish) {
            baseUrl += `?lang=EN`;
        }
        return baseUrl;
    };

    return (
        <div className='w-full'>
            <div className='flex flex-col'>
                <div className='relative border h-75'>
                    <img
                        src={process.env.URL_IMG + imagen}
                        className='object-cover object-center h-full w-full'
                        alt={nombre || currentContent.imageAlt}
                    />
                    <div className='rounded-b-md absolute top-0 left-8 shadow-lg bg-white w-auto py-1 px-2 flex justify-center'> 
                        <h4 className='font-bold text-[1.1em]'>{displayDate}</h4>
                    </div>
                </div>
                <div className='flex-col flex gap-5 mb-6 pt-1'>
                    <h3 className='font-bold text-left text-3xl'>{nombre}</h3>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Clock className='font-bold text-lg' size={17} />
                        </div>
                        <span>{formattedTime}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div>
                            <MapPin className='font-bold text-lg' size={17} />
                        </div>
                        <span className='text-[1.1em]'>{direccion} - {nombreLocalidad}</span>
                    </div>
                </div>
                <div>
                    <a href={eventLink()}>
                        <Button className='shadow-lg w-full' size='sm'>
                            {currentContent.buttonText}
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}

// import { Clock, MapPin } from 'lucide-react';
// import React from 'react';
// import Button from '../common/Button'; // Asegúrate que la ruta a Button sea correcta

// export default function CardEventoHome({ evento }) {
//     // Desestructuramos los campos que vamos a usar del objeto evento
//     const {
//         nombre,
//         fechaInicio,
//         fechaFin,
//         horaInicio,
//         imagen,
//         direccion,
//         nombreLocalidad
//     } = evento;

//     // Función para formatear la fecha a "DD MMM" (ej: "30 MAY")
//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         // Agregamos 'T00:00:00' para asegurar que se parsea como fecha local y no UTC.
//         const date = new Date(dateString + 'T00:00:00');
//         const day = date.getDate();
//         // 'es-ES' para español, puedes cambiarlo si necesitas otro idioma para el mes
//         const month = date.toLocaleString('es-ES', { month: 'short' }).toUpperCase().replace('.', '');
//         return `${day} ${month}`;
//     };

//     const formattedStartDate = formatDate(fechaInicio);
//     const formattedEndDate = formatDate(fechaFin);

//     let displayDate;
//     if (formattedStartDate === formattedEndDate) {
//         displayDate = formattedStartDate;
//     } else {
//         displayDate = `${formattedStartDate} - ${formattedEndDate}`;
//     }

//     // Formatear la hora a HH:MM
//     const formattedTime = horaInicio ? horaInicio.substring(0, 5) : 'Hora no disp.';

//     return (
//         <div className='w-full'>
//             <div className='flex flex-col'>
//                 <div className='relative border h-75'> {/* Considera hacer la altura (h-62) dinámica o adaptable */}
//                     <img
//                         src={process.env.URL_IMG + imagen}
//                         className='object-cover object-center h-full w-full'
//                         alt={nombre || "Imagen del evento"} // Es bueno tener un alt descriptivo
//                     />
//                     <div className='rounded-b-md absolute top-0 left-8 shadow-lg bg-white w-auto py-1 px-2 flex justify-center'> 
//                         <h4 className='font-bold text-[1.1em]'>{displayDate}</h4>
//                     </div>
//                 </div>
//                 <div className='flex-col flex gap-5 mb-6 pt-1'>
//                     <h3 className='font-bold text-left text-lg'>{nombre}</h3>
//                     <div className='flex items-center gap-2'>
//                         <div>
//                             <Clock className='font-bold text-lg' size={17} />
//                         </div>
//                         <span>{formattedTime} hs.</span>
//                     </div>
//                     <div className='flex items-center gap-2'>
//                         <div>
//                             <MapPin className='font-bold text-lg' size={17} />
//                         </div>
//                         <span className='text-[1.1em]'>{direccion} - {nombreLocalidad}</span>
//                     </div>
//                 </div>
//                 <div>
//                     <Button className='shadow-lg' size='sm'>
//                         Conocé más aqui
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }
