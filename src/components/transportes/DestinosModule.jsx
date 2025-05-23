import { useState, useEffect } from 'react';
import { DollarSign, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react'
import { DESTINOS, CIRCUITOS, LINEAS } from '@/data/transporte';

export default function BuscadorTransporte() {
    const lenis = useLenis();
    const [circuitoActivo, setCircuitoActivo] = useState('choromoro');
    const [destinoSeleccionado, setDestinoSeleccionado] = useState('La cocha');
    const [mostrarHorarios, setMostrarHorarios] = useState(false);
    const [infoDestino, setInfoDestino] = useState(null);

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

    // Obtener el color del circuito activo
    const getCircuitoColor = () => {
        const circuito = CIRCUITOS.find(c => c.id === circuitoActivo);
        return circuito ? circuito.color : "#4F7B58"; // Color por defecto si no encuentra el circuito
    };

    // Generar un color más claro para los fondos de iconos
    const getLightColor = () => {
        // Esta función simple convierte el color a una versión más clara para fondos
        // En una implementación real, se podría usar una librería como 'color' para manipular colores
        return `${getCircuitoColor()}20`; // Agregar transparencia (20%)
    };

    // Actualizar el destino seleccionado cuando cambia el circuito
    useEffect(() => {
        const destinosDelCircuito = DESTINOS[circuitoActivo];
        if (!destinosDelCircuito.includes(destinoSeleccionado)) {
            setDestinoSeleccionado(destinosDelCircuito[0]);
        }
    }, [circuitoActivo, destinoSeleccionado]);

    // Actualizar la información del destino seleccionado
    useEffect(() => {
        setInfoDestino(LINEAS[destinoSeleccionado]);
    }, [destinoSeleccionado]);

    const circuitoColor = getCircuitoColor();
    const lightColor = getLightColor();

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Busca aquí tu Transporte</h1>

            {/* Tabs de Circuitos */}
            <div className="flex flex-wrap gap-2 mb-6">
                {CIRCUITOS.map((circuito) => (
                    <button
                        key={circuito.id}
                        className="px-4 py-2 rounded-md text-white font-medium transition-colors"
                        style={{ backgroundColor: circuitoActivo === circuito.id ? circuito.color : "#99a1af" }}
                        onClick={() => setCircuitoActivo(circuito.id)}
                    >
                        {circuito.nombre}
                    </button>
                ))}
            </div>

            <div className="text-center mb-4">
                <p className="text-gray-600 uppercase text-sm font-semibold">ENCONTRÁ LA LÍNEA QUE SE ADAPTE A TU DESTINO EN {destinoSeleccionado}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Lista de Destinos */}
                <div className="w-full md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md" id='destinos-transporte'>
                        {DESTINOS[circuitoActivo].map((destino) => (
                            <button
                                key={destino}
                                className={`w-full text-left px-4 py-3 border-b last:border-b-0 transition-colors hover:bg-gray-50`}
                                style={{
                                    backgroundColor: destinoSeleccionado === destino ? `${circuitoColor}15` : '',
                                    fontWeight: destinoSeleccionado === destino ? '500' : '400'
                                }}
                                onClick={() => { setDestinoSeleccionado(destino), handleScrollSlide('info-transporte') }}
                            >
                                {destino}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Panel de Información */}
                {infoDestino && (
                    <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-4" id='info-transporte'>
                        {/* Nombre de la línea */}
                        <div className="mb-4">
                            <div className="inline-block text-white px-4 py-1 rounded-md font-medium" style={{ backgroundColor: circuitoColor }}>
                                {infoDestino.nombre}
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="relative w-full md:h-96 h-80 bg-gray-200 mb-6 rounded-md overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1356400145232!2d-65.19638282534416!3d-26.835637789986375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d5ba1c427e3%3A0xa2eb36874652c16b!2sTerminal%20de%20Omnibus%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1717078006968!5m2!1ses-419!2sar"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                            />
                        </div>

                        {/* Precio */}
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                <DollarSign style={{ color: circuitoColor }} size={20} />
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Precio:</span> ${infoDestino?.precio?.toLocaleString()}
                            </div>
                        </div>

                        {/* Boletería */}
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                <MapPin style={{ color: circuitoColor }} size={20} />
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Donde tomarlo:</span> {infoDestino?.boleteria} |
                                <span className="font-medium text-gray-700"> Teléfono:</span>
                                <a href={`tel:${infoDestino.telefono}`} className="ml-1" style={{ color: circuitoColor }}>
                                    {infoDestino?.telefono}
                                </a>
                            </div>
                        </div>

                        {/* Horarios colapsable */}
                        {typeof infoDestino?.horarios !== 'string' ? (
                            <div className="border rounded-md">
                                <button
                                    className="w-full flex items-center justify-between p-4 text-left"
                                    onClick={() => setMostrarHorarios(!mostrarHorarios)}
                                >
                                    <div className="flex items-center">
                                        <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                            <Clock style={{ color: circuitoColor }} size={20} />
                                        </div>
                                        <span className="font-medium text-gray-700">Horario:</span>
                                    </div>
                                    {mostrarHorarios ? (
                                        <ChevronUp className="text-gray-500" size={20} />
                                    ) : (
                                        <ChevronDown className="text-gray-500" size={20} />
                                    )}
                                </button>

                                {mostrarHorarios && (
                                    <div className="p-4 border-t">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            {/* Horarios Dinámicos */}
                                            {infoDestino.horarios.map((horario, index) => (
                                                <div key={`horario-${index}`} className={`w-full ${infoDestino.horarios.length > 1 ? 'md:w-1/2' : ''}`}>
                                                    <h4 className="text-center font-medium mb-2" style={{ color: circuitoColor }}>
                                                        {horario.titulo}
                                                    </h4>
                                                    <div className="border rounded-md overflow-hidden" style={{ borderColor: `${circuitoColor}30` }}>
                                                        <div className="grid grid-cols-2 font-medium" style={{ backgroundColor: `${circuitoColor}10` }}>
                                                            <div className="p-2 text-center border-r" style={{ borderColor: `${circuitoColor}30` }}>Ida</div>
                                                            <div className="p-2 text-center">Vuelta</div>
                                                        </div>
                                                        {/* Usar el array más largo para determinar el número de filas */}
                                                        {Array.from({ length: Math.max(horario.ida.length, horario.vuelta.length) }).map((_, rowIndex) => (
                                                            <div
                                                                key={`row-${horario.titulo}-${rowIndex}`}
                                                                className="grid grid-cols-2"
                                                                style={{
                                                                    backgroundColor: rowIndex % 2 === 0 ? `${circuitoColor}05` : 'white'
                                                                }}
                                                            >
                                                                <div className="p-2 text-center border-r" style={{ borderColor: `${circuitoColor}30` }}>
                                                                    {rowIndex < horario.ida.length ? horario.ida[rowIndex] : '-'}
                                                                </div>
                                                                <div className="p-2 text-center">
                                                                    {rowIndex < horario.vuelta.length ? horario.vuelta[rowIndex] : '-'}
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
                        ) : (
                            <div className="flex items-center mb-4">
                                <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                    <Clock style={{ color: circuitoColor }} size={20} />
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Donde tomarlo:</span> <span className="underline">{infoDestino.horarios}</span>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}