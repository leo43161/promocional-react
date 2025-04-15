import { useState } from 'react';
import { Home, Bus, Car, Users, Building, MapPin, Calendar, Map } from 'lucide-react';
import Link from 'next/link';

// Este es un componente de tabs para planificación de viaje que muestra opciones
// como alojamiento, transporte, alquiler de autos, etc.
export default function Planifica() {
  // Array de opciones de planificación de viaje
  const travelOptions = [
    {
      id: 'alojamiento',
      icon: <Home size={30} />,
      title: 'Alojamiento',
      description: '¿Buscas dónde hospedarte durante tu viaje? Encuentra las mejores opciones de hoteles, hostales y apartamentos.',
      image: '/images/main/activos.jpg',
      link: '/alojamiento'
    },
    {
      id: 'transporte',
      icon: <Bus size={30} />,
      title: 'Transporte',
      description: '¿Quieres conocer todo lo que Tucumán tiene para ofrecerte y no sabes cómo moverte? Encontrá los horarios y valores de los viajes en micro hacia todos los puntos turísticos de la provincia.',
      image: '/images/main/transporte.jpg',
      link: '/transporte'
    },
    {
      id: 'alquiler-autos',
      icon: <Car size={30} />,
      title: 'Alquiler de Autos',
      description: 'Alquila un auto y disfruta de la libertad de moverte a tu propio ritmo durante tus vacaciones.',
      image: '/images/main/alquiler.jpg',
      link: '/alquiler-autos'
    },
    {
      id: 'prestadores',
      icon: <Users size={30} />,
      title: 'Prestadores activos',
      description: 'Conoce a todos los prestadores de servicios turísticos disponibles para hacer de tu viaje una experiencia inolvidable.',
      image: '/images/main/activos.jpg',
      link: '/prestadores'
    },
    {
      id: 'agencias',
      icon: <Building size={30} />,
      title: 'Agencias',
      description: 'Contacta con agencias de viajes locales que te ayudarán a organizar tu estadía y tours por la región.',
      image: '/images/main/agencias.jpg',
      link: '/agencias'
    },
    {
      id: 'guias',
      icon: <MapPin size={30} />,
      title: 'Guías de Turismo',
      description: 'Contrata guías profesionales que te mostrarán los mejores lugares y te contarán la historia y cultura local.',
      image: '/images/main/guia.jpg',
      link: '/guias-turismo'
    },
    {
      id: 'itinerarios',
      icon: <Calendar size={30} />,
      title: 'Itinerarios',
      description: 'Descubre rutas prediseñadas para aprovechar al máximo tu tiempo y visitar los lugares más destacados.',
      image: '/images/main/itinerarios.jpg',
      link: '/itinerarios'
    },
    {
      id: 'mapas',
      icon: <Map size={30} />,
      title: 'Mapas y Folletos',
      description: 'Accede a mapas detallados y folletos informativos para orientarte durante tu visita.',
      image: '/images/main/mapas.jpg',
      link: '/mapas-folletos'
    }
  ];

  // Estado para el tab activo
  const [activeTab, setActiveTab] = useState('transporte');

  // Encontrar la opción activa
  const activeOption = travelOptions.find(option => option.id === activeTab);

  return (
    <div className="w-full mx-auto px-4 md:px-0 flex flex-col items-center mb-6">
      <h2 className="text-3xl text-gray-500 mb-6 text-center">PLANIFICA TU VIAJE</h2>
      
      {/* Contenedor de tabs - responsive */}
      <div className="overflow-x-auto no-scrollbar mb-4 w-full flex justify-center">
        <div className="grid grid-cols-2 sm:flex gap-7 w-full">
          {travelOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveTab(option.id)}
              className={`flex flex-col items-center justify-around min-w-24 px-2 py-2 flex-1 ${
                activeTab === option.id ? 'bg-secondary text-white' : ' text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="mb-2">{option.icon}</div>
              <span className="text-center font-semibold md:text-sm">{option.title}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Contenido del tab activo - responsive */}
      {activeOption && (
        <div className="md:relative w-full">
          {/* Vista móvil - descripción arriba, imagen debajo */}
          <div className="bg-gray-100 p-6 md:absolute md:left-0 md:top-6 md:z-10 md:bg-gray-100/80 md:w-4/11">
            <h3 className="text-2xl text-gray-700 font-medium mb-3">{activeOption.title}</h3>
            <p className="text-gray-600 mb-4">{activeOption.description}</p>
            <Link href={activeOption.link} className="bg-orange-500 text-white text-sm py-1 px-4 rounded hover:bg-orange-600 inline-block">
              Conocé más aquí
            </Link>
          </div>
          
          {/* Imagen - responsive */}
          <img 
            src={activeOption.image} 
            alt={activeOption.title}
            className="w-full md:w-6/8 object-cover mt-0 md:mt-0 md:h-[65vh] ms-auto" 
          />
        </div>
      )}
    </div>
  );
}