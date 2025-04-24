import React, { useState, useEffect } from 'react';
import { MessageCircle, Facebook, Instagram, Twitter, Youtube, Menu, X, ChevronDown } from 'lucide-react';

// --- Estructura del Menú ---
// Define aquí los elementos de tu menú principal y sus submenús.
// Edita los 'label' y 'href' según tus necesidades.
const menuItems = [
    {
        label: "TUCUMÁN",
        href: "/tucuman",
        children: [
            { label: 'Descubrí Tucumán', href: '/tucuman/descubri' },
            { label: 'Info Útil', href: '/tucuman/info-util' }
        ]
    },
    {
        label: "PLANIFICA",
        href: "/planifica",
        children: [
            { label: 'Prestadores', href: '/prestadores' },
            { label: 'Cómo llegar', href: '/planifica/como-llegar' },
            { label: 'Dónde dormir', href: '/planifica/alojamiento' },
            { label: 'Agencias de Viaje', href: '/planifica/agencias' }
        ]
    },
    {
        label: "IMPERDIBLES",
        href: "/imperdibles",
        children: [
            { label: 'Ciudad Histórica', href: '/imperdibles/ciudad-historica' },
            { label: 'Valles Calchaquíes', href: '/imperdibles/valles' },
            { label: 'Yungas', href: '/imperdibles/yungas' }
        ]
    },
    {
        label: "NATURALEZA",
        href: "/naturaleza",
        children: [
            { label: 'Circuitos', href: '/naturaleza/circuitos' },
            { label: 'Actividades', href: '/naturaleza/actividades' }
        ]
    },
    {
        label: "HISTORIA Y CULTURA",
        href: "/historia-y-cultura",
        children: [
            { label: 'Museos', href: '/historia-y-cultura/museos' },
            { label: 'Ruta del Artesano', href: '/historia-y-cultura/artesanos' }
        ]
    },
    {
        label: "ENTRETENIMIENTO",
        href: "/entretenimiento",
        children: [
            { label: 'Agenda', href: '/entretenimiento/agenda' },
            { label: 'Vida Nocturna', href: '/entretenimiento/noche' }
        ]
    },
    {
        label: "GASTRONOMÍA",
        href: "/gastronomia",
        children: [
            { label: 'Ruta de la Empanada', href: '/gastronomia/empanada' },
            { label: 'Sabores Regionales', href: '/gastronomia/sabores' }
        ]
    },
    { label: "BLOG", href: "/blog" } // Este no tiene submenú
];

// --- Opciones de Idioma ---
const languages = [
    { code: 'ES', label: 'Español', flag: 'svg/arg.svg', alt: 'Bandera Argentina' },
    // Cambia 'flag' y 'alt' para el inglés cuando tengas el SVG correcto
    { code: 'EN', label: 'English', flag: 'svg/eng.svg', alt: 'Bandera Reino Unido' } // Placeholder flag
];


