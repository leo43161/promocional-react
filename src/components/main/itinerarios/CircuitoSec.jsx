import DestinoCard from './DestinoCard'
import BotonesPlanifica from './BotonesPlanifica'
import { useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import Alojamientos from './Alojamientos';


export default function CircuitoSec() {
    const {
        activeComponent,
        circuitoSelected,
        total
    } = useSelector(state => state.itinerarioReducer.value);

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'destinos':
                return <DestinoCard />;
            case 'alojamientos':
                // En un caso real, aquí iría el componente <Alojamientos />
                return <Alojamientos />;
            case 'autos':
                // Placeholder, crea tu componente <Autos />
                return <div className="p-4 text-center">Componente de Autos</div>;
            case 'mapas':
                // Placeholder, crea tu componente <Mapas />
                return <div className="p-4 text-center">Componente de Mapas</div>;
            default:
                return null;
        }
    };
    return (
        <div>
            <div className="grid grid-cols-7 relative">
                <div className="items-center col-span-7 grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-5 mx-4 lg:mx-12 mt-4 lg:mt-8 mb-2">

                    <h2 className={`hidden lg:block uppercase font-bold md:text-5xl xl:text-7xl xl:leading-[70px] text-${circuitoSelected.color}`} style={{ color: circuitoSelected.color }}>{circuitoSelected.nombre}</h2>

                    {/* <p className={`text-[24px] md:text-4xl text-left xl:text-[45px] xl:text-center font-400 text-neutral-500 leading-[28px] lg:leading-[35px] col-span-7 lg:col-span-2 xl:col-span-1 w-full mb-3`}>{circuito.destacado}</p> */}
                    <div className='lg:leading-[35px] col-span-7 lg:col-span-2 xl:col-span-1 flex items-center gap-3 mb-3 py-2'>
                        <span className={`text-[29px] md:text-4xl text-center xl:text-[45px] xl:text-center font-semibold text-neutral-500 leading-[34px]`}>
                            Selecciona los destinos pulsando
                            <span className='px-2 relative'>
                                <Plus
                                    className={`text-${circuitoSelected.color} rounded-full bg-white border border-neutral-200 p-2 h-12 w-12 xl:h-14 xl:w-14 lg:h-12 lg:w-12 shadow-lg inline`}
                                    color={circuitoSelected.color}
                                    strokeWidth={2.5}
                                />
                                <span className='absolute text-[18px]/1 rounded-full bottom-0 right-0 pe-3 font-bold' style={{ color: circuitoSelected.color }}>
                                    {total}
                                </span>
                            </span>
                            y crea tu itinerario
                        </span>
                    </div>

                    <div className="lg:flex lg:flex-row gap-6 lg:justify-end items-center col-span-7 lg:col-span-2 xl:col-span-1 mb-2">
                        <div className='flex justify-center mb-3'>
                            <p className={`bg-neutral-400 rounded-md my-2 text-white w-fit py-2 px-4 lg:bg-transparent lg:text-neutral-400 font-semibold lg:pt-0 italic text-2xl xl:text-3xl text-center lg:text-right leading-6`}>Armá tu itinerario <br className='hidden lg:block' /> y descargalo</p>
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
