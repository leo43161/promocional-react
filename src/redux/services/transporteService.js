import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transporteService = createApi({
  reducerPath: 'transporteService',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }),
  endpoints: (builder) => ({
    getColectivos: builder.query({
      query: () => 'colectivos',
    }),
  }),
});

export const { useGetColectivosQuery } = transporteService;