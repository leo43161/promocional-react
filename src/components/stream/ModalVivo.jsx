"use client";

import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import TwitchPlayer from './TwitchPlayer';

export default function ModalVivo({
    handleCloseModal,
    isOpen
}) {
    const [weather, setWeather] = useState(null);
    const API_KEY = '3208887a589245bfa45151945242406';

    useEffect(() => {
        if (isOpen) {
            // Buscamos específicamente por El Cadillal, Tucumán
            fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=El Cadillal, Tucuman&lang=es`)
                .then(res => res.json())
                .then(data => {
                    setWeather({
                        temp_c: data.current.temp_c,
                        condition: data.current.condition,
                        humidity: data.current.humidity,
                        wind_kph: data.current.wind_kph
                    });
                })
                .catch(err => console.error("Error cargando clima:", err));
        }
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            size="full"
            header={false}
            classNameContain='w-full h-auto'
        >
            <div className='relative w-full h-full bg-black flex items-center justify-center overflow-hidden flex-col'>
                
                {/* CONTENEDOR DEL STREAM CON BLOQUEO DE CLICS */}
                <div className="relative w-full h-full">
                    <TwitchPlayer channel="tucumanturismo02" />
                    
                    {/* CAPA INVISIBLE PARA BLOQUEAR CLICS (pointer-events-none no sirve aquí, queremos bloquearlo) */}
                    {/* <div className="absolute inset-0 z-10 cursor-default bg-transparent" /> */}
                </div>

                {/* OVERLAY DE INFORMACIÓN (Clima y Localidad) */}
                <div className="md:absolute top-6 left-6 z-20 flex flex-col gap-4 pointer-events-none w-full md:w-auto">
                    <div className="bg-secondary/50 backdrop-blur-md p-4 md:rounded-xl border border-white/10 text-white shadow-2xl">
                        <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-1">En Vivo</h2>
                        <h1 className="text-3xl font-bold">El Cadillal</h1>
                        <p className="text-white/70">San Miguel de Tucumán</p>
                        
                        {weather && (
                            <div className="mt-4 flex items-center gap-5">
                                <div className="flex items-center gap-1">
                                    <Thermometer className="text-primary" size={32} />
                                    <span className="text-4xl font-light">{weather.temp_c}°C</span>
                                </div>
                                <div className="h-10 w-px bg-white/20" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold capitalize">{weather.condition.text}</span>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
                                        <span className="flex items-center gap-1"><Droplets size={14}/> {weather.humidity}%</span>
                                        <span className="flex items-center gap-1"><Wind size={14}/> {weather.wind_kph} km/h</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* BOTÓN DE CIERRE (Como el header es false, agregamos uno manual o confiamos en el del Modal) */}
                <button 
                    onClick={handleCloseModal}
                    className="absolute top-6 right-6 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-xl p-3 rounded-full text-white transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
        </Modal>
    );
}