// --- Componente Header ---
export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openAccordionItem, setOpenAccordionItem] = useState(null);
    // Estado para el dropdown de idioma
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(languages[0]); // Inicia con Español

    // Efecto para cerrar el menú móvil si se agranda la pantalla
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // 1024px es el breakpoint 'lg' por defecto de Tailwind
                setIsMobileMenuOpen(false);
                setOpenAccordionItem(null);
                // No cerramos el dropdown de idioma aquí, puede ser útil mantenerlo
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Función para cambiar idioma
    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        setIsLangDropdownOpen(false); // Cierra el dropdown al seleccionar
        // Aquí podrías añadir lógica adicional para cambiar el idioma de la aplicación
        // (e.g., usando i18next, react-intl, o tu propia solución)
        console.log("Idioma seleccionado:", lang.code);
    };

    const toggleAccordion = (label) => {
        setOpenAccordionItem(openAccordionItem === label ? null : label);
    };

    return (
        <div className="w-full sticky top-0 z-50">
            {/* Barra superior gris */}
            <div className='w-full bg-[#D6D3D1] flex justify-center'>
                <div className="px-4 pt-1 flex justify-between w-11/12 flex-wrap">
                    <div className="bg-white px-3 py-1 rounded-t-md text-sm mb-0">
                        15 de Abril 2025°
                        <span className="ml-1 text-yellow-500">☀️</span>
                    </div>
                    <div className="lg:flex items-center space-x-2 text-sm pb-1 text-black flex-wrap justify-center hidden">
                        <span className='hidden sm:inline'>Comunicate y conocé Tucumán: </span>
                        <a href="tel:+54-0381-4303644" className="hover:underline whitespace-nowrap">+54-0381-4303644</a>
                        <span className='hidden sm:inline'>|</span>
                        <a href="tel:4222199" className="hover:underline whitespace-nowrap">4222199</a>
                        <a href="/contacto" className="ml-2 font-bold text-gray-700 whitespace-nowrap">CONTACTO</a>
                        <span className='hidden sm:inline'>|</span>
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
                            <a href="https://www.youtube.com/TucumanTurismoOficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <Youtube size={16} className="text-gray-700 hover:text-red-600" />
                            </a>
                        </div>
                        <a href="https://www.institucionalturismotuc.gob.ar/"
                            className="bg-[#006E66] text-white px-2 py-0.5 rounded-sm text-xs sm:text-sm ml-2 hover:bg-[#006e67ec] whitespace-nowrap"
                            target="_blank" rel="noopener noreferrer">
                            Institucional
                        </a>
                    </div>
                </div>
            </div>

            {/* Barra principal blanca */}
            <div className='flex justify-center bg-white shadow-md'>
                <div className="flex justify-between items-center px-2 py-4 w-11/12 gap-7">
                    {/* Logo */}
                    <div className="flex items-center w-3/6 md:w-3/18">
                        <a href="/" className="flex items-center w-full">
                            <img src="images/logo.png" className='w-full h-auto' alt="" />
                        </a>
                    </div>

                    {/* Navegación Desktop */}
                    <nav className="hidden lg:flex text-gray-700 font-medium items-center gap-4 lg:flex-1 justify-around">
                        {menuItems.map((item) => (
                            <div key={item.label} className="relative group">
                                <a href={item.href} className="hover:text-primary py-2 flex items-center font-semibold text-xs">
                                    {item.label}
                                </a>
                                {item.children && (
                                    <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1
                                 opacity-0 max-h-0 group-hover:max-h-96 group-hover:opacity-100 overflow-hidden
                                 transition-all duration-300 ease-in-out z-20">
                                        {item.children.map((child) => (
                                            <a key={child.label} href={child.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary/70">
                                                {child.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Selector de idioma y Botón Hamburguesa */}
                    <div className="flex items-center space-x-4">

                        {/* --- Selector de Idioma Dropdown --- */}
                        <div className="relative">
                            {/* Botón que muestra idioma actual y abre dropdown */}
                            <button
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center text-gray-700 text-xs font-semibold hover:text-secondary/70 py-2"
                                aria-label="Seleccionar idioma"
                                aria-haspopup="true"
                                aria-expanded={isLangDropdownOpen}
                            >
                                <img src={selectedLang.flag} alt={selectedLang.alt} className="w-5 h-auto mr-2 rounded-sm" /> {/* Icono Bandera */}
                                <span>{selectedLang.code}</span>
                                <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown de Idiomas */}
                            {isLangDropdownOpen && (
                                <div className="absolute top-full right-0 mt-1 w-36 bg-white shadow-lg rounded-md py-1 z-30"> {/* Aumentado z-index */}
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang)}
                                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-secondary/70"
                                            role="menuitem"
                                        >
                                            <img src={lang.flag} alt={lang.alt} className="w-5 h-auto mr-2 rounded-sm" /> {/* Icono Bandera */}
                                            <span>{lang.code}</span>
                                            <span className="text-xs text-gray-500 ml-2">({lang.label})</span> {/* Nombre completo opcional */}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* --- Fin Selector de Idioma --- */}


                        {/* Botón Hamburguesa */}
                        <button
                            className="lg:hidden text-gray-700 hover:text-secondary/70"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Menú Móvil */}
            <div
                className={`lg:hidden w-full bg-white shadow-md absolute top-full left-0 z-10 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen border-t border-gray-200' : 'max-h-0'
                    }`}
            >
                <nav className="flex flex-col px-4 py-2">
                    {menuItems.map((item) => (
                        <div key={item.label} className="border-b border-gray-100 last:border-b-0">
                            <div
                                className="flex justify-between items-center py-3 cursor-pointer"
                                onClick={item.children ? () => toggleAccordion(item.label) : undefined}
                            >
                                {!item.children ? (
                                    <a href={item.href} className="text-gray-700 font-medium hover:text-secondary/70 flex-grow" onClick={() => setIsMobileMenuOpen(false)}>
                                        {item.label}
                                    </a>
                                ) : (
                                    <span className="text-gray-700 font-medium flex-grow">
                                        {item.label}
                                    </span>
                                )}
                                {item.children && (
                                    <ChevronDown
                                        size={16}
                                        className={`ml-2 text-gray-500 transition-transform duration-200 ${openAccordionItem === item.label ? 'rotate-180' : ''
                                            }`}
                                    />
                                )}
                            </div>
                            {item.children && (
                                <div
                                    className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openAccordionItem === item.label ? 'max-h-96' : 'max-h-0'
                                        }`}
                                >
                                    <div className="pl-4 pb-2 pt-1 border-t border-gray-100">
                                        {item.children.map((child) => (
                                            <a
                                                key={child.label}
                                                href={child.href}
                                                className="block py-2 text-sm text-gray-600 hover:text-secondary/70"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {child.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}
