import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';

const REVIEWS = [
  {
    id: 1,
    author: 'Javiera M.',
    initials: 'JM',
    color: '#8C74D2',
    rating: 4,
    date: 'Hace 2 meses',
    text: 'El depto es helado en invierno pero la dueña responde al tiro cuando hay cualquier problema. Vale lo que cuesta.',
  },
  {
    id: 2,
    author: 'Rodrigo S.',
    initials: 'RS',
    color: '#26C4A1',
    rating: 5,
    date: 'Hace 4 meses',
    text: 'Excelente ubicación, a 12 minutos caminando de la UTFSM. El WiFi es rapidísimo, clave para las tareas.',
  },
  {
    id: 3,
    author: 'Camila V.',
    initials: 'CV',
    color: '#E8845A',
    rating: 4,
    date: 'Hace 6 meses',
    text: 'Mis roomies y yo llevamos 8 meses acá y todo bien. Pregunten por el segundo piso, tiene mejor luz.',
  },
];

const ALL_AMENITIES = [
  { icon: '📶', label: 'WiFi 300 Mbps' },
  { icon: '🫧', label: 'Lavadora' },
  { icon: '🅿️', label: 'Estacionamiento' },
  { icon: '🛋️', label: 'Amoblado' },
  { icon: '🐾', label: 'Mascotas OK' },
  { icon: '🔒', label: 'Portería 24h' },
  { icon: '🍳', label: 'Cocina equipada' },
  { icon: '♨️', label: 'Calefacción' },
];

function Stars({ rating, size = 14 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Text key={s} style={{ fontSize: size }}>
          {s <= rating ? '⭐' : '☆'}
        </Text>
      ))}
    </View>
  );
}

