// src/components/WaykiMascot.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

// (Asumimos que CURIOSIDADES sigue siendo el mismo array)
const CURIOSIDADES = [
    {
        text: '¿Sabías que Tucumán es la provincia más pequeña de Argentina?',
        link: '/articulos/tucuman-pequena',
        imageSrc: 'https://www.tucumanturismo.gob.ar/public/img/casahistorica_nrxunv4s_16-07-2025.jpg' // <-- Ruta de ejemplo
    },
    {
        text: 'La Casa Histórica fue declarada Monumento Histórico Nacional en 1941.',
        link: '/articulos/casa-historica',
        imageSrc: 'https://www.tucumanturismo.gob.ar/public/img/casahistorica_nrxunv4s_16-07-2025.jpg' // <-- Ruta de ejemplo
    },
    {
        text: 'Tucumán es conocido como el "Jardín de la República".',
        link: '/articulos/jardin-republica',
        imageSrc: 'https://www.tucumanturismo.gob.ar/public/img/casahistorica_nrxunv4s_16-07-2025.jpg' // <-- Este no tendrá imagen
    }
];
export default function FunFacs() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentFact, setCurrentFact] = useState(CURIOSIDADES[0]);

    // Lógica para mostrarlo/ocultarlo (igual que antes)
    useEffect(() => {
        const showInterval = setInterval(() => {
            // Elegir un fact al azar
            const randomFact = CURIOSIDADES[Math.floor(Math.random() * CURIOSIDADES.length)];
            setCurrentFact(randomFact);
            setIsVisible(true);

            setTimeout(() => {
                setIsVisible(false);
            }, 4000);
        }, 5000);

        return () => clearInterval(showInterval);
    }, []);

    const waykiVariants = {
        hidden: {
            opacity: 0,
            rotate: 20,
            filter: 'blur(5px)',
            transition: { duration: 0.7 }
        },
        visible: {
            opacity: 1,
            rotate: -45,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: 0.5
            }
        },
        exit: {
            opacity: 0,
            x: [-4, 100],
            y: [-4, 100],
            filter: ['blur(0px)', 'blur(1px)', 'blur(3px)'],
            transition: {
                duration: .4,
                ease: "easeInOut"
            }
        },
    };

    // 2. Variante para la Burbuja de Diálogo
    const bubbleVariants = {
        hidden: {
            opacity: 0,
            scale: 0.7,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: 'spring',
                delay: .8
            }
        },
        exit: {
            opacity: 0,
            scale: 0.7,
            transition: { duration: 0.2 }
        },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed z-50 flex items-end -right-24 md:bottom-5 bottom-5 md:gap-9 gap-8"
                    // Animación general del contenedor (aparecer/desaparecer)
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* --- 2. La Burbuja de Diálogo --- */}
                    <motion.div
                        variants={bubbleVariants}
                        className="relative md:w-105 w-[80vw] overflow-hidden rounded-md text-white shadow-xl"
                    >
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-3 right-3 z-10 rounded-full p-1 text-gray-400 bg-white transition-all hover:bg-gray-200 hover:text-gray-400 hover:scale-110 drop-shadow-2xl"
                            aria-label="Cerrar"
                        >
                            <X size={18} />
                        </button>
                        {currentFact.imageSrc && (
                            <div className="relative md:h-35 h-30 w-full">
                                <Image
                                    src={currentFact.imageSrc}
                                    alt={currentFact.text}
                                    fill
                                    style={{ objectFit: 'cover' }} 
                                    sizes="(max-width: 768px) 100vw, 250px" 
                                />
                            </div>
                        )}
                        <div className="px-4 py-3.5 bg-secondary">
                            <p className="mb-3 md:text-3xl xl:text-4xl text-xl font-bold px-1">{currentFact.text}</p>
                            <a
                                href={currentFact.link}
                                className="inline-block rounded-md bg-primary px-3 py-1 text-sm md:text-md font-bold text-white transition-transform hover:scale-105"
                            >
                                Leer más
                            </a>
                        </div>
                    </motion.div>

                    {/* --- 1. Wayki (El Tapir) --- */}
                    <motion.div
                        className="wayki-imagen"
                        variants={waykiVariants} // Usa las variantes de Wayki
                        style={{
                            transformOrigin: 'bottom center'
                        }}
                    >
                        <img
                            src="/images/main/wayki.png" // Asegúrate que esta ruta sea correcta
                            alt="Wayki"
                            className='w-32'
                        />
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
