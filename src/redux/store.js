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
import { transporteService } from './services/transporteService';

export const store = configureStore({
  reducer: {
    itinerarioReducer,
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
    ),
});

export default store;
