import { CornerDownLeft, Sparkles, Search } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function BuscadorIAHome() {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const sugerencias = [
        "¿Dónde comer las mejores empanadas?",
        "Museos abiertos hoy",
        "Clima en Tafí del Valle",
        "Circuitos de trekking"
    ];

    // Navegar al chat con la consulta como primer mensaje
    const handleSearch = () => {
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/wayki?q=${encodeURIComponent(trimmed)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSugerencia = (sugerencia) => {
        setQuery(sugerencia);
        router.push(`/wayki?q=${encodeURIComponent(sugerencia)}`);
    };

    return (
        <div className="relative overflow-hidden bg-back">
            <img className='absolute w-full h-full object-cover z-10 opacity-40 object-center top-0 left-0' src={process.env.URL_LOCAL_SERVER + "/images/header/textura-tucuman.png"} alt="" />
            <img className='absolute w-full md:h-auto z-10 object-center md:top-35 max-[360px]:-bottom-30 -bottom-43 md:bottom-auto left-0 h-full drop-shadow-2xl' src={process.env.URL_LOCAL_SERVER + "/images/header/montana.png"} alt="" />

            <div className="md:px-6 px-3 w-full md:py-10 py-12 max-[360px]:py-8 flex flex-col items-center md:gap-6 gap-2 rounded-2xl shadow-2xl relative z-10">
                {/* Encabezado Amable */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-50 backdrop-blur-md border border-white/10 shadow-lg md:mb-3 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-lg font-semibold text-secondary tracking-wide uppercase">
                        Asistente Virtual
                    </span>
                </div>

                <h1 className=" max-[360px]:text-[2.3em] text-5xl md:text-5xl lg:text-7xl font-extrabold text-secondary tracking-tight md:mb-5 mb-3 text-center text-shadow">
                    Tu viaje, <span className="text-transparent bg-clip-text bg-primary">diseñado a medida.</span>
                </h1>

                {/* Input de Búsqueda */}
                <div className='flex flex-col items-center px-2'>

                    <div
                        className={`
                        w-full flex-1 relative transition-all duration-300 transform
                        ${isFocused ? 'scale-[1.02] shadow-[0_0_40px_-10px_rgba(242,101,34,0.3)]' : 'shadow-xl'}
                    `}
                    >
                        <div className="relative flex items-center bg-zinc-50 rounded-2xl overflow-hidden p-2">

                            {/* Icono decorativo input */}
                            <div className="hidden md:flex pl-4 pr-2">
                                <div className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse"></div>
                            </div>

                            <input
                                type="text"
                                value={query}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ej: Quiero una cena romántica cerca de Yerba Buena..."
                                className="w-full bg-transparent text-primary text-lg md:text-2xl font-semibold placeholder-primary placeholder:text-xl placeholder:font-bold px-4 md:py-4 focus:outline-none"
                            />

                            {/* Botón de Acción Integrado */}
                            <button
                                onClick={handleSearch}
                                className="bg-primary hover:bg-primary/80  text-white md:p-4 p-3 rounded-xl transition-all duration-200 flex items-center gap-2 group shrink-0"
                                aria-label="Buscar con Wayki"
                            >
                                <Search className="w-5 h-5 group-hover:text-zinc-50 transition-transform" />
                            </button>
                        </div>

                        {/* Texto de ayuda visual (Enter) */}
                        {isFocused && (
                            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 translate-x-full hidden xl:flex items-center gap-2 text-zinc-50 text-sm">
                                <CornerDownLeft className="w-4 h-4" />
                                <span>Presioná Enter</span>
                            </div>
                        )}
                    </div>

                    {/* Chips de Sugerencias (Quick Actions) */}
                    <div className="md:mt-4 mt-6 flex flex-wrap gap-3 flex-none w-full">
                        {sugerencias.map((sugerencia, index) => (
                            <button
                                key={index}
                                onClick={() => handleSugerencia(sugerencia)}
                                className="md:text-2xl text-lg font-bold bg-back shadow-lg text-secondary/70 px-4 py-0 rounded-full border-primary hover:border-primary hover:bg-zinc-50 hover:text-primary hover:cursor-pointer transition-colors duration-200"
                            >
                                {sugerencia}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Disclaimer sutil (profesionalismo) */}
                <p className="text-center text-sm text-zinc-50 mt-2">
                    Potenciado por Inteligencia Artificial. Los resultados pueden variar.
                </p>
            </div>
        </div>
    );
};