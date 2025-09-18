import { configureStore } from '@reduxjs/toolkit';
import { prestadoresService } from './services/prestadoresService';
import { articulosService } from './services/articulosService';
import { alojamientosService } from './services/alojamientosService';
import { eventosService } from './services/eventosService';
import { headerService } from './services/headerService';
import { blogService } from './services/blogService';
import { itinerariosService } from './services/itinerariosService';
import { itinerarioService } from './services/itinerarioService';
import itinerarioReducer from './features/itinerarioSlice';
import { busquedaArtService } from './services/busquedaArtService';
import busquedaReducer from './features/busquedaSlice';
import { transporteService } from './services/transporteService';
import { visitasApi } from './services/visitasService';
import { listaCardService} from './services/listaCardService';


export const store = configureStore({
  reducer: {
    itinerarioReducer,
    busqueda: busquedaReducer, // <-- ¡AGREGAR ESTA LÍNEA!
    [eventosService.reducerPath]: eventosService.reducer,
    [prestadoresService.reducerPath]: prestadoresService.reducer,
    [articulosService.reducerPath]: articulosService.reducer,
    [alojamientosService.reducerPath]: alojamientosService.reducer,
    [headerService.reducerPath]: headerService.reducer,
    [blogService.reducerPath]: blogService.reducer,
    [itinerariosService.reducerPath]: itinerariosService.reducer,
    [itinerarioService.reducerPath]: itinerarioService.reducer,
    [busquedaArtService.reducerPath]: busquedaArtService.reducer,
    [transporteService.reducerPath]: transporteService.reducer,
    [visitasApi.reducerPath]: visitasApi.reducer,
    [listaCardService.reducerPath]: listaCardService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      eventosService.middleware,
      prestadoresService.middleware,
      alojamientosService.middleware,
      articulosService.middleware,
      headerService.middleware,
      blogService.middleware,
      itinerariosService.middleware,
      itinerarioService.middleware,
      busquedaArtService.middleware,
      transporteService.middleware,
      visitasApi.middleware,
      listaCardService.middleware
    ),
});

export default store;
