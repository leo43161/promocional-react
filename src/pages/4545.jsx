import React, { useState } from 'react';
import { MapPin, Calendar, Star, Info, ChevronRight, Wind, Waves, Mountain, Bike, CheckCircle, ShieldCheck } from 'lucide-react';

// --- MOCK DATA BASADA EN TU ANÁLISIS ---
const freeTours = [
  {
    id: 1,
    title: "City Tour Histórico: Cuna de la Independencia",
    duration: "2.5 horas",
    language: "Español / Inglés",
    location: "Plaza Independencia, SMT",
    image: "https://www.tucumanturismo.gob.ar/public/img/casahistorica_nrxunv4s_16-07-2025.jpg"
  }
];

const paidExcursions = [
  {
    id: 101,
    category: "Aire",
    title: "Vuelo en Parapente Bipaza",
    provider: "Loma Bola Parapente",
    location: "San Javier",
    price: "Consultar",
    rating: 4.9,
    icon: Wind,
    image: "https://www.tucumanturismo.gob.ar/public/img/parapente1_s0ul3h7p_16-07-2025.jpg"
  },
  {
    id: 102,
    category: "Agua",
    title: "Aventura en Kayak y Rappel",
    provider: "Tucumán Kayak Club",
    location: "El Cadillal",
    price: "Consultar",
    rating: 4.8,
    icon: Waves,
    image: "https://www.tucumanturismo.gob.ar/public/img/_MG_6030-Editar_h34gutlm_16-01-2026.jpg"
  },
  {
    id: 103,
    category: "Tierra",
    title: "Cabalgata de Montaña",
    provider: "Cabra Horco Expediciones",
    location: "Raco",
    price: "Consultar",
    rating: 4.9,
    icon: Mountain,
    image: "https://www.tucumanturismo.gob.ar/public/img/casade_pmtlzb9l_16-07-2025.jpeg"
  },
  {
    id: 104,
    category: "Tierra",
    title: "Trekking Alta Montaña",
    provider: "Adri y Fer Guías",
    location: "Tafí del Valle",
    price: "Consultar",
    rating: 5.0,
    icon: Mountain,
    image: "https://www.tucumanturismo.gob.ar/public/img/sender_vmhg5vte_16-07-2025.jpg"
  },
  {
    id: 105,
    category: "Aventura",
    title: "Circuito Tirolesa Extrema",
    provider: "Raki S.A.S.",
    location: "Yerba Buena",
    price: "Consultar",
    rating: 4.7,
    icon: Wind,
    image: "https://www.tucumanturismo.gob.ar/public/img/rappel_g189d4yq_16-07-2025.jpg"
  },
  {
    id: 106,
    category: "Tierra",
    title: "Circuito Mountain Bike",
    provider: "+40 Punto Bike",
    location: "El Cadillal",
    price: "Consultar",
    rating: 4.8,
    icon: Bike,
    image: "https://www.tucumanturismo.gob.ar/public/img/mounta_d28pzfuo_16-07-2025.jpg"
  }
];

