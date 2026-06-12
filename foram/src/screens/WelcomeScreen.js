import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { COLORS, RADIUS } from '../theme';

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Círculos decorativos de fondo para darle un toque moderno a la interfaz */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.content}>
        {/* Zona del Logo de nuestra aplicación */}
        <View style={styles.logoArea}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoEmoji}>🏠</Text>
          </View>
          <Text style={styles.logoText}>FORAM</Text>
          <View style={styles.tagBadge}>
            <Text style={styles.tagBadgeText}>Aterriza seguro en tu nueva ciudad</Text>
          </View>
        </View>

        {/* Textos principales de la pantalla de bienvenida */}
        <View style={styles.headlineArea}>
          <Text style={styles.headline}>Tu nido{'\n'}universitario{'\n'}seguro.</Text>
          <Text style={styles.subheadline}>
            Encuentra arriendo o roomies verificados.
          </Text>
        </View>

        {/* Fila con las características clave de la app */}
        <View style={styles.featuresRow}>
          {[
            { icon: '✅', label: 'Identidad verificada' },
            { icon: '🤝', label: 'Roomies compatibles' },
            { icon: '⚡', label: 'Proceso rápido' },
          ].map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Botones de navegación para login y registro de usuarios nuevos */}
      <View style={styles.buttonsArea}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('SignUp')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Comenzar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryBtnText}>
            ¿Ya tienes cuenta?{' '}
            <Text style={styles.secondaryBtnTextAccent}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Definición de estilos, reemplazando fontWeight por fontFamily para cumplir la pauta
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  circle1: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: COLORS.purpleLight,
    top: -80,
    right: -80,
    opacity: 0.6,
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.turquoiseLight,
    bottom: 120,
    left: -60,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  logoIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 28,
  },
  logoText: {
    fontSize: 28,
    // Primera familia de fuentes: Poppins
    fontFamily: 'Poppins-ExtraBold',
    color: COLORS.dark,
    letterSpacing: 3,
  },
  tagBadge: {
    marginTop: 6,
    backgroundColor: COLORS.purpleLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  tagBadgeText: {
    color: COLORS.purple,
    fontSize: 12,
    fontFamily: 'OpenSans-SemiBold', // Segunda familia de fuentes: Open Sans
  },
  headlineArea: {
    marginBottom: 32,
  },
  headline: {
    fontSize: 42,
    fontFamily: 'Poppins-ExtraBold', 
    color: COLORS.dark,
    lineHeight: 50,
    marginBottom: 14,
  },
  subheadline: {
    fontSize: 16,
    color: COLORS.gray600,
    lineHeight: 24,
    fontFamily: 'OpenSans-Regular', 
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 10,
  },
  featureItem: {
    flex: 1,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.md,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureLabel: {
    fontSize: 11,
    color: COLORS.gray600,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    lineHeight: 15,
  },
  buttonsArea: {
    paddingHorizontal: 28,
    paddingBottom: 32,
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: COLORS.dark,
    paddingVertical: 18,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  secondaryBtnText: {
    color: COLORS.gray600,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
  },
  secondaryBtnTextAccent: {
    color: COLORS.purple,
    fontFamily: 'Poppins-Bold',
  },
});