import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { MessageCircle, Facebook, Instagram, Twitter, Youtube, Menu, X, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
// Asegúrate que la ruta sea correcta para tu proyecto
import { useGetMenuQuery, useGetSeccionesQuery } from '@/redux/services/headerService';
import { useRouter } from 'next/router';
import { generateSlug, languages } from '@/utils';
import HeaderSearch from './HeaderSearch';
import { ReactLenis } from 'lenis/react';

// --- Opciones de Idioma (AHORA CON ID) ---
// AJUSTA los 'id' según los valores que espera tu API para cada idioma

const redirectSubsecc = [
    { idSubseccion: 5, articulo: "alojamientos" },
    { idSubseccion: 6, articulo: "transporte" },
    { idSubseccion: 41, articulo: "autos" },
    { idSubseccion: 20, articulo: "eventos" },
    { idSubseccion: 42, articulo: "prestadores" },
    { idSubseccion: 85, articulo: "blog" },
    { idSubseccion: 43, articulo: "agencias" },
    { idSubseccion: 44, articulo: "guias" },
    { idSubseccion: 62, articulo: "alojamientos" },
    { idSubseccion: 64, articulo: "prestadores" },
    { idSubseccion: 83, articulo: "autos" },
    { idSubseccion: 66, articulo: "guias" },
    { idSubseccion: 65, articulo: "agencias" },
    { idSubseccion: 63, articulo: "transporte" },
    { idSubseccion: 86, articulo: "blog" },
    { idSubseccion: 184, articulo: "eventos" },
    { idSubseccion: 40, articulo: "gastronomia" },
];

// --- Componente Header ---
export default function Header() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileMenu, setOpenMobileMenu] = useState(null); // Para el acordeón del menú principal móvil
    const [openMobileSection, setOpenMobileSection] = useState(null);
    const [openMobileSections, setOpenMobileSections] = useState([]); // Array para controlar las secciones abiertas
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [selectedLangId, setSelectedLangId] = useState(languages[0].code);
    const [selectedLang, setSelectedLang] = useState(languages[0]);
    const [activeMenu, setActiveMenu] = useState(null); // Para controlar el mega-menú visible en desktop
    const headerRef = useRef(null);
    const [isTopBarVisible, setIsTopBarVisible] = useState(true);
    const lenis = useLenis(); // Obtenemos la instancia de Lenis

    // Efecto para manejar la visibilidad de la barra superior con el scroll de Lenis
    useEffect(() => {
        if (!lenis) return;

        const handleScroll = (e) => {
            if (!window) return;
            const scrollHidden = window.innerWidth >= 1024 ? 100 : 50;
            // Oculta la barra si el scroll es mayor a 30px
            if (scrollY > scrollHidden) {
                setIsTopBarVisible(false);
            }
            // Muestra la barra si el scroll es 20px o menos
            else if (scrollY <= scrollHidden) {
                setIsTopBarVisible(true);
            }
        };
        lenis.on('scroll', handleScroll);
        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [lenis]);

    // --- Obtener datos de la API usando el ID del idioma seleccionado ---
    /* const { data: seccionesApi, error, isLoading, isFetching } = useGetMenuQuery(selectedLangId); */
    const { data: menuData, error, isLoading, isFetching } = useGetMenuQuery(selectedLangId);

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
        if (isLoading || isFetching || error || !menuData || !menuData.result) {
            return [];
        }
        // 1. Agrupar todo por 'nombreMenu'
        const groupedByMenu = menuData.result.reduce((acc, item) => {
            const menuName = item.nombreMenu.trim();
            if (!acc[menuName]) {
                acc[menuName] = [];
            }
            acc[menuName].push(item);
            return acc;
        }, {});



        // 2. Para cada Menú, agrupar por 'nombreSeccion' y luego mapear las subsecciones
        return Object.keys(groupedByMenu).map(menuName => {
            const itemsInMenu = groupedByMenu[menuName];


            const groupedBySection = itemsInMenu.reduce((acc, item) => {
                const sectionName = item.nombreSeccion.trim();
                if (!acc[sectionName]) {
                    acc[sectionName] = {
                        // Podríamos necesitar un orden para las secciones si el API lo proveyera
                        subsecciones: []
                    };
                }
                acc[sectionName].subsecciones.push(item);
                return acc;
            }, {});


            const sections = Object.keys(groupedBySection).map(sectionName => {
                const sectionItems = groupedBySection[sectionName].subsecciones;


                const subsecciones = sectionItems
                    .map(sub => {
                        let href = '#'; // Default href
                        const redirectSubseccion = redirectSubsecc.find(redirec => redirec.idSubseccion === parseInt(sub.idSubseccion));


                        if (sub.primerArticuloSubseccion && parseInt(sub.cantidadArticulos) === 1 && !redirectSubseccion) {
                            href = `/articulos/articulo/${sub.primerArticuloSubseccion}/${generateSlug(sub.nombrePrimerArticulo)}`;
                        } else if (sub.idSubseccion) {
                            href = redirectSubseccion
                                ? `/${redirectSubseccion.articulo}`
                                : `/subsecciones/lista/${sub.idSubseccion}/${generateSlug(sub.nombreSubseccion)}`;
                        }


                        // Agregamos el prefijo de la URL y el idioma
                        if (href !== '#') {
                            href = `${process.env.URL_LOCAL || ''}${href}`;
                            // Asumiendo que `languages` tiene `id` y `code`
                            const langParam = languages.find(l => l.id === parseInt(sub.idiomaSubseccion));
                            if (langParam && langParam.code !== 'ES') { // O tu idioma por defecto
                                href += `?lang=${langParam.code}`;
                            }
                        }


                        return {
                            label: sub.nombreSubseccion,
                            href: href,
                        };
                    })
                    .filter(sub => sub.href !== '#'); // Filtrar las que no tienen link válido


                return {
                    label: sectionName,
                    children: subsecciones,
                };
            }).filter(section => section.children.length > 0); // Solo incluir secciones que tengan subsecciones visibles


            return {
                label: menuName,
                sections: sections
            };
        }).filter(menu => menu.sections.length > 0); // Solo incluir menús que tengan secciones visibles


    }, [menuData, isLoading, isFetching, error]); // Dependencies: recalculate when data, loading state, or error changes


    // --- Effect to close mobile menu on resize (no changes needed) ---
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
                setOpenMobileMenu(null);
                setOpenMobileSection(null);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Function to change language ---
    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        setSelectedLangId(lang.code);
        setIsLangDropdownOpen(false);
        setIsMobileMenuOpen(false);
        setOpenMobileMenu(null);
        setOpenMobileSection(null);
        setActiveMenu(null); // Cierra el mega-menú al cambiar idioma
        router.push(
            { pathname: router.pathname, query: { ...router.query, lang: lang.code } },
            undefined,
            { shallow: true }
        );
    };

    const handleMouseEnter = (menuLabel) => {
        setActiveMenu(menuLabel);
    };


    const handleMouseLeave = () => {
        setActiveMenu(null);
    };


    const toggleMobileMenu = (menuLabel) => {
        const isOpening = openMobileMenu !== menuLabel;
        setOpenMobileMenu(isOpening ? menuLabel : null);

        if (isOpening) {
            // Encuentra el menú actual y pre-abre todas sus secciones con más de 1 hijo
            const currentMenu = dynamicMenuItems.find(m => m.label === menuLabel);
            if (currentMenu) {
                const sectionsToOpen = currentMenu.sections
                    .filter(section => section.children.length > 1)
                    .map(section => section.label);
                setOpenMobileSections(sectionsToOpen);
            }
        } else {
            // Si se cierra el menú principal, se cierran todas las secciones
            setOpenMobileSections([]);
        }
    };

    const toggleMobileSection = (sectionLabel) => {
        setOpenMobileSections(prevOpenSections => {
            // Si la sección ya está en el array, la quitamos (plegar)
            if (prevOpenSections.includes(sectionLabel)) {
                return prevOpenSections.filter(label => label !== sectionLabel);
            }
            // Si no está, la añadimos (desplegar)
            else {
                return [...prevOpenSections, sectionLabel];
            }
        });
    };
    // --- Render ---
    return (
        <header ref={headerRef} className="w-full sticky top-0 z-50" onMouseLeave={handleMouseLeave}>
            {/* Top gray bar (content assumed unchanged, add dynamic date/weather if needed) */}
            <div className={`w-full bg-[#D6D3D1] flex justify-center transition-[max-height,padding] duration-800 ease-linear overflow-hidden ${isTopBarVisible ? 'max-h-40 py-0' : 'max-h-0 py-0'}`}>
                <div className="px-4 pt-1 flex justify-between w-11/12 flex-wrap">
                    {/* Date/Weather */}
                    <div className="bg-white px-3 py-1 rounded-t-md text-[1.1em] mb-0">
                        {new Date().toLocaleDateString(selectedLang.code === 'ES' ? 'es-AR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })} {/* ° */}
                        {/* <span className="ml-1 text-yellow-500">☀️</span> */} {/* Placeholder */}
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
                <div className={`flex justify-between items-center px-2 w-11/12 duration-700 gap-7 ease ${isTopBarVisible ? 'py-4' : 'py-3'}`}>
                    {/* Logo */}
                    <div className={`flex items-center duration-700 ease w-3/6 xl:w-3/19 ${isTopBarVisible ? 'md:w-3/18' : 'md:w-3/20'}`}>
                        <a href={`${process.env.URL_LOCAL_SERVER || ''}${process.env.URL_LOCAL || ''}${lang === 'EN' ? '?lang=EN' : ''}`} className="flex items-center w-full">
                            {/* Ensure process.env.URL_IMG_LOCAL is set or replace */}
                            <img src={(process.env.URL_IMG_LOCAL || '') + "/images/logo.png"} className='w-full h-auto' alt="Logo Tucumán Turismo" />
                        </a>
                    </div>
                    {/* --- INICIO: NUEVO MEGA-MENÚ DESKTOP --- */}
                    <div className="hidden lg:flex flex-1 items-center justify-end">
                        {isSearchOpen ? (
                            <div className="w-full max-w-lg animate-fade-in">
                                <HeaderSearch setView={setIsSearchOpen} />
                            </div>
                        ) : (
                            <nav className="hidden lg:flex text-gray-700 font-medium items-center gap-6 lg:flex-1 justify-around">
                                {isLoading || isFetching ? (
                                    <div className="animate-pulse w-full flex justify-around">
                                        {[...Array(4)].map((_, i) => <div key={i} className="w-24 h-4 bg-gray-200 rounded"></div>)}
                                    </div>
                                ) : error ? (
                                    <p className='text-red-600'>Error al cargar menú</p>
                                ) : dynamicMenuItems.length > 0 ? (
                                    dynamicMenuItems.map((menu) => (
                                        <div key={menu.label} className="relative" onMouseEnter={() => handleMouseEnter(menu.label)}>
                                            <button className={`py-2 flex items-center font-semibold text-lg hover:text-primary transition-colors duration-200 ${activeMenu === menu.label ? 'text-primary' : ''}`}>
                                                {menu.label.toUpperCase()}
                                                <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${activeMenu === menu.label ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No hay secciones disponibles.</p>
                                )}
                            </nav>
                        )}
                    </div>
                    {/* --- FIN: NUEVO MEGA-MENÚ DESKTOP --- */}

                    {/* Language Selector & Hamburger Button */}
                    <div className="flex items-center space-x-4">
                        {/* Botón de búsqueda para Desktop */}
                        <div className="hidden lg:flex items-center">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-gray-700 hover:text-secondary/70 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
                            >
                                {isSearchOpen ? <X size={22} /> : <Search size={22} />}
                            </button>
                        </div>
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

            {/* --- INICIO: PANEL DEL MEGA-MENÚ --- */}
            <ReactLenis
                options={{ lerp: 0.08, duration: 2 }}
                onMouseEnter={() => handleMouseEnter(activeMenu)}
                className={`absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-auto ${activeMenu && !isSearchOpen ? 'max-h-[70vh] opacity-100 border-t' : 'max-h-0 opacity-0'}`}
            >
                <div className="w-11/12 mx-auto px-4 py-8">
                    {dynamicMenuItems.map((menu) => (
                        menu.label === activeMenu && (
                            <div key={menu.label} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-4">
                                {menu.sections.map((section) => {
                                    return section.children.length > 1 ? (
                                        <div key={section.label} className="flex flex-col space-y-2">
                                            <h3 className="font-bold text-gray-800 border-b-2 border-primary pb-1 mb-2 text-2xl">
                                                {section.label}
                                            </h3>
                                            <div className="flex flex-col space-y-2">
                                                {section.children.map((child) => (
                                                    <a key={child.label} href={child.href} className="text-gray-700 hover:text-secondary hover:underline underline-offset-2 decoration-2 text-xl font-semibold flex items-center">
                                                        <ChevronRight size={18} strokeWidth={2} className={`me-0.5 transition-transform duration-200`} />
                                                        {child.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={section.label} className="flex flex-col space-y-2">
                                            <a href={section.children[0].href} className="font-bold flex items-center text-gray-900 border-b-2 border-primary hover:border-primary pb-1 mb-2 text-2xl hover:text-primary hover:underline underline-offset-2 decoration-2 underline">
                                                <ChevronRight size={18} strokeWidth={2} className={`me-0.5 transition-transform duration-200`} />
                                                {section.label}
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    ))}
                </div>
            </ReactLenis>
            {/* --- FIN: PANEL DEL MEGA-MENÚ --- */}

            {/* --- INICIO: NUEVO MENÚ MÓVIL CON DOBLE ACORDEÓN --- */}
            <div className={`lg:hidden w-full bg-white shadow-md absolute top-full left-0 z-20 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[calc(100vh-120px)] border-t border-gray-200' : 'max-h-0'}`} style={{ overflowY: isMobileMenuOpen ? 'auto' : 'hidden' }}>
                <div className="p-4 border-b border-gray-200">
                    <HeaderSearch setView={setIsMobileMenuOpen} />
                </div>
                <nav className="flex flex-col px-2 py-2">
                    {isLoading || isFetching ? (
                        <div className="p-4 space-y-4 animate-pulse">
                            {[...Array(5)].map((_, i) => <div key={i} className="h-5 bg-gray-200 rounded w-3/4"></div>)}
                        </div>
                    ) : error ? (
                        <p className='py-3 text-center text-red-600'>Error al cargar menú</p>
                    ) : dynamicMenuItems.length > 0 ? (
                        dynamicMenuItems.map((menu) => (
                            <div key={menu.label} className="border-b border-gray-100">
                                {/* Nivel 1: Menú Principal */}
                                <div className="flex justify-between items-center py-4 px-2 cursor-pointer" onClick={() => toggleMobileMenu(menu.label)}>
                                    <span className="text-gray-800 font-bold text-xl">{menu.label.toUpperCase()}</span>
                                    <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${openMobileMenu === menu.label ? 'rotate-180' : ''}`} />
                                </div>
                                {/* Contenido del Menú (Secciones) */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMobileMenu === menu.label ? '' : 'max-h-0'}`}>
                                    <div className="border-t border-gray-100 bg-gray-100">
                                        {menu.sections.map((section) => {
                                            return section.children.length > 1 ? (

                                                <div key={section.label} className="border-b border-gray-200 px-4">
                                                    {/* Nivel 2: Sección */}

                                                    <div className="flex justify-between items-center py-3 cursor-pointer" onClick={() => toggleMobileSection(section.label)}>
                                                        <span className="text-gray-700 font-bold text-xl">{section.label}</span>
                                                        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${openMobileSections.includes(section.label) ? 'rotate-180' : ''}`} />
                                                    </div>

                                                    {/* Contenido de la Sección (Subsecciones) */}

                                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMobileSections.includes(section.label) ? '' : 'max-h-0'}`}>

                                                        <div className="pl-0 pb-2 pt-1 border-t-2 border-primary">
                                                            {section.children.map((child) => (
                                                                <a key={child.label} href={child.href} className="py-2 text-xl font-semibold text-gray-600 hover:text-secondary/70 flex items-center underline" onClick={() => setIsMobileMenuOpen(false)}>
                                                                    <ChevronRight size={16} className={`text-gray-500 transition-transform duration-200`} />
                                                                    {child.label}
                                                                </a>
                                                            ))}
                                                        </div>

                                                    </div>
                                                </div>
                                            ) : (
                                                <div key={section.label} className="border-b px-4 border-gray-200 last:border-b-0">
                                                    {/* Nivel 2: Sección */}
                                                    <a href={section.children[0].href} className="flex items-center py-3 cursor-pointer underline decoration-primary underline-offset-2">
                                                        <ChevronRight size={16} className={`text-gray-500 transition-transform duration-200 ${openMobileSection === section.label ? 'rotate-180' : ''}`} />
                                                        <span className="text-gray-700 font-bold text-lg">{section.label}</span>
                                                    </a>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='py-3 text-center text-gray-500'>No hay secciones disponibles.</p>
                    )}
                </nav>
            </div>
            {/* --- FIN: NUEVO MENÚ MÓVIL --- */}
        </header>
    );
}