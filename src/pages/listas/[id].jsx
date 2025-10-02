// pages/listas/[id].js
import { useRouter } from 'next/router';
import { useGetlistaCardsQuery } from "@/redux/services/listaCardService";
import ParallaxContainer from "@/components/common/ParallaxContainer";
import Breadcrumb from "@/components/common/Breadcrumb";
import CardGeneric from "@/components/listcards/CardGeneric";

// 🖼️ Mapeo de IDs de listas a imágenes parallax
const parallaxImages = {
  'museos': "https://www.tucumanturismo.gob.ar/public/img/casahistorica_nl4vn8fy_16-07-2025.jpg",
  'compras': "https://www.tucumanturismo.gob.ar/public/img/shoppingaleria2_0ujb71i0_11-06-2024_5wyzaxzx_17-07-2025.jpg",
  'oficinas': "https://www.tucumanturismo.gob.ar/public/img/1920x650-Tucuman-Oficinas-Desktop_t4eelyer_02-07-2024.jpg",
  'festivales': "https://www.tucumanturismo.gob.ar/public/img/feria simoca año 2019 (53)_k6wdnfo2_18-07-2025.jpg",
  'ciclodificultad-a': "https://www.tucumanturismo.gob.ar/public/img/paseobicigaleria2_wd3gsjrn_16-07-2025.jpg",
  'ciclodificultad-m': "https://www.tucumanturismo.gob.ar/public/img/paseobicigaleria2_wd3gsjrn_16-07-2025.jpg",
  'ciclodificultad-b': "https://www.tucumanturismo.gob.ar/public/img/paseobicigaleria2_wd3gsjrn_16-07-2025.jpg",
  'bodegas': "https://www.tucumanturismo.gob.ar/public/img/bodega chico zossi (183)_8bk75jig_17-07-2025.JPG",
  'artesano': "https://www.tucumanturismo.gob.ar/public/img/segitinerario4_fpxudcuh_17-07-2025.jpg",
  'penas': "https://www.tucumanturismo.gob.ar/public/img/peñasgaleria4_8w8xs0bg_11-06-2024_fqyowmxz_17-07-2025.jpg" 
};

// 🗺️ Mapeo de IDs de listas a títulos
const listTitles = {
  'museos': 'Museos de la Provincia',
  'compras': 'Paseos de Compras',
  'oficinas': 'Oficinas de Informes',
  'festivales': 'Fiestas y Festivales',
  'ciclodificultad-a': 'Circuitos de Dificultad alta',
  'ciclodificultad-m': 'Circuitos de Dificultad intermedia',
  'ciclodificultad-b': 'Circuitos de Dificultad baja',
  'bodegas': 'Bodegas Destacadas',
  'artesano': 'Ruta del Artesano - Manos del Valle',
  'penas': 'Peñas de la provincia de Tucumán'
};

// 🔢 Mapeo de la URL (string) al ID numérico del backend
const listBackendList = {
  'oficinas': 1,    
  'museos': 2,
  'penas': 3,
  'compras': 4,  
  'festivales': 5,
  'artesano': 6,
  'bodegas': 7,
  'ciclodificultad-a': 8,
  'ciclodificultad-m': 9,
  'ciclodificultad-b': 10 
};

export default function ListaGenericaPage() {
  const router = useRouter();
  const { id } = router.query;
  // ⚙️ Lógica para determinar si la lista es de cicloturismo
    const isCiclodificultad = id?.includes('ciclodificultad');

  //Se busca el ID numérico del backend usando la clave de la URL
  const backendListId = listBackendList[id] || null;

  const { data, error, isLoading } = useGetlistaCardsQuery(backendListId, {
    skip: !backendListId, // La consulta se ejecuta solo si hay un ID numérico válido
  });

  const articulos = data?.result
    ? JSON.parse(data.result).filter((item) => item.Activo && item.Visible)
    : [];

  const title = listTitles[id] || 'Lista';
  const parallaxImageUrl = parallaxImages[id] || '/images/default-parallax.jpg';

  // Manejo de estados de carga y error
  if (isLoading) {
    return (
      <div className="text-center text-lg mt-10">Cargando {title}...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg mt-10 text-red-500">
        Error al cargar los datos de {title}.
      </div>
    );
  }

  // Renderizado de la vista genérica
  return (
    <div>
      <section>
        <ParallaxContainer
          speed={0.2}
          minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
          className=""
          imageUrl={parallaxImageUrl}
        >
          <div className="container mx-auto h-full text-white flex flex-col justify-end">
            <div className="w-11/12 mx-auto pt-5">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">{title}</h2>
            </div>
          </div>
        </ParallaxContainer>
      </section>
      <div className="w-11/12 mx-auto pt-5">
        <div className="mb-5">
          <Breadcrumb
            items={[{ label: title, href: `/listas/${id}` }]}
          />
        </div>
        <div className="container mt-5">
          <h1 className="text-center mb-4 text-3xl font-semibold">
            {title} de la provincia de Tucumán
          </h1>
        </div>
        <div className="row g-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articulos.length > 0 ? (
            articulos.map((articulo) => (
              <CardGeneric key={articulo.id_LC} articulo={articulo} isCiclodificultad={isCiclodificultad} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted">
              No se encontraron {title}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}