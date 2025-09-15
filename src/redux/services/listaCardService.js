// src/redux/services/listaCardService.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Asegúrate que process.env.URL_SERVER está definido correctamente en tu .env
// Por ejemplo, podría ser 'http://localhost:3001/api/v1/api' si tu API corre en otro puerto.
// Si la URL base es 'https://www.tucumanturismo.gob.ar/api/v1/api', entonces tu llamada sería a '/listas'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.tucumanturismo.gob.ar/api/v1/api'; // Asume que URL_SERVER apunta a la ruta base de tu API

export const listaCardService = createApi({
    reducerPath: 'listaCardService',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getlistaCards: builder.query({
            // El endpoint ahora espera un argumento 'params' que contendrá el 'lista' ID
            query: (params) => {
                // Si se pasa un número directo, lo envolvemos en un objeto para 'lista'
                if (typeof params === 'number') {
                    return {
                        url: 'listas', // La ruta de la API
                        params: {
                            lista: params
                        }
                    };
                }
                // Si se pasa un objeto (por ejemplo, para limit/offset en el futuro)
                // esto podría ser más complejo, pero para ahora es suficiente.
                return {
                    url: 'listas',
                    params: params // Asume que params es un objeto { lista: id }
                };
            },
        }),
    }),
});

export const {
    useGetlistaCardsQuery,
} = listaCardService;