import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const blogService = createApi({
    reducerPath: 'blogService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: ({
                idioma,
                limit = 50,
                offset = 0,
                search = ""
            }) => ({
                url: `blog`,
                params: {
                    idioma,
                    limit,
                    offset,
                    busqueda: search
                },
            }),
        }),
        getDestacados: builder.query({
            query: ({
                idioma,
            }) => ({
                url: `blogDestacados`,
                params: {
                    idioma,
                },
            }),
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetDestacadosQuery
} = blogService;
