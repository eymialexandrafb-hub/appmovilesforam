import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Volver</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.headerArea}>
            <View style={styles.logoIcon}>
              <Text style={{ fontSize: 26 }}>🏠</Text>
            </View>
            <Text style={styles.title}>Bienvenido{'\n'}de vuelta</Text>
            <Text style={styles.subtitle}>Nos alegra tenerte de regreso en FORAM</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Correo Universitario</Text>
              <View style={[styles.inputRow, focusedField === 'email' && styles.inputFocused]}>
                <Text style={styles.icon}>📧</Text>
                <TextInput
                  style={styles.input}
                  placeholder="tu.nombre@universidad.cl"
                  placeholderTextColor={COLORS.gray400}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={[styles.inputRow, focusedField === 'password' && styles.inputFocused]}>
                <Text style={styles.icon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tu contraseña segura"
                  placeholderTextColor={COLORS.gray400}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.showHide}>{showPassword ? 'Ocultar' : 'Ver'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          {/* Login button */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Feed')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Iniciar Sesión →</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>🎓 Continuar con Google Universitario</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupLink}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.signupLinkText}>
              ¿No tienes cuenta?{' '}
              <Text style={{ color: COLORS.purple, fontWeight: '700' }}>Regístrate gratis</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  backBtn: { marginBottom: 24 },
  backText: { color: COLORS.gray600, fontSize: 15, fontWeight: '500' },
  headerArea: { marginBottom: 36 },
  logoIcon: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: COLORS.dark, alignItems: 'center',
    justifyContent: 'center', marginBottom: 20,
  },
  title: {
    fontSize: 34, fontWeight: '800', color: COLORS.dark,
    lineHeight: 42, marginBottom: 10,
  },
  subtitle: { fontSize: 15, color: COLORS.gray600, lineHeight: 22 },
  form: { marginBottom: 24 },
  fieldWrap: { marginBottom: 16 },
  label: {
    fontSize: 13, fontWeight: '600', color: COLORS.dark,
    marginBottom: 8, marginLeft: 4,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.gray100, borderRadius: RADIUS.md,
    paddingHorizontal: 16, paddingVertical: 14,
    borderWidth: 2, borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: COLORS.purple, backgroundColor: COLORS.white, ...SHADOW.soft,
  },
  icon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: COLORS.dark },
  showHide: { color: COLORS.purple, fontSize: 13, fontWeight: '600' },
  forgotBtn: { alignSelf: 'flex-end', marginTop: 8 },
  forgotText: { color: COLORS.purple, fontSize: 13, fontWeight: '600' },
  primaryBtn: {
    backgroundColor: COLORS.dark, paddingVertical: 18,
    borderRadius: RADIUS.lg, alignItems: 'center', marginBottom: 24,
  },
  primaryBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  divider: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.gray200 },
  dividerText: { color: COLORS.gray400, fontSize: 13 },
  socialBtn: {
    backgroundColor: COLORS.gray100, paddingVertical: 16,
    borderRadius: RADIUS.md, alignItems: 'center', marginBottom: 20,
  },
  socialBtnText: { color: COLORS.dark, fontSize: 14, fontWeight: '600' },
  signupLink: { alignItems: 'center', paddingVertical: 8 },
  signupLinkText: { color: COLORS.gray600, fontSize: 14 },
});
