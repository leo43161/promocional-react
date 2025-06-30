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
      // ¡CORRECCIÓN AQUÍ! También para imperdibles si quieres que acepte búsqueda y paginación.
      query: ({ idioma = "ES", limit = 3, offset = 0, search = "" }) => ({
        url: `imperdibles`,
        params: { idioma, limit, offset, search },
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