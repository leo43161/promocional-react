import React, { useState, useEffect, useMemo } from 'react';
import { MessageCircle, Facebook, Instagram, Twitter, Youtube, Menu, X, ChevronDown } from 'lucide-react';
// Asegúrate que la ruta sea correcta para tu proyecto
import { useGetSeccionesQuery } from '@/redux/services/headerService';
import { useRouter } from 'next/router';
import { generateSlug, languages } from '@/utils';

// --- Opciones de Idioma (AHORA CON ID) ---
// AJUSTA los 'id' según los valores que espera tu API para cada idioma

const redirectSubsecc = [
    /* { idSubseccion: 5, articulo: "alojamientos" }, */
    { idSubseccion: 6, articulo: "transporte" },
    { idSubseccion: 41, articulo: "autos" },
    { idSubseccion: 20, articulo: "eventos" },
    { idSubseccion: 42, articulo: "prestadores" },
    { idSubseccion: 43, articulo: "agencias" },
    { idSubseccion: 44, articulo: "guias" },
    /* { idSubseccion: 62, articulo: "alojamientos" }, */
    { idSubseccion: 64, articulo: "prestadores" },
    { idSubseccion: 83, articulo: "autos" },
    { idSubseccion: 66, articulo: "guias" },
    { idSubseccion: 65, articulo: "agencias" },
    { idSubseccion: 63, articulo: "transporte" },
    { idSubseccion: 201, articulo: "eventos" },
    { idSubseccion: 40, articulo: "gastronomia" },
];

