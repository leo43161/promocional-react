import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRight } from 'lucide-react';

// Objeto de contenido para manejar las traducciones
const content = {
    es: {
        home: "Inicio"
    },
    en: {
        home: "Home"
    }
};

const Breadcrumb = ({ items = [], homeLink = "/" }) => {
    const router = useRouter();
    const { lang } = router.query;
    const isEnglish = lang === 'EN';
    
    // Selecciona el texto correcto según el idioma
    const currentContent = isEnglish ? content.en : content.es;

    // Función para añadir el parámetro de idioma a cualquier URL
    const localizeHref = (href) => {
        if (!isEnglish || !href) {
            return href;
        }
        // Evita añadir el parámetro si ya existe
        if (href.includes('lang=EN')) {
            return href;
        }
        // Añade el parámetro correctamente
        return href.includes('?') ? `${href}&lang=EN` : `${href}?lang=EN`;
    };

    return (
        <nav aria-label="Breadcrumb" className="text-[1.1em]">
            <ol className="flex flex-wrap items-center space-x-1">
                {/* Ítem de Inicio */}
                <li className="flex items-center">
                    <a 
                        href={localizeHref(homeLink)} // Aplica la localización al enlace de inicio
                        className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <span>{currentContent.home}</span>
                    </a>
                </li>

                {/* Separador después de inicio */}
                {items.length > 0 && (
                    <li className="flex items-center">
                        <ChevronRight size={14} className="text-gray-400" />
                    </li>
                )}

                {/* Resto de los ítems */}
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <li className="flex items-center">
                            <a
                                href={localizeHref(item.href)} // Aplica la localización a cada ítem
                                className={`${
                                    index === items.length - 1
                                        ? "font-medium text-gray-900" // El último ítem no es un enlace activo
                                        : "text-gray-500 hover:text-gray-700"
                                } transition-colors`}
                                aria-current={index === items.length - 1 ? "page" : undefined}
                            >
                                {item.label}
                            </a>
                        </li>
                        
                        {/* Añade separador si no es el último ítem */}
                        {index < items.length - 1 && (
                            <li className="flex items-center">
                                <ChevronRight size={14} className="text-gray-400" />
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;

// import React from 'react';
// import { ChevronRight, Home } from 'lucide-react';

// const Breadcrumb = ({ items = [], homeLink = "/" }) => {
//   return (
//     <nav aria-label="Breadcrumb" className="text-[1.1em]">
//       <ol className="flex flex-wrap items-center space-x-1">
//         {/* Home item */}
//         <li className="flex items-center">
//           <a 
//             href={homeLink}
//             className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <span>Inicio</span>
//           </a>
//         </li>

//         {/* Separator after home */}
//         {items.length > 0 && (
//           <li className="flex items-center">
//             <ChevronRight size={14} className="text-gray-400" />
//           </li>
//         )}

//         {/* Rest of the items */}
//         {items.map((item, index) => (
//           <React.Fragment key={index}>
//             <li className="flex items-center">
//               <a
//                 href={item.href}
//                 className={`${
//                   index === items.length - 1
//                     ? "font-medium text-gray-900"
//                     : "text-gray-500 hover:text-gray-700"
//                 } transition-colors`}
//                 aria-current={index === items.length - 1 ? "page" : undefined}
//               >
//                 {item.label}
//               </a>
//             </li>
            
//             {/* Add separator if not the last item */}
//             {index < items.length - 1 && (
//               <li className="flex items-center">
//                 <ChevronRight size={14} className="text-gray-400" />
//               </li>
//             )}
//           </React.Fragment>
//         ))}
//       </ol>
//     </nav>
//   );
// };

// export default Breadcrumb;