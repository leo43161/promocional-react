import Image from "next/image";
import { Heart, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";

/* import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; */

export default function DestinoCard({
  circuito,
  favoritos,
  actualizarFavoritos,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);

  const handleOpenModal = (producto) => {
    setProductoSeleccionado(producto);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    setDestinoSeleccionado(circuito.destinos[0]);
  }, [circuito]);
  return (
    <div>
      <div className="mb-4">
        {circuito.destinos.map((destino, index) => (
          <button
            key={index}
            className={`font-700 rounded-md text-white text-2xl lg:text-4xl w-fit px-4 m-1`}
            style={{ backgroundColor: destinoSeleccionado?.nombre !== destino.nombre ? "#888888" : destino.color }}
            onClick={() => setDestinoSeleccionado(destino)}
          >
            {destino.nombre}
          </button>
        ))}
      </div>
      {destinoSeleccionado && (
        <div className="flex overflow-x-auto gap-4">
          {destinoSeleccionado.productos.map((producto, index) => (
            <div
              key={index}
              className="border border-neutral-100 flex-1 pb-4 rounded-lg relative bg-white"
            >
              <div className="relative flex-1 border border-amber-300">
                <button
                  className={`rounded-full bg-white p-1 text-[32px] absolute top-2 right-2`}
                  onClick={() => actualizarFavoritos(producto.nombre)}
                >
                  {favoritos.indexOf(producto.nombre) !== -1 ? (
                    <Heart className="text-[#206c60]" />
                  ) : (
                    <Heart className="text-[#206c60]" />
                  )}
                </button>
                <Image
                  src={"/images/main/hotel.jpg"}
                  alt={`imagen ${index}`}
                  width={250}
                  height={180}
                  className="w-full rounded-t-md h-[180px] object-cover"
                />
              </div>
              <h4 className="text-[20px] font-700 leading-[19px] px-3 pt-3 uppercase text-neutral-700">
                {producto.nombre}
              </h4>
              <div className="flex flex-row gap-2 my-2 ml-3">
                {producto.categorias.map((categoria, index) => (
                  <p
                    key={index}
                    className="rounded-md px-2 py-1 bg-neutral-400 text-white text-[16px] font-500"
                  >
                    {categoria}
                  </p>
                ))}
              </div>
              {/* <p className="text-[16px] font-400 text-neutral-400 px-3 pt-1">
            {producto.detalle.substring(0, 79) + "..."}
          </p> */}
              <button
                className="mt-2 ml-3 border rounded-lg hover:bg-[#206C60] hover:text-white"
                onClick={() => handleOpenModal(producto)}
              >
                <div className="flex flex-row items-center gap-2 px-3">
                  <p>Conocé más aquí</p>
                  <CirclePlus />
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Detalle del producto"
      >
        <div className="object-cover">
          <video
            src="/videos/cadillal.mp4"
            autoPlay
            loop
            muted
            className="h-[550px] w-screen object-cover"
          />
        </div>

        {productoSeleccionado && (
          <div className="grid grid-cols-7 gap-4 mr-6 mt-4">
            <div className="col-span-2 mt-6 ml-6">
              <div className="flex flex-row pr-6 items-start">
                <p className="text-[30px] font-700 leading-[32px] px-3 uppercase text-neutral-700">
                  {productoSeleccionado.nombre}
                </p>
                <button
                  className={`rounded-full bg-white p-1 text-[32px]`}
                  onClick={() =>
                    actualizarFavoritos(productoSeleccionado.nombre)
                  }
                >
                  {favoritos.indexOf(productoSeleccionado.nombre) !== -1 ? (
                    <Heart className="text-[#206c60]" />
                  ) : (
                    <Heart className="text-[#206c60]" />
                  )}
                </button>
              </div>
              <div className="flex flex-row gap-2 my-2 ml-3 mt-6">
                {productoSeleccionado.categorias.map((categoria, index) => (
                  <p
                    key={index}
                    className="rounded-md px-2 py-1 bg-neutral-400 text-white text-[14px] font-400"
                  >
                    {categoria}
                  </p>
                ))}
              </div>
              <p className="text-[16px] font-400 text-neutral-400 px-3 mt-4">
                {productoSeleccionado.detalle}
              </p>
            </div>
            <div className="flex flex-row gap-4 mt-10">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Image
                    key={index}
                    src={productoSeleccionado.imagen}
                    alt={`Imagen ${index + 1}`}
                    width={250}
                    height={180}
                  />
                ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
