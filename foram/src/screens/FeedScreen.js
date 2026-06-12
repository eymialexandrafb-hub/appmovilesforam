import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView, StatusBar, Alert
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';
import { getLocalData } from '../utils/storage';

const PROPERTIES = [
  {
    id: '1', verified: true, price: '$280.000', address: 'Av. España 1680', distance: '12 min UTFSM',
    rooms: 2, color: '#C7E6F0', colorDark: '#5EB8D4', emoji: '🏙️', rating: 4.7, reviews: 12,
    badges: ['WiFi', 'Lavadora', 'Estacionamiento'],
  },
  {
    id: '2', verified: true, price: '$320.000', address: 'Av. Colón 892', distance: '5 min PUCV',
    rooms: 1, color: '#D4F0E6', colorDark: '#26C4A1', emoji: '🌿', rating: 4.9, reviews: 8,
    badges: ['WiFi', 'Cocina equipada'],
  },
];

const ROOMIES = [
  { initials: 'MG', name: 'María G.', career: 'Ingeniería Civil', match: 92, color: '#8C74D2' },
  { initials: 'JP', name: 'Jorge P.', career: 'Medicina', match: 87, color: '#26C4A1' },
];

export default function FeedScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('nido');
  const [userName, setUserName] = useState('');
  
  // Estado que define el tipo de vista a renderizar (student o landlord)
  const [userRole, setUserRole] = useState('student'); 

  // useEffect maneja los "efectos secundarios" (como llamadas a bases de datos).
  // Al pasarle un arreglo vacío [] al final, le indicamos a React que esta función
  // se ejecute UNA SOLA VEZ exactamente cuando la pantalla se carga en memoria.
  useEffect(() => {
    const loadUserData = async () => {
      // Llamamos a nuestra utilidad de persistencia nativa para extraer el perfil.
      const profile = await getLocalData('user_profile');
      if (profile) {
        if (profile.name) {
          // split(' ')[0] toma el string del nombre completo, lo divide por cada espacio 
          // y guarda solo el primer elemento (índice 0) para el saludo.
          const firstName = profile.name.split(' ')[0];
          setUserName(firstName);
        }
        if (profile.role) {
          // Actualizamos el estado con el rol recuperado de la base de datos local.
          setUserRole(profile.role);
        }
      }
    };
    loadUserData();
  }, []); // <-- Este es el arreglo vacío que evita los ciclos infinitos de recarga.

  const handlePublishClick = () => {
    Alert.alert(
      "¡Modo Demo!", 
      "En la versión final, esto abrirá el formulario para subir fotos y detalles del arriendo."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER DINÁMICO */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Buenos días {userName ? userName : ''} 👋</Text>
          <Text style={styles.headerTitle}>
            {userRole === 'landlord' ? 'Mi Panel' : 'Explorar'}
          </Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Text style={styles.notifIcon}>🔔</Text>
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* RENDERIZADO CONDICIONAL: Usamos un operador ternario (condición ? verdadero : falso).
          Si el rol en el estado es 'landlord', ejecuta el primer bloque visual.
          Si no lo es (después de los ':'), ejecuta el bloque de los estudiantes. */}
      {userRole === 'landlord' ? (
        
        /* ========================================================= */
        /* VISTA DE PROPIETARIO (LANDLORD)                           */
        /* ========================================================= */
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          
          <View style={styles.hostBanner}>
            <Text style={styles.hostBannerEmoji}>🚀</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.hostBannerTitle}>Atrae estudiantes confiables</Text>
              <Text style={styles.hostBannerDesc}>Miles de universitarios buscan un lugar seguro como el tuyo.</Text>
            </View>
          </View>

          {/* Botón principal de publicación */}
          <TouchableOpacity style={styles.publishBtn} onPress={handlePublishClick} activeOpacity={0.8}>
            <Text style={styles.publishBtnIcon}>➕</Text>
            <Text style={styles.publishBtnText}>Publicar nueva propiedad</Text>
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Anuncios Activos</Text>
          </View>

          {/* Anuncio mockeado del propietario */}
          <View style={styles.hostPropertyCard}>
            <View style={styles.hostPropertyImg}>
              <Text style={{ fontSize: 30 }}>🏘️</Text>
            </View>
            <View style={styles.hostPropertyInfo}>
              <Text style={styles.hostPropertyTitle}>Casa en Av. Los Carrera</Text>
              <Text style={styles.hostPropertyStats}>👀 45 vistas esta semana</Text>
              <View style={styles.activeTag}>
                <View style={styles.activeDot} />
                <Text style={styles.activeTagText}>Activo</Text>
              </View>
            </View>
          </View>

        </ScrollView>

      ) : (

        /* ========================================================= */
        /* VISTA DE ESTUDIANTE (STUDENT)                             */
        /* ========================================================= */
        <>
          <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tab, activeTab === 'nido' && styles.tabActive]} onPress={() => setActiveTab('nido')}>
              <Text style={[styles.tabText, activeTab === 'nido' && styles.tabTextActive]}>🏠 Buscar Nido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab === 'roomies' && styles.tabActive]} onPress={() => setActiveTab('roomies')}>
              <Text style={[styles.tabText, activeTab === 'roomies' && styles.tabTextActive]}>👥 Buscar Roomies</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            {/* Otro renderizado condicional para alternar entre ver propiedades y ver roomies */}
            {activeTab === 'nido' ? (
              <>
                <TouchableOpacity style={styles.searchBar}>
                  <Text style={styles.searchIcon}>🔍</Text>
                  <Text style={styles.searchPlaceholder}>Busca por dirección o universidad...</Text>
                  <View style={styles.filterBtn}><Text style={styles.filterIcon}>⚙️</Text></View>
                </TouchableOpacity>

                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Destacados cerca de ti</Text>
                  <Text style={styles.seeAll}>Ver todo</Text>
                </View>

                {/* Función map() que itera sobre el arreglo PROPERTIES para renderizar las tarjetas automáticamente */}
                {PROPERTIES.map((prop) => (
                  <TouchableOpacity key={prop.id} style={styles.propertyCard} activeOpacity={0.9}>
                    <View style={[styles.propertyImage, { backgroundColor: prop.color }]}>
                      <Text style={styles.propertyEmoji}>{prop.emoji}</Text>
                      {prop.verified && <View style={styles.verifiedBadge}><Text style={styles.verifiedText}>✅ Verificado</Text></View>}
                      <View style={styles.ratingBadge}><Text style={styles.ratingText}>⭐ {prop.rating}</Text></View>
                    </View>
                    <View style={styles.propertyInfo}>
                      <View style={styles.propertyInfoTop}>
                        <Text style={styles.propertyPrice}>{prop.price}<Text style={styles.perMonth}>/mes</Text></Text>
                        <Text style={styles.propertyRooms}>{prop.rooms} {prop.rooms === 1 ? 'pieza' : 'piezas'}</Text>
                      </View>
                      <Text style={styles.propertyAddress}>{prop.address}</Text>
                      <View style={styles.distanceRow}>
                        <Text style={styles.distanceIcon}>🎓</Text>
                        <Text style={styles.propertyDistance}>{prop.distance}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <View style={styles.roomiesTab}>
                <Text style={styles.roomiesTabTitle}>Roomies compatibles contigo</Text>
                {ROOMIES.map((r, i) => (
                  <TouchableOpacity key={i} style={styles.roomieListCard} activeOpacity={0.8}>
                    <View style={[styles.avatarLg, { backgroundColor: r.color }]}><Text style={styles.avatarLgText}>{r.initials}</Text></View>
                    <View style={styles.roomieListInfo}>
                      <Text style={styles.roomieListName}>{r.name}</Text>
                      <Text style={styles.roomieListCareer}>{r.career}</Text>
                    </View>
                    <View style={styles.matchBadgeLg}>
                      <Text style={styles.matchBadgeLgText}>{r.match}%</Text>
                      <Text style={styles.matchBadgeLgLabel}>match</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={{ height: 40 }} />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 },
  greeting: { fontSize: 13, color: COLORS.gray600, fontFamily: 'OpenSans-SemiBold', marginBottom: 2 },
  headerTitle: { fontSize: 28, fontFamily: 'Poppins-ExtraBold', color: COLORS.dark },
  notifBtn: { position: 'relative' },
  notifIcon: { fontSize: 22 },
  notifDot: { position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF4757' },

  // --- ESTILOS DEL PROPIETARIO ---
  hostBanner: { flexDirection: 'row', backgroundColor: '#FFF9E6', padding: 16, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: '#FFE082', marginBottom: 20, alignItems: 'center' },
  hostBannerEmoji: { fontSize: 32, marginRight: 14 },
  hostBannerTitle: { fontSize: 15, fontFamily: 'Poppins-Bold', color: '#7A6000', marginBottom: 4 },
  hostBannerDesc: { fontSize: 12, fontFamily: 'OpenSans-Regular', color: '#9E801C', lineHeight: 18 },
  
  publishBtn: { backgroundColor: COLORS.purple, flexDirection: 'row', paddingVertical: 18, borderRadius: RADIUS.lg, alignItems: 'center', justifyContent: 'center', marginBottom: 32, ...SHADOW.card },
  publishBtnIcon: { fontSize: 18, marginRight: 8, color: COLORS.white },
  publishBtnText: { color: COLORS.white, fontSize: 16, fontFamily: 'Poppins-Bold' },

  hostPropertyCard: { flexDirection: 'row', backgroundColor: COLORS.white, padding: 14, borderRadius: RADIUS.lg, ...SHADOW.soft, alignItems: 'center' },
  hostPropertyImg: { width: 60, height: 60, backgroundColor: COLORS.gray100, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  hostPropertyInfo: { flex: 1 },
  hostPropertyTitle: { fontSize: 15, fontFamily: 'Poppins-Bold', color: COLORS.dark, marginBottom: 4 },
  hostPropertyStats: { fontSize: 12, fontFamily: 'OpenSans-Regular', color: COLORS.gray600, marginBottom: 8 },
  activeTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F8E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, alignSelf: 'flex-start' },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginRight: 4 },
  activeTagText: { fontSize: 10, fontFamily: 'Poppins-Bold', color: '#047857' },

  // --- ESTILOS DEL ESTUDIANTE ---
  tabsContainer: { flexDirection: 'row', marginHorizontal: 24, marginBottom: 20, backgroundColor: COLORS.gray100, borderRadius: RADIUS.pill, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: RADIUS.pill },
  tabActive: { backgroundColor: COLORS.white, ...SHADOW.soft },
  tabText: { fontSize: 13, fontFamily: 'Poppins-Bold', color: COLORS.gray400 },
  tabTextActive: { color: COLORS.dark },
  scroll: { flex: 1, paddingHorizontal: 24 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.gray100, borderRadius: RADIUS.lg, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 24 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchPlaceholder: { flex: 1, color: COLORS.gray400, fontSize: 14, fontFamily: 'OpenSans-Regular' },
  filterBtn: { backgroundColor: COLORS.white, width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', ...SHADOW.soft },
  filterIcon: { fontSize: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontFamily: 'Poppins-ExtraBold', color: COLORS.dark },
  seeAll: { fontSize: 13, color: COLORS.purple, fontFamily: 'Poppins-Bold' },
  propertyCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.xl, marginBottom: 18, overflow: 'hidden', ...SHADOW.card },
  propertyImage: { height: 180, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  propertyEmoji: { fontSize: 60 },
  verifiedBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: COLORS.turquoise, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100 },
  verifiedText: { color: COLORS.white, fontSize: 11, fontFamily: 'Poppins-Bold' },
  ratingBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100 },
  ratingText: { color: COLORS.white, fontSize: 12, fontFamily: 'Poppins-Bold' },
  propertyInfo: { padding: 16 },
  propertyInfoTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  propertyPrice: { fontSize: 20, fontFamily: 'Poppins-ExtraBold', color: COLORS.dark },
  perMonth: { fontSize: 13, fontFamily: 'OpenSans-Regular', color: COLORS.gray600 },
  propertyRooms: { fontSize: 12, color: COLORS.purple, fontFamily: 'Poppins-Bold', backgroundColor: COLORS.purpleLight, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 100 },
  propertyAddress: { fontSize: 14, color: COLORS.dark, fontFamily: 'OpenSans-SemiBold', marginBottom: 6 },
  distanceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  distanceIcon: { fontSize: 13 },
  propertyDistance: { fontSize: 12, color: COLORS.gray600, fontFamily: 'OpenSans-Regular' },
  roomiesTab: { paddingTop: 8 },
  roomiesTabTitle: { fontSize: 17, fontFamily: 'Poppins-ExtraBold', color: COLORS.dark, marginBottom: 16 },
  roomieListCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.gray100, borderRadius: RADIUS.lg, padding: 14, marginBottom: 10, ...SHADOW.soft },
  avatarLg: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarLgText: { color: COLORS.white, fontSize: 18, fontFamily: 'Poppins-ExtraBold' },
  roomieListInfo: { flex: 1 },
  roomieListName: { fontSize: 15, fontFamily: 'Poppins-Bold', color: COLORS.dark, marginBottom: 2 },
  roomieListCareer: { fontSize: 12, color: COLORS.gray600, fontFamily: 'OpenSans-Regular' },
  matchBadgeLg: { backgroundColor: COLORS.dark, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, alignItems: 'center' },
  matchBadgeLgText: { color: COLORS.white, fontSize: 15, fontFamily: 'Poppins-ExtraBold' },
  matchBadgeLgLabel: { color: COLORS.gray400, fontSize: 9, fontFamily: 'OpenSans-SemiBold' },
});