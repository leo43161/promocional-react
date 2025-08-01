import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const itinerariosService = createApi({
    reducerPath: 'itinerariosService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
    endpoints: (builder) => ({
        getGuias: builder.query({
            query: ({ id, limit, offset }) => ({
                url: `guias_it`,
                params: { circuito: id, limit, offset },
            }),
        }),
        getActividades: builder.query({
            query: ({ id, limit, offset }) => ({
                url: `prestadores_it`,
                params: { circuito: id, limit, offset },
            }),
        }),
        getHoteles: builder.query({
            query: ({ id, limit, offset }) => ({
                url: `hoteles_it`,
                params: { circuito: id, limit, offset },
            }),
        }),
        getLocalidades: builder.query({
            query: ({ id }) => ({
                url: `subseccion_circuito`,
                params: { circuito: id },
            }),
        }),
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
        getDestinosBusqueda: builder.query({
            query: ({ busqueda, limite, offset, idioma }) => ({
                url: `buscador_destinos`,
                params: { busqueda, limite, offset, idioma },
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
    useGetDestinosBusquedaQuery,
    useGetItinerariosQuery,
    useGetGaleryDestinoQuery,
    useGetLocalidadesQuery,
    useGetHotelesQuery,
    useGetGuiasQuery,
    useGetActividadesQuery
} = itinerariosService;
