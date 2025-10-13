import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, Link, PDFViewer } from '@react-pdf/renderer';
import { extractGoogleMapsLink } from '@/utils';

const URLImg = process.env.URL_IMG

// --- Paleta de Colores y Datos de Circuitos ---
const circuitosData = {
  historica: {
    nombre: "Ciudad Histórica",
    img: 'images/pdf/historica.png',
    icono: 'images/pdf/historicalogo.png',
    primary: '#004065',
    secondary: '#D15E00',
    background: '#F0F4F8',
  },
  yungas: {
    nombre: "Yungas Tucumanas",
    img: 'images/pdf/yungas.png',
    icono: 'images/pdf/yungaslogo.png',
    primary: '#00926A',
    secondary: '#E89020',
    background: '#F2F9F2',
  },
  choromoro: {
    nombre: "Valle De Choromoro",
    img: 'images/pdf/choromoro.png',
    icono: 'images/pdf/choromorologo.png',
    primary: '#D15E00',
    secondary: '#007773',
    background: '#FFF5E8',
  },
  calchaqui: {
    nombre: "Valle Calchaquí",
    img: 'images/pdf/calchaqui.png',
    icono: 'images/pdf/calchaquilogo.png',
    primary: '#8A142D',
    secondary: '#E89029',
    background: '#FAF3E8',
  },
  sur: {
    nombre: "Sur Tucumano",
    img: 'images/pdf/sur.png',
    icono: 'images/pdf/surlogo.png',
    primary: '#366E59',
    secondary: '#BB3130',
    background: '#EFF5F1',
  },
  default: {
    nombre: "Itinerario",
    icono: 'images/pdf/historica.png',
    img: '',
    primary: '#444444',
    secondary: '#888888',
    background: '#F5F5F5',
  }
};

// --- Registro de Fuentes: Helvetica ---
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/TK_R-03X-tI3s_1C-N-f_g.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/TK_R-03X-tI3s_1C-N-f_g.ttf', fontWeight: 'bold' },
  ],
});

// --- Estilos ---
const styles = StyleSheet.create({
  // Estilos Comunes
  page: {
    flexDirection: 'column',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
  },
  contentArea: {
    padding: '30px 40px',
    flexGrow: 1,
  },
  section: {
    marginBottom: 20,
  },
  h2: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    maxHeight: 180,
    minHeight: 73,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,

    borderBottomColor: '#EAEAEA',
    borderRightColor: '#EAEAEA',
    borderTopColor: '#EAEAEA',
    padding: '13px 15px',
    marginBottom: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  cardSubTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 7,
    textDecoration: 'underline',
  },
  cardBody: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    display: 'flex',
    paddingVertical: 5
  },
  cardCopete: { fontSize: 10, fontStyle: 'italic', color: '#555', marginBottom: 8, lineHeight: 1.4 },
  cardText: { fontSize: 10, marginBottom: 4, lineHeight: 1.4 },
  cardLabel: { fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  column: { flexDirection: 'column', width: '50%' },
  infoLine: { marginBottom: 5, fontSize: 10 },
  footer: { position: 'absolute', bottom: 10, left: 40, right: 40, textAlign: 'center', fontSize: 9, color: '#888' },

  // Estilos específicos para la Portada
  coverPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImgContain: {
    width: '27%',
  },
  cardImg: {
    width: 'auto',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 8,
  },
  coverImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 'auto',
  },
  coverIcon: {
    marginHorizontal: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '10px 20px',
    width: '70%',
    height: "auto"
  },
  coverTitle: {
    fontSize: 48,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '10px 20px',
    borderRadius: 5,
  },
  // Estilos para el contenido
  contentPageHeader: {
    paddingBottom: 15,
    marginBottom: 25,
    textAlign: 'left',
    borderBottomWidth: 3,
  },
  contentH1: {
    fontSize: 28,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    fontSize: 10,
    color: '#FFFFFF',
    padding: '3px 6px',
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  starRating: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginLeft: 8,
    alignSelf: 'center', // Para alinear verticalmente con el título
  },
  activitiesContainer: {
    marginTop: 8,
  },
  activitiesTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
});


