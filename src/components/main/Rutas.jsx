import React from 'react';
import Carousel from '../common/Carousel';
import { useRouter } from 'next/router';

const RutasContent = {
    es: {
        buttonText: "Conocé más aquí",
        banners: [
            {
                id: 1,
                titulo: "Ruta del vino",
                descripcion: "El sabor de Tucumán en cada copa",
                imagen: "/images/banners/vino.jpg",
                icono: "/icons/rutas/vino.svg",
                articulo: "173",
            },
            {
                id: 2,
                titulo: "Ruta del artesano",
                descripcion: "Viví una experiencia artesanal",
                imagen: "/images/banners/artesano.jpg",
                icono: "/icons/rutas/artesano.svg",
                articulo: "171",
            },
            {
                id: 3,
                titulo: "Ruta de la fe",
                descripcion: "Un viaje de Fe, un camino de encuentro",
                imagen: "/images/banners/fe.jpg",
                icono: "/icons/rutas/fe.svg",
                articulo: "174",
            },
            {
                id: 4,
                titulo: "Ecosendas",
                descripcion: "Sumergite en la naturaleza",
                imagen: "/images/banners/ecosendas.jpg",
                icono: "/icons/rutas/ecosendas.svg",
                articulo: "167",
            },
        ],
    },
    en: {
        buttonText: "Learn more here",
        banners: [
            {
                id: 1,
                titulo: "Wine Route",
                descripcion: "The taste of Tucumán in every glass",
                imagen: "/images/banners/vino.jpg",
                icono: "/icons/rutas/vino.svg",
                articulo: "842", // No English article, link to ES with lang=EN
            },
            {
                id: 2,
                titulo: "Artisan Route",
                descripcion: "Live an artisanal experience",
                imagen: "/images/banners/artesano.jpg",
                icono: "/icons/rutas/artesano.svg",
                articulo: "202",
            },
            {
                id: 3,
                titulo: "Faith Route",
                descripcion: "A journey of Faith, a path of encounter",
                imagen: "/images/banners/fe.jpg",
                icono: "/icons/rutas/fe.svg",
                articulo: "204",
            },
            {
                id: 4,
                titulo: "Ecotrails",
                descripcion: "Immerse yourself in nature",
                imagen: "/images/banners/ecosendas.jpg",
                icono: "/icons/rutas/ecosendas.svg",
                articulo: "207",
            },
        ],
    },
};

export default function Rutas() {
    const router = useRouter();
    const { lang } = router.query;

    const isEnglish = lang === 'EN';
    const content = isEnglish ? RutasContent.en : RutasContent.es;

    const generateLink = (articulo) => {
        let link = `${process.env.URL_LOCAL}/subsecciones/lista/${articulo}`;
        if (isEnglish) {
            //cambio el link para que busque articulo en ingles ya que no hay lista en ingles
           link = `${process.env.URL_LOCAL}/articulos/articulo/${articulo}` + `?lang=EN`;
        }
        return link;
    };

    return (
        <div className='w-12/13 xl:w-full mx-auto mb-30'>
            <Carousel className='md:h-96' showIndicators={false} showArrows={false} autoPlay={true} interval={3000}>
                {content.banners.map((banner) => (
                    <a key={banner.id} href={generateLink(banner.articulo)}>
                        <section
                            className="w-full parallax flex flex-col md:flex-row items-stretch gap-8 cursor-pointer h-full px-4 xl:px-20"
                        >
                            {/* Primera columna: Icono, título y botón */}
                            <div className="w-full md:w-1/3 flex flex-col md:justify-evenly justify-between h-full gap-3 p-4 md:p-0">
                                <div className="flex justify-center">
                                    <img
                                        id="iconoRuta"
                                        className="w-full h-auto"
                                        src={banner.icono}
                                        alt={`Icono de ${banner.titulo}`}
                                    />
                                </div>
                                <h1
                                    id="bannerRutaTitle"
                                    className="text-gray-800 italic text-4xl lg:text-4xl mb-0 pl-2"
                                >
                                    {banner.descripcion}
                                </h1>
                                <div className="pl-2">
                                    <button
                                        id="bannerRutaButton"
                                        aria-labelledby="bannerRutaTitle"
                                        className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        {content.buttonText}
                                    </button>
                                </div>
                            </div>

                            {/* Segunda columna: Imagen del banner */}
                            <div className="w-full md:w-2/3 hidden md:block">
                                <img
                                    id="img-rutas"
                                    className="h-full w-full object-cover"
                                    style={{ objectPosition: 'center' }}
                                    src={banner.imagen}
                                    alt={`Imagen de ${banner.titulo}`}
                                />
                            </div>
                        </section>
                    </a>
                ))}
            </Carousel>
        </div>
    )
}

