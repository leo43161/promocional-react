import DestinoCard from './DestinoCard'
import BotonesPlanifica from './BotonesPlanifica'
import { useSelector } from 'react-redux';
import Alojamientos from './Alojamientos';
import Actividades from './Actividades';
import Guias from './Guias';


export default function CircuitoSec() {
    const {
        activeComponent,
        circuitoSelected,
        favoritos
    } = useSelector(state => state.itinerarioReducer.value);

    const renderActiveComponent = () => {
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
                return null;
        }
    };
    return (
        <div>
            <div className="grid grid-cols-7 relative">
                <div className="items-center col-span-7 grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-5 mx-4 lg:mx-12 mt-4 lg:mt-8 mb-2">

                    <h2 className={`hidden lg:block uppercase font-bold md:text-5xl xl:text-7xl xl:leading-[70px] text-${circuitoSelected.color}`} style={{ color: circuitoSelected.color }}>{circuitoSelected.nombre}</h2>
                    <div className='lg:leading-[35px] col-span-7 lg:col-span-2 xl:col-span-1 flex items-center gap-3 mb-3 py-2'>
                        <span className={`text-[29px] md:text-4xl text-center xl:text-[45px] xl:text-center font-semibold text-neutral-500 leading-[34px]`}>
                            Aumentá tus pulsaciones en una aventura rodeado de naturaleza
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