export default function PropertyDetailScreen({ route, navigation }) {
  const property = route?.params?.property || {
    color: '#C7E6F0', emoji: '🏙️', verified: true,
    price: '$280.000', address: 'Av. España 1680', distance: '12 min UTFSM',
    rooms: 2, rating: 4.7, reviews: 12,
  };

  const [saved, setSaved] = useState(false);

  const handleContact = () => {
    Alert.alert(
      '🏠 Contactar Arrendador',
      '¿Deseas enviar una solicitud de contacto al arrendador?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Enviar solicitud',
          onPress: () =>
            Alert.alert('✅ Solicitud enviada', 'El arrendador recibirá tu mensaje y te contactará pronto.'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed image header */}
      <View style={[styles.imageHeader, { backgroundColor: property.color }]}>
        <TouchableOpacity style={styles.backCircle} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveCircle}
          onPress={() => setSaved(!saved)}
        >
          <Text style={styles.saveIcon}>{saved ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
        <Text style={styles.heroEmoji}>{property.emoji}</Text>

        {property.verified && (
          <View style={styles.verifiedChip}>
            <Text style={styles.verifiedChipText}>✅ Propiedad Verificada FORAM</Text>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main info */}
        <View style={styles.mainInfo}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              {property.price}
              <Text style={styles.perMonth}>/mes</Text>
            </Text>
            <View style={styles.ratingChip}>
              <Text style={styles.ratingText}>⭐ {property.rating}</Text>
              <Text style={styles.ratingCount}> ({property.reviews || 12} reseñas)</Text>
            </View>
          </View>

          <Text style={styles.address}>Dto. 2B – {property.address}</Text>

          <View style={styles.distRow}>
            <View style={styles.distChip}>
              <Text style={styles.distIcon}>🎓</Text>
              <Text style={styles.distText}>{property.distance}</Text>
            </View>
            <View style={styles.distChip}>
              <Text style={styles.distIcon}>🚇</Text>
              <Text style={styles.distText}>5 min Metro España</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comodidades</Text>
          <View style={styles.amenitiesGrid}>
            {ALL_AMENITIES.map((a, i) => (
              <View key={i} style={styles.amenityChip}>
                <Text style={styles.amenityIcon}>{a.icon}</Text>
                <Text style={styles.amenityLabel}>{a.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>
            Amplio departamento de {property.rooms} {property.rooms === 1 ? 'pieza' : 'piezas'} en el corazón de Valparaíso, ideal para estudiantes universitarios. A pasos de la locomoción y con fácil acceso a todas las universidades de la zona. Ambiente tranquilo y seguro, vecinos respetuosos.{'\n\n'}
            Incluye cuentas básicas de agua y gas. WiFi de alta velocidad incluido. Disponible a partir del 1 del próximo mes.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Host */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Arrendador</Text>
          <View style={styles.hostCard}>
            <View style={styles.hostAvatar}>
              <Text style={styles.hostAvatarText}>MR</Text>
            </View>
            <View style={styles.hostInfo}>
              <Text style={styles.hostName}>María Rodríguez</Text>
              <Text style={styles.hostSince}>Arrendando desde 2019</Text>
              <View style={styles.hostBadges}>
                <View style={styles.hostBadge}>
                  <Text style={styles.hostBadgeText}>✅ Identidad verificada</Text>
                </View>
                <View style={[styles.hostBadge, styles.hostBadgeGreen]}>
                  <Text style={[styles.hostBadgeText, { color: '#1A7A65' }]}>⚡ Responde rápido</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Reseñas</Text>
            <View style={styles.ratingOverall}>
              <Text style={styles.ratingOverallNum}>{property.rating}</Text>
              <Stars rating={Math.round(property.rating)} />
            </View>
          </View>

          {REVIEWS.map((r) => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={[styles.reviewAvatar, { backgroundColor: r.color }]}>
                  <Text style={styles.reviewAvatarText}>{r.initials}</Text>
                </View>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewAuthor}>{r.author}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <Stars rating={r.rating} size={12} />
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.stickyBar}>
        <View style={styles.stickyPrice}>
          <Text style={styles.stickyPriceNum}>{property.price}</Text>
          <Text style={styles.stickyPricePer}>/mes</Text>
        </View>
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={handleContact}
          activeOpacity={0.85}
        >
          <Text style={styles.contactBtnText}>📩 Contactar arrendador</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  imageHeader: {
    height: 240, position: 'relative',
    alignItems: 'center', justifyContent: 'center',
  },
  backCircle: {
    position: 'absolute', top: 16, left: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center',
    ...SHADOW.soft,
  },
  backArrow: { fontSize: 18, color: COLORS.dark, fontWeight: '700' },
  saveCircle: {
    position: 'absolute', top: 16, right: 16,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center',
    ...SHADOW.soft,
  },
  saveIcon: { fontSize: 18 },
  heroEmoji: { fontSize: 72 },
  verifiedChip: {
    position: 'absolute', bottom: 14,
    backgroundColor: COLORS.turquoise, paddingHorizontal: 14,
    paddingVertical: 6, borderRadius: 100,
  },
  verifiedChipText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20 },

  mainInfo: { marginBottom: 20 },
  priceRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 6,
  },
  price: { fontSize: 28, fontWeight: '800', color: COLORS.dark },
  perMonth: { fontSize: 14, fontWeight: '400', color: COLORS.gray600 },
  ratingChip: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 14, fontWeight: '700', color: COLORS.dark },
  ratingCount: { fontSize: 12, color: COLORS.gray600 },
  address: { fontSize: 16, fontWeight: '600', color: COLORS.dark, marginBottom: 12 },
  distRow: { flexDirection: 'row', gap: 8 },
  distChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: COLORS.gray100, paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 100,
  },
  distIcon: { fontSize: 13 },
  distText: { fontSize: 12, color: COLORS.gray600, fontWeight: '500' },

  divider: { height: 1, backgroundColor: COLORS.gray200, marginVertical: 20 },

  section: { marginBottom: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: COLORS.dark, marginBottom: 14 },
  sectionHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14,
  },
  ratingOverall: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingOverallNum: { fontSize: 20, fontWeight: '800', color: COLORS.dark },

  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  amenityChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.gray100, paddingHorizontal: 12,
    paddingVertical: 8, borderRadius: RADIUS.sm,
  },
  amenityIcon: { fontSize: 15 },
  amenityLabel: { fontSize: 12, color: COLORS.dark, fontWeight: '500' },

  description: { fontSize: 14, color: COLORS.gray600, lineHeight: 22 },

  hostCard: {
    flexDirection: 'row', gap: 14, alignItems: 'flex-start',
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.lg, padding: 16,
  },
  hostAvatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center',
  },
  hostAvatarText: { color: COLORS.white, fontSize: 18, fontWeight: '800' },
  hostInfo: { flex: 1 },
  hostName: { fontSize: 16, fontWeight: '700', color: COLORS.dark, marginBottom: 2 },
  hostSince: { fontSize: 12, color: COLORS.gray600, marginBottom: 10 },
  hostBadges: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  hostBadge: {
    backgroundColor: COLORS.turquoiseLight, paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 100,
  },
  hostBadgeGreen: { backgroundColor: '#E6FAF6' },
  hostBadgeText: { fontSize: 11, fontWeight: '600', color: '#1A7A65' },

  reviewCard: {
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.lg,
    padding: 14, marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10,
  },
  reviewAvatar: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  reviewAvatarText: { color: COLORS.white, fontSize: 13, fontWeight: '800' },
  reviewMeta: { flex: 1 },
  reviewAuthor: { fontSize: 13, fontWeight: '700', color: COLORS.dark },
  reviewDate: { fontSize: 11, color: COLORS.gray400 },
  reviewText: { fontSize: 13, color: COLORS.gray600, lineHeight: 20 },

  stickyBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: COLORS.white, paddingHorizontal: 24,
    paddingTop: 14, paddingBottom: 28, borderTopWidth: 1, borderTopColor: COLORS.gray200,
    ...SHADOW.card,
  },
  stickyPrice: { flexDirection: 'row', alignItems: 'flex-end' },
  stickyPriceNum: { fontSize: 18, fontWeight: '800', color: COLORS.dark },
  stickyPricePer: { fontSize: 12, color: COLORS.gray600, marginBottom: 2, marginLeft: 2 },
  contactBtn: {
    flex: 1, backgroundColor: COLORS.dark,
    paddingVertical: 16, borderRadius: RADIUS.lg, alignItems: 'center',
  },
  contactBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});
