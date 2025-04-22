import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const prestadoresService = createApi({
  reducerPath: 'prestadoresService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
  endpoints: (builder) => ({
    getPrestadores: builder.query({
      query: ({ limit, offset, search }) => ({
        url: `prestadores`,
        params: { limit, offset, search, tipo: 0 },
      }),
    }),
    getGuias: builder.query({
      query: () => ({
        url: `prestadores`,
        params: { limit: 100, offset: 0, search: "", tipo: 2 },
      }),
    }),
  }),
});

export const {
  useGetPrestadoresQuery,
  useGetGuiasQuery,
} = prestadoresService;
