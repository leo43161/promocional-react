
/* import circuitos from '@/data/circuitos'; */
import icons from '@/utils/icons';
import { createSlice } from '@reduxjs/toolkit';

// Define los posibles componentes que se pueden mostrar.
const componentTypes = ['destinos', 'alojamientos', 'prestadores', 'guias'];

const { HistoricaLogo, HistoricaLogoMb, YungasLogo, YungasLogoMb, ChoromoroLogo, ChoromoroLogoMb, CalchaquiLogo, CalchaquiLogoMb, SurLogoMb, SurLogo } = icons;

const circuitos = [{
    id: 1,
    nombre: "Historica",
    logo: HistoricaLogo,
    img: "casah",
    color: "#01415C",
    bg: "#01415C",
    mb: HistoricaLogoMb
}, {
    id: 4,
    nombre: "Yungas",
    logo: YungasLogo,
    mb: YungasLogoMb,
    img: "quetipi-inicio",
    color: "#66ac7c",
    bg: "#66ac7c",
}, {
    id: 2,
    nombre: "Choromoro",
    logo: ChoromoroLogo,
    mb: ChoromoroLogoMb,
    img: "pozoindio-inicio",
    color: "#FD5901",
    bg: "#FD5901",
}, {
    id: 3,
    nombre: "Calchaqui",
    logo: CalchaquiLogo,
    mb: CalchaquiLogoMb,
    img: "menhires-inicio",
    color: "#9E2D2C",
    bg: "#9E2D2C",
}, {
    id: 5,
    nombre: "Sur",
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
        favoritos: [],
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
        setFavoritos: (state, action) => {
            const nuevosFavoritos = action.payload;
            state.value.favoritos = nuevosFavoritos;
            const newProgress = (nuevosFavoritos.length / 3) * 100;
            state.value.progress = Math.min(newProgress, 100);
        },
        setCircuitoSelected: (state, action) => {
            const selectedCircuit = circuitos.find((c) => c.id === action.payload)
            state.value.circuitoSelected = selectedCircuit;
        },
    },
});

// Exportamos la acción para poder usarla en los componentes.
export const { setActiveComponent } = itinerariosSlice.actions;

// Exportamos el reducer para añadirlo a la tienda.
export default itinerariosSlice.reducer;
