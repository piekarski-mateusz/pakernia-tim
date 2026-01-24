/**
 * Serwis API dla backendu Django Pakernia
 * 
 * Autoryzacja z użyciem email/hasło
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// URL API 
// lokalne: API_URL=http://localhost:8000/api
// Azure:   API_URL=https://pakernia-api.azurewebsites.net/api
// telefon: API_URL=http://192.168.x.x:8000/api (IP komputera)

const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl 
  || (typeof __DEV__ !== 'undefined' && __DEV__ 
      ? 'http://localhost:8000/api' 
      : 'https://pakernia-api.azurewebsites.net/api');

const USER_KEY = '@pakernia_user';
const TOKEN_KEY = '@pakernia_token';

// Tokeny
export async function getStoredToken() {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function setStoredToken(token) {
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
}

export async function getStoredUser() {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export async function setStoredUser(user) {
  if (user) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem(USER_KEY);
  }
}

export async function clearAuthData() {
  await AsyncStorage.removeItem(USER_KEY);
  await AsyncStorage.removeItem(TOKEN_KEY);
}

export async function isLoggedIn() {
  const token = await getStoredToken();
  return !!token;
}

// Pomocnik do API
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const { skipAuth, ...restOptions } = options;
  const token = skipAuth ? null : await getStoredToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` }),
      ...restOptions.headers,
    },
    ...restOptions,
  };

  try {
    const response = await fetch(url, config);
    
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        await clearAuthData();
      }
      throw new Error(data.error || data.detail || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`Błąd API [${endpoint}]:`, error);
    throw error;
  }
}


/**
 * Rejestracja nowego użytkownika z email i hasłem
 */
export async function register(email, password, name = '') {
  const data = await apiRequest('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ 
      email, 
      password, 
      first_name: name 
    }),
    skipAuth: true,
  });
  
  await setStoredToken(data.token);
  await setStoredUser(data.user);
  return data;
}

export async function login(email, password) {
  const data = await apiRequest('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true,
  });
  
  await setStoredToken(data.token);
  await setStoredUser(data.user);
  return data;
}



export async function logout() {
  try {
    await apiRequest('/auth/logout/', { method: 'POST' });
  } catch (e) {
  }
  await clearAuthData();
}


export async function getProfile() {
  return apiRequest('/auth/me/');
}


export async function updateProfile(data) {
  const result = await apiRequest('/auth/me/', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  await setStoredUser(result);
  return result;
}

// Śledzenie postępów

export async function getMeasurements() {
  return apiRequest('/measurements/');
}

export async function addMeasurement(measurement) {
  return apiRequest('/measurements/', {
    method: 'POST',
    body: JSON.stringify(measurement),
  });
}

export async function updateMeasurement(id, data) {
  return apiRequest(`/measurements/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function removeMeasurement(id) {
  return apiRequest(`/measurements/${id}/`, {
    method: 'DELETE',
  });
}

export async function clearMeasurements() {
  return apiRequest('/measurements/clear_all/', {
    method: 'DELETE',
  });
}

// Dni treningowe i ćwiczenia

export async function getTrainingDays() {
  return apiRequest('/training/');
}

export async function getTrainingsMap() {
  return apiRequest('/training/map/');
}

export async function getMarkedDates() {
  return apiRequest('/training/marked-dates/');
}

export async function getTrainingForDate(dateStr) {
  return apiRequest(`/training/date/${dateStr}/`);
}

export async function saveTrainingForDate(dateStr, exercises) {
  return apiRequest(`/training/date/${dateStr}/`, {
    method: 'POST',
    body: JSON.stringify({ exercises }),
  });
}

export async function deleteTrainingForDate(dateStr) {
  return apiRequest(`/training/date/${dateStr}/`, {
    method: 'DELETE',
  });
}

// Plany treningowe

export async function getTrainingPlans() {
  return apiRequest('/training-plans/');
}

export async function getTrainingPlan(id) {
  return apiRequest(`/training-plans/${id}/`);
}

export async function createTrainingPlan(plan) {
  return apiRequest('/training-plans/', {
    method: 'POST',
    body: JSON.stringify(plan),
  });
}

export async function updateTrainingPlan(id, data) {
  return apiRequest(`/training-plans/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTrainingPlan(id) {
  return apiRequest(`/training-plans/${id}/`, {
    method: 'DELETE',
  });
}

export async function healthCheck() {
  try {
    const response = await fetch(`${API_BASE_URL}/health/`);
    return response.ok;
  } catch {
    return false;
  }
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}