// --- Componente Principal del Documento PDF ---
const ItinerarioDoc = ({ data }) => {
  const circuitsWithFavorites = Object.keys(data).filter(circuitKey =>
    data[circuitKey].destinos.length > 0 ||
    data[circuitKey].alojamientos.length > 0 ||
    data[circuitKey].prestadores.length > 0 ||
    data[circuitKey].guias.length > 0
  );
  return (
    <Document author="Tu Viaje por Tucumán" title="Mi Itinerario Personalizado">
      {circuitsWithFavorites.flatMap((circuitKey, index) => {
        const circuitData = data[circuitKey];
        const circuito = circuitosData[circuitKey] || circuitosData.default;

        const coverPage = (
          <Page key={`${circuitKey}-cover`} size="A4" style={{ ...styles.coverPage, backgroundColor: circuito.primary }} break={index > 0}>
            {circuito.img && <Image src={circuito.img} style={styles.coverImage} />}
            {circuito.icono && <Image src={circuito.icono} style={styles.coverIcon} />}
            {/* <Text style={styles.coverTitle}>{circuito.nombre}</Text> */}
          </Page>
        );

        const contentPage = (
          <Page key={`${circuitKey}-content`} size="A4" style={{ ...styles.page, backgroundColor: circuito.background }}>
            <View style={styles.contentArea}>
              <View style={{ ...styles.contentPageHeader, borderBottomColor: circuito.secondary }}>
                <Text style={{ ...styles.contentH1, color: circuito.primary }}>
                  Itinerario: {circuito.nombre}
                </Text>
              </View>

              {/* SECCIÓN DESTINOS */}
              {circuitData.destinos.length > 0 && (
                <View style={styles.section}>
                  <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Destinos Imperdibles</Text>
                  {circuitData.destinos.map(destino => (
                    <View key={destino.idArticulo} style={{
                      ...styles.card,
                      borderLeftColor: circuito.secondary,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 10,
                      maxHeight: 150
                    }} wrap={false}>
                      <View style={styles.cardImgContain}>
                        <Image src={{ uri: URLImg + (destino.imagenMovil || destino.imagen) }} style={styles.cardImg} />
                        {/* <Image src={"images/main/transporte.jpg"} style={styles.cardImg} /> */}
                      </View>
                      <View style={styles.cardBody}>
                        <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{destino.nombre}</Text>
                        {destino.copete && <Text style={styles.cardCopete}>"{destino.copete}"</Text>}
                        <View style={styles.tagsContainer}>
                          {destino.tags.split(',').map(tag => (
                            <Text key={tag} style={{ ...styles.tagBadge, backgroundColor: circuito.secondary }}>
                              {tag.trim()}
                            </Text>
                          ))}
                        </View>
                        {extractGoogleMapsLink(destino.cuerpo) && (
                          <Link src={extractGoogleMapsLink(destino.cuerpo)} style={styles.infoLine}>Google Maps</Link>
                        )
                        }</View>
                    </View>
                  ))}
                </View>
              )}

              {/* SECCIÓN ALOJAMIENTOS */}
              {circuitData.alojamientos.length > 0 && (
                <View style={styles.section}>
                  <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Dónde Descansar</Text>
                  {circuitData.alojamientos.map(alojamiento => (
                    <View key={alojamiento.id} style={{
                      ...styles.card,
                      borderLeftColor: circuito.secondary,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 10
                    }} wrap={false}>

                      {/* Contenedor de la Imagen */}
                      <View style={styles.cardImgContain}>
                        <Image
                          src={{ uri: `https://www.tucumanturismo.gob.ar/carga/image/${alojamiento.archivo}` }}
                          style={styles.cardImg}
                        />
                      </View>

                      {/* Contenedor del Cuerpo de la Tarjeta */}
                      <View style={{ ...styles.cardBody }}>
                        {/* Fila para el Título y las Estrellas */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                          <Text style={{ ...styles.cardTitle, marginBottom: 4, color: circuito.primary }}>{alojamiento.nombre} - {alojamiento.estrellas} ESTRELLAS</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{
                            ...styles.tagBadge,
                            backgroundColor: circuito.primary,
                            fontSize: 12,
                            fontWeight: 'bold',
                          }}>
                            {alojamiento.nombreLocalidad}
                          </Text>
                        </View>

                        {/* Resto de la información */}
                        <View style={{ flexDirection: 'column', gap: 5, justifyContent: 'space-between' }} >
                          <Text style={{ fontSize: 10, marginBottom: 0 }}>
                            <Text style={styles.cardLabel}>Dirección: </Text>
                            {alojamiento.direccion}, {alojamiento.nombreLocalidad}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 0 }}>
                            <Text style={styles.cardLabel}>Teléfono: </Text>
                            {alojamiento.telefono}
                          </Text>
                          {alojamiento.web && (
                            <Link src={alojamiento.web} style={{ fontSize: 10, marginBottom: 0 }}>
                              <Text style={styles.cardLabel}>Web: </Text>{alojamiento.web}
                            </Link>
                          )}
                          {alojamiento.mail && (
                            <Text style={{ fontSize: 10, marginBottom: 0 }}>
                              <Text style={styles.cardLabel}>Email: </Text>{alojamiento.mail}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* SECCIÓN ACTIVIDADES */}
              {circuitData.prestadores.length > 0 && (
                <View style={styles.section}>
                  <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Aventuras y Actividades</Text>
                  {circuitData.prestadores.map(prestador => {
                    const allActivities = prestador.actividades ? prestador.actividades.split(',') : [];
                    const visibleActivities = allActivities.slice(0, 11);
                    const remainingCount = allActivities.length - visibleActivities.length;

                    return (
                      <View key={prestador.id} style={{ ...styles.card, borderLeftColor: circuito.secondary }} wrap={false}>
                        <View style={{ gap: 5, marginBottom: 7 }}>
                          <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{prestador.titulo}</Text>

                          {/* Localidad destacada */}
                          {prestador.nombre_localidad && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{
                                ...styles.tagBadge,
                                backgroundColor: circuito.primary,
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                                {prestador.nombre_localidad}
                              </Text>
                            </View>
                          )}
                        </View>
                        {/* Contenedor para las actividades como badges */}
                        <View style={{ marginBottom: 7 }}>
                          <Text style={{ ...styles.activitiesTitle, color: circuito.secondary }}>Ofrece:</Text>
                          <View style={styles.tagsContainer}>
                            {visibleActivities.map(actividad => (
                              <Text key={actividad} style={{ ...styles.tagBadge, backgroundColor: circuito.secondary }}>
                                {actividad.trim()}
                              </Text>
                            ))}
                            {remainingCount > 0 && (
                              <Text style={{ ...styles.tagBadge, backgroundColor: '#757575' }}>
                                +{remainingCount} más
                              </Text>
                            )}
                          </View>
                        </View>

                        {/* Información de contacto mejorada */}
                        <View style={{ flexDirection: 'column', gap: 5, justifyContent: 'space-between' }}>
                          <Text style={styles.infoLine}>
                            <Text style={styles.cardLabel}>Teléfono: </Text>{prestador.telefono}
                          </Text>
                          <Text style={styles.infoLine}>
                            <Text style={styles.cardLabel}>Email: </Text>{prestador.email}
                          </Text>
                          {prestador.instagram && (
                            <Link src={prestador.instagram} style={styles.infoLine}>
                              <Text style={styles.cardLabel}>Instagram: </Text>Ver perfil
                            </Link>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              {circuitData.guias.length > 0 && (
                <View style={styles.section}>
                  <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Guías Expertos</Text>



                  {/* SECCIÓN GUÍAS */}
                  {circuitData.guias.map(guia => {
                    const allZones = guia.zona_operacion ? guia.zona_operacion.split(',') : [];
                    const visibleZones = allZones.slice(0, 8); // Mostramos hasta 8 zonas
                    const remainingZones = allZones.length - visibleZones.length;

                    return (
                      <View key={guia.id} style={{ ...styles.card, borderLeftColor: circuito.secondary }} wrap={false}>
                        {/* Fila para el Nombre y la Localidad */}
                        <View style={{ marginBottom: 7 }}>
                          <Text style={{ ...styles.cardTitle, color: circuito.primary, marginBottom: 3 }}>{guia.nombre}</Text>
                          {guia.nombre_localidad && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{
                                ...styles.tagBadge,
                                backgroundColor: circuito.primary,
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                                {guia.nombre_localidad}
                              </Text>
                            </View>
                          )}
                        </View>

                        {/* Zonas de Operación como badges */}
                        <View style={{ marginBottom: 7 }}>
                          <Text style={{ ...styles.activitiesTitle, color: circuito.secondary }}>Opera en:</Text>
                          <View style={styles.tagsContainer}>
                            {visibleZones.map(zona => (
                              <Text key={zona} style={{ ...styles.tagBadge, backgroundColor: circuito.secondary }}>
                                {zona.trim()}
                              </Text>
                            ))}
                            {remainingZones > 0 && (
                              <Text style={{ ...styles.tagBadge, backgroundColor: '#757575' }}>
                                +{remainingZones} más
                              </Text>
                            )}
                          </View>
                        </View>

                        {/* Email de contacto al final */}
                        <View style={{ flexDirection: 'column', gap: 5, justifyContent: 'space-between' }}>
                          {guia.domicilio && (
                            <Text style={styles.infoLine}>
                              <Text style={styles.cardLabel}>Domicilio: </Text>{guia.domicilio}
                            </Text>
                          )}
                          <Text style={styles.infoLine}>
                            <Text style={styles.cardLabel}>Email: </Text>{guia.email}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}

            </View>
            <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
              `Mi Itinerario por Tucumán - Página ${pageNumber} de ${totalPages}`
            )} fixed />
          </Page>
        );

        return [coverPage, contentPage];
      })}
    </Document>
  );
};

export default ItinerarioDoc;