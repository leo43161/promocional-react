
/* import circuitos from '@/data/circuitos'; */
import { createSlice } from '@reduxjs/toolkit';

// Define los posibles componentes que se pueden mostrar.
const componentTypes = ['destinos', 'alojamientos', 'prestadores', 'guias'];

const circuitos = [
    {
        id: 5,
        name: "historica",
        nombre: "Ciudad Histórica",
        logo: "historica-logo.svg",
        img: "casah",
        color: "#01415C",
        bg: "#01415C",
        mb: "historica-logo-mb.svg"
    },
    {
        id: 4,
        name: "yungas",
        nombre: "Yungas Tucumanas",
        logo: "yungas-logo.svg",
        mb: "yungas-logo-mb.svg",
        img: "quetipi-inicio",
        color: "#66ac7c",
        bg: "#66ac7c",
    },
    {
        id: 2,
        name: "choromoro",
        nombre: "Valle De Choromoro",
        logo: "choromoro-logo.svg",
        mb: "choromoro-logo-mb.svg",
        img: "pozoindio-inicio",
        color: "#FD5901",
        bg: "#FD5901",
    },
    {
        id: 3,
        name: "calchaqui",
        nombre: "Valle Calchaqui",
        logo: "calchaqui-logo.svg",
        mb: "calchaqui-logo-mb.svg",
        img: "menhires-inicio",
        color: "#9E2D2C",
        bg: "#9E2D2C",
    },
    {
        id: 1,
        name: "sur",
        nombre: "Sur Tucumano",
        logo: "sur-logo.svg",
        mb: "sur-logo-mb.svg",
        img: "sur",
        color: "#508E6D",
        bg: "#508E6D",
    }
];
const circuitosEN = [
    {
        id: 10,
        name: "historica",
        nombre: "Historic City Experience",
        logo: "historica-logo.svg",
        img: "casah",
        color: "#01415C",
        bg: "#01415C",
        mb: "historica-logo-mb.svg"
    },
    {
        id: 9,
        name: "yungas",
        nombre: "Yungas Experience",
        logo: "yungas-logo.svg",
        mb: "yungas-logo-mb.svg",
        img: "quetipi-inicio",
        color: "#66ac7c",
        bg: "#66ac7c",
    },
    {
        id: 7,
        name: "choromoro",
        nombre: "Choromoro Valley Experience",
        logo: "choromoro-logo.svg",
        mb: "choromoro-logo-mb.svg",
        img: "pozoindio-inicio",
        color: "#FD5901",
        bg: "#FD5901",
    },
    {
        id: 8,
        name: "calchaqui",
        nombre: "Calchaqui Valley Experience",
        logo: "calchaqui-logo.svg",
        mb: "calchaqui-logo-mb.svg",
        img: "menhires-inicio",
        color: "#9E2D2C",
        bg: "#9E2D2C",
    },
    {
        id: 6,
        name: "sur",
        nombre: "Southern Experience",
        logo: "sur-logo.svg",
        mb: "sur-logo-mb.svg",
        img: "sur",
        color: "#508E6D",
        bg: "#508E6D",
    },
];
const circuitosEN_ES = {
    10: 5,
    9: 4,
    7: 2,
    8: 3,
    6: 1
}
const favoritosStart = {
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
}

const initialState = {
    value: {
        circuitos,
        circuitosEN,
        circuitosEN_ES,
        circuitoSelected: circuitos[0],
        activeComponent: componentTypes[0],
        searchDestino: '',
        favoritos: favoritosStart,
        total: 0,
        progress: 0,
    }
};

const itinerariosSlice = createSlice({
    name: 'itinerarios',
    initialState,
    reducers: {
        setSearchDestino: (state, action) => {
            state.value.searchDestino = action.payload;
        },

        setActiveComponent: (state, action) => {
            if (componentTypes.includes(action.payload)) {
                state.value.activeComponent = action.payload;
            }
        },
        setFavorito: (state, action) => {
            const { type, item, idCircuito } = action.payload;
            const nameCircuito =
                idCircuito ?
                    [...circuitos, ...circuitosEN].find((c) => c.id === idCircuito).name :
                    state.value.circuitoSelected.name;
            console.log(nameCircuito);
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
            /* const allDestinos = state.value.favoritos.map((fav) => fav.destinos).flat(); */
            const favs = state.value.favoritos;
            const allDestinos = Object.values(favs).flatMap(category => category.destinos || []);
            console.log(allDestinos);
            /* ESTO ME DEVUELVE EL PRIMERO OBJETO BIEN Y DESPUES SIGUE CON Proxy(Object), esta bien. console.log(allDestinos) = [Proxy(Object), Proxy(Object), {…}] */
            const newProgress = (allDestinos.length / 6) * 100;
            state.value.progress = newProgress;
        },
        setCircuitoSelected: (state, action) => {
            const selectedCircuit = [...circuitos, ...circuitosEN].find((c) => c.id === action.payload)
            const favs = state.value.favoritos;
            const allDestinos = Object.values(favs).flatMap(category => category.destinos || []);
            const newProgress = (allDestinos.length / 6) * 100;
            state.value.progress = newProgress;
            state.value.searchDestino = "";
            state.value.circuitoSelected = selectedCircuit;
        },
        setFavReset: (state, action) => {
            state.value.favoritos = favoritosStart;
            state.value.progress = 0;
            state.value.searchDestino = "";
        },
    },
});

// Exportamos la acción para poder usarla en los componentes.
export const { setActiveComponent, setFavorito, setCircuitoSelected, setSearchDestino, setFavReset } = itinerariosSlice.actions;

// Exportamos el reducer para añadirlo a la tienda.
export default itinerariosSlice.reducer;
