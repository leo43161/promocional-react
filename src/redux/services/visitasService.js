import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const visitasApi = createApi({
    reducerPath: 'visitasApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.URL_SERVER,}),
    endpoints: (builder) => ({
        registrarVisita: builder.mutation({
            query: ({ url, busqueda, idioma, id }) => ({
                url: `/visita`,
                params: {
                    direccion: url,
                    lat: null,
                    lon: null,
                    idioma: idioma || 1,
                    busqueda: busqueda || '',
                    id: id || null,
                },
            }),
        }),
    }),
});

export const { useRegistrarVisitaMutation } = visitasApi;