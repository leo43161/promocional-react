import { configureStore } from '@reduxjs/toolkit';
import { prestadoresService } from './services/prestadoresService';
import { articulosService } from './services/articulosService';
import { alojamientosService } from './services/alojamientosService';
import { eventosService } from './services/eventosService';
import { headerService } from './services/headerService';
import { blogService } from './services/blogService';
import { busquedaArtService } from './services/busquedaArtService';

export const store = configureStore({
  reducer: {
    [eventosService.reducerPath]: eventosService.reducer,
    [prestadoresService.reducerPath]: prestadoresService.reducer,
    [articulosService.reducerPath]: articulosService.reducer,
    [alojamientosService.reducerPath]: alojamientosService.reducer,
    [headerService.reducerPath]: headerService.reducer,
    [blogService.reducerPath]: blogService.reducer,
    [busquedaArtService.reducerPath]: busquedaArtService.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      eventosService.middleware,
      prestadoresService.middleware,
      alojamientosService.middleware,
      articulosService.middleware,
      headerService.middleware,
      blogService.middleware,
      busquedaArtService.middleware,
    ),
});

export default store;
