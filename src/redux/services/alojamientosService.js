import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const alojamientosService = createApi({
    reducerPath: 'alojamientosService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
    endpoints: (builder) => ({
        getAlojamientos: builder.query({
            query: ({
                limit = 50,
                offset = 0,
                search = "",
                categoria,
                estrellas,
                localidad
            }) => ({
                url: `alojamientos`,
                params: { limit, offset, search, categoria, estrellas, localidad },
            }),
        }),
        getAlojamientosFilters: builder.query({
            query: () => ({
              url: `alojamientos_filters`,
            }),
          }),
    }),
});

export const {
    useGetAlojamientosQuery,
    useGetAlojamientosFiltersQuery
} = alojamientosService;
