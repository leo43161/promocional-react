import { useRef } from 'react';
import DestinoCard from './DestinoCard'
import BotonesPlanifica from './BotonesPlanifica'
import { useDispatch, useSelector } from 'react-redux';
import Alojamientos from './Alojamientos';
import Actividades from './Actividades';
import Guias from './Guias';
import { Search, X } from 'lucide-react';
import BusquedaItinerario from './BusquedaItinerario';
import { setSearchDestino } from '@/redux/features/itinerarioSlice';
import { getCurrentLanguage } from '@/utils';
import { useRouter } from 'next/router';


export default function CircuitoSec() {
    const dispatch = useDispatch();
    const router = useRouter();
    const inputRef = useRef(null);
    const lenguaje = getCurrentLanguage(router.query);
    const {
        activeComponent,
        circuitoSelected,
        favoritos,
        searchDestino
    } = useSelector(state => state.itinerarioReducer.value);


    const handleChange = (event) => {
        console.log(event.target.value);
        dispatch(setSearchDestino(event.target.value));
    };

    const handleKeyDown = (event) => {
        // Si la tecla presionada es 'Enter'
        if (event.key === 'Enter') {
            // Quitamos el foco del input, lo que oculta el teclado
            inputRef.current.blur();
        }
    };

    const renderActiveComponent = () => {
        if (searchDestino !== '' && activeComponent === 'destinos') return <BusquedaItinerario search={searchDestino} />
        switch (activeComponent) {
            case 'destinos':
                return <DestinoCard />;
            case 'alojamientos':
                // En un caso real, aquí iría el componente <Alojamientos />
                return <Alojamientos />;
            case 'prestadores':
                // Placeholder, crea tu componente <Autos />
                return <Actividades></Actividades>;
            case 'guias':
                // Placeholder, crea tu componente <Mapas />
                return <Guias></Guias>;
            default:
                return <p>No se ha seleccionado ninguna sección</p>;
        }
    };
    return (
        <div>
            <div className="grid grid-cols-7 relative">
                <div className="items-center col-span-7 grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-5 mx-4 lg:mx-12 mt-4 lg:mt-8 mb-2">
                    <h2
                        className={`hidden lg:block uppercase font-bold md:text-5xl xl:text-7xl xl:leading-[70px] text-${circuitoSelected.color}`}
                        style={{ color: circuitoSelected.color }}
                    >
                        {searchDestino !== '' ? `Busqueda` : `${circuitoSelected.nombre}`}
                    </h2>
                    <div
                        className='lg:leading-[35px] col-span-7 lg:col-span-2 xl:col-span-1 flex items-center gap-3 mb-3 py-2 md:py-0 md:mb-0'
                    >
                        {activeComponent === 'destinos' ? <div className='w-full'>
                            <div className="relative w-full mx-auto">
                                <input
                                    ref={inputRef}
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    placeholder={lenguaje && lenguaje.code === "EN" ? "Search..." : "Buscar..."}
                                    value={searchDestino}
                                    onChange={handleChange}
                                    className="w-full px-4 py-1 focus:outline-none text-gray-800 placeholder-gray-500 placeholder:text-2xl transition-all duration-200 ease-in-out border-b-2 border-b-secondary text-2xl focus:border-b-primary ps-8"
                                    aria-label="Campo de búsqueda"
                                />
                                <div className="absolute inset-y-0 left-1 bottom-1.5 flex items-center pointer-events-none">
                                    <Search size={21} className="text-gray-400" />
                                </div>
                                {searchDestino && (
                                    <button
                                        type="button"
                                        onClick={() => dispatch(setSearchDestino(''))}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 rounded-full p-1 transition-colors duration-200"
                                        aria-label="Borrar búsqueda"
                                    >
                                        {/* Icono X de Lucide React */}
                                        <X size={21} className="text-gray-500" />
                                    </button>
                                )}
                            </div>
                        </div> :
                            <span className={`text-[29px] md:text-4xl text-center xl:text-[45px] xl:text-center font-semibold text-neutral-500 leading-[34px]`}>
                                Aumentá tus pulsaciones en una aventura rodeado de naturaleza
                            </span>
                        }
                    </div>

                    <div className="lg:flex lg:flex-row gap-6 lg:justify-end items-center col-span-7 lg:col-span-2 xl:col-span-1 mb-2 md:mb-0">
                        <div className='flex justify-center mb-3'>
                            {lenguaje && lenguaje.code !== "EN" && <p className={`bg-neutral-400 rounded-md my-2 text-white w-fit py-2 px-4 lg:bg-transparent lg:text-neutral-400 font-semibold lg:pt-0 italic text-2xl xl:text-3xl text-center lg:text-right leading-6 md:my-0 md:py-0`}>Armá tu itinerario <br className='hidden lg:block' /> y descargalo</p>}
                            {lenguaje && lenguaje.code === "EN" && <p className={`bg-neutral-400 rounded-md my-2 text-white w-fit py-2 px-4 lg:bg-transparent lg:text-neutral-400 font-semibold lg:pt-0 italic text-2xl xl:text-3xl text-center lg:text-right leading-6 md:my-0 md:py-0`}>Create your itinerary <br className='hidden lg:block' /> and download it</p>}
                        </div>
                        <BotonesPlanifica />
                    </div>
                </div>
                {/* <Image src={circuito.imagen} width={500} height={500} alt={circuito.nombre} className="absolute -bottom-10 left-0" /> */}
                <div className="col-span-7 mt-4 mx-4 lg:mx-12">
                    {renderActiveComponent()}
                    {/* <DestinoCard circuito={circuito} favoritos={favoritos} actualizarFavoritos={actualizarFavoritos} /> */}
                </div>
            </div>
        </div>
    )
}
