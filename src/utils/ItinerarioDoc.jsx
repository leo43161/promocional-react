import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// --- Paleta de Colores por Circuito (Extraído del Manual de Marca) ---
// Se han seleccionado los colores primario y secundario más representativos.
const circuitColors = {
  historica: {
    primary: '#004065',   // Azul oscuro [cite: 169]
    secondary: '#D15E00', // Naranja [cite: 169]
    background: '#F0F4F8', // Un color claro para el fondo de la página
  },
  yungas: {
    primary: '#00926A',   // Verde oscuro [cite: 166]
    secondary: '#E89020', // Naranja [cite: 166]
    background: '#F2F9F2',
  },
  choromoro: {
    primary: '#D15E00',   // Naranja [cite: 168]
    secondary: '#007773', // Verde azulado [cite: 168]
    background: '#FFF5E8',
  },
  calchaqui: {
    primary: '#8A142D',   // Rojo oscuro [cite: 167]
    secondary: '#E89029', // Naranja [cite: 167]
    background: '#FAF3E8',
  },
  sur: {
    primary: '#366E59',   // Verde oscuro [cite: 170]
    secondary: '#BB3130', // Rojo [cite: 170]
    background: '#EFF5F1',
  },
  default: {
    primary: '#444',
    secondary: '#888',
    background: '#F5F5F5',
  }
};

// --- Registro de Fuentes ---
// Nota: @react-pdf/renderer no soporta todas las fuentes custom directamente.
// Es mejor usar fuentes estándar o registrarlas como se muestra.
// Usaremos 'Helvetica' como una fuente robusta y compatible.
// La tipografía "Cobold" y "Sofia Sans" del manual [cite: 163] no son estándar.
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/TK_R-03X-tI3s_1C-N-f_g.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/TK_R-03X-tI3s_1C-N-f_g.ttf', fontWeight: 'bold' },
  ],
});


// --- Creación de Estilos ---
const styles = StyleSheet.create({
  // Estilos Generales
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  h1: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  h2: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    paddingBottom: 3,
    borderBottomWidth: 2,
  },
  // Estilos de las "Tarjetas" de Items
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    textTransform: 'capitalize'
  },
  itemText: {
    fontSize: 10,
    color: '#333',
    marginBottom: 3,
  },
  itemLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#555',
  },
  // Estructura de dos columnas para detalles
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  column: {
    width: '48%', // Para tener un pequeño espacio entre ellas
    marginBottom: 5,
  }
});


const ItinerarioDoc = ({ data }) => {
  // Obtenemos los circuitos que tienen al menos un favorito
  const circuitsWithFavorites = Object.keys(data).filter(circuitKey =>
    data[circuitKey].destinos.length > 0 ||
    data[circuitKey].alojamientos.length > 0 ||
    data[circuitKey].prestadores.length > 0 ||
    data[circuitKey].guias.length > 0
  );

  return (
    <Document>
      {circuitsWithFavorites.map((circuitKey, index) => {
        const circuitData = data[circuitKey];
        const colors = circuitColors[circuitKey] || circuitColors.default;

        return (
          // Usamos `break` para asegurar que cada circuito empiece en una nueva página
          <Page key={circuitKey} size="A4" style={{ ...styles.page, backgroundColor: colors.background }} break={index > 0}>

            {/* --- CABECERA DEL CIRCUITO --- */}
            <View style={styles.section}>
              <Text style={{ ...styles.h1, color: colors.primary }}>
                {circuitKey}
              </Text>
            </View>

            {/* --- SECCIÓN DESTINOS --- */}
            {circuitData.destinos.length > 0 && (
              <View style={styles.section}>
                <Text style={{ ...styles.h2, borderColor: colors.secondary, color: colors.primary }}>Destinos</Text>
                {circuitData.destinos.map(destino => (
                  <View key={destino.idArticulo} style={styles.itemContainer}>
                    <Text style={{ ...styles.itemTitle, color: colors.primary }}>{destino.nombre}</Text>
                    <Text style={styles.itemText}>{destino.copete}</Text>
                    <Text style={styles.itemText}><Text style={styles.itemLabel}>Tags: </Text>{destino.tags}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* --- SECCIÓN ALOJAMIENTOS --- */}
            {circuitData.alojamientos.length > 0 && (
              <View style={styles.section}>
                <Text style={{ ...styles.h2, borderColor: colors.secondary, color: colors.primary }}>Alojamientos</Text>
                {circuitData.alojamientos.map(alojamiento => (
                   <View key={alojamiento.id} style={styles.itemContainer}>
                    <Text style={{...styles.itemTitle, color: colors.primary}}>{alojamiento.nombre} [{alojamiento.estrellas} Estrellas]</Text>
                     <View style={styles.row}>
                       <View style={styles.column}>
                          <Text style={styles.itemText}><Text style={styles.itemLabel}>Localidad: </Text>{alojamiento.nombreLocalidad}</Text>
                          <Text style={styles.itemText}><Text style={styles.itemLabel}>Dirección: </Text>{alojamiento.direccion}</Text>
                       </View>
                       <View style={styles.column}>
                          <Text style={styles.itemText}><Text style={styles.itemLabel}>Teléfono: </Text>{alojamiento.telefono}</Text>
                       </View>
                     </View>
                  </View>
                ))}
              </View>
            )}
            
            {/* --- SECCIÓN ACTIVIDADES (PRESTADORES) --- */}
            {circuitData.prestadores.length > 0 && (
              <View style={styles.section}>
                <Text style={{...styles.h2, borderColor: colors.secondary, color: colors.primary}}>Actividades</Text>
                {circuitData.prestadores.map(prestador => (
                  <View key={prestador.id} style={styles.itemContainer}>
                    <Text style={{...styles.itemTitle, color: colors.primary}}>{prestador.titulo}</Text>
                    <Text style={styles.itemText}><Text style={styles.itemLabel}>Actividades: </Text>{prestador.actividades}</Text>
                    <Text style={styles.itemText}><Text style={styles.itemLabel}>Contacto: </Text>{prestador.telefono} / {prestador.email}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* --- SECCIÓN GUÍAS --- */}
            {circuitData.guias.length > 0 && (
              <View style={styles.section}>
                <Text style={{...styles.h2, borderColor: colors.secondary, color: colors.primary}}>Guías</Text>
                {circuitData.guias.map(guia => (
                   <View key={guia.id} style={styles.itemContainer}>
                    <Text style={{...styles.itemTitle, color: colors.primary}}>{guia.nombre} - {guia.tipo_registro}</Text>
                    <Text style={styles.itemText}><Text style={styles.itemLabel}>Zonas: </Text>{guia.zona_operacion}</Text>
                  </View>
                ))}
              </View>
            )}

          </Page>
        )
      })}
    </Document>
  );
};

export default ItinerarioDoc;