// src/store/features/uiSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visibleModal: false,
  visibleVivo: false
};

// Creamos el slice
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  // Reducers: son las "acciones" que modifican el estado
  reducers: {
    openModalVivo: (state) => {
      state.visibleModal = true;
    },
    closeModalVivo: (state) => {
      state.visibleModal = false;
    },
  },
});

// Exportamos las acciones para usarlas en los componentes
export const {
  openModalVivo,
  closeModalVivo,
} = uiSlice.actions;

// Exportamos el reducer para el store
export default uiSlice.reducer;