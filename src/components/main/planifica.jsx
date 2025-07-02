import { useEffect, useState } from 'react';
import { Home, Bus, Car, Users, Building, MapPin, Calendar, Map } from 'lucide-react';
import Link from 'next/link';
import { useLenis } from 'lenis/react'
import {
  languages, // sigues necesitando 'languages' para el selector de idioma
  getCurrentLanguage,
} from '@/utils'; //
import { useRouter } from 'next/router';

// Este es un componente de tabs para planificación de viaje que muestra opciones
// como alojamiento, transporte, alquiler de autos, etc.
export default function Planifica() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(languages[0]); //
  const [activeTab, setActiveTab] = useState('transporte');
  const lenis = useLenis();
  const travelOptions = [
    {
      id: 'alojamiento',
      icon: <Home size={30} />,
      title: 'Alojamiento',
      description: '¿Buscas dónde hospedarte durante tu viaje? Encuentra las mejores opciones de hoteles, hostales y apartamentos.',
      image: 'images/main/hotel.jpg',
      link: 'alojamientos'
    },
    {
      id: 'transporte',
      icon: <Bus size={30} />,
      title: 'Transporte',
      description: '¿Quieres conocer todo lo que Tucumán tiene para ofrecerte y no sabes cómo moverte? Encontrá los horarios y valores de los viajes en micro hacia todos los puntos turísticos de la provincia.',
      image: 'images/main/transporte.jpg',
      link: 'transporte'
    },
    {
      id: 'alquiler-autos',
      icon: <Car size={30} />,
      title: 'Alquiler de Autos',
      description: 'Alquila un auto y disfruta de la libertad de moverte a tu propio ritmo durante tus vacaciones.',
      image: 'images/main/alquiler.jpg',
      link: 'autos'
    },
    {
      id: 'prestadores',
      icon: <Users size={30} />,
      title: 'Prestadores activos',
      description: 'Conoce a todos los prestadores de servicios turísticos disponibles para hacer de tu viaje una experiencia inolvidable.',
      image: 'images/main/activos.jpg',
      link: 'prestadores'
    },
    {
      id: 'agencias',
      icon: <Building size={30} />,
      title: 'Agencias',
      description: 'Contacta con agencias de viajes locales que te ayudarán a organizar tu estadía y tours por la región.',
      image: 'images/main/agencias.jpg',
      link: 'agencias'
    },
    {
      id: 'guias',
      icon: <MapPin size={30} />,
      title: 'Guías de Turismo',
      description: 'Contrata guías profesionales que te mostrarán los mejores lugares y te contarán la historia y cultura local.',
      image: 'images/main/guia.jpg',
      link: 'guias'
    },
    {
      id: 'itinerarios',
      icon: <Calendar size={30} />,
      title: 'Itinerarios',
      description: 'Descubre rutas prediseñadas para aprovechar al máximo tu tiempo y visitar los lugares más destacados.',
      image: 'images/main/itinerarios.jpg',
      link: 'subsecciones/lista/45'
    },
    {
      id: 'mapas',
      icon: <Map size={30} />,
      title: 'Mapas y Folletos',
      description: 'Accede a mapas detallados y folletos informativos para orientarte durante tu visita.',
      image: 'images/main/mapas.jpg',
      link: 'subsecciones/lista/46'
    }
  ];
  const travelOptionsENG = [
    {
      id: 'accommodations',
      icon: <Home size={30} />,
      title: 'Accommodations',
      description: 'Tucumán offers a wide variety of Hotels, Cabins, Rural Estates, and more, providing a range of options to suit your budget and preferences. You can check the list of accommodations here.',
      image: 'images/main/hotel.jpg',
      link: 'alojamientos'
    },
    {
      id: 'urban-transport',
      icon: <Bus size={30} />,
      title: 'Urban Transport',
      description: "Do you want to know everything that Tucumán has to offer and you don't have your vehicle? Find out the schedules and prices of bus trips to all the tourist spots in the province.",
      image: 'images/main/transporte.jpg',
      link: 'transporte'
    },
    {
      id: 'car-rentals',
      icon: <Car size={30} />,
      title: 'Car Rentals',
      description: 'Meet all the car rental agencies to assemble your itinerary in the province.',
      image: 'images/main/alquiler.jpg',
      link: 'autos'
    },
    {
      id: 'providers',
      icon: <Users size={30} />,
      title: 'Active Tourism Providers',
      description: 'Meet our authorized active tourism providers and venture into our landscapes safely.',
      image: 'images/main/activos.jpg',
      link: 'prestadores'
    },
    {
      id: 'agencies',
      icon: <Building size={30} />,
      title: 'Agencies',
      description: 'Meet all the incoming travel agencies to embark on a trip through the province.',
      image: 'images/main/agencias.jpg',
      link: 'agencias'
    },
    {
      id: 'guides',
      icon: <MapPin size={30} />,
      title: 'Tourist Guides',
      description: 'Meet our qualified tour guides and live an unforgettable and safe experience.',
      image: 'images/main/guia.jpg',
      link: 'guias'
    },
    {
      id: 'itineraries',
      icon: <Calendar size={30} />,
      title: 'Itineraries',
      description: "Are you planning to visit Tucumán and still don't know how to organize your trip? Please get to know the different itineraries we propose to make the most of your stay.",
      image: 'images/main/itinerarios.jpg',
      link: 'subsecciones/lista/67'
    },
    {
      id: 'maps',
      icon: <Map size={30} />,
      title: 'Maps and Brochures',
      description: 'Download here the brochures and maps of the different tourist circuits in the province of Tucumán.',
      image: 'images/main/mapas.jpg',
      link: 'subsecciones/lista/68'
    }
  ];
  const lenguageOptions = { "ES": travelOptions, "EN": travelOptionsENG };

  // Encontrar la opción activa
  const activeOption = lenguageOptions[selectedLang.code].find(option => option.id === activeTab);

  useEffect(() => {
    if (router.isReady) {
      const currentLangObject = getCurrentLanguage(router.query);
      setSelectedLang(currentLangObject);
      setActiveTab(lenguageOptions[currentLangObject.code][0].id);
    }
  }, [router.isReady, router.query]);

  const handleActiveTab = (id) => {
    setActiveTab(id);
    if (lenis) {
      lenis.scrollTo('#infoActive', {
        duration: 2,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Optional: easing function
        offset: -110,
      });
    }
  }

  return (
    <div className="w-full mx-auto px-4 md:px-0 flex flex-col items-center mb-6">
      <h2 className="text-5xl text-gray-500 mb-6 text-center">PLANIFICA TU VIAJE</h2>

      {/* Contenedor de tabs - responsive */}
      <div className="overflow-x-auto no-scrollbar mb-4 w-full flex justify-center">
        <div className="grid grid-cols-2 sm:flex gap-7 w-full">
          {lenguageOptions[selectedLang.code].map((option) => (
            <button
              key={option.id}
              onClick={() => handleActiveTab(option.id)}
              className={`flex flex-col items-center justify-around min-w-24 px-2 py-2 flex-1 ${activeTab === option.id ? 'bg-secondary text-white' : ' text-gray-700 hover:bg-gray-200'
                }`}
            >
              <div className="mb-2">{option.icon}</div>
              <span className="text-center font-semibold md:text-[1.2em] md:text-[1.2em]/6">{option.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido del tab activo - responsive */}
      {activeOption && (
        <div className="md:relative w-full" id='infoActive'>
          {/* Vista móvil - descripción arriba, imagen debajo */}
          <div className="bg-gray-100 p-6 md:absolute md:left-0 md:top-6 md:z-10 md:bg-gray-100/80 md:w-4/11">
            <h3 className="text-2xl text-gray-700 font-medium mb-3">{activeOption.title}</h3>
            <p className="text-gray-600 mb-4">{activeOption.description}</p>
            <Link href={activeOption.link} className="bg-orange-500 text-white text-[1.1em] py-1 px-4 rounded hover:bg-orange-600 inline-block">
              Conocé más aquí
            </Link>
          </div>

          {/* Imagen - responsive */}
          <img
            src={activeOption.image}
            alt={activeOption.title}
            className="w-full md:w-6/8 object-cover mt-0 md:mt-0 md:h-[65vh] xl:h-[47vh] ms-auto"
          />
        </div>
      )}
    </div>
  );
}