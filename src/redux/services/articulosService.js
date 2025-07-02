// articulosService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articulosService = createApi({
  reducerPath: 'articulosService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }),
  endpoints: (builder) => ({
    getArticulos: builder.query({
      // ¡CORRECCIÓN AQUÍ! Ahora la función 'query' desestructura los parámetros esperados.
      query: ({ limit = 3, offset = 0, search = "", localidad = "", idioma = "ES" }) => ({
        url: `articulos`,
        params: { limit, offset, search, localidad, idioma }, // Envía todos los parámetros
      }),
    }),
    getArticuloId: builder.query({
      query: ({ id }) => ({
        url: `articulos_id`,
        params: { id },
      }),
    }),
    getGaleria: builder.query({
      query: ({ id }) => ({
        url: `galeria_art`,
        params: { id },
      }),
    }),
    getPdfs: builder.query({
      query: ({ id }) => ({
        url: `pdfs_art`,
        params: { id },
      }),
    }),
    getImperdibles: builder.query({
      query: (idioma) => ({
        url: `imperdibles`,
        params: { idioma },
      }),
    }),
  }),
});

export const {
  useGetArticuloIdQuery,
  useGetGaleriaQuery,
  useGetPdfsQuery,
  useGetArticulosQuery,
  useGetImperdiblesQuery,
} = articulosService;
