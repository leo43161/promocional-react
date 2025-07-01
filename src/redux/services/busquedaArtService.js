import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const busquedaArtService = createApi({
  reducerPath: 'busquedaArtService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }),
  endpoints: (builder) => ({
    getArticulos: builder.query({
      query: ({ limit , offset, search = "", idioma = "ES", localidad = "" }) => ({
        url: `buscador`,
        params: {
          busqueda: search,
          limite: limit,
          offset,
          idioma,
          localidad,
        },
      }),
      // CORRECCIÓN CLAVE: Extraemos el 'total' de uno de los objetos en el array 'result'.
      transformResponse: (response) => ({
        data: response.result || [],
        total: parseInt(response.result?.[0]?.total, 10) || 0,
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
      query: ({ idioma = "ES", limit , offset, search = "" }) => ({
        url: `imperdibles`,
        params: { idioma, limit, offset, search },
      }),
    }),

    getBlogs: builder.query({
      query: ({ idioma = "ES", limit , offset , search = "" }) => ({
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