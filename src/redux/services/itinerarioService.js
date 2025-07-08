import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itinerarioService = createApi({
    reducerPath: 'itinerarioService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }),
    endpoints: (builder) => ({
        getItinerario: builder.query({
            query: (id) => ({
                url: 'itinerario?id=' + id,
            }),
        }),
        guardarItinerario: builder.mutation({
            query: (body) => ({
                url: 'itinerarios',
                method: 'POST',
                body: body,
            }),
        }),
        getIdSession: builder.mutation({
            query: () => ({
                url: 'session',
                params: { direccion: "itinerarios" },
            }),
        }),
    }),
});

export const { useGuardarItinerarioMutation, useGetIdSessionMutation, useGetItinerarioQuery } = itinerarioService;