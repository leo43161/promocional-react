import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const eventosService = createApi({
  reducerPath: 'eventosService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
  endpoints: (builder) => ({
    getEventoId: builder.query({
      query: ({ id }) => ({
        url: `evento`,
        params: { id },
      }),
    }),
    getEventoDestacados: builder.query({
      query: () => ({
        url: `eventos_destacados`
      }),
    }),
    getEventos: builder.query({
      query: ({
        limit = 50,
        offset = 0,
        search = "",
        dia,
        fechaIni,
        fechaFin
      }) => ({
        url: `eventos`,
        params: {
          limit,
          offset,
          Busqueda: search,
          Dia: dia,
          FechaIni: fechaIni,
          FechaFin: fechaFin
        },
      }),
    }),
    getAlojamientosFilters: builder.query({
      query: () => ({
        url: `alojamientos_filters`,
      }),
    }),
  }),
});

export const {
  useGetEventosQuery,
  useGetAlojamientosFiltersQuery,
  useGetEventoIdQuery,
  useGetEventoDestacadosQuery
} = eventosService;
