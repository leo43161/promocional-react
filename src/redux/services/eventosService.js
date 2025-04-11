import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventosService = createApi({
  reducerPath: 'eventosService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }), // Cambia a la URL base de tu API
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit, offset, search, category }) => ({
        url: `/products`,
        params: { limit, offset, search, category },
      }),
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`
    }),
    getCategories: builder.query({
      query: () => 'categories?type=all',
    }),
    putCallTable: builder.mutation({
      query: (params) => ({
        url: `/tables/${params.id}`,  // Asegúrate de que `params.id` es válido
        method: 'PUT',
        body: { alerta: params.alerta || "" }, // Parámetro dinámico
      }),
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  usePutCallTableMutation,
} = eventosService;
