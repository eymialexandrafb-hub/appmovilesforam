import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, Alert, Platform, StatusBar
} from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../theme';

// Importamos nuestra función personalizada que conecta con AsyncStorage
import { saveLocalData } from '../utils/storage'; 

export default function SignUpScreen({ navigation }) {
  // Manejo de Estados (State): Aquí guardamos temporalmente lo que el usuario escribe.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // ESTADO CLAVE PARA EL PROFE: Aquí definimos si el usuario es estudiante o dueño.
  // Inicia por defecto en 'student'. Al tocar los botones, esto cambia dinámicamente.
  const [userRole, setUserRole] = useState('student'); 

  // Función asíncrona que se ejecuta al presionar "Registrarse"
  const handleSignUp = async () => {
    // 1. VALIDACIÓN BÁSICA: .trim() elimina los espacios en blanco. 
    // Si algún campo está vacío, detenemos la función con un 'return' temprano.
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa todos los datos.");
      return;
    }

    // 2. ESCUDO PROTECTOR (Try/Catch): Si falla el guardado en la memoria del teléfono, 
    // el 'catch' atrapa el error y muestra una alerta en vez de cerrar la aplicación de golpe.
    try {
      // Armamos un objeto (JSON) con los datos capturados en la vista, incluyendo el ROL seleccionado.
      const userData = {
        name: name,
        email: email,
        role: userRole, 
        createdAt: new Date().toISOString() // Guardamos la fecha exacta del registro
      };

      // 3. PERSISTENCIA: Enviamos nuestro objeto a la función que lo guarda en el teléfono.
      await saveLocalData('user_profile', userData);
      
      // 4. NAVEGACIÓN: Si todo sale bien y se guardó la data, avanzamos a la siguiente pantalla.
      navigation.navigate('IdentityValidation');

    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", `Hubo un problema: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Usamos ScrollView para que la pantalla sea deslizable cuando el teclado sube */}
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

        {/* SELECTOR DE ROL: Demostración visual de cambio de estado */}
        <View style={styles.roleSelector}>
          {/* Si userRole es 'student', le agregamos el estilo 'roleCardActive' para pintarlo morado */}
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
          {/* RENDERIZADO DINÁMICO: Operador ternario.
              Si es estudiante dice "Correo Universitario", si no, dice "Correo Electrónico". */}
          <InputField
            label={userRole === 'student' ? "Correo Universitario" : "Correo Electrónico"}
            placeholder={userRole === 'student' ? "tu.nombre@universidad.cl" : "correo@ejemplo.com"}
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
          onPress={handleSignUp} // Conectamos el botón con nuestra función asíncrona
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

// COMPONENTE REUTILIZABLE: Creamos esta función pequeña (InputField) para no repetir 
// el mismo código de diseño tres veces en el formulario principal.
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
          onChangeText={onChangeText} // Conecta lo escrito con el estado (ej: setName)
          secureTextEntry={secureTextEntry} // Oculta los caracteres de la contraseña
          keyboardType={keyboardType || 'default'}
          autoCapitalize={autoCapitalize || 'words'}
        />
        {rightAction}
      </View>
    </View>
  );
}

// Estilos de los inputs
const inputStyles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, fontFamily: 'Poppins-Bold', color: COLORS.dark, marginBottom: 8, marginLeft: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.gray100, borderRadius: RADIUS.md, paddingHorizontal: 16, paddingVertical: 14 },
  icon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: COLORS.dark },
});

// Estilos generales
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