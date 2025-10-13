import Image from "next/image";
import { useEffect, useState } from "react";
import { Plus, Check } from "lucide-react";
import Modal from "@/components/common/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useGetGaleryDestinoQuery, useGetDestinosBusquedaQuery } from "@/redux/services/itinerariosService";
import ImageGallery from "@/components/articulos/ImageGallery";
import { setFavorito } from "@/redux/features/itinerarioSlice";
import Paginado from "@/components/common/Paginado";
import { getCurrentLanguage } from "@/utils";
import { useRouter } from "next/router";

const MultimediaRenderer = ({ htmlContent, className }) => {
    const responsiveHtmlContent = htmlContent.replace(/width="(\d+)"/, 'width="100%"').replace(/height="(\d+)"/, 'height="100%"');
    return (
        <div className={className} dangerouslySetInnerHTML={{ __html: responsiveHtmlContent }} />
    );
};

export default function BusquedaItinerario() {
    const router = useRouter();
    const lenguaje = getCurrentLanguage(router.query);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    // Calcular el offset basado en la página actual
    const offset = (currentPage - 1) * itemsPerPage;

    // Manejar cambio de página
    const {
        favoritos,
        searchDestino,
        circuitos,
        circuitosEN
        /* AQUI TENGO QUE VER QUE SE ACTUALICE LOS CIRCUITOSSSSSSSSSSSSSSSSSSSSSSSSSS FAVORITOS */
    } = useSelector(state => state.itinerarioReducer.value);
    const [isOpen, setIsOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    // Este estado almacenará si el producto en el modal es un favorito.
    const [isModalFavorite, setIsModalFavorite] = useState(false);

    const { data: productos, error, isLoading, isFetching } = useGetDestinosBusquedaQuery({
        busqueda: searchDestino,
        limite: itemsPerPage,
        offset: offset,
        idioma: lenguaje ? lenguaje.code : "ES"
    }, {
        refetchOnMountOrArgChange: true
    });

    /* GALERIA DE MODAL */
    const { data: galery, error: errorGalery, isLoading: isLoadingGalery, isFetching: isFetchingGalery } = useGetGaleryDestinoQuery({
        id: parseInt(productoSeleccionado?.idArticulo)
    }, {
        skip: !productoSeleccionado,
        refetchOnMountOrArgChange: true
    });
    /* MODAL */
    useEffect(() => {
        if (productoSeleccionado && favoritos) {
            const circuitoSelected = [...circuitos, ...circuitosEN].find((c) => c.id === parseInt(productoSeleccionado.circuitoId));
            const isFav = !!favoritos[circuitoSelected.name]?.destinos.find(
                (item) => item.id === productoSeleccionado.idArticulo
            );
            setIsModalFavorite(isFav);
        }
    }, [productoSeleccionado, favoritos]);

    const handleOpenModal = (producto) => {
        setProductoSeleccionado(producto);
        setIsOpen(true);
        window.history.pushState({ modal: true }, '');
    };
    const handleCloseModal = () => {
        setProductoSeleccionado(null)
        setIsOpen(false);
    };
    /* BACK BUTTON MOBILE */
    useEffect(() => {
        const handlePopState = (event) => {
            if (isOpen) {
                handleCloseModal();
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isOpen]);

    /* PAGINADO */
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    if (error) return <p className="text-red-500 text-4xl">Hubo un error al cargar los alojamientos</p>;
    const totalItems = productos?.result[0]?.total ? parseInt(productos?.result[0]?.total) : 0;
    const loadingGalery = isLoadingGalery || isFetchingGalery;
    const loading = isLoading || isFetching;
    const actualizarFavoritos = (item) => {
        dispatch(setFavorito({ type: 'destinos', item, idCircuito: parseInt(item.circuitoId) }));
    };
    return (
        <div>
            <div className="flex justify-center">
                <Paginado
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    className={'pb-5 md:justify-start'}
                    accentColor={"#206C60"}
                />
            </div>
            <div className="flex overflow-x-auto gap-4 xl:gap-6 py-3 md:flex-wrap md:grid md:grid-cols-4 xl:grid-cols-5" style={{ scrollbarColor: `#206C6040` }}>
                {loading ? Array(5).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className={`rounded-lg relative flex flex-col bg-white flex-1 animate-pulse md:flex-1 shadow min-w-[72vw] max-w-[72vw] md:min-w-auto md:max-w-auto`}
                    >
                        <div className="relative">
                            <div className="w-full rounded-t-md h-[180px] bg-gray-200" />
                        </div>
                        <div className="flex flex-col border rounded-b-lg flex-1 p-3 gap-3">
                            <h4 className="text-[23px] xl:text-[30px] font-bold leading-[19px] uppercase text-neutral-semibold text-wrap xl:leading-[28px] line-clamp-3 bg-gray-200 h-5 rounded">
                            </h4>
                            <div className="flex-1 flex flex-col gap-3">
                                <div className="flex gap-2 flex-wrap">
                                    {Array(2).fill(0).map((_, index) => (
                                        <p key={index} className="rounded-md px-2 py-1 bg-neutral-400 text-white text-[16px] h-5 w-12 font-500 xl:text-[20px]"></p>
                                    ))}
                                </div>
                                <p className="text-[16px] font-[400] xl:text-[20px] text-neutral-[400] line-clamp-2 rounded h-3 bg-gray-200"></p>
                                <p className="text-[16px] font-[400] xl:text-[20px] text-neutral-[400] line-clamp-2 rounded h-3 bg-gray-200"></p>
                            </div>
                            <div className="border rounded-lg bg-gray-200 py-5 w-full" />
                        </div>
                    </div>
                ))
                    : error ? <div>Error al cargar los productos</div> :
                        productos.result.map((producto, index) => {
                            const circuitoSelected = [...circuitos, ...circuitosEN].find((c) => c.id === parseInt(producto.circuitoId));
                            const isFavorite = favoritos[circuitoSelected.name]?.destinos.find((item) => item.id === producto.idArticulo);
                            return (
                                <div
                                    key={index}
                                    className={`rounded-lg relative flex flex-col bg-white md:flex-1 shadow min-w-[72vw] max-w-[72vw] md:min-w-auto md:max-w-auto`}
                                >
                                    <div className="relative">
                                        <button
                                            className={`rounded-full bg-white p-1 text-[32px] absolute top-2 right-2 border shadow z-10`}
                                            onClick={() => actualizarFavoritos({ ...producto, id: producto.idArticulo })}
                                        >
                                            {!!isFavorite ? (
                                                <Check style={{ color: circuitoSelected.color }} className="size-8 md:size-7" />
                                            ) : (
                                                <Plus style={{ color: circuitoSelected.color }} className="size-8 md:size-7" />
                                            )}
                                        </button>
                                        <img
                                            src={process.env.URL_IMG + producto.imagen}
                                            alt={`imagen ${index}`}
                                            className="w-full rounded-t-md h-[180px] object-cover"
                                        />
                                        <div
                                            className={`font-bold rounded text-white text-2xl lg:text-2xl w-fit px-3 absolute bottom-2 left-2 z-10`}
                                            style={{ backgroundColor: circuitoSelected.color }}
                                        >
                                            {producto.subseccionNombre}
                                        </div>
                                    </div>
                                    <div className="flex flex-col border rounded-b-lg flex-1 p-3 gap-3">
                                        <h4 className="text-[23px] xl:text-[30px] font-bold leading-[19px] uppercase text-neutral-semibold text-wrap xl:leading-[28px] line-clamp-3">
                                            {producto.nombre}
                                        </h4>
                                        <div className="flex-1 flex flex-col gap-3">
                                            <div className="flex gap-2 flex-wrap">
                                                {producto.tags.split(",").map((categoria, index) => (
                                                    <p key={index} className="rounded-md px-2 py-1 bg-neutral-400 text-white text-[16px] font-500 xl:text-[20px]">
                                                        {categoria}
                                                    </p>
                                                ))}
                                            </div>
                                            <p className="text-[16px] font-[400] xl:text-[20px] text-neutral-[400] line-clamp-2">
                                                {producto.copete}
                                            </p>
                                        </div>
                                        <button
                                            className={`border rounded-lg hover:bg-[#206C60] hover:text-white w-full transition-colors duration-300 group`}
                                            onClick={() => handleOpenModal(producto)}
                                        >
                                            <div className="flex items-center gap-2 px-3 justify-between py-1">
                                                <p className="flex-1 text-lg font-semibold">Conocé más aquí</p>
                                                <Plus className="size-6 transition-transform duration-300 group-hover:rotate-90" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            <div className="flex justify-center">
                <Paginado
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    className={'pb-5 md:justify-start'}
                    accentColor={"#206C60"}
                />
            </div>
            {productoSeleccionado && isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    title="Detalle del Destino"
                    size="xl"
                    header={false}
                >
                    {productoSeleccionado && (
                        <div>
                            {/* HEADER DEL MODAL */}
                            <div className="relative rounded-md overflow-hidden">
                                <div className="absolute w-full h-full bg-black opacity-7"></div>
                                <Image
                                    src={window.innerWidth < 1024 ?
                                        process.env.URL_IMG + productoSeleccionado.imagenMovil
                                        ||
                                        process.env.URL_IMG + productoSeleccionado.imagen :
                                        process.env.URL_IMG + productoSeleccionado.imagen}
                                    alt={productoSeleccionado.nombre}
                                    width={250}
                                    height={400}
                                    className="w-full rounded-md h-[400px] object-cover"
                                />
                                <div className="absolute bottom-0 z-20 bg-gradient-to-t from-black/50 via-black/30 via-70% to-transparent w-full rounded-b-md pb-3 px-3">
                                    <div className="flex items-center mb-4 gap-4 w-12/15">
                                        <h4 className="md:text-[43px] font-bold uppercase text-white text-shadow-lg md:leading-tight text-[32px]/8">
                                            {productoSeleccionado.nombre}
                                        </h4>
                                    </div>
                                    <div className="flex flex-row gap-2 mb-3 flex-wrap">
                                        {productoSeleccionado.tags.split(",").map((categoria, index) => (
                                            <p key={index} className="rounded-md px-2 py-1 text-white text-[16px] font-semibold" style={{ backgroundColor: "#206C60" }}>
                                                {categoria}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* FIN HEADER DEL MODAL */}
                            <div className="grid grid-cols-8 gap-3 md:py-6 py-4">
                                {/* COLUMNA IZQUIERDA */}
                                <div className={`col-span-8 order-2 md:order-1 px-3 ${galery?.result?.length > 0 ||
                                    productoSeleccionado.iframe ||
                                    productoSeleccionado.video ||
                                    productoSeleccionado.url
                                    ?
                                    'md:col-span-3' :
                                    'md:col-span-8'}`}>
                                    <div className="sticky top-4">
                                        <div className="flex items-start mb-3 gap-3">
                                            <p className="text-[30px] font-bold leading-[32px] uppercase text-neutral-700 flex-1">
                                                {productoSeleccionado.nombre}
                                            </p>
                                            <button
                                                className={`rounded-full bg-white p-1 text-[32px] border shadow`}
                                                onClick={() => actualizarFavoritos({ ...productoSeleccionado, id: productoSeleccionado.idArticulo })}
                                            >
                                                {isModalFavorite ? (
                                                    <Check size={30} className="text-[#206c60]" />
                                                ) : (
                                                    <Plus size={30} className="text-[#206c60]" />
                                                )}
                                            </button>
                                        </div>
                                        <p className="font-medium text-neutral-500 text-[18px] mb-3">
                                            {productoSeleccionado.copete}
                                        </p>
                                        <div className="text-[11px] font-medium text-neutral-400 break-words" dangerouslySetInnerHTML={{ __html: productoSeleccionado.cuerpo }}></div>
                                    </div>
                                </div>
                                {/* COLUMNA IZQUIERDA FIN */}
                                {/* ////////////////////////// */}
                                {/* COLUMNA DERECHA */}
                                <div className="col-span-8 md:col-span-5 order-2 md:order-1 px-2">
                                    {loadingGalery ? (
                                        <div className='md:p-0 md:mb-4 mb-0 md:h-[63vh] px-0 animate-pulse'>
                                            <div className='flex md:gap-3 gap-2 h-full'>
                                                <div className='hidden md:flex flex-col gap-2 w-2/10'>
                                                    {Array(4).fill(0).map((_, i) => (
                                                        <div key={i} className='bg-gray-200 rounded-md flex-1'></div>
                                                    ))}
                                                </div>
                                                <div className='bg-gray-200 rounded-lg flex-1'></div>
                                            </div>
                                        </div>
                                    ) : galery?.result?.length > 0 ? (
                                        <ImageGallery
                                            items={galery?.result?.length > 0 ? galery.result.map(item => ({
                                                img: process.env.URL_IMG + item.archivo,
                                                text: item.texto
                                            })) : []}
                                            className='md:p-0 md:mb-4 mb-0 md:h-[63vh] px-0'
                                            classContain='md:gap-3 gap-2'
                                            classThumbnails={`md:w-2/10 ${galery?.result?.length === 1 ? 'hidden' : ''}`}
                                        />
                                    ) : null}
                                    <div className="mt-6 space-y-6">
                                        {/* Renderiza el Iframe si existe */}
                                        {productoSeleccionado.iframe && (
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2 text-neutral-700">Ubicación</h3>
                                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-gray-100 shadow-sm">
                                                    <MultimediaRenderer htmlContent={productoSeleccionado.iframe} className="w-full h-full" />
                                                </div>
                                            </div>
                                        )}
                                        {/* Renderiza el Video si existe */}
                                        {productoSeleccionado.video && (
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2 text-neutral-700">Video</h3>
                                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-gray-100 shadow-sm bg-black">
                                                    <video
                                                        // Asumiendo que tienes una variable de entorno para la URL de los videos
                                                        src={process.env.URL_VIDEOS + productoSeleccionado.video}
                                                        controls
                                                        className="w-full h-full object-cover"
                                                    >
                                                        Tu navegador no soporta la etiqueta de video.
                                                    </video>
                                                </div>
                                            </div>
                                        )}
                                        {/* Renderiza el enlace URL si existe */}
                                        {productoSeleccionado.url && (
                                            <div>
                                                <a
                                                    href={productoSeleccionado.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-full px-4 py-3 border border-transparent text-lg font-bold rounded-md text-white hover:bg-opacity-90 transition-colors"
                                                    style={{ backgroundColor: "#206C60" }}
                                                >
                                                    Visitar sitio web
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* COLUMNA DERECHA FIN */}
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    )
}
