import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiKeyService = createApi({
    reducerPath: 'apiKeyService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
    endpoints: (builder) => ({
        getGoogleMaps: builder.query({
            query: () => ({
                url: `get_maps_key`,
            }),
        }),
    }),
});

export const {
    useGetGoogleMapsQuery,
} = apiKeyService;