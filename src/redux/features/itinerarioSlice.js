
/* import circuitos from '@/data/circuitos'; */
import icons from '@/utils/icons';
import { createSlice } from '@reduxjs/toolkit';

// Define los posibles componentes que se pueden mostrar.
const componentTypes = ['destinos', 'alojamientos', 'prestadores', 'guias'];

const { HistoricaLogo, HistoricaLogoMb, YungasLogo, YungasLogoMb, ChoromoroLogo, ChoromoroLogoMb, CalchaquiLogo, CalchaquiLogoMb, SurLogoMb, SurLogo } = icons;


const circuitos = [{
    id: 5,
    name: "historica",
    nombre: "Ciudad Histórica",
    logo: HistoricaLogo,
    img: "casah",
    color: "#01415C",
    bg: "#01415C",
    mb: HistoricaLogoMb
}, {
    id: 4,
    name: "yungas",
    nombre: "Yungas Tucumanas",
    logo: YungasLogo,
    mb: YungasLogoMb,
    img: "quetipi-inicio",
    color: "#66ac7c",
    bg: "#66ac7c",
}, {
    id: 2,
    name: "choromoro",
    nombre: "Valle De Choromoro",
    logo: ChoromoroLogo,
    mb: ChoromoroLogoMb,
    img: "pozoindio-inicio",
    color: "#FD5901",
    bg: "#FD5901",
}, {
    id: 3,
    name: "calchaqui",
    nombre: "Valle Calchaqui",
    logo: CalchaquiLogo,
    mb: CalchaquiLogoMb,
    img: "menhires-inicio",
    color: "#9E2D2C",
    bg: "#9E2D2C",
}, {
    id: 1,
    name: "sur",
    nombre: "Sur Tucumano",
    logo: SurLogo,
    mb: SurLogoMb,
    img: "sur",
    color: "#508E6D",
    bg: "#508E6D",
},
];

const initialState = {
    value: {
        circuitos,
        circuitoSelected: circuitos[0],
        activeComponent: componentTypes[0],
        favoritos: {
            historica: {
                destinos: [],
                alojamientos: [],
                prestadores: [],
                guias: [],
            },
            yungas: {
                destinos: [],
                alojamientos: [],
                prestadores: [],
                guias: [],
            },
            choromoro: {
                destinos: [],
                alojamientos: [],
                prestadores: [],
                guias: [],
            },
            calchaqui: {
                destinos: [],
                alojamientos: [],
                prestadores: [],
                guias: [],
            },
            sur: {
                destinos: [],
                alojamientos: [],
                prestadores: [],
                guias: [],
            },
        },
        total: 0,
        progress: 0,
    }
};

const itinerariosSlice = createSlice({
    name: 'itinerarios',
    initialState,
    reducers: {
        setActiveComponent: (state, action) => {
            if (componentTypes.includes(action.payload)) {
                state.value.activeComponent = action.payload;
            }
        },
        setFavorito: (state, action) => {
            const { type, item } = action.payload;
            const nameCircuito = state.value.circuitoSelected.name
            const existe = state.value.favoritos[nameCircuito][type].find((favorito) => favorito.id === item.id);
            if (existe) {
                state.value.favoritos[nameCircuito][type] = state.value.favoritos[nameCircuito][type].filter(
                    (favorito) => favorito.id !== item.id
                );
                state.value.total = state.value.total - 1;
            } else {
                state.value.favoritos[nameCircuito][type].push(item);
                state.value.total = state.value.total + 1;
            }
            const newProgress = (state.value.favoritos[nameCircuito].destinos.length / 3) * 100;
            state.value.progress = newProgress;
        },
        setCircuitoSelected: (state, action) => {
            const selectedCircuit = circuitos.find((c) => c.id === action.payload)
            const newProgress = (state.value.favoritos[selectedCircuit.name].destinos.length / 3) * 100;
            state.value.progress = newProgress;
            state.value.circuitoSelected = selectedCircuit;
        },
    },
});

// Exportamos la acción para poder usarla en los componentes.
export const { setActiveComponent, setFavorito, setCircuitoSelected } = itinerariosSlice.actions;

// Exportamos el reducer para añadirlo a la tienda.
export default itinerariosSlice.reducer;
