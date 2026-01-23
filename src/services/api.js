import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// URL API 
// lokalne: API_URL=http://localhost:8000/api
// Azure:   API_URL=https://pakernia-api.azurewebsites.net/api
// telefon: API_URL=http://192.168.x.x:8000/api (IP komputera)
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl 
  || (typeof __DEV__ !== 'undefined' && __DEV__ 
      ? 'http://10.0.2.2:8000/api' 
      : 'https://pakernia-api.azurewebsites.net/api');

const TOKEN_KEY = '@pakernia_token';

export async function getStoredToken() {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = await getStoredToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    
    if (!response.ok) {
      throw new Error(data.error || data.detail || `HTTP ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error(`Błąd API [${endpoint}]:`, error);
    throw error;
  }
}

export async function getMarkedDates() {
  return apiRequest('/training/marked-dates/');
}