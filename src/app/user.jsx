import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '@/src/firebase/firebase';

const UserScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Alert.alert("Logout bem-sucedido!", "Você foi desconectado.");
      navigation.navigate('login'); 
    } catch (error) {
      console.error("Erro ao deslogar:", error.message);
      Alert.alert("Erro", "Ocorreu um erro ao tentar deslogar.");
    }
  };

  const handleHortas = async () => {
    try {
      const user = auth.currentUser; 
      if (!user) {
        Alert.alert('Erro', 'Você precisa estar autenticado para acessar esta seção.');
        return;
      }
      console.log('Preparando para navegar para a tela de Hortas');
      navigation.navigate('Hortas');
    } catch (error) {
      console.error('Erro ao tentar navegar para a tela de Hortas:', error.message);
      Alert.alert('Erro', 'Não foi possível acessar a tela de Hortas. Tente novamente.');
    }
  };

  return (
    <View>
      <Text>Bem-vindo à tela do usuário!</Text>
      <Button title="Acessar Hortas" onPress={handleHortas} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default UserScreen;
