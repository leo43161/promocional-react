import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, Link } from '@react-pdf/renderer';

// --- Paleta de Colores y Datos de Circuitos ---
const circuitosData = {
  historica: {
    nombre: "Ciudad Histórica",
    img: 'images/pdf/historica.png',
    primary: '#004065',
    secondary: '#D15E00',
    background: '#F0F4F8',
  },
  yungas: {
    nombre: "Yungas Tucumanas",
    img: 'images/pdf/yungas.png',
    primary: '#00926A',
    secondary: '#E89020',
    background: '#F2F9F2',
  },
  choromoro: {
    nombre: "Valle De Choromoro",
    img: 'images/pdf/choromoro.png',
    primary: '#D15E00',
    secondary: '#007773',
    background: '#FFF5E8',
  },
  calchaqui: {
    nombre: "Valle Calchaquí",
    img: 'images/pdf/calchaqui.png',
    primary: '#8A142D',
    secondary: '#E89029',
    background: '#FAF3E8',
  },
  sur: {
    nombre: "Sur Tucumano",
    img: 'images/pdf/sur.png',
    primary: '#366E59',
    secondary: '#BB3130',
    background: '#EFF5F1',
  },
  default: {
    nombre: "Itinerario",
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

// --- Estilos Mejorados ---
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
  },
  pageBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 'auto',
    opacity: 0.8,
    zIndex: -1,
  },
  contentArea: {
    padding: '30px 40px',
    flexGrow: 1,
  },
  header: {
    paddingBottom: 15,
    marginBottom: 25,
    textAlign: 'center',
    borderBottomWidth: 3,
  },
  h1: {
    fontSize: 28,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
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
    borderRadius: 3,
    padding: '10px 15px',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  cardBody: {
    marginTop: 4,
  },
  cardCopete: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 6,
    lineHeight: 1.4,
  },
  cardText: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  cardLabel: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
    width: '50%',
  },
  infoLine: {
    marginBottom: 5,
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#888',
  },
});

// --- Componente Principal del Documento PDF ---
const ItinerarioDoc = ({ data }) => {
  // Filtra los circuitos que tienen al menos un item favorito.
  const circuitsWithFavorites = Object.keys(data).filter(circuitKey =>
    data[circuitKey].destinos.length > 0 ||
    data[circuitKey].alojamientos.length > 0 ||
    data[circuitKey].prestadores.length > 0 ||
    data[circuitKey].guias.length > 0
  );

  return (
    <Document author="Tu Viaje por Tucumán" title="Mi Itinerario Personalizado">
      {circuitsWithFavorites.map((circuitKey, index) => {
        const circuitData = data[circuitKey];
        const circuito = circuitosData[circuitKey] || circuitosData.default;

        return (
          <Page key={circuitKey} size="A4" style={{ ...styles.page, backgroundColor: circuito.background }} break={index > 0}>
            {/* Imagen de fondo decorativa */}
            {/* <Image src={circuito.img} style={styles.pageBackground} /> */}

            {/* Contenido principal de la página */}
            <View style={styles.contentArea}>
              <View style={{...styles.header, borderBottomColor: circuito.secondary}}>
                <Text style={{ ...styles.h1, color: circuito.primary }}>
                  {circuito.nombre}
                </Text>
              </View>

              {/* --- SECCIÓN DESTINOS --- */}
              {/* Se elimina 'wrap={false}' para permitir el salto de página automático */}
              {circuitData.destinos.length > 0 && (
                <View style={styles.section}>
                  <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Destinos Imperdibles</Text>
                  {circuitData.destinos.map(destino => (
                    <View key={destino.idArticulo} style={{...styles.card, borderLeftColor: circuito.secondary}} wrap={false}>
                      <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{destino.nombre}</Text>
                      <View style={styles.cardBody}>
                        {destino.copete && <Text style={styles.cardCopete}>"{destino.copete}"</Text>}
                        <Text style={styles.cardText}><Text style={styles.cardLabel}>Tags: </Text>{destino.tags}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* --- SECCIÓN ALOJAMIENTOS --- */}
              {circuitData.alojamientos.length > 0 && (
                <View style={styles.section}>
                  <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Dónde Descansar</Text>
                  {circuitData.alojamientos.map(alojamiento => (
                    <View key={alojamiento.id} style={{...styles.card, borderLeftColor: circuito.secondary}} wrap={false}>
                        <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{alojamiento.nombre}</Text>
                        <Text style={{...styles.cardText, color: circuito.secondary, fontWeight: 'bold'}}>
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

              {/* --- SECCIÓN ACTIVIDADES (PRESTADORES) --- */}
              {circuitData.prestadores.length > 0 && (
                <View style={styles.section}>
                    <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Aventuras y Actividades</Text>
                  {circuitData.prestadores.map(prestador => (
                    <View key={prestador.id} style={{...styles.card, borderLeftColor: circuito.secondary}} wrap={false}>
                      <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{prestador.titulo}</Text>
                      <Text style={styles.cardText}><Text style={styles.cardLabel}>Ofrece: </Text>{prestador.actividades}</Text>
                        <Text style={styles.infoLine}>Teléfono: {prestador.telefono}</Text>
                        <Text style={styles.infoLine}>Email: {prestador.email}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* --- SECCIÓN GUÍAS --- */}
              {circuitData.guias.length > 0 && (
                <View style={styles.section}>
                    <Text style={{ ...styles.h2, color: circuito.primary, borderBottomColor: circuito.secondary }}>Guías Expertos</Text>
                  {circuitData.guias.map(guia => (
                    <View key={guia.id} style={{...styles.card, borderLeftColor: circuito.secondary}} wrap={false}>
                      <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{guia.nombre}</Text>
                      <Text style={styles.cardText}><Text style={styles.cardLabel}>Habilitación: </Text>{guia.tipo_registro}</Text>
                      <Text style={styles.cardText}><Text style={styles.cardLabel}>Opera en: </Text>{guia.zona_operacion}</Text>
                        <Text style={styles.infoLine}>Email: {guia.email}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* --- PIE DE PÁGINA --- */}
            <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
              `Mi Itinerario por Tucumán - Página ${pageNumber} de ${totalPages}`
            )} fixed />
          </Page>
        )
      })}
    </Document>
  );
};

export default ItinerarioDoc;