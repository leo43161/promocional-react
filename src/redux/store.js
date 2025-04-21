import { configureStore } from '@reduxjs/toolkit';
/* import orderReducer from './slices/orderSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import uiReducer from './slices/uiSlice'; */
import { eventosService } from './services/eventosService';
import { prestadoresService } from './services/prestadoresService';
import { articulosService } from './services/articulosService';

export const store = configureStore({
  reducer: {
    /* orders: orderReducer,
    cart: cartReducer,
    products: productReducer,
    categories: categoryReducer,
    ui: uiReducer, */
    [eventosService.reducerPath]: eventosService.reducer,
    [prestadoresService.reducerPath]: prestadoresService.reducer,
    [articulosService.reducerPath]: articulosService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      eventosService.middleware,
      prestadoresService.middleware,
      articulosService.middleware,
    ),
});

export default store;
