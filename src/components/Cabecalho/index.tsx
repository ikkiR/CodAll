import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import Logo from '../../Assets/logo.png';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../global/AuthContext';

export type CabecalhoProps = {
  onPressUser?: () => void;
  onPressLogout?: () => void;
};

export function Cabecalho({ onPressUser, onPressLogout }: CabecalhoProps) {
  const navigation = useNavigation<any>();
  const { usuario, sair } = React.useContext(AuthContext);

  const handleUser = () => {
    if (onPressUser) return onPressUser();
    navigation.navigate('Perfil' as never);
  };

  const handleLogout = async () => {
    if (onPressLogout) return onPressLogout();
    await sair();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TouchableOpacity onPress={handleUser} style={styles.sideButton}>
        <MaterialIcons name="person" size={26} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate("Home")}>
      <View style={styles.center}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.sideButton}>
        <MaterialIcons name="logout" size={24} color="#000" />
      </TouchableOpacity>
      {/* Curva decorativa inferior */}
      <View style={styles.curva} />
    </SafeAreaView>
  );
}

export default Cabecalho;
