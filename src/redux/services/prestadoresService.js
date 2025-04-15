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
  }),
});

export const {
  useGetPrestadoresQuery,
  useGetProductByIdQuery,
} = prestadoresService;
