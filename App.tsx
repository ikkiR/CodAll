import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorAuth } from './src/global/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import api from './src/services/api';

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await api.get('/usuarios');
        console.log('Usuários:', response.data);
        setUsuarios(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setCarregando(false);
      }
    };
    carregarDados();
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ProvedorAuth>
          <Routes />
        </ProvedorAuth>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

