import{ createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const listaCardService = createApi({
    reducerPath: 'listaCardService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
    endpoints: (builder) => ({
        getlistaCards: builder.query({
            query: () => ({
                url: `listas`,               
            }),
        }),
    }),
});
 export const {
    useGetlistaCardsQuery,
} = listaCardService;