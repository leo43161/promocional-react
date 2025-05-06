import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const headerService = createApi({
  reducerPath: 'headerService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
  endpoints: (builder) => ({
    getSecciones: builder.query({
      query: (idioma = 1) => ({
        url: `secciones`,
        params: { idioma },
      }),
    }),
  }),
});

export const {
  useGetSeccionesQuery,
} = headerService;
