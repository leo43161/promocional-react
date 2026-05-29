// src/pages/wayki.jsx
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function WaykiChat() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Wayki - Tu Guía Turístico de Tucumán</title>
                <meta
                    name="description"
                    content="Wayki, el tapir guía turístico virtual de Tucumán. Próximamente con novedades sobre su lanzamiento oficial."
                />
            </Head>

            <div
                className="relative flex flex-col bg-back/60 overflow-hidden"
                style={{ minHeight: 'calc(100vh - 80px)' }}
            >
                {/* Fondo textura */}
                <div
                    className="absolute w-full h-full object-cover z-10 opacity-40 object-center top-0 left-0"
                    style={{
                        backgroundImage: `url(${process.env.URL_LOCAL_SERVER + "/images/header/textura-tucuman.png"})`,
                        backgroundAttachment: 'fixed',
                    }}
                />

                {/* Header */}
                <div className="sticky top-0 z-20 bg-secondary text-white shadow-lg">
                    <div className="max-w-3xl mx-auto px-4 py-3 flex items-center md:gap-4 gap-1">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-xl hover:bg-white/10 transition-colors shrink-0"
                            aria-label="Volver"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center md:gap-3 gap-2 flex-1">
                            <div className="min-w-0">
                                <h1 className="text-lg font-bold leading-tight">Wayki</h1>
                                <p className="text-xs text-white/70 truncate">
                                    Guía turístico virtual · Tucumán
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido central */}
                <div className="flex-1 relative z-10 flex items-center justify-center px-4 py-12">
                    <div className="max-w-lg w-full text-center">

                        {/* Imagen de Wayki */}
                        <div className="flex justify-center mb-6">
                            <img
                                src={process.env.URL_LOCAL_SERVER + "/images/wayki/idle.png"}
                                alt="Wayki el tapir"
                                className="w-44 h-44 object-contain drop-shadow-xl"
                            />
                        </div>

                        {/* Tarjeta del mensaje */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 px-8 py-8">
                            <div className="flex justify-center mb-4">
                                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                                    <Sparkles className="w-4 h-4" />
                                    Próximamente
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-secondary mb-3 leading-snug">
                                ¡Gracias por participar de la prueba de Wayki!
                            </h2>

                            <p className="text-gray-500 text-base leading-relaxed">
                                Pronto tendremos novedades sobre su lanzamiento oficial.
                            </p>
                        </div>

                        {/* Botón volver */}
                        <button
                            onClick={() => router.back()}
                            className="mt-6 inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

WaykiChat.getLayout = function getLayout(page) {
    return page;
};
