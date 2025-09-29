import { useState, useEffect } from 'react';

export default function ContadorFit() {
    const [daysLeft, setDaysLeft] = useState(0);

    // Fecha de la FIT Buenos Aires (ajusta esta fecha según corresponda)
    const fitDate = '2025-09-27'; // Ejemplo: 15 de octubre de 2025

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(fitDate).getTime();
            const difference = target - now;

            if (difference > 0) {
                const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
                setDaysLeft(days);
            } else {
                setDaysLeft(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [fitDate]);

    const handleClick = () => {
        window.open('https://fit.org.ar/', '_blank');
    };

    return (
        <div
            onClick={handleClick}
            className="hidden flex cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg md:rounded overflow-hidden md:w-6/12 w-full"
        >
            {/* Div izquierdo con el contador */}
            <div
                className="md:w-4/13 w-9/13 px-6 py-2 flex items-center justify-center md:flex-col bg-[#223468] gap-2 md:gap-0"
            >
                <div className='md:text-2xl 2xl:text-3xl font-bold text-3xl md:font-extrabold text-zinc-50'>FALTAN</div>
                <div className='md:text-7xl 2xl:text-8xl font-bold text-4xl md:font-extrabold text-[#E30612] '>{daysLeft}</div>
                <div className='md:text-2xl 2xl:text-3xl font-bold text-3xl md:font-extrabold text-zinc-50'>DÍAS</div>
            </div>

            {/* Div derecho con el logo */}
            <div className="bg-white px-4 md:py-2 flex items-center justify-center flex-1">
                <img src="/images/banners/fit.png" className='md:w-9/13 w-7/13 md:mb-2' alt="FIT" />
            </div>
        </div>
    );
}
