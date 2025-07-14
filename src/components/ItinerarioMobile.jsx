import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, Link } from '@react-pdf/renderer';
import { extractGoogleMapsLink } from '@/utils';

// Las constantes de datos (URLImg, circuitosData) y el registro de fuentes
// permanecen exactamente iguales, ya que los datos y la marca no cambian.
const URLImg = process.env.URL_IMG;

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

Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helvetica/v11/TK_R-03X-tI3s_1C-N-f_g.ttf', fontWeight: 'normal' },
        { src: 'https://fonts.gstatic.com/s/helvetica/v11/TK_R-03X-tI3s_1C-N-f_g.ttf', fontWeight: 'bold' },
    ],
});

// --- ESTILOS OPTIMIZADOS PARA MÓVIL ---
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11, // Ligeramente más grande para legibilidad
        color: '#333',
        padding: 15, // Padding reducido para pantallas pequeñas
    },
    section: {
        marginBottom: 25,
    },
    // Encabezado de cada circuito
    circuitHeader: {
        marginBottom: 25,
        borderBottomWidth: 3,
        textAlign: 'center',
    },
    circuitIcon: {
        marginHorizontal: 'auto',
        padding: '10px 20px',
        width: '70%',
        height: "auto"
    },
    circuitTitle: {
        fontSize: 26,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
    },
    // Título de cada sección (Destinos, Alojamientos, etc.)
    sectionTitle: {
        fontSize: 25,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        marginBottom: 15,
        paddingBottom: 5,
        borderBottomWidth: 1.5,
    },
    // --- NUEVO DISEÑO DE TARJETA APILADA (STACKED) ---
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 15,
        // Sombra sutil para dar profundidad
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    cardImage: {
        width: '100%',
        height: 150, // Altura fija para la imagen
        objectFit: 'cover',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 8,
    },
    cardCopete: { fontSize: 15, fontStyle: 'italic', color: '#555', marginBottom: 8, lineHeight: 1.4 },
    cardLabel: { fontWeight: 'bold' },
    infoLine: { marginBottom: 6, fontSize: 16, lineHeight: 1.5 },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    tagBadge: {
        fontSize: 15,
        color: '#FFFFFF',
        padding: '3px 6px',
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 5,
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    activitiesContainer: { marginTop: 6 },
    activitiesTitle: {
        fontSize: 17,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    // Footer del documento
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        textAlign: 'center',
        fontSize: 14,
        color: '#888'
    },
});


