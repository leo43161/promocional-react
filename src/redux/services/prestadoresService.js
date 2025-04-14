import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const prestadoresService = createApi({
  reducerPath: 'prestadoresService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
  endpoints: (builder) => ({
    getPrestadores: builder.query({
      query: (/* { limit, offset, search, category } */) => ({
        url: `prestadores`,
        /* params: { limit, offset, search, category }, */
      }),
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`
    }),
  }),
});

export const {
  useGetPrestadoresQuery,
  useGetProductByIdQuery,
} = prestadoresService;
