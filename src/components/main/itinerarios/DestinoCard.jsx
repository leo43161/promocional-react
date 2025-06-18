import Image from "next/image";
import { Plus, CirclePlus, Check } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Modal from "@/components/common/Modal";
import { useSelector } from "react-redux";
import { useGetDestinosQuery, useGetGaleryDestinoQuery } from "@/redux/services/itinerariosService";
import ImageGallery from "@/components/articulos/ImageGallery";

/* import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; */

const destinos = [
  {
    idSubseccion: 108,
    nombre: "San Miguel de Tucuman",
    portada: "/images/destinos/san-miguel-de-tucuman.jpg",
    orden: 1,
    idSeccion: 1
  }
]

export default function DestinoCard({
  circuito,
}) {
  const scrollableContentRef = useRef(null);
  const {
    favoritos,
    circuitoSelected,
  } = useSelector(state => state.itinerarioReducer.value);
  const [isOpen, setIsOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
  const { data: productos, error, isLoading, refetch, isFetching } = useGetDestinosQuery({
    id: destinos[0].idSubseccion
  });
  const { data: galery, errorGalery, isLoadingGalery, refetchGalery, isFetchingGalery } = useGetGaleryDestinoQuery({
    id: parseInt(productoSeleccionado?.idArticulo)
  }, {
    refetchOnMountOrArgChange: true
  });

  console.log(galery)
  const handleOpenModal = (producto) => {
    console.log(producto)
    setProductoSeleccionado(producto);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    setDestinoSeleccionado(destinos[0]);
  }, [circuito]);

  const actualizarFavoritos = () => {
    // Lógica para actualizar los favoritos
  };

  return (
    <div>
      <div className="mb-4">
        {destinos.map((destino, index) => (
          <button
            key={index}
            className={`font-700 rounded-md text-white text-2xl lg:text-4xl w-fit px-4 m-1`}
            style={{ backgroundColor: destinoSeleccionado?.nombre !== destino.nombre ? "#888888" : circuitoSelected.color }}
            onClick={() => setDestinoSeleccionado(destino)}
          >
            {destino.nombre}
          </button>
        ))}
      </div>
      {destinoSeleccionado && (
        <div className="flex overflow-x-auto gap-4 py-5" style={{ scrollbarColor: `${destinoSeleccionado.color} ${destinoSeleccionado.color}40` }}>

          {productos && productos.result.articulos.map((producto, index) => (
            <div
              key={index}
              className={`rounded-lg relative flex flex-col bg-white xl:min-w-75 xl:max-w-75 lg:min-w-60 lg:max-w-60 min-w-[72vw] max-w-[72vw] shadow`}

            >
              <div className="relative">
                <button
                  className={`rounded-full bg-white p-1 text-[32px] absolute top-2 right-2`}
                  onClick={() => actualizarFavoritos(producto.idArticulo)}
                >
                  {favoritos.indexOf(producto.idArticulo) !== -1 ? (
                    <Check className="text-[#206c60]" />
                  ) : (
                    <Plus className="text-[#206c60]" />
                  )}
                </button>
                <Image
                  src={process.env.URL_IMG + producto.imagen}
                  alt={`imagen ${index}`}
                  width={250}
                  height={180}
                  className="w-full rounded-t-md h-[180px] object-cover"
                />
              </div>
              <div className="flex flex-col border rounded-b-lg flex-1 justify-between p-3 gap-3">
                <h4 className="text-[23px] xl:text-[30px] font-bold leading-[19px] uppercase text-neutral-semibold text-wrap xl:leading-[28px] line-clamp-3">
                  {producto.nombre}
                </h4>
                <div className="flex gap-2 ">
                  {producto.tags.split(",").map((categoria, index) => (
                    <p
                      key={index}
                      className="rounded-md px-2 py-1 bg-neutral-400 text-white text-[16px] font-500 xl:text-[20px]"
                    >
                      {categoria}
                    </p>
                  ))}
                </div>
                <p className="text-[16px] font-[400] xl:text-[20px] text-neutral-[400] line-clamp-2">
                  {producto.copete}
                </p>
                <button
                  className="border rounded-lg hover:bg-[#206C60] hover:text-white w-full"
                  onClick={() => handleOpenModal(producto)}
                >
                  <div className="flex items-center gap-2 px-3 justify-between">
                    <p className="flex-1">Conocé más aquí</p>
                    <CirclePlus />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {productoSeleccionado && isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          title="SIMOCA"
          size="xl"
          header={false}
        >
          {productoSeleccionado && (
            <div className="grid grid-cols-8 gap-3 md:py-6 py-4">
              <div className="lg:col-span-3 col-span-8 order-2 md:order-1 px-3">
                <div className="sticky top-0">
                  {/* /////////// HEADER DESKTOP /////////// */}
                  <div className="hidden md:block">
                    <div className="flex items-start mb-3">
                      <p className="text-[30px] font-bold leading-[32px] uppercase text-neutral-700">
                        {productoSeleccionado.nombre}
                      </p>
                      <button
                        className={`rounded-full bg-white p-1 text-[32px] border`}
                        onClick={() =>
                          actualizarFavoritos(productoSeleccionado.nombre)
                        }
                      >
                        {favoritos.indexOf(productoSeleccionado.nombre) !== -1 ? (
                          <Plus fill="#206c60" className="text-[#206c60]" />
                        ) : (
                          <Plus className="text-[#206c60]" />
                        )}
                      </button>
                    </div>
                    <div className="flex flex-row gap-2 mb-4">
                      {productoSeleccionado.tags.split(",").map((categoria, index) => (
                        <p
                          key={index}
                          className="rounded-md px-2 py-1 bg-neutral-400 text-white text-[14px] font-400"
                        >
                          {categoria}
                        </p>
                      ))}
                    </div>
                    <p className="font-medium text-neutral-500 text-[18px] mb-3">
                      {productoSeleccionado.copete}
                    </p>
                  </div>
                  {/* /////////// HEADER DESKTOP /////////// */}
                  <div className="text-[10px] font-medium text-neutral-400" dangerouslySetInnerHTML={{ __html: productoSeleccionado.cuerpo }}></div>
                </div>
              </div>
              <div className="col-span-8 md:col-span-5 order-1 md:order-2 px-2">
                {/* /////////// HEADER MOBILE /////////// */}
                <div className="block md:hidden">
                  <div className="flex items-start mb-3">
                    <p className="text-[30px] font-bold leading-[32px] uppercase text-neutral-700">
                      {productoSeleccionado.nombre}
                    </p>
                    <button
                      className={`rounded-full bg-white p-1 text-[32px] border`}
                      onClick={() =>
                        actualizarFavoritos(productoSeleccionado.nombre)
                      }
                    >
                      {favoritos.indexOf(productoSeleccionado.nombre) !== -1 ? (
                        <Plus fill="#206c60" className="text-[#206c60]" />
                      ) : (
                        <Plus className="text-[#206c60]" />
                      )}
                    </button>
                  </div>
                  <div className="flex flex-row gap-2 mb-4">
                    {productoSeleccionado.tags.split(",").map((categoria, index) => (
                      <p
                        key={index}
                        className="rounded-md px-2 py-1 bg-neutral-400 text-white text-[14px] font-400"
                      >
                        {categoria}
                      </p>
                    ))}
                  </div>
                  <p className="font-medium text-neutral-500 text-[18px] mb-3">
                    {productoSeleccionado.copete}
                  </p>
                </div>
                {/* /////////// HEADER MOBILE /////////// */}
                <div className="object-cover">
                  <ImageGallery
                    isLoading={!(galery?.result?.length > 0)}
                    items={galery?.result?.length > 0 ? galery?.result.map(item => ({
                      img: process.env.URL_IMG + item.archivo,
                      text: item.texto
                    })) : []}
                    className='md:p-0 md:mb-4 mb-0 md:h-[63vh] px-0'
                    classContain='md:gap-3 gap-2'
                    classThumbnails={'md:w-2/10'}
                  />
                </div>
                <div>

                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
