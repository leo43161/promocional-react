import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const itinerariosService = createApi({
    reducerPath: 'itinerariosService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
    endpoints: (builder) => ({
        getItinerarios: builder.query({
            query: ({ id }) => ({
                url: `subseccion`,
                params: { id },
            }),
        }),
        getDestinos: builder.query({
            query: ({ id }) => ({
                url: `subseccion/${id}`,
            }),
        }),
        getGaleryDestino: builder.query({
            query: ({ id }) => ({
                url: `galeria_art/${id}`,
            }),
        }),
    }),
});

export const {
    useGetDestinosQuery,
    useGetItinerariosQuery,
    useGetGaleryDestinoQuery
} = itinerariosService;
