import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Alert, ActivityIndicator,
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';

export default function IdentityValidationScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleSimulateUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUploaded(true);
      Alert.alert(
        '✅ Datos extraídos correctamente',
        'Tu identidad ha sido verificada exitosamente. ¡Bienvenido/a a FORAM!',
        [
          {
            text: 'Continuar',
            onPress: () => navigation.navigate('Questionnaire'),
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Step indicator */}
        <View style={styles.stepRow}>
          {['Cuenta', 'Verificación', 'Cuestionario'].map((step, i) => (
            <View key={i} style={styles.stepItem}>
              <View style={[styles.stepDot, i === 1 && styles.stepDotActive, i === 0 && styles.stepDotDone]}>
                {i === 0
                  ? <Text style={{ color: COLORS.white, fontSize: 12 }}>✓</Text>
                  : <Text style={[styles.stepNum, i === 1 && { color: COLORS.white }]}>{i + 1}</Text>
                }
              </View>
              <Text style={[styles.stepLabel, i === 1 && styles.stepLabelActive]}>{step}</Text>
              {i < 2 && <View style={[styles.stepLine, i === 0 && styles.stepLineDone]} />}
            </View>
          ))}
        </View>

        {/* Title */}
        <Text style={styles.title}>Verifica tu cuenta</Text>
        <Text style={styles.subtitle}>
          Sube una foto nítida de tu Carnet de Identidad (C.I.) por delante para garantizar la seguridad de la comunidad.
        </Text>

        {/* Security badges */}
        <View style={styles.securityRow}>
          {[
            { icon: '🔐', text: 'Datos encriptados' },
            { icon: '🚫', text: 'No compartimos tu info' },
            { icon: '🗑️', text: 'Eliminamos después' },
          ].map((b, i) => (
            <View key={i} style={styles.securityBadge}>
              <Text style={styles.securityIcon}>{b.icon}</Text>
              <Text style={styles.securityText}>{b.text}</Text>
            </View>
          ))}
        </View>

        {/* Upload area */}
        <View style={styles.uploadArea}>
          {uploaded ? (
            <View style={styles.uploadSuccess}>
              <Text style={styles.successIcon}>✅</Text>
              <Text style={styles.successText}>Carnet subido correctamente</Text>
            </View>
          ) : (
            <>
              <View style={styles.uploadIllustration}>
                <Text style={styles.uploadIllusIcon}>🪪</Text>
              </View>
              <Text style={styles.uploadTitle}>Carnet de Identidad</Text>
              <Text style={styles.uploadHint}>Cara frontal, buena iluminación, sin reflejos</Text>
              <View style={styles.uploadTipsRow}>
                {['JPG o PNG', 'Máx. 10 MB', 'Alta resolución'].map((t, i) => (
                  <View key={i} style={styles.uploadTip}>
                    <Text style={styles.uploadTipText}>{t}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Button */}
        {!uploaded && (
          <TouchableOpacity
            style={[styles.uploadBtn, loading && styles.uploadBtnLoading]}
            onPress={handleSimulateUpload}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={COLORS.white} size="small" />
                <Text style={styles.uploadBtnText}>Procesando con IA...</Text>
              </View>
            ) : (
              <Text style={styles.uploadBtnText}>📸  Simular subir Carnet</Text>
            )}
          </TouchableOpacity>
        )}

        <Text style={styles.privacyNote}>
          🔒 Tu información es procesada de forma segura y nunca es vendida a terceros.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 24 },
  backBtn: { marginTop: 16, marginBottom: 12 },
  backText: { color: COLORS.gray600, fontSize: 15, fontWeight: '500' },
  content: { flex: 1 },

  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  stepItem: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  stepDot: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.gray200, alignItems: 'center', justifyContent: 'center',
  },
  stepDotActive: { backgroundColor: COLORS.purple },
  stepDotDone: { backgroundColor: COLORS.turquoise },
  stepNum: { fontSize: 12, fontWeight: '700', color: COLORS.gray400 },
  stepLabel: {
    fontSize: 11, color: COLORS.gray400, fontWeight: '500', marginLeft: 6,
  },
  stepLabelActive: { color: COLORS.purple, fontWeight: '700' },
  stepLine: { flex: 1, height: 2, backgroundColor: COLORS.gray200, marginHorizontal: 6 },
  stepLineDone: { backgroundColor: COLORS.turquoise },

  title: {
    fontSize: 30, fontWeight: '800', color: COLORS.dark, marginBottom: 12,
  },
  subtitle: {
    fontSize: 15, color: COLORS.gray600, lineHeight: 23, marginBottom: 24,
  },
  securityRow: {
    flexDirection: 'row', gap: 8, marginBottom: 24,
  },
  securityBadge: {
    flex: 1, backgroundColor: COLORS.turquoiseLight,
    borderRadius: RADIUS.md, padding: 10, alignItems: 'center', gap: 4,
  },
  securityIcon: { fontSize: 18 },
  securityText: {
    fontSize: 10, color: '#1A7A65', fontWeight: '600', textAlign: 'center',
  },
  uploadArea: {
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.xl,
    padding: 28, alignItems: 'center', marginBottom: 20,
    borderWidth: 2, borderColor: COLORS.gray200, borderStyle: 'dashed',
  },
  uploadIllustration: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: COLORS.white, alignItems: 'center',
    justifyContent: 'center', marginBottom: 16, ...SHADOW.soft,
  },
  uploadIllusIcon: { fontSize: 40 },
  uploadTitle: { fontSize: 17, fontWeight: '700', color: COLORS.dark, marginBottom: 6 },
  uploadHint: { fontSize: 13, color: COLORS.gray400, marginBottom: 16 },
  uploadTipsRow: { flexDirection: 'row', gap: 8 },
  uploadTip: {
    backgroundColor: COLORS.white, paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 100,
  },
  uploadTipText: { fontSize: 11, color: COLORS.gray600, fontWeight: '500' },
  uploadSuccess: { alignItems: 'center', gap: 10, paddingVertical: 12 },
  successIcon: { fontSize: 48 },
  successText: { fontSize: 16, fontWeight: '700', color: COLORS.turquoise },

  uploadBtn: {
    backgroundColor: COLORS.dark, paddingVertical: 18,
    borderRadius: RADIUS.lg, alignItems: 'center', marginBottom: 16,
  },
  uploadBtnLoading: { backgroundColor: COLORS.gray400 },
  loadingRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  uploadBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  privacyNote: {
    fontSize: 12, color: COLORS.gray400, textAlign: 'center', lineHeight: 18,
  },
});
