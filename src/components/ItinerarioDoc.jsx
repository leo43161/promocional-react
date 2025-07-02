import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, Link } from '@react-pdf/renderer';
import { extractGoogleMapsLink } from '@/utils';

const URLImg = process.env.URL_IMG
console.log(URLImg);

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
    maxHeight: 130,
    minHeight: 70,
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
  }
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
                      gap: 10
                    }} wrap={false}>
                      <View style={styles.cardImgContain}>
                        {/* <Image src={{ uri: URLImg + (destino.imagenMovil || destino.imagen)}} style={styles.cardImg} /> */}
                        <Image src={"images/main/transporte.jpg"} style={styles.cardImg} />
                      </View>
                      <View style={styles.cardBody}>
                        <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{destino.nombre}</Text>
                        {destino.copete && <Text style={styles.cardCopete}>"{destino.copete}"</Text>}
                        <Text style={styles.cardText}><Text style={styles.cardLabel}>Tags: </Text>{destino.tags}</Text>
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
                    <View key={alojamiento.id} style={{ ...styles.card, borderLeftColor: circuito.secondary }} wrap={false}>
                      <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{alojamiento.nombre}</Text>
                      <Text style={{ ...styles.cardText, color: circuito.secondary, fontWeight: 'bold' }}>
                        {Array(parseInt(alojamiento.estrellas, 10)).fill(0).map((_, i) => '★ ')}
                      </Text>
                      <View style={styles.row}>
                        <View style={styles.column}>
                          <Text style={styles.infoLine}>Dirección: {alojamiento.direccion}, {alojamiento.nombreLocalidad}</Text>
                          <Text style={styles.infoLine}>Teléfono: {alojamiento.telefono}</Text>
                        </View>
                        <View style={styles.column}>
                          {alojamiento.web && (
                            <Link src={alojamiento.web} style={styles.infoLine}>Web: {alojamiento.web}</Link>
                          )}
                          {alojamiento.mail && (
                            <Text style={styles.infoLine}>Email: {alojamiento.mail}</Text>
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
                  {circuitData.prestadores.map(prestador => (
                    <View key={prestador.id} style={{ ...styles.card, borderLeftColor: circuito.secondary }} wrap={false}>
                      <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{prestador.titulo}</Text>
                      <Text style={styles.cardText}><Text style={styles.cardLabel}>Ofrece: </Text>{prestador.actividades}</Text>
                      <Text style={styles.infoLine}>Teléfono: {prestador.telefono}</Text>
                      <Text style={styles.infoLine}>Email: {prestador.email}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* SECCIÓN GUÍAS */}
              {circuitData.guias.length > 0 && (
                <View style={styles.section}>
                  <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Guías Expertos</Text>
                  {circuitData.guias.map(guia => (
                    <View key={guia.id} style={{ ...styles.card, borderLeftColor: circuito.secondary, maxHeight: 210 }} wrap={false}>
                      <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{guia.nombre}</Text>
                      <Text style={{ ...styles.cardSubTitle, color: circuito.primary }}>{guia.nombre_localidad}</Text>
                      <Text style={styles.cardText}><Text style={styles.cardLabel}>Habilitación: </Text>{guia.tipo_registro}</Text>
                      <Text style={styles.cardText}><Text style={styles.cardLabel}>Opera en: </Text>{guia.zona_operacion}</Text>
                      <Text style={styles.infoLine}>Email: {guia.email}</Text>
                    </View>
                  ))}
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