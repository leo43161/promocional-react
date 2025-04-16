import { useState, useEffect } from 'react';
import { DollarSign, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';

// Datos de ejemplo (placeholder)
const CIRCUITOS = [
    { id: 'choromoro', nombre: 'Circuito Choromoro', color: "#EA5B1C" },
    { id: 'sur', nombre: 'Circuito Sur', color: "#4F7B58" },
    { id: 'valles', nombre: 'Circuito Valles Calchaquíes', color: "#9D2C2C" },
    { id: 'yungas', nombre: 'Circuito Yungas', color: "#F18900" }
];

const DESTINOS = {
    choromoro: ['Simoca', 'La cocha', 'Lules', 'Famaillá', 'Monteros', 'Concepción', 'Alberdi'],
    sur: ['La cocha', 'Simoca', 'Alberdi', 'Famaillá', 'Monteros'],
    valles: ['Bella Vista', 'Río Colorado', 'Atahona', 'Monteagudo', 'Lamadrid', 'Taco Ralo', 'Samay Cochuna'],
    yungas: ['Monteros', 'Concepción', 'La cocha', 'Taco Ralo']
};

// Estructura de datos mejorada para manejar diferentes tipos de horarios
const LINEAS = {
    'La cocha': {
        nombre: 'EXPREBUS',
        precio: 4850,
        boleteria: 'Boletería N° 63/64',
        telefono: '+543814285010',
        horarios: [
            {
                titulo: 'Lunes a viernes',
                ida: ['05:30', '08:30', '12:30', '14:30', '17:00', '18:30', '20:45'],
                vuelta: ['04:30', '05:45', '06:25', '09:25', '12:10', '15:50', '19:25', '21:10', '22:00']
            },
            {
                titulo: 'Sábados y domingos',
                ida: ['05:30', '08:30', '12:30', '14:30', '17:00', '18:30', '20:45'],
                vuelta: ['05:45', '06:25', '09:25', '12:10', '15:50', '19:25', '21:10', '22:00']
            }
        ]
    },
    'Simoca': {
        nombre: 'EXPREBUS',
        precio: 3900,
        boleteria: 'Boletería N° 63/64',
        telefono: '+543814285010',
        horarios: [
            {
                titulo: 'Lunes a viernes',
                ida: ['06:30', '09:30', '13:30', '16:30', '18:00'],
                vuelta: ['05:30', '08:45', '11:25', '14:10', '17:50']
            },
            {
                titulo: 'Sábados y domingos',
                ida: ['07:30', '11:30', '15:30', '18:00'],
                vuelta: ['06:45', '10:25', '14:10', '19:00']
            }
        ]
    },
    'Lules': {
        nombre: 'EXPREBUS',
        precio: 3500,
        boleteria: 'Boletería N° 65',
        telefono: '+543814285011',
        horarios: [
            {
                titulo: 'Lunes a sábados',
                ida: ['07:30', '10:30', '14:30', '17:30', '19:00'],
                vuelta: ['06:30', '09:45', '13:25', '16:10', '18:50']
            },
            {
                titulo: 'Domingos',
                ida: ['08:30', '12:30', '16:30'],
                vuelta: ['07:45', '11:25', '17:10']
            }
        ]
    },
    'Monteros': {
        nombre: 'EXPREBUS',
        precio: 4200,
        boleteria: 'Boletería N° 67',
        telefono: '+543814285012',
        horarios: [
            {
                titulo: 'Todos los días',
                ida: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
                vuelta: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00']
            }
        ]
    },
    // Datos para los demás destinos serían similares
};

export default function BuscadorTransporte() {
    const [circuitoActivo, setCircuitoActivo] = useState('sur');
    const [destinoSeleccionado, setDestinoSeleccionado] = useState('La cocha');
    const [mostrarHorarios, setMostrarHorarios] = useState(false);
    const [infoDestino, setInfoDestino] = useState(null);

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
                <p className="text-gray-600 uppercase text-sm font-semibold">ENCONTRÁ LA LÍNEA QUE SE ADAPTE A TU DESTINO EN LA COCHA</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Lista de Destinos */}
                <div className="w-full md:w-1/4">
                    <div className="bg-white rounded-lg shadow-md">
                        {DESTINOS[circuitoActivo].map((destino) => (
                            <button
                                key={destino}
                                className={`w-full text-left px-4 py-3 border-b last:border-b-0 transition-colors hover:bg-gray-50`}
                                style={{ 
                                    backgroundColor: destinoSeleccionado === destino ? `${circuitoColor}15` : '',
                                    fontWeight: destinoSeleccionado === destino ? '500' : '400'
                                }}
                                onClick={() => setDestinoSeleccionado(destino)}
                            >
                                {destino}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Panel de Información */}
                {infoDestino && (
                    <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md p-4">
                        {/* Nombre de la línea */}
                        <div className="mb-4">
                            <div className="inline-block text-white px-4 py-1 rounded-md font-medium" style={{ backgroundColor: circuitoColor }}>
                                {infoDestino.nombre}
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="relative w-full h-96 bg-gray-200 mb-6 rounded-md overflow-hidden">
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
                                <span className="font-medium text-gray-700">Precio:</span> ${infoDestino.precio.toLocaleString()}
                            </div>
                        </div>

                        {/* Boletería */}
                        <div className="flex items-center mb-4">
                            <div className="p-2 rounded-full mr-3" style={{ backgroundColor: lightColor }}>
                                <MapPin style={{ color: circuitoColor }} size={20} />
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Donde tomarlo:</span> {infoDestino.boleteria} |
                                <span className="font-medium text-gray-700"> Teléfono:</span>
                                <a href={`tel:${infoDestino.telefono}`} className="ml-1" style={{ color: circuitoColor }}>
                                    {infoDestino.telefono}
                                </a>
                            </div>
                        </div>

                        {/* Horarios colapsable */}
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
                    </div>
                )}
            </div>
        </div>
    );
}