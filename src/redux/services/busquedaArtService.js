import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const busquedaArtService = createApi({
  reducerPath: 'busquedaArtService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }),
  endpoints: (builder) => ({
    getArticulos: builder.query({
      // 🔧 CORREGIDO: endpoint correcto para búsqueda
      query: ({ limit = 50, offset = 0, search = "", idioma = "ES", localidad = "" }) => ({
        url: `buscador`,
        params: {
          busqueda: search,   // ← nombre esperado por el backend
          limite: limit,
          offset,
          idioma,
          localidad,
        },
      }),
      transformResponse: (response) => ({
        data: response.result || [],
        total: response.total || (response.result?.length ?? 0),
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
      query: ({ idioma = "ES", limit = 50, offset = 0, search = "" }) => ({
        url: `imperdibles`,
        params: { idioma, limit, offset, search },
      }),
    }),

    getBlogs: builder.query({
      query: ({ idioma = "ES", limit = 50, offset = 0, search = "" }) => ({
        url: `blog`,
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
  useGetBlogsQuery,
} = busquedaArtService;