// --- Componente Header ---
export default function Header() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openAccordionItem, setOpenAccordionItem] = useState(null);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    // Estado para el ID del idioma seleccionado, inicia con el ID del primer idioma (Español)
    const [selectedLangId, setSelectedLangId] = useState(languages[0].code);
    // Estado para el objeto completo del idioma seleccionado (para mostrar bandera/código)
    const [selectedLang, setSelectedLang] = useState(languages[0]);

    // --- Obtener datos de la API usando el ID del idioma seleccionado ---
    const { data: seccionesApi, error, isLoading, isFetching } = useGetSeccionesQuery(selectedLangId);

    const { lang } = router.query;
    const isEnglish = lang === 'EN';

    // Sincronizo con ?lang=… en la URL
    useEffect(() => {
        if (!router.isReady) return;
        const { lang } = router.query;
        if (lang) {
            const found = languages.find(l => l.code === lang);
            if (found) {
                setSelectedLangId(found.code);
                setSelectedLang(found);
            }
        }
    }, [router.isReady, router.query.lang]);

    // --- Transformar datos de la API al formato del menú (Memoizado) ---
    // se recalculará automáticamente cuando seccionesApi cambie (debido al cambio de selectedLangId)
    const dynamicMenuItems = useMemo(() => {
        // Si está cargando, obteniendo datos nuevos, o hubo un error, retorna array vacío
        if (isLoading || isFetching || error || !seccionesApi) {
            // Podrías diferenciar entre loading y error si quieres mostrar mensajes distintos
            return [];
        }
        // Filtrar secciones activas y visibles, luego ordenar
        const visibleSections = seccionesApi
            .result
            .filter(s => s.seccionVisible === "1" && s.seccionActiva === "1")
            .sort((a, b) => parseInt(a.orden || '999') - parseInt(b.orden || '999'));

        const groupedSubcategories = visibleSections.reduce((acc, item) => {
            const key = item.nombreSeccion.trim();
            const exist = acc.length > 0 && acc.find(s => s.nombre.trim() === key);
            if (!exist) {
                acc.push({
                    nombre: key,
                    subsecciones: []
                });
            }
            const subseccion = {
                idSubseccion: item.idSubseccion,
                nombre: item.nombreSubseccion,
                visible: item.subsecVisible,
                activa: item.subsecActiva,
                orden: item.orden,
                primerArt: item.primerArticuloSubseccion,
                primerArtNombre: item.primerArticuloNombre,
                articulos: item.cantidadArticulos,
                idioma: parseInt(item.idiomaSubseccion),
            };
            // si el key coincide con algunos de los existentes, agrega el item a subsecciones
            acc.find(s => s.nombre.trim() === key).subsecciones.push(subseccion);
            return acc;
        }, []);
        return groupedSubcategories.map(seccion => {
            // Filtrar subsecciones activas y visibles, luego ordenar
            const visibleSubsections = (seccion.subsecciones || [])
                .filter(sub => sub.visible === "1" && sub.activa === "1")
                .sort((a, b) => parseInt(a.orden || '999') - parseInt(b.orden || '999'));
            // Mapear subsecciones al formato { label, href }
            const children = visibleSubsections
                .map(sub => {
                    let href = '#'; // Default href
                    // **AJUSTA ESTA LÓGICA DE RUTAS SEGÚN TU APLICACIÓN**
                    // Generar el enlace basado en la sección, subsección y si existe en redirectSubsecc
                    const redirectSubseccion = redirectSubsecc.find(redirec => redirec.idSubseccion === parseInt(sub.idSubseccion)); 
                    if (sub.primerArt && parseInt(sub.articulos) === 1 && !redirectSubseccion) {
                        href = `${process.env.URL_LOCAL}/articulos/articulo/${sub.primerArt}/${generateSlug(sub.primerArtNombre)}`; // Link to first article
                    } else if (sub.idSubseccion) {
                        href = redirectSubseccion ? `${process.env.URL_LOCAL}/${redirectSubseccion.articulo}` : `${process.env.URL_LOCAL}/subsecciones/lista/${sub.idSubseccion}/${generateSlug(sub.nombre)}`;
                    }
                    if (parseInt(sub.idioma) !== 1) {
                        href += `?lang=${languages.find(l => l.id === sub.idioma).code}`
                    }

                    // Only return if a valid href was generated
                    if (href !== '#') {
                        return {
                            label: sub.nombre,
                            href: href,
                        };
                    }
                    return null; // Ignore subsections without a valid link
                })
                .filter(Boolean); // Remove nulls

            // Create the main menu item
            const menuItem = {
                label: seccion.nombre,
                children: children.length > 0 ? children : undefined,
                // Add direct href for sections without children if applicable (e.g., Blog)
                // You might need a specific field from the API or check the name
                // href: (children.length === 0 && seccion.isDirectLink) ? seccion.directLink : undefined
            };

            // Example: Specific handling for a "BLOG" section without children
            if (!menuItem.children && seccion.nombre.toUpperCase() === 'BLOG') {
                menuItem.href = '/blog'; // Adjust condition and href as needed
            }


            return menuItem;
        });

    }, [seccionesApi, isLoading, isFetching, error]); // Dependencies: recalculate when data, loading state, or error changes


    // --- Effect to close mobile menu on resize (no changes needed) ---
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
                setOpenAccordionItem(null);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Function to change language ---
    const handleLanguageChange = (lang) => {
        setSelectedLang(lang); // Update the displayed language info (flag, code)
        setSelectedLangId(lang.code); // Update the language ID state -> THIS TRIGGERS useGetSeccionesQuery
        setIsLangDropdownOpen(false); // Close dropdown
        setIsMobileMenuOpen(false); // Close mobile menu if open
        setOpenAccordionItem(null); // Reset mobile accordion
        // No need to manually call refetch, RTK Query handles it when selectedLangId changes
        router.push(
            { pathname: router.pathname, query: { ...router.query, lang: lang.code } },
            undefined,
            { shallow: true }
        );
    };

    // --- Function to toggle mobile accordion (no changes needed) ---
    const toggleAccordion = (label) => {
        setOpenAccordionItem(openAccordionItem === label ? null : label);
    };
    // --- Render ---
    return (
        <div className="w-full sticky top-0 z-50">
            {/* Top gray bar (content assumed unchanged, add dynamic date/weather if needed) */}
            <div className='w-full bg-[#D6D3D1] flex justify-center'>
                <div className="px-4 pt-1 flex justify-between w-11/12 flex-wrap">
                    {/* Date/Weather */}
                    <div className="bg-white px-3 py-1 rounded-t-md text-[1.1em] mb-0">
                        {new Date().toLocaleDateString(selectedLang.code === 'ES' ? 'es-AR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}°
                        <span className="ml-1 text-yellow-500">☀️</span> {/* Placeholder */}
                    </div>
                    {/* Contact/Social Links */}
                    <div className="lg:flex items-center space-x-2 text-[1.1em] pb-1 text-black flex-wrap justify-center hidden">
                        {/* Static text - consider internationalization (i18n) library for this */}
                        <span className='hidden sm:inline'>
                          {isEnglish ? 'Contact us and discover Tucumán: ' : 'Comunicate y conocé Tucumán: '}
                        </span>
                        <a href="tel:+54-0381-4303644" className="hover:underline whitespace-nowrap">+54-0381-4303644</a>
                        <span className='hidden sm:inline'>|</span>
                        <a href="tel:4222199" className="hover:underline whitespace-nowrap">4222199</a>
                        {/* <a href="/contacto" className="ml-2 font-bold text-gray-700 whitespace-nowrap">CONTACTO</a> */}
                        <span className='hidden sm:inline'>|</span>
                        {/* Social Icons */}
                        <div className="flex space-x-2 items-center">
                            <a href="https://wa.me/5493812133639" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <MessageCircle size={16} className="text-gray-700 hover:text-green-600" />
                            </a>
                            <a href="https://www.facebook.com/tucumanturismo" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={16} className="text-gray-700 hover:text-blue-600" />
                            </a>
                            <a href="https://www.instagram.com/tucumanturismo" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={16} className="text-gray-700 hover:text-pink-500" />
                            </a>
                            <a href="https://twitter.com/TucumanTurismo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Twitter size={16} className="text-gray-700 hover:text-sky-500" />
                            </a>
                            <a href="https://www.youtube.com/c/TucumánTurismoOficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube"> {/* Corrected Youtube URL Example */}
                                <Youtube size={16} className="text-gray-700 hover:text-red-600" />
                            </a>
                        </div>
                        {/* Institutional Link */}
                        <a href="https://www.institucionalturismotuc.gob.ar/"
                            className="bg-[#006E66] text-white px-2 py-0.5 rounded-sm text-[1.1em] sm:text-[1.1em] ml-2 hover:bg-[#006e67ec] whitespace-nowrap"
                            target="_blank" rel="noopener noreferrer">
                            Institucional
                        </a>
                    </div>
                </div>
            </div>

            {/* Main white bar */}
            <div className='flex justify-center bg-white shadow-md'>
                <div className="flex justify-between items-center px-2 py-4 w-11/12 gap-7">
                    {/* Logo */}
                    <div className="flex items-center w-3/6 md:w-3/18 xl:w-3/19">
                        <a href={`${process.env.URL_LOCAL_SERVER || ''}${process.env.URL_LOCAL || ''}${lang === 'EN' ? '?lang=EN' : ''}`} className="flex items-center w-full">
                            {/* Ensure process.env.URL_IMG_LOCAL is set or replace */}
                            <img src={(process.env.URL_IMG_LOCAL || '') + "/images/logo.png"} className='w-full h-auto' alt="Logo Tucumán Turismo" />
                        </a>
                    </div>

                    {/* Desktop Navigation (Uses dynamicMenuItems) */}
                    <nav className="hidden lg:flex text-gray-700 font-medium items-center gap-4 lg:flex-1 justify-around">
                        {isLoading || isFetching ? (
                            <div className="animate-pulse w-full">
                                <div className='flex gap-3 justify-between'>
                                    <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                                    <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                                    <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                                    <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                                    <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                                    <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                                    <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                                </div>
                            </div> // Loading indicator
                        ) : error ? (
                            <p className='text-red-600'>Error al cargar menú</p> // Error message
                        ) : dynamicMenuItems.length > 0 ? (
                            dynamicMenuItems.map((item) => (
                                <div key={item.label} className="relative group">
                                    {/* Direct link if item has href and no children */}
                                    {item.href && !item.children ? (
                                        <a href={item.href} className="hover:text-primary py-2 flex items-center font-semibold text-[1.1em] xl:text-[1.1em] cursor-pointer">
                                            {item.label}
                                        </a>
                                    ) : (
                                        <div className={`py-2 flex items-center font-semibold text-[1.1em] xl:text-[1.1em] ${item.children ? 'cursor-default hover:text-primary text-nowrap' : 'cursor-default'}`}>
                                            {item.label}
                                        </div>
                                    )}

                                    {/* Dropdown if children exist */}
                                    {item.children && (
                                        <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1
                                            opacity-0 max-h-0 group-hover:max-h-96 group-hover:opacity-100 overflow-hidden
                                            transition-all duration-300 ease-in-out z-20">
                                            {item.children.map((child) => (
                                                <a key={child.label} href={child.href} className="block px-4 py-2 text-[1.1em] xl:text-[1.1em] text-gray-700 hover:bg-gray-100 hover:text-secondary/70">
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay secciones disponibles.</p> // No items message
                        )}
                    </nav>

                    {/* Language Selector & Hamburger Button */}
                    <div className="flex items-center space-x-4">
                        {/* Language Dropdown */}
                        <div className="relative z-30"> {/* High z-index for dropdown */}
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center text-gray-700 text-[1.1em] xl:text-[1.1em] font-semibold hover:text-secondary/70 py-2"
                                aria-label="Seleccionar idioma"
                                aria-haspopup="true"
                                aria-expanded={isLangDropdownOpen}
                            >
                                <img src={selectedLang.flag} alt={selectedLang.alt} className="w-5 xl:w-7 h-auto mr-2 rounded-sm" />
                                <span>{selectedLang.code}</span>
                                <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isLangDropdownOpen && (
                                <div className="absolute top-full right-0 mt-1 w-auto min-w-[9rem] bg-white shadow-lg rounded-md py-1"> {/* Auto width */}
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.id} // Use ID as key
                                            onClick={() => handleLanguageChange(lang)}
                                            className="w-full flex items-center px-4 py-2 text-[1.1em] text-gray-700 hover:bg-gray-100 hover:text-secondary/70 text-left" // Align text left
                                            role="menuitem"
                                            disabled={isLoading || isFetching} // Disable while loading new language data
                                        >
                                            <img src={lang.flag} alt={lang.alt} className="w-5 h-auto mr-2 rounded-sm" />
                                            <span>{lang.code}</span>
                                            <span className="text-[1.1em] text-gray-500 ml-2">({lang.label})</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* End Language Selector */}

                        {/* Hamburger Button */}
                        <button
                            className="lg:hidden text-gray-700 hover:text-secondary/70"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            aria-expanded={isMobileMenuOpen}
                            disabled={isLoading || isFetching} // Disable while loading
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Uses dynamicMenuItems) */}
            <div
                className={`lg:hidden w-full bg-white shadow-md absolute top-full left-0 z-20 overflow-y-auto transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[calc(100vh-150px)] border-t border-gray-200' : 'max-h-0' // Adjust max-h based on header height
                    }`} style={{ overflowY: isMobileMenuOpen ? 'auto' : 'hidden' }}
            >
                <nav className="flex flex-col px-4 py-2">
                    {isLoading || isFetching ? (
                        <div className="animate-pulse w-full">
                            <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                            <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                            <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                            <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                            <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                            <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                            <div className="w-1/8 h-3 bg-gray-300 rounded"></div>
                        </div>
                    ) : error ? (
                        <p className='py-3 text-center text-red-600'>Error al cargar menú</p>
                    ) : dynamicMenuItems.length > 0 ? (
                        dynamicMenuItems.map((item) => (
                            <div key={item.label} className="border-b border-gray-100 last:border-b-0">
                                <div
                                    className="flex justify-between items-center py-3 cursor-pointer"
                                    onClick={item.children ? () => toggleAccordion(item.label) : undefined}
                                >
                                    {/* Direct link if no children and has href */}
                                    {!item.children && item.href ? (
                                        <a href={item.href} className="text-gray-700 font-medium hover:text-secondary/70 flex-grow" onClick={() => setIsMobileMenuOpen(false)}>
                                            {item.label}
                                        </a>
                                        /* Span if it has children or no direct href */
                                    ) : (
                                        <span className="text-gray-700 font-medium flex-grow text-2xl">
                                            {item.label}
                                        </span>
                                    )}
                                    {/* Arrow only if children exist */}
                                    {item.children && (
                                        <ChevronDown
                                            size={16}
                                            className={`ml-2 text-gray-500 transition-transform duration-200 ${openAccordionItem === item.label ? 'rotate-180' : ''
                                                }`}
                                        />
                                    )}
                                </div>
                                {/* Accordion content if children exist */}
                                {item.children && (
                                    <div
                                        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openAccordionItem === item.label ? 'max-h-96' : 'max-h-0' // Adjust max-h if needed
                                            }`}
                                    >
                                        <div className="pl-4 pb-2 pt-1 border-t border-gray-100">
                                            {item.children.map((child) => (
                                                <a
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block py-2 text-[1.1em] text-gray-600 hover:text-secondary/70"
                                                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className='py-3 text-center text-gray-500'>No hay secciones disponibles.</p> // No items message
                    )}
                </nav>
            </div>
        </div>
    );
}
