import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const prestadoresService = createApi({
  reducerPath: 'prestadoresService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
  endpoints: (builder) => ({
    getPrestadores: builder.query({
      query: ({ limit, offset, search }) => ({
        url: `prestadores`,
        params: { limit, offset, busqueda: search, /* localidad: null, actividad: null */ },
      }),
    }),
    getAgencias: builder.query({
      query: () => ({
        url: `agencias`,
      }),
    }),
    getGuias: builder.query({
      query: ({ limit, offset, search }) => ({
        url: `guias`,
        params: { limit, offset, search },
      }),
    }),
    getAutos: builder.query({
      query: () => ({
        url: `autos`,
      }),
    }),
  }),
});

export const {
  useGetPrestadoresQuery,
  useGetAgenciasQuery,
  useGetGuiasQuery,
  useGetAutosQuery
} = prestadoresService;
