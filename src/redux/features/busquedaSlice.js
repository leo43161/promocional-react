import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedButton: 'articulos', // Botón predeterminado seleccionado al cargar la 
};

const busquedaSlice = createSlice({
  name: 'busqueda',
  initialState,
  reducers: {
    setSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
    },
    },
});

export const { setSelectedButton } = busquedaSlice.actions;
export default busquedaSlice.reducer;
