import { useState, useEffect, useMemo } from 'react';
import { DollarSign, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { DESTINOS, CIRCUITOS } from '@/data/transporte';
import DropdownSearch from '@/components/DropdownSearch';
import { useGetColectivosQuery } from '@/redux/services/transporteService';
import { useSearchTracker } from '@/hooks/useSearchTracker';
import React from 'react';

export default function BuscadorTransporte() {
    const lenis = useLenis();  
    const { trackSearch } = useSearchTracker();
    const { data: colectivosData, isLoading, isError } = useGetColectivosQuery();

    const [circuitoActivo, setCircuitoActivo] = useState('sur');
    const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
    const [infoDestino, setInfoDestino] = useState(null);
    const [horariosVisibles, setHorariosVisibles] = useState({});

    const allUniqueDestinos = useMemo(() => {
        const all = Object.values(DESTINOS).flat().map(d => d.nombre);
        return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b));
    }, []);

    const destinosDelCircuitoActual = useMemo(() => {
        return DESTINOS[circuitoActivo] || [];
    }, [circuitoActivo]);

    const handleSeleccionDeDestino = (nombreDestino) => {
        trackSearch(nombreDestino);
        const circuitoIdDelDestino = Object.keys(DESTINOS).find(idCircuito =>
            DESTINOS[idCircuito].some(d => d.nombre === nombreDestino)
        );

        if (circuitoIdDelDestino && circuitoIdDelDestino !== circuitoActivo) {
            setCircuitoActivo(circuitoIdDelDestino);
        }

        const destinoObj = Object.values(DESTINOS).flat().find(d => d.nombre === nombreDestino);
        setDestinoSeleccionado(destinoObj);
    };
    
    // Hook useMemo para agrupar los colectivos por IdAutobus
    const groupedColectivos = useMemo(() => {
        if (!destinoSeleccionado || !colectivosData) return null;

        const colectivosFiltrados = colectivosData.result.filter(
            c => parseInt(c.tiene_Idlugares) === destinoSeleccionado.id
        );

        if (colectivosFiltrados.length === 0) return null;

        const groups = colectivosFiltrados.reduce((acc, colectivo) => {
            const key = colectivo.IdAutobus;
            if (!acc[key]) {
                acc[key] = {
                    ...colectivo, // Copia la info base del primer colectivo que encuentra
                    horarios: [],
                };
            }
            // Acumula los horarios de todos los registros para ese IdAutobus
            acc[key].horarios.push({
                Idtiene: colectivo.Idtiene,
                dia: colectivo.dia,
                ida: colectivo.ida,
                vuelta: colectivo.vuelta,
            });
            // Ordena los horarios por el campo 'orden'
            acc[key].horarios.sort((a, b) => a.orden - b.orden);
            return acc;
        }, {});

        return Object.values(groups);
    }, [destinoSeleccionado, colectivosData]);


    useEffect(() => {
        const destinosDelCircuito = DESTINOS[circuitoActivo];
        if (destinosDelCircuito?.length > 0) {
            if (!destinoSeleccionado || !destinosDelCircuito.some(d => d.id === destinoSeleccionado.id)) {
                setDestinoSeleccionado(destinosDelCircuito[0]);
            }
        } else {
            setDestinoSeleccionado(null);
        }
    }, [circuitoActivo, destinoSeleccionado]);

    useEffect(() => {
        if (groupedColectivos) {
            setInfoDestino(groupedColectivos);
             setTimeout(() => {
                if (lenis) {
                    lenis.scrollTo('#info-transporte', {
                        duration: 2,
                        offset: -50,
                    });
                }
            }, 100);
        } else {
            setInfoDestino(null);
        }
    }, [groupedColectivos, lenis]);
    
    useEffect(() => {
        if (!destinoSeleccionado && !isLoading) {
            setDestinoSeleccionado(DESTINOS.sur[0]);
        }
    }, [isLoading, destinoSeleccionado]);


    const toggleHorarios = (idAutobus) => {
        setHorariosVisibles(prev => ({
            ...prev,
            [idAutobus]: !prev[idAutobus]
        }));
    };

    const getCircuitoColor = () => {
        const circuito = CIRCUITOS.find(c => c.id === circuitoActivo);
        return circuito ? circuito.color : "#4F7B58";
    };

    const circuitoColor = getCircuitoColor();
    const lightColor = `${circuitoColor}20`;

    const renderHorarios = (ida, vuelta) => {
        if (!ida && !vuelta) return null;
        const idaArray = ida.split(',');
        const vueltaArray = vuelta.split(',');
        const maxLength = Math.max(idaArray.length, vueltaArray.length);

        return Array.from({ length: maxLength }).map((_, index) => (
            <div
                key={index}
                className="grid grid-cols-2 text-[1.3em]"
                style={{
                    backgroundColor: index % 2 === 0 ? `${circuitoColor}0A` : 'white',
                    borderTop: index > 0 ? `1px solid ${circuitoColor}20` : 'none'
                }}
            >
                <div className="p-2 text-center border-r" style={{ borderColor: `${circuitoColor}30` }}>
                    {idaArray[index] || '-'}
                </div>
                <div className="p-2 text-center">
                    {vueltaArray[index] || '-'}
                </div>
            </div>
        ));
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Busca aquí tu Transporte</h1>
            <p className="text-center text-gray-600 mb-6 font-semibold">
                Selecciona un destino usando el buscador o navega por los circuitos.
            </p>

            <div className="mb-6">
                <DropdownSearch
                    options={allUniqueDestinos}
                    selectedValue={destinoSeleccionado?.nombre}
                    onSelection={handleSeleccionDeDestino}
                    placeholder="Escribe un destino (ej: Simoca, Tafí del Valle...)"
                />
            </div>

            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {CIRCUITOS.map((circuito) => (
                    <button
                        key={circuito.id}
                        className={`px-4 py-2 rounded-md text-white font-medium transition-colors text-2xl ${
                            circuitoActivo === circuito.id ? '' : 'opacity-75 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: circuitoActivo === circuito.id ? circuito.color : "#888888" }}
                        onClick={() => setCircuitoActivo(circuito.id)}
                    >
                        {circuito.nombre}
                    </button>
                ))}
            </div>
            
            {destinoSeleccionado && (
                <div className="text-center mb-4">
                     <p className="text-gray-600 uppercase text-[1.3em] font-semibold">
                        INFORMACIÓN PARA VIAJAR A <span className='font-bold underline' style={{ color: circuitoColor }}>{destinoSeleccionado.nombre}</span>
                    </p>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/4">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-700">Destinos en {CIRCUITOS.find(c => c.id === circuitoActivo)?.nombre || 'circuito'}</h3>
                    <div className="bg-white rounded-lg shadow-md max-h-96 overflow-y-auto" id='destinos-transporte'>
                        {destinosDelCircuitoActual.length > 0 ? destinosDelCircuitoActual.map((destino) => (
                            <button
                                key={destino.id}
                                className={`w-full text-left px-4 py-3 border-b last:border-b-0 transition-colors hover:bg-gray-100 text-xl`}
                                style={{
                                    backgroundColor: destinoSeleccionado?.id === destino.id ? `${getCircuitoColor()}25` : '',
                                    fontWeight: destinoSeleccionado?.id === destino.id ? '700' : '500',
                                    color: destinoSeleccionado?.id === destino.id ? getCircuitoColor() : 'inherit',
                                }}
                                onClick={() => handleSeleccionDeDestino(destino.nombre)}
                            >
                                {destino.nombre}
                            </button>
                        )) : (
                            <p className="p-4 text-center text-gray-500">No hay destinos para mostrar.</p>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6" id='info-transporte'>
                    {isLoading ? (
                        <p className="text-center text-gray-500 text-2xl">Cargando información...</p>
                    ) : isError ? (
                         <p className="text-center text-red-500 text-2xl">Error al cargar la información.</p>
                    ) : infoDestino ? (
                        infoDestino.map((info) => (
                            <div key={info.IdAutobus} className="mb-8 border-b pb-6 last:border-b-0">
                                <div className="mb-4">
                                    <div className="inline-block text-white px-4 py-1 rounded-md font-medium text-xl" style={{ backgroundColor: circuitoColor }}>
                                        {info.Empresa}
                                    </div>
                                </div>
                                <div className="relative w-full md:h-96 h-80 bg-gray-200 mb-6 rounded-md overflow-hidden">
                                    <iframe
                                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.81745266881!2d${info.longitud}!3d${info.latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f33775%3A0x1111d618834a3585!2sTerminal%20de%20%C3%93mnibus%20de%20San%20Miguel%20de%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1692134440787!5m2!1ses-419!2sar`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        aria-hidden="false"
                                        tabIndex="0"
                                        title={`Mapa para ${info.Empresa}`}
                                    />
                                </div>

                                <div className="flex items-center mb-4">
                                    <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                        <DollarSign style={{ color: circuitoColor }} size={25} />
                                    </div>
                                    <div className='text-xl'>
                                        <span className="font-medium text-gray-700 text-xl">Precio:</span> {info.Precio || 'No disponible'}
                                    </div>
                                </div>

                                <div className="flex items-center mb-6">
                                    <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                        <MapPin style={{ color: circuitoColor }} size={25} />
                                    </div>
                                    <div className='text-xl'>
                                        <span className="font-medium text-gray-700 text-xl">Plataforma:</span> {info.Plataforma || 'No disponible'}
                                        {info.telefono && (
                                            <>
                                                <span className="font-medium text-gray-700 text-xl mx-1">| Teléfono:</span>
                                                <a href={`tel:${info.telefono}`} className="ml-1 hover:underline text-xl" style={{ color: circuitoColor }}>
                                                    {info.telefono}
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {info.horarios.map(horario => (
                                    <div key={horario.Idtiene} className="border rounded-md mb-3">
                                        <button
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                            onClick={() => toggleHorarios(horario.Idtiene)}
                                        >
                                            <div className="flex items-center">
                                                <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                                    <Clock style={{ color: circuitoColor }} size={25} />
                                                </div>
                                                <span className="font-medium text-gray-700 text-xl">Horarios ({horario.dia})</span>
                                            </div>
                                            {horariosVisibles[horario.Idtiene] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                        </button>

                                        {horariosVisibles[horario.Idtiene] && (
                                            <div className="p-4 border-t border-gray-200">
                                                {horario.ida || horario.vuelta ? (
                                                    <div className="border rounded-lg overflow-hidden shadow" style={{ borderColor: `${circuitoColor}30` }}>
                                                        <div className="grid grid-cols-2 font-semibold text-[1.3em]" style={{ backgroundColor: `${circuitoColor}10` }}>
                                                            <div className="p-2 text-center border-r" style={{ borderColor: `${circuitoColor}30` }}>Ida</div>
                                                            <div className="p-2 text-center">Vuelta</div>
                                                        </div>
                                                        {renderHorarios(horario.ida, horario.vuelta)}
                                                    </div>
                                                ) : (
                                                    <p className='text-center text-lg'>Frecuencia continua.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-2xl">
                           No se encontró información para este destino.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}