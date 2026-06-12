import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLocalData = async (key, value) => {
  try {
    // AsyncStorage.setItem guarda el dato en la memoria del celular.
    // Usamos JSON.stringify(value) para convertir nuestro objeto de JavaScript
    // a una cadena de texto (string), ya que AsyncStorage NO acepta objetos puros.
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error al guardar:", e);
  }
};

export const getLocalData = async (key) => {
  try {
    // AsyncStorage.getItem busca en la memoria usando la llave ('user_profile', etc).
    const data = await AsyncStorage.getItem(key);
    // Como el dato se guardó como texto, usamos JSON.parse(data) para
    // volver a transformarlo en un objeto de JavaScript usable. Si no hay data, retorna null.
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error al leer:", e);
  }
};