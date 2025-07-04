import { useState, useEffect, useMemo, useRef } from 'react'; // No es necesario useRef para searchInputRef aquí
import { DollarSign, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { DESTINOS, CIRCUITOS, LINEAS } from '@/data/transporte';
import DropdownSearch from '@/components/DropdownSearch'; // Ajusta la ruta

export default function BuscadorTransporte() {
    const lenis = useLenis();
    const [circuitoActivo, setCircuitoActivo] = useState('choromoro');
    const [destinoSeleccionado, setDestinoSeleccionado] = useState('La cocha'); // Estado inicial
    const [mostrarHorarios, setMostrarHorarios] = useState(false);
    const [infoDestino, setInfoDestino] = useState(null);

    // Ya no se necesitan searchTerm ni isSearchInputFocused aquí

    const handleScrollSlide = (id) => {
        if (window.innerWidth < 1024) {
            if (lenis) {
                lenis.scrollTo('#' + id, {
                    duration: 2,
                    offset: -50,
                });
            }
        }
    };

    const getCircuitoColor = () => {
        const circuito = CIRCUITOS.find(c => c.id === circuitoActivo);
        return circuito ? circuito.color : "#4F7B58";
    };

    const getLightColor = () => {
        return `${getCircuitoColor()}20`;
    };

    const allUniqueDestinos = useMemo(() => {
        const all = Object.values(DESTINOS).flat();
        return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b)); // Opcional: ordenar alfabéticamente
    }, []);

    // Esta lógica de destinosParaMostrar en la columna izquierda sigue igual,
    // se basa en el circuitoActivo.
    const destinosDelCircuitoActual = useMemo(() => {
        return DESTINOS[circuitoActivo] || [];
    }, [circuitoActivo]);

    // Callback para cuando se selecciona un destino desde DropdownSearch o la lista lateral
    const handleSeleccionDeDestino = (destino) => {
        setDestinoSeleccionado(destino);

        const circuitoIdDelDestino = Object.keys(DESTINOS).find(idCircuito =>
            DESTINOS[idCircuito].includes(destino)
        );

        if (circuitoIdDelDestino && circuitoIdDelDestino !== circuitoActivo) {
            setCircuitoActivo(circuitoIdDelDestino);
        }
        // El scroll a la info se puede manejar aquí o dejar que el efecto de infoDestino lo haga
        // setTimeout(() => handleScrollSlide('info-transporte'), 0); // Si se necesita un pequeño delay
    };


    // Actualizar el destino seleccionado cuando cambia el circuito (por click en TAB)
    useEffect(() => {
        const destinosDelCircuito = DESTINOS[circuitoActivo];
        if (destinosDelCircuito && destinosDelCircuito.length > 0) {
            // Si el destino seleccionado no pertenece al nuevo circuito activo,
            // o si no hay destino seleccionado, selecciona el primero del nuevo circuito.
            if (!destinoSeleccionado || !destinosDelCircuito.includes(destinoSeleccionado)) {
                // Llamamos a handleSeleccionDeDestino para mantener la lógica centralizada,
                // aunque esto podría causar un ciclo si handleSeleccionDeDestino modifica circuitoActivo.
                // Es más simple setearlo directamente aquí.
                setDestinoSeleccionado(destinosDelCircuito[0]);
            }
        } else {
             // Si el nuevo circuito no tiene destinos, limpiar el destino seleccionado.
            setDestinoSeleccionado(null);
        }
    }, [circuitoActivo]); // Quitar destinoSeleccionado de las dependencias para evitar ciclos no deseados aquí.


    // Actualizar la información del destino seleccionado
    useEffect(() => {
        if (destinoSeleccionado && LINEAS[destinoSeleccionado]) {
            setInfoDestino(LINEAS[destinoSeleccionado]);
            setTimeout(() => handleScrollSlide('info-transporte'), 100); // Scroll después de que la info se cargue
        } else {
            setInfoDestino(null);
        }
        setMostrarHorarios(false); // Ocultar horarios al cambiar de destino
    }, [destinoSeleccionado]);


    const circuitoColor = getCircuitoColor();
    const lightColor = getLightColor();
    
    // Efecto para manejar el estado inicial si no coinciden
    useEffect(() => {
        const destinosDelCircuitoInicial = DESTINOS[circuitoActivo];
        if (destinosDelCircuitoInicial && !destinosDelCircuitoInicial.includes(destinoSeleccionado)) {
            setDestinoSeleccionado(destinosDelCircuitoInicial[0] || null);
        }
    }, []); // Solo al montar


    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Busca aquí tu Transporte</h1>
            <p className="text-center text-gray-600 mb-6 font-semibold">
                Selecciona un destino usando el buscador o navega por los circuitos.
            </p>

            {/* Nuevo DropdownSearch */}
            <div className="mb-6">
                <DropdownSearch
                    options={allUniqueDestinos}
                    selectedValue={destinoSeleccionado}
                    onSelection={handleSeleccionDeDestino}
                    placeholder="Escribe un destino (ej: Simoca, Tafí del Valle...)"
                />
            </div>

            {/* Tabs de Circuitos */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {CIRCUITOS.map((circuito) => (
                    <button
                        key={circuito.id}
                        className={`px-4 py-2 rounded-md text-white font-medium transition-colors text-2xl ${
                            circuitoActivo === circuito.id ? '' : 'opacity-75 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: circuitoActivo === circuito.id ? circuito.color : "#888888" }}
                        onClick={() => {
                            setCircuitoActivo(circuito.id);
                            // No es necesario limpiar destinoSeleccionado aquí, el useEffect [circuitoActivo] lo manejará.
                        }}
                    >
                        {circuito.nombre}
                    </button>
                ))}
            </div>

            {destinoSeleccionado && infoDestino && (
                <div className="text-center mb-4">
                    <p className="text-gray-600 uppercase text-[1.3em] font-semibold">
                        INFORMACIÓN PARA VIAJAR A <span className='font-bold underline' style={{ color: circuitoColor }}>{destinoSeleccionado}</span> 
                    </p>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Lista de Destinos del circuito activo (opcional, como una forma de explorar) */}
                <div className="w-full lg:w-1/4">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-700">Destinos en {CIRCUITOS.find(c=>c.id === circuitoActivo)?.nombre || 'circuito'}</h3>
                    <div className="bg-white rounded-lg shadow-md max-h-96 overflow-y-auto" id='destinos-transporte'>
                        {destinosDelCircuitoActual.length > 0 ? destinosDelCircuitoActual.map((destino) => (
                            <button
                                key={destino}
                                className={`w-full text-left px-4 py-3 border-b last:border-b-0 transition-colors hover:bg-gray-100 text-xl`}
                                style={{
                                    backgroundColor: destinoSeleccionado === destino ? `${getCircuitoColor()}25` : '',
                                    fontWeight: destinoSeleccionado === destino ? '700' : '500',
                                    color: destinoSeleccionado === destino ? getCircuitoColor() : 'inherit',
                                }}
                                onClick={() => handleSeleccionDeDestino(destino)}
                            >
                                {destino}
                            </button>
                        )) : (
                            <p className="p-4 text-center text-gray-500">No hay destinos para mostrar en este circuito.</p>
                        )}
                    </div>
                </div>

                {/* Panel de Información */}
                {infoDestino && destinoSeleccionado ? (
                    <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6" id='info-transporte'>
                        <div className="mb-4">
                            <div className="inline-block text-white px-4 py-1 rounded-md font-medium text-xl" style={{ backgroundColor: circuitoColor }}>
                                {infoDestino.nombre}
                            </div>
                        </div>
                        {/* ... (resto del panel de información sin cambios) ... */}
                         <div className="relative w-full md:h-96 h-80 bg-gray-200 mb-6 rounded-md overflow-hidden">
                            <iframe
                                src={infoDestino.mapa || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d314.67437812803115!2d-65.19505326960136!3d-26.835684035893834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d5ba1c427e3%3A0xa2eb36874652c16b!2sTerminal%20de%20Omnibus%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1751555918132!5m2!1ses!2sar'}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                title={`Mapa para ${infoDestino.nombre}`}
                            />
                        </div>

                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                <DollarSign style={{ color: circuitoColor }} size={25} />
                            </div>
                            <div className='text-xl'>
                                <span className="font-medium text-gray-700 text-xl">Precio:</span> ${infoDestino.precio?.toLocaleString() || 'No disponible'}
                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                <MapPin style={{ color: circuitoColor }} size={25} />
                            </div>
                            <div className='text-xl'>
                                <span className="font-medium text-gray-700 text-xl">Dónde tomarlo:</span> {infoDestino.boleteria || 'No disponible'}
                                {infoDestino.telefono && (
                                    <>
                                        <span className="font-medium text-gray-700 text-xl mx-1">| Teléfono:</span>
                                        <a href={`tel:${infoDestino.telefono}`} className="ml-1 hover:underline text-xl" style={{ color: circuitoColor }}>
                                            {infoDestino.telefono}
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {infoDestino.horarios && ( typeof infoDestino.horarios === 'string' ? (
                               <div className="flex items-center mb-4">
                                <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                    <Clock style={{ color: circuitoColor }} size={25} />
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700 text-xl">Horarios:</span> <span className="underline">{infoDestino.horarios}</span>
                                </div>
                            </div>
                        ) : (
                             <div className="border rounded-md">
                                <button
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                    onClick={() => setMostrarHorarios(!mostrarHorarios)}
                                >
                                    <div className="flex items-center">
                                        <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                            <Clock style={{ color: circuitoColor }} size={25} />
                                        </div>
                                        <span className="font-medium text-gray-700 text-xl">Horarios:</span>
                                    </div>
                                    {mostrarHorarios ? (
                                        <ChevronUp className="text-gray-600" size={24} />
                                    ) : (
                                        <ChevronDown className="text-gray-600" size={24} />
                                    )}
                                </button>

                                {mostrarHorarios && Array.isArray(infoDestino.horarios) && infoDestino.horarios.length > 0 && (
                                    <div className="p-4 border-t border-gray-200">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {infoDestino.horarios.map((horario, index) => (
                                                <div key={`horario-${index}`} className={`w-full ${infoDestino.horarios.length > 1 ? 'md:w-1/2' : ''}`}>
                                                    <h4 className="text-center font-semibold text-2xl mb-3" style={{ color: circuitoColor }}>
                                                        {horario.titulo}
                                                    </h4>
                                                    <div className="border rounded-lg overflow-hidden shadow" style={{ borderColor: `${circuitoColor}30` }}>
                                                        <div className="grid grid-cols-2 font-semibold text-[1.3em]" style={{ backgroundColor: `${circuitoColor}10` }}>
                                                            <div className="p-2 text-center border-r" style={{ borderColor: `${circuitoColor}30` }}>Ida</div>
                                                            <div className="p-2 text-center">Vuelta</div>
                                                        </div>
                                                        {Array.from({ length: Math.max(horario.ida?.length || 0, horario.vuelta?.length || 0) }).map((_, rowIndex) => (
                                                            <div
                                                                key={`row-${horario.titulo}-${rowIndex}`}
                                                                className="grid grid-cols-2 text-[1.3em]"
                                                                style={{
                                                                    backgroundColor: rowIndex % 2 === 0 ? `${circuitoColor}0A` : 'white',
                                                                    borderTop: rowIndex > 0 ? `1px solid ${circuitoColor}20` : 'none'
                                                                }}
                                                            >
                                                                <div className="p-2 text-center border-r" style={{ borderColor: `${circuitoColor}30` }}>
                                                                    {(horario.ida && rowIndex < horario.ida.length) ? horario.ida[rowIndex] : '-'}
                                                                </div>
                                                                <div className="p-2 text-center">
                                                                    {(horario.vuelta && rowIndex < horario.vuelta.length) ? horario.vuelta[rowIndex] : '-'}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full lg:w-3/4 flex items-center justify-center bg-white rounded-lg shadow-md p-6 text-center text-gray-500 min-h-[300px]">
                        <p className="text-2xl">
                            {destinoSeleccionado ? `Cargando información para ${destinoSeleccionado}...` : "Selecciona un destino para ver los detalles del transporte."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}