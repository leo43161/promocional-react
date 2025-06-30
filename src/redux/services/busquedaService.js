// searchService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const busquedaService = createApi({
    reducerPath: 'busquedaService',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.URL_SERVER }),
    endpoints: (builder) => ({
         unifiedBusqueda: builder.query({
            async queryFn({ search = "", limit = 50, offset = 0, localidad = "", idioma = "ES" }, _queryApi, _extraOptions, fetchWithBQ) {
                const results = {};

                // --- Articulos (Asumiendo que el endpoint /articulos ahora soporta 'search', 'limit', 'offset') ---
                // ¡IMPORTANTE! Si tu API PHP para /articulos no soporta 'search', esta parte no funcionará.
                // En tu articulosService.js actual, getArticulos no tiene parámetros de búsqueda.
                // Asumo que tu apiModel.php ya tiene getArticulosBusqueda y que el controlador lo expone en '/articulos'.
                const articulosResult = await fetchWithBQ({
                    url: `articulos`, // O el endpoint específico si es diferente para búsqueda, ej: `articulos_busqueda`
                    params: { search: search, limit, offset },
                });
                if (articulosResult.data) {
                    results.articulos = articulosResult.data;
                }

                // --- Blogs (usa 'busqueda' para el término de búsqueda) ---
                const blogsResult = await fetchWithBQ({
                    url: `blog`,
                    params: { busqueda: search, limit, offset, idioma },
                });
                if (blogsResult.data) {
                    results.blogs = blogsResult.data;
                }

                // --- Imperdibles (Asumiendo que el endpoint /imperdibles ahora soporta 'search') ---
                // En tu articulosService.js actual, getImperdibles solo usa 'idioma'.
                // ¡IMPORTANTE! Si tu API PHP para /imperdibles no soporta 'search', esta parte no funcionará.
                const imperdiblesResult = await fetchWithBQ({
                    url: `imperdibles`,
                    params: { search: search, idioma }, // Añadido 'search'. Si no lo soporta, quítalo.
                });
                if (imperdiblesResult.data) {
                    results.imperdibles = imperdiblesResult.data;
                }

                // --- Alojamientos (usa 'search' y 'localidad') ---
                const alojamientosResult = await fetchWithBQ({
                    url: `hoteles`, // Endpoint de alojamientos en tu alojamientosService.js
                    params: { search: search, limit, offset, localidad: localidad || undefined }, // Pasa localidad si existe
                });
                if (alojamientosResult.data) {
                    results.alojamientos = alojamientosResult.data;
                }

                // --- Prestadores (usa 'busqueda') ---
                const prestadoresResult = await fetchWithBQ({
                    url: `prestadores`,
                    params: { busqueda: search, limit, offset },
                });
                if (prestadoresResult.data) {
                    results.prestadores = prestadoresResult.data;
                }

                // --- Guias (usa 'search') ---
                const guiasResult = await fetchWithBQ({
                    url: `guias`,
                    params: { search: search, limit, offset },
                });
                if (guiasResult.data) {
                    results.guias = guiasResult.data;
                }

                return { data: results };
            },
        }),
    }),
});

export const { useUnifiedBusquedaQuery } = busquedaService;