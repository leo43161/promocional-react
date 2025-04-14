import { configureStore } from '@reduxjs/toolkit';
/* import orderReducer from './slices/orderSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import uiReducer from './slices/uiSlice'; */
import { eventosService } from './services/eventosService';
import { prestadoresService } from './services/prestadoresService';

export const store = configureStore({
  reducer: {
    /* orders: orderReducer,
    cart: cartReducer,
    products: productReducer,
    categories: categoryReducer,
    ui: uiReducer, */
    [eventosService.reducerPath]: eventosService.reducer,
    [prestadoresService.reducerPath]: prestadoresService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventosService.middleware, prestadoresService.middleware),
});

export default store;
