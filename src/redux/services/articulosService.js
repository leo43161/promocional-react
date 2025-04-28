import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const articulosService = createApi({
  reducerPath: 'articulosService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
  endpoints: (builder) => ({
    getArticulos: builder.query({
      query: () => ({
        url: `articulos`,
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
  }),
});

export const {
  useGetArticuloIdQuery,
  useGetGaleriaQuery,
  useGetPdfsQuery,
  useGetArticulosQuery
} = articulosService;
