import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Asegúrate de tener axios instalado e importado
import ParallaxContainer from '@/components/common/ParallaxContainer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ImageGallery from '@/components/articulos/ImageGallery';
import ImperdiblesCard from '@/components/articulos/ImperdiblesCard';
// Importa tus componentes de UI, layout, etc.
// import Layout from '../../components/Layout';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import ErrorMessage from '../../components/ErrorMessage';

export default function Articulo() {
    const router = useRouter();
    const [articulo, setArticulo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // router.isReady se asegura de que router.query esté poblado (importante en Next.js)
        if (router.isReady) {
            const { id } = router.query; // Obtiene el 'id' de la URL (?id=...)

            if (id) {
                setLoading(true);
                setError(null);
                setArticulo(null); // Limpia el artículo anterior si hubiera

                // Construye la URL de tu API externa
                //const apiUrl = `https://tu-servidor-api.com/api/articulos/${id}`;
                const apiUrl = `https://www.tucumanturismo.gob.ar/api/prestadores`;

                axios.get(apiUrl)
                    .then(response => {
                        console.log(response.data);
                        setArticulo(response.data);
                        // Opcional: Actualizar el título de la página dinámicamente
                        document.title = response.data.titulo || 'Detalle del Artículo';
                    })
                    .catch(err => {
                        console.error("Error fetching data:", err);
                        setError("No se pudo cargar el artículo.");
                    })
                    .finally(() => {
                        setLoading(false);
                    });

            } else {
                // No hay ID en la URL
                setError("ID de artículo no especificado en la URL.");
                setLoading(false);
            }
        }
    }, [router.isReady, router.query]); // Dependencias del useEffect

    // Renderizado condicional basado en el estado
    let content;
    if (loading) {
        // content = <LoadingSpinner />; // Tu componente de carga
        content = <div>Cargando...</div>;
    } else if (error) {
        // content = <ErrorMessage message={error} />; // Tu componente de error
        content = <div>Error: {error}</div>;
    } else if (articulo) {
        // Renderiza la información del artículo
        content = (
            <div>
                <h1>{articulo.titulo}</h1>
                <p>{articulo.contenido}</p>
                {/* ... más detalles del artículo ... */}
            </div>
        );
    } else {
        // Estado inicial o caso inesperado
        content = <div>No se encontró el artículo.</div>;
    }

    return (
        // <Layout> {/* Envuelve con tu layout si tienes uno */}
        <div> {/* Contenedor principal */}
            {content}
            <ParallaxContainer
                speed={0.2}
                minHeight="h-96 md:h-[58vh]"
                className=""
            >
                <div className="container mx-auto h-full text-white flex flex-col justify-end">
                    <div className='w-11/12 mx-auto pt-5'>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Segunda Sección
                        </h2>
                    </div>
                </div>
            </ParallaxContainer>
            <div className='w-11/12 mx-auto pt-5 mb-10'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: "Prestadores activos", href: '/prestadores' }]
                    }></Breadcrumb>
                </div>
            </div>

            <div className='mb-10 md:w-12/14 w-full mx-auto flex px-2 flex-wrap'>
                <div className='md:w-8/11 w-full mb-4'>
                    <h1 className='text-3xl font-bold mb-6'>Conocé Tucumán en 2 días</h1>
                    <ImageGallery items={[
                        {
                            img: "https://www.tucumanturismo.gob.ar/public/img/itinerario4_fr8b345e_18-06-2024.jpg",
                            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expent delectus!"
                        },
                        {
                            img: "https://www.tucumanturismo.gob.ar/public/img/itinerario2_vvvwbn7e_18-06-2024.jpg",
                            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita rs!"
                        },
                        {
                            img: "https://www.tucumanturismo.gob.ar/public/img/itinerario3_e9ja39ab_18-06-2024.jpg",
                            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita recusandae"
                        },
                        {
                            img: "https://www.tucumanturismo.gob.ar/public/img/itinerario4_fr8b345e_18-06-2024.jpg",
                            text: "Lorem ipsum dolota recusandae impedit quos laboriosam nesciunt delectus!"
                        },
                    ]}></ImageGallery>
                    <div className='w-full px-4'>
                        <p className='text-justify'>Si venís a visitarnos por poco tiempo y querés hacer un pequeño recorrido por la provincia, te mostramos algunos sitios que integran los imperdibles de Tucumán. Podés visitar algunas localidades situadas a menos de una hora de viaje desde la capital, pasear por la Ciudad Histórica y degustar nuestras comidas típi</p>
                    </div>
                </div>
                <div className='md:w-3/11 w-full md:ps-4'>
                    <div className='mb-4'>
                        <h2 className='text-xl font-bold mb-3'>Para Descargar</h2>
                        <div className='flex flex-col gap-5'>
                            <a class="w-full flex items-stretch justify-center gap-2" target="_blank" tabindex="3" aria-label="Mapa de El Cadillal Hace click aqui para descargar" href="https://www.tucumanturismo.gob.ar/public/files/Mapa%20-%20Cadillal_w9xlethe_22-08-2024.pdf">
                                <div class="w-2/10 p-2">
                                    <img src="https://www.tucumanturismo.gob.ar/public/icons/svg/articulo/pdf-1.svg" class="w-full" alt="Mapa de El Cadillal" />
                                </div>
                                <div class="flex-1">
                                    <p class="m-0">Hacé click para descargar</p>
                                    <p class="m-0 font-bold">Mapa de El Cadillal</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold mb-4'>Imperdibles</h2>
                        <div className='flex flex-col gap-5'>
                            <ImperdiblesCard
                                img={"https://www.tucumanturismo.gob.ar/public/img/galeriacadillal_j0kpht3j_12-06-2024.jpg"}
                                titulo={"El Cadillal"}
                            />
                            <ImperdiblesCard
                                img={"https://www.tucumanturismo.gob.ar/public/img/cristo.jpg"}
                                titulo={"San Javier"}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        // </Layout>
    );
}

// ¡IMPORTANTE! Esta página NO necesita getStaticPaths ni getStaticProps
// porque la obtención de datos es puramente del lado del cliente.