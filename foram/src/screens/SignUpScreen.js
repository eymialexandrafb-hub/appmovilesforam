import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, Alert, Platform, StatusBar
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';

import { saveLocalData } from '../utils/storage'; 
// IMPORTAMOS FIREBASE (Asegúrate de que los puntos de la ruta lleguen al archivo firebase.js suelto)
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState('student'); 

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa todos los datos.");
      return;
    }

    try {
      const userData = {
        name: name,
        email: email,
        role: userRole, 
        createdAt: new Date().toISOString()
      };

      // 1. Guardamos localmente para que funcione tu FeedScreen
      await saveLocalData('user_profile', userData);
      
      // 2. GUARDAMOS EN FIREBASE PARA EL BACKEND REMOTO
      await addDoc(collection(db, "usuarios"), {
        nombre: name,
        email: email,
        rol: userRole,
        password: password, 
        fechaRegistro: new Date().toISOString()
      });
      
      // 3. Avanzamos a la validación de identidad
      navigation.navigate('IdentityValidation');

    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", `Hubo un problema al conectar con la base de datos.`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        <View style={styles.headerArea}>
          <Text style={styles.title}>Crea tu cuenta{'\n'}en FORAM</Text>
          <Text style={styles.subtitle}>Elige tu perfil para comenzar</Text>
        </View>

        <View style={styles.roleSelector}>
          <TouchableOpacity 
            style={[styles.roleCard, userRole === 'student' && styles.roleCardActive]}
            onPress={() => setUserRole('student')}
            activeOpacity={0.8}
          >
            <Text style={styles.roleEmoji}>🎓</Text>
            <Text style={[styles.roleTitle, userRole === 'student' && styles.roleTitleActive]}>Estudiante</Text>
            <Text style={[styles.roleDesc, userRole === 'student' && styles.roleDescActive]}>Busco arriendo o roomies</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.roleCard, userRole === 'landlord' && styles.roleCardActive]}
            onPress={() => setUserRole('landlord')}
            activeOpacity={0.8}
          >
            <Text style={styles.roleEmoji}>🏠</Text>
            <Text style={[styles.roleTitle, userRole === 'landlord' && styles.roleTitleActive]}>Propietario</Text>
            <Text style={[styles.roleDesc, userRole === 'landlord' && styles.roleDescActive]}>Ofrezco mi espacio</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <InputField
            label="Nombre Completo"
            placeholder="Ej: María González"
            value={name}
            onChangeText={setName}
            icon="👤"
          />
          <InputField
            label={userRole === 'student' ? "Correo Universitario" : "Correo Electrónico"}
            placeholder={userRole === 'student' ? "tu.nombre@usm.cl" : "correo@ejemplo.com"}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="📧"
          />
          <InputField
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            icon="🔒"
            rightAction={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showHide}>{showPassword ? 'Ocultar' : 'Ver'}</Text>
              </TouchableOpacity>
            }
          />
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleSignUp}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Registrarse →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLinkText}>
            ¿Ya tienes cuenta?{' '}
            <Text style={{ color: COLORS.purple, fontWeight: '700' }}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function InputField({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, icon, rightAction }) {
  return (
    <View style={inputStyles.wrapper}>
      <Text style={inputStyles.label}>{label}</Text>
      <View style={inputStyles.inputRow}>
        <Text style={inputStyles.icon}>{icon}</Text>
        <TextInput
          style={inputStyles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray400}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || 'default'}
          autoCapitalize={autoCapitalize || 'words'}
        />
        {rightAction}
      </View>
    </View>
  );
}

const inputStyles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontFamily: 'Poppins-Bold', color: COLORS.dark, marginBottom: 8, marginLeft: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.gray100, borderRadius: RADIUS.md, paddingHorizontal: 16, paddingVertical: 14 },
  icon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: COLORS.dark },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: Platform.OS === 'android' ? 40 : 0 },
  scroll: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  backBtn: { marginBottom: 20 },
  backText: { color: COLORS.gray600, fontSize: 15, fontFamily: 'OpenSans-SemiBold' },
  headerArea: { marginBottom: 24 },
  title: { fontSize: 34, fontFamily: 'Poppins-ExtraBold', color: COLORS.dark, lineHeight: 42, marginBottom: 6 },
  subtitle: { fontSize: 15, color: COLORS.gray600, lineHeight: 22, fontFamily: 'OpenSans-Regular' },
  roleSelector: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  roleCard: { flex: 1, backgroundColor: COLORS.gray100, padding: 16, borderRadius: RADIUS.lg, borderWidth: 2, borderColor: 'transparent', alignItems: 'center' },
  roleCardActive: { backgroundColor: COLORS.purpleLight, borderColor: COLORS.purple, ...SHADOW.soft },
  roleEmoji: { fontSize: 28, marginBottom: 8 },
  roleTitle: { fontSize: 15, fontFamily: 'Poppins-Bold', color: COLORS.gray600, marginBottom: 2 },
  roleTitleActive: { color: COLORS.purpleDark },
  roleDesc: { fontSize: 11, fontFamily: 'OpenSans-Regular', color: COLORS.gray400, textAlign: 'center' },
  roleDescActive: { color: COLORS.purple },
  form: { marginBottom: 20 },
  showHide: { color: COLORS.purple, fontSize: 13, fontFamily: 'Poppins-Bold' },
  primaryBtn: { backgroundColor: COLORS.dark, paddingVertical: 18, borderRadius: RADIUS.lg, alignItems: 'center', marginBottom: 16 },
  primaryBtnText: { color: COLORS.white, fontSize: 16, fontFamily: 'Poppins-Bold' },
  loginLink: { alignItems: 'center', paddingVertical: 8 },
  loginLinkText: { color: COLORS.gray600, fontSize: 14, fontFamily: 'OpenSans-Regular' },
});