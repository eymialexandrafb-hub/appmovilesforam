import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

// Importamos los hooks y los pesos específicos de las 2 familias de fuentes de Google.
import { useFonts, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import { OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';

export default function App() {
  // useFonts carga las tipografías asíncronamente en la memoria del dispositivo.
  // Asignamos nombres personalizados (ej: 'Poppins-Bold') para usarlos en el StyleSheet.
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-ExtraBold': Poppins_800ExtraBold,
    'OpenSans-Regular': OpenSans_400Regular,
    'OpenSans-SemiBold': OpenSans_600SemiBold,
  });

  // Condición de seguridad: Si las fuentes aún están descargándose (fontsLoaded es falso),
  // retornamos null para evitar que la interfaz intente renderizar textos y se rompa.
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}

// Vincula nuestro componente App con el motor de Expo para indicar que es la vista principal.
registerRootComponent(App);