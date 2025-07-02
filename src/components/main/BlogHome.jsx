import BlogCard from '@/components/main/BlogCard';
import React, { useState, useEffect } from 'react';
import { languages } from '@/utils';
import { useRouter } from 'next/router';
import { useGetDestacadosQuery } from '@/redux/services/blogService';

export default function BlogHome() {
    const router = useRouter();
    // Estado para el ID del idioma seleccionado, inicia con el ID del primer idioma (Español)
    const [selectedLangId, setSelectedLangId] = useState(languages[0].code);

    const { data: destacados, error: errorDestacados, isLoading: isLoadingDestacados, isFetching: isFetchingDestacados } = useGetDestacadosQuery({
        idioma: selectedLangId
    }, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (!router.isReady) return;
        const { lang } = router.query;
        if (lang) {
            const found = languages.find(l => l.code === lang);
            if (found) {
                setSelectedLangId(found.code);
            }
        } else {
            // Default to Spanish if no lang query is present
            setSelectedLangId(languages[0].code);
        }
    }, [router.isReady, router.query.lang]);

    const isEnglish = selectedLangId === 'EN';

    const content = {
        es: {
            mainTitle: "Conocé Tucumán",
            linkText: "Conoce más de Tucumán aquí"
        },
        en: {
            mainTitle: "Discover Tucumán",
            linkText: "Learn more about Tucumán here"
        }
    };
    
    const currentContent = isEnglish ? content.en : content.es;
    const blogLink = isEnglish ? `${process.env.URL_LOCAL}/blog?lang=EN` : `${process.env.URL_LOCAL}/blog`;
    
    const loadingDestacados = isLoadingDestacados || isFetchingDestacados;

    return (
        <section className=" p-4 md:p-8 flex items-center">
            <div>
                <div className='w-full flex justify-center'>
                    <a className='text-4xl md:text-6xl font-bold mb-12 underline hover:text-primary' href={blogLink}>
                        {currentContent.mainTitle}
                    </a>
                </div>
                <div className="md:w-13/14 xl:w-11/14 w-full mx-auto mb-10">
                    <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-7">
                        {/* Columna Izquierda - Tarjeta Grande */}
                        {loadingDestacados || !destacados ? (
                            <div className="md:w-7/14">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full animate-pulse">
                                    <div className="relative w-full md:h-full h-50">
                                        <div className="absolute inset-0 bg-gray-200"></div>
                                    </div>
                                    <div className="md:p-6 p-4 flex flex-col h-135 justify-between">
                                        <h3 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-3 leading-tight">
                                            <div className="h-8 bg-gray-200 rounded"></div>
                                        </h3>
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="md:w-7/14">
                                <BlogCard
                                    blog={destacados.result[0]}
                                    variant="large"
                                />
                            </div>
                        )}

                        {/* Columna Derecha - Dos Tarjetas Pequeñas */}
                        <div className="md:w-7/14 flex flex-col gap-6 md:gap-8">
                            {loadingDestacados || !destacados ? (
                                <>
                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
                                        <div className="h-40 bg-gray-200"></div>
                                        <div className="p-4"><div className="h-6 bg-gray-200 rounded"></div></div>
                                    </div>
                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
                                        <div className="h-40 bg-gray-200"></div>
                                        <div className="p-4"><div className="h-6 bg-gray-200 rounded"></div></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <BlogCard
                                        blog={destacados.result[1]}
                                    />
                                    <BlogCard
                                        blog={destacados.result[2]}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <a className='text-2xl md:text-2xl underline hover:text-primary' href={blogLink}>
                        {currentContent.linkText}
                    </a>
                </div>
            </div>
        </section>
    )
}

// import BlogCard from '@/components/main/BlogCard'
// import React, { useState, useEffect } from 'react';
// import { languages } from '@/utils';
// import { useRouter } from 'next/router';
// import { useGetDestacadosQuery } from '@/redux/services/blogService';

// export default function BlogHome() {
//     const router = useRouter();
//     // Estado para el ID del idioma seleccionado, inicia con el ID del primer idioma (Español)
//     const [selectedLangId, setSelectedLangId] = useState(languages[0].code);

//     const { data: destacados, error: errorDestacados, isLoading: isLoadingDestacados, isFetching: isFetchingDestacados } = useGetDestacadosQuery({
//         idioma: selectedLangId
//     }, { refetchOnMountOrArgChange: true });

//     useEffect(() => {
//         if (!router.isReady) return;
//         const { lang } = router.query;
//         if (lang) {
//             const found = languages.find(l => l.code === lang);
//             if (found) {
//                 setSelectedLangId(found.code);
//             }
//         }
//     }, [router.isReady, router.query.lang]);
//     const loadingDestacados = isLoadingDestacados || isFetchingDestacados;
//     return (
//         <section className=" p-4 md:p-8 flex items-center">
//             <div>
//                 <div className='w-full flex justify-center'>
//                     <a className='text-4xl md:text-6xl font-bold mb-12 underline hover:text-primary' href={`${process.env.URL_LOCAL}/blog`}>Conocé Tucumán</a>
//                 </div>
//                 <div className="md:w-13/14 xl:w-11/14 w-full mx-auto mb-10">
//                     <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-7">
//                         {/* Columna Izquierda - Tarjeta Grande */}
//                         {loadingDestacados ? (
//                             <div className="md:w-7/14">
//                                 <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full animate-pulse">
//                                     <div className="relative w-full md:h-full h-50">
//                                         <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
//                                     </div>
//                                     <div className="md:p-6 p-4 flex flex-col h-135 justify-between">
//                                         <h3 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-3 leading-tight line-clamp-3">
//                                             <div className="h-4 bg-gray-200 animate-pulse"></div>
//                                         </h3>
//                                         {/* <p className="text-gray-600 text-md mb-4 line-clamp-3">
//                                             <div className="h-4 bg-gray-200 animate-pulse"></div>
//                                         </p> */}
//                                         <div className="flex justify-between items-center">
//                                             <div className="h-4 bg-gray-200 animate-pulse"></div>
//                                             <div className="h-4 bg-gray-200 animate-pulse"></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="md:w-7/14">
//                                 <BlogCard
//                                     blog={destacados.result[0]}
//                                     variant="large"
//                                 />
//                             </div>
//                         )}


//                         {/* Columna Derecha - Dos Tarjetas Pequeñas */}
//                         <div className="md:w-7/14 flex flex-col gap-6 md:gap-8">
//                             {!loadingDestacados && (
//                                 <>
//                                     <BlogCard
//                                         blog={destacados.result[1]}
//                                     />
//                                     <BlogCard
//                                         blog={destacados.result[2]}
//                                     />
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className='w-full flex justify-center'>
//                     <a className='text-2xl md:text-2xl underline hover:text-primary' href={`${process.env.URL_LOCAL}/blog`}>Conoce mas de tucuman aquí</a>
//                 </div>
//             </div>
//         </section>
//     )
// }