export default function FWT() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const categories = ["Todos", "Aire", "Agua", "Tierra", "Aventura"];

  const filteredExcursions = activeCategory === "Todos" 
    ? paidExcursions 
    : paidExcursions.filter(ex => ex.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-8 w-8 text-orange-600" />
              <span className="font-bold text-xl tracking-tight text-gray-900">Tucu<span className="text-orange-600">Tours</span></span>
            </div>
            <div className="hidden md:flex space-x-8 font-medium text-gray-600">
              <a href="#free-tours" className="hover:text-orange-600 transition">Free Walking Tours</a>
              <a href="#excursiones" className="hover:text-orange-600 transition">Turismo Activo</a>
              <a href="#nosotros" className="hover:text-orange-600 transition">Nosotros</a>
            </div>
            <div>
              <button className="bg-orange-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-700 transition shadow-md">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (EMBUDO: ATRACCIÓN) --- */}
      <div className="relative bg-gray-900 h-[500px] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://www.tucumanturismo.gob.ar/public/img/listas/casahi_skifgon3_10-09-2025.jpg" 
            alt="San Miguel de Tucuman Plaza" 
            className="w-full h-full object-cover opacity-40"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/2000x800?text=San+Miguel+de+Tucuman'; }}
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-[3.1em] font-extrabold text-white mb-6 drop-shadow-lg">
            Descubrí la cuna de la historia... <br/>
            <span className="text-orange-500">pagando lo que vos quieras.</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Unite al mejor Free Walking Tour de San Miguel de Tucumán. Reserva gratis hoy y viví la experiencia con nuestros embajadores locales.
          </p>
          
          {/* Main CTA Widget */}
          <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col sm:flex-row items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center px-4 py-2 w-full sm:w-auto">
              <Calendar className="text-gray-400 mr-2" />
              <input type="date" className="text-gray-700 outline-none bg-transparent w-full" />
            </div>
            <div className="hidden sm:block w-px h-8 bg-gray-300 mx-2"></div>
            <div className="flex items-center px-4 py-2 w-full sm:w-auto">
              <span className="text-gray-500 mr-2">Participantes:</span>
              <select className="text-gray-700 outline-none bg-transparent font-medium">
                <option>2 Personas</option>
                <option>1 Persona</option>
                <option>3 Personas</option>
                <option>Grupo (+4)</option>
              </select>
            </div>
            <a href="#free-tours" className="w-full sm:w-auto bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition mt-2 sm:mt-0 text-center">
              Reservar Gratis
            </a>
          </div>
        </div>
      </div>

      {/* --- TRUST BANNER --- */}
      <div className="bg-emerald-50 border-b border-emerald-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-6 text-emerald-800 text-sm font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Guías 100% Oficiales y Registrados</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-emerald-300 rounded-full"></div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Prestadores habilitados</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-emerald-300 rounded-full"></div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-600" fill="currentColor" />
            <span>Experiencias verificadas</span>
          </div>
        </div>
      </div>

      {/* --- FREE TOURS SECTION (PRODUCTO GANCHO) --- */}
      <section id="free-tours" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Free Tours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Empezá tu viaje por la capital tucumana. Caminá, aprendé y dejá la propina que consideres justa al finalizar.</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row max-w-4xl mx-auto">
          <div className="md:w-2/5 h-64 md:h-auto relative">
            <img src={freeTours[0].image} alt="City Tour" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              MÁS POPULAR
            </div>
          </div>
          <div className="p-8 md:w-3/5 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{freeTours[0].title}</h3>
            <p className="text-gray-600 mb-6">Un viaje en el tiempo por la Cuna de la Independencia. Recorreremos la Casa Histórica, la Plaza Independencia, las iglesias fundacionales y la rica arquitectura francesa de nuestra ciudad.</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1 text-orange-500" /> {freeTours[0].duration}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Info className="w-4 h-4 mr-1 text-orange-500" /> {freeTours[0].language}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1 text-orange-500" /> {freeTours[0].location}
              </div>
            </div>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition flex items-center justify-center w-full sm:w-auto">
              Ver Fechas Disponibles <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* --- EXCURSIONES PAGAS (UP-SELLING / TURISMO ACTIVO) --- */}
      <section id="excursiones" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Escapá de la ciudad: Turismo Activo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">¿Ya conociste la ciudad? Es hora de la aventura. Reservá excursiones con los mejores prestadores oficiales de Tucumán.</p>
          </div>

          {/* Categoría Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium transition ${
                  activeCategory === cat 
                  ? 'bg-orange-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExcursions.map((excursion) => (
              <div key={excursion.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group cursor-pointer border border-gray-100 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={excursion.image} 
                    alt={excursion.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-orange-600">
                    <excursion.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{excursion.title}</h3>
                    <div className="flex items-center text-sm font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                      <Star className="w-3 h-3 mr-1" fill="currentColor" />
                      {excursion.rating}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 flex-grow">Operador: <span className="font-medium text-gray-700">{excursion.provider}</span></p>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      {excursion.location}
                    </div>
                    <button className="text-orange-600 font-bold text-sm flex items-center group-hover:text-orange-700">
                      Ver más <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-900 hover:text-white transition">
                Ver todo el catálogo (+40 opciones)
             </button>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Sos un guía oficial o prestador turístico?</h2>
          <p className="text-orange-100 text-lg mb-8">Sumate a nuestra plataforma, digitalizá tus reservas y conectá con miles de turistas que visitan Tucumán cada mes.</p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
            Registrar mi actividad
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-lg tracking-tight text-white">Tucumán<span className="text-orange-500">Tours</span></span>
          </div>
          <p className="text-sm">© 2024 Tucumán Tours. Todos los derechos reservados. <br className="md:hidden"/> Hecho con pasión en el Norte Argentino.</p>
        </div>
      </footer>

    </div>
  );
}

FWT.getLayout = function getLayout(page) {
  return page;
};