// import React from 'react'
// import Carousel from '../common/Carousel'

// const RutasBanners = [
//     {
//         id: 1,
//         titulo: "Ruta del vino",
//         descripcion: "El sabor de Tucumán en cada copa",
//         imagen: "/images/banners/vino.jpg",
//         icono: "/icons/rutas/vino.svg",
//         articulo: "88",
//     },
//     {
//         id: 2,
//         titulo: "Ruta del artesano",
//         descripcion: "Viví una experiencia artesanal",
//         imagen: "/images/banners/artesano.jpg",
//         icono: "/icons/rutas/artesano.svg",
//         articulo: "89",
//     },
//     {
//         id: 3,
//         titulo: "Ruta de la fe",
//         descripcion: "Un viaje de Fe, un camino de encuentro",
//         imagen: "/images/banners/fe.jpg",
//         icono: "/icons/rutas/fe.svg",
//         articulo: "90",
//     },
//     {
//         id: 4,
//         titulo: "Ecosendas",
//         descripcion: "Sumergite en la naturaleza",
//         imagen: "/images/banners/ecosendas.jpg",
//         icono: "/icons/rutas/ecosendas.svg",
//         articulo: "91",
//     },
// ]
// export default function Rutas() {
//     return (
//         <div className='w-12/13 xl:w-full mx-auto mb-30'>
//             <Carousel className='md:h-96' showIndicators={false} showArrows={false} autoPlay={true} interval={3000}>
//                 {RutasBanners.map((banner) => (
//                     <a key={banner.id} href={process.env.URL_LOCAL_SERVER + process.env.URL_LOCAL + '/articulos/articulo/' + banner.articulo}>
//                         <section
//                             className="w-full parallax flex flex-col md:flex-row items-stretch gap-8 cursor-pointer h-full px-4 xl:px-20"
//                         >
//                             {/* Primera columna: Icono, título y botón */}
//                             <div className="w-full md:w-1/3 flex flex-col md:justify-evenly justify-between h-full gap-3 p-4 md:p-0">
//                                 <div className="flex justify-center">
//                                     <img
//                                         id="iconoRuta"
//                                         className="w-full h-auto"
//                                         src={banner.icono}
//                                         alt="Icono de la ruta"
//                                     />
//                                 </div>
//                                 <h1
//                                     id="bannerRutaTitle"
//                                     className="text-gray-800 italic text-4xl lg:text-4xl mb-0 pl-2"
//                                 >
//                                     {banner.descripcion}
//                                 </h1>
//                                 <div className="pl-2">
//                                     <button
//                                         id="bannerRutaButton"
//                                         aria-labelledby="bannerRutaTitle"
//                                         className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
//                                     >
//                                         Conocé más aquí
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Segunda columna: Imagen del banner */}
//                             <div className="w-full md:w-2/3 hidden md:block">
//                                 <img
//                                     id="img-rutas"
//                                     className="h-full w-full object-cover"
//                                     style={{ objectPosition: 'center' }}
//                                     src={banner.imagen}
//                                     alt="Imagen de la ruta"
//                                 />
//                             </div>
//                         </section>
//                     </a>
//                 ))}
//             </Carousel>
//         </div>
//     )
// }
