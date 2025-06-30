import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itinerarioService = createApi({
    reducerPath: 'itinerarioService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }),
    endpoints: (builder) => ({
        guardarItinerario: builder.mutation({
            query: (body) => ({
                url: 'itinerarios',
                method: 'POST',
                body: body,
            }),
        }),
        getIdSession: builder.mutation({
            query: (body) => ({
                url: 'session',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useGuardarItinerarioMutation, useGetIdSessionMutation } = itinerarioService;