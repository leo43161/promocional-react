import React from 'react'
import Carousel from '../common/Carousel'

const RutasBanners = [
    {
        id: 1,
        titulo: "Ruta del vino",
        descripcion: "El sabor de Tucumán en cada copa",
        imagen: "/images/banners/vino.jpg",
        icono: "/icons/rutas/vino.svg",
        articulo: "88",
    },
    {
        id: 2,
        titulo: "Ruta del artesano",
        descripcion: "Viví una experiencia artesanal",
        imagen: "/images/banners/artesano.jpg",
        icono: "/icons/rutas/artesano.svg",
        articulo: "89",
    },
    {
        id: 3,
        titulo: "Ruta de la fe",
        descripcion: "Un viaje de Fe, un camino de encuentro",
        imagen: "/images/banners/fe.jpg",
        icono: "/icons/rutas/fe.svg",
        articulo: "90",
    },
    {
        id: 4,
        titulo: "Ecosendas",
        descripcion: "Sumergite en la naturaleza",
        imagen: "/images/banners/ecosendas.jpg",
        icono: "/icons/rutas/ecosendas.svg",
        articulo: "91",
    },
]
export default function Rutas() {
    return (
        <div className='w-12/13 xl:w-full mx-auto mb-30'>
            <Carousel className='md:h-96' showIndicators={false} showArrows={false} autoPlay={true} interval={3000}>
                {RutasBanners.map((banner) => (
                    <a key={banner.id} href={process.env.URL_LOCAL_SERVER + process.env.URL_LOCAL + '/articulos/articulo/' + banner.articulo}>
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
                                        alt="Icono de la ruta"
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
                                        Conocé más aquí
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
                                    alt="Imagen de la ruta"
                                />
                            </div>
                        </section>
                    </a>
                ))}
            </Carousel>
        </div>
    )
}