// --- Componente Principal del Documento PDF Móvil ---
const ItinerarioMobile = ({ data }) => {
    const circuitsWithFavorites = Object.keys(data).filter(circuitKey =>
        data[circuitKey].destinos.length > 0 ||
        data[circuitKey].alojamientos.length > 0 ||
        data[circuitKey].prestadores.length > 0 ||
        data[circuitKey].guias.length > 0
    );

    return (
        <Document author="Tu Viaje por Tucumán" title="Mi Itinerario Personalizado Mobile">
            {/* Un solo <Page> largo que contiene todos los circuitos */}
            <Page size={{ width: 390, height: 1200 }} style={styles.page}>
                {circuitsWithFavorites.map((circuitKey, index) => {
                    const circuitData = data[circuitKey];
                    const circuito = circuitosData[circuitKey] || circuitosData.default;

                    return (
                        <View key={circuitKey} style={{ ...styles.section, paddingTop: index > 0 ? 30 : 0 }} break={index > 0}>
                            {/* ENCABEZADO DEL CIRCUITO */}
                            <View style={{ ...styles.circuitHeader, borderBottomColor: circuito.secondary }}>
                                <View style={{ backgroundColor: circuito.primary, width: '100%', textAlign: 'center' }}>
                                    <Image src={circuito.icono} style={styles.circuitIcon} />
                                </View>
                                {/* <Text style={{ ...styles.circuitTitle, color: circuito.primary }}>{circuito.nombre}</Text> */}
                            </View>

                            {/* SECCIÓN DESTINOS */}
                            {circuitData.destinos.length > 0 && (
                                <View>
                                    <Text style={{ ...styles.sectionTitle, color: circuito.primary, borderBottomColor: circuito.secondary }}>Destinos</Text>
                                    {circuitData.destinos.map(destino => (
                                        <View key={destino.idArticulo} style={styles.card} wrap={false}>
                                            <Image src={{ uri: URLImg + (destino.imagenMovil || destino.imagen) }} style={styles.cardImage} />
                                            <View style={styles.cardContent}>
                                                <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{destino.nombre}</Text>
                                                {destino.copete && <Text style={styles.cardCopete}>"{destino.copete}"</Text>}
                                                <View style={styles.tagsContainer}>
                                                    {destino.tags.split(',').map(tag => (
                                                        <Text key={tag} style={{ ...styles.tagBadge, backgroundColor: circuito.secondary }}>{tag.trim()}</Text>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {/* SECCIÓN ALOJAMIENTOS */}
                            {circuitData.alojamientos.length > 0 && (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ ...styles.sectionTitle, color: circuito.primary, borderBottomColor: circuito.secondary }}>Alojamientos</Text>
                                    {circuitData.alojamientos.map(alojamiento => (
                                        <View key={alojamiento.id} style={styles.card} wrap={false}>
                                            <Image src={{ uri: `https://www.tucumanturismo.gob.ar/carga/image/${alojamiento.archivo}` }} style={styles.cardImage} />
                                            <View style={styles.cardContent}>
                                                <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{alojamiento.nombre}</Text>
                                                <Text style={{ ...styles.tagBadge, backgroundColor: circuito.primary, alignSelf: 'flex-start' }}>{alojamiento.nombreLocalidad}</Text>
                                                <Text style={{ ...styles.infoLine, marginTop: 10 }}><Text style={styles.cardLabel}>Estrellas: </Text>{'★'.repeat(parseInt(alojamiento.estrellas, 10))}</Text>
                                                <Text style={styles.infoLine}><Text style={styles.cardLabel}>Dirección: </Text>{alojamiento.direccion}</Text>
                                                <Text style={styles.infoLine}><Text style={styles.cardLabel}>Teléfono: </Text>{alojamiento.telefono}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {/* SECCIONES PRESTADORES Y GUÍAS (ya son de una columna, solo se adaptan al nuevo estilo de tarjeta) */}
                            {circuitData.prestadores.length > 0 && (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ ...styles.sectionTitle, color: circuito.primary, borderBottomColor: circuito.secondary }}>Aventuras y Actividades</Text>
                                    {circuitData.prestadores.map(prestador => {
                                        const allActivities = prestador.actividades ? prestador.actividades.split(',') : [];
                                        const visibleActivities = allActivities.slice(0, 6);
                                        const remainingCount = allActivities.length - visibleActivities.length;
                                        return (
                                            <View key={prestador.id} style={styles.card} wrap={false}>
                                                <View style={styles.cardContent}>
                                                    <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{prestador.titulo}</Text>
                                                    {prestador.nombre_localidad && (
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                                            <Text style={{
                                                                ...styles.tagBadge,
                                                                backgroundColor: circuito.primary,
                                                                fontSize: 16,
                                                                fontWeight: 'bold',
                                                            }}>
                                                                {prestador.nombre_localidad}
                                                            </Text>
                                                        </View>
                                                    )}
                                                    {/* Información de contacto mejorada */}
                                                    <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                        <Text style={{ ...styles.infoLine, marginBottom: 0 }}>
                                                            <Text style={styles.cardLabel}>Teléfono: </Text>{prestador.telefono}
                                                        </Text>
                                                        {prestador.instagram && (
                                                            <Text style={{ ...styles.infoLine, marginBottom: 0 }}>
                                                                <Text style={styles.cardLabel}>Email: </Text>{prestador.email}
                                                            </Text>
                                                        )}
                                                        {prestador.instagram && (
                                                            <Link src={prestador.instagram} style={{ ...styles.infoLine, marginBottom: 0 }}>
                                                                <Text style={styles.cardLabel}>Instagram: </Text>Ver perfil
                                                            </Link>
                                                        )}
                                                    </View>
                                                    <View style={styles.activitiesContainer}>
                                                        <Text style={{ ...styles.activitiesTitle, color: circuito.secondary }}>Ofrece:</Text>
                                                        <View style={styles.tagsContainer}>
                                                            {visibleActivities.map(act => (
                                                                <Text key={act} style={{ ...styles.tagBadge, backgroundColor: circuito.secondary }}>{act.trim()}</Text>
                                                            ))}
                                                            {remainingCount > 0 && (
                                                                <Text style={{ ...styles.tagBadge, backgroundColor: '#757575' }}>
                                                                    +{remainingCount} más
                                                                </Text>
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            )}
                            {circuitData.guias.length > 0 && (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ ...styles.sectionTitle, color: circuito.primary, borderBottomColor: circuito.secondary }}>Guías Expertos</Text>
                                    {circuitData.guias.map(guias => {
                                        const allZonas = guias.zona_operacion ? guias.zona_operacion.split(',') : [];
                                        const visibleZonas = allZonas.slice(0, 6);
                                        const remainingCount = allZonas.length - visibleZonas.length;
                                        return (
                                            <View key={guias.id} style={styles.card} wrap={false}>
                                                <View style={styles.cardContent}>
                                                    <Text style={{ ...styles.cardTitle, color: circuito.primary }}>{guias.nombre}</Text>
                                                    {guias.nombre_localidad && (
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                                            <Text style={{
                                                                ...styles.tagBadge,
                                                                backgroundColor: circuito.primary,
                                                                fontSize: 16,
                                                                fontWeight: 'bold',
                                                            }}>
                                                                {guias.nombre_localidad}
                                                            </Text>
                                                        </View>
                                                    )}
                                                    {/* Información de contacto mejorada */}
                                                    <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                        {/* <Text style={{ ...styles.infoLine, marginBottom: 0 }}>
                                                            <Text style={styles.cardLabel}>Teléfono: </Text>{guias.telefono}
                                                        </Text> */}
                                                        {guias.email && (
                                                            <Text style={{ ...styles.infoLine, marginBottom: 0 }}>
                                                                <Text style={styles.cardLabel}>Email: </Text>{guias.email}
                                                            </Text>
                                                        )}
                                                        {/* {guias.instagram && (
                                                            <Link src={guias.instagram} style={{ ...styles.infoLine, marginBottom: 0 }}>
                                                                <Text style={styles.cardLabel}>Instagram: </Text>Ver perfil
                                                            </Link>
                                                        )} */}
                                                    </View>
                                                    <View style={styles.activitiesContainer}>
                                                        <Text style={{ ...styles.activitiesTitle, color: circuito.secondary }}>Zona:</Text>
                                                        <View style={styles.tagsContainer}>
                                                            {visibleZonas.map(act => (
                                                                <Text key={act} style={{ ...styles.tagBadge, backgroundColor: circuito.secondary }}>{act.trim()}</Text>
                                                            ))}
                                                            {remainingCount > 0 && (
                                                                <Text style={{ ...styles.tagBadge, backgroundColor: '#757575' }}>
                                                                    +{remainingCount} más
                                                                </Text>
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            )}

                        </View>
                    )
                })}
            </Page>
        </Document>
    );
};

export default ItinerarioMobile;