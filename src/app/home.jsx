import React from 'react';
import { View, Text, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '@/src/firebase/firebase';

const HomeScreen = () => {
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
    <View style={styles.container}>
      {/* Menu superior */}
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={[styles.menuItem, styles.highlighted]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('minhashortas')}>
          <Text style={styles.menuItem}>Minha Horta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('favoritos')}>
          <Text style={styles.menuItem}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('dicas')}>
          <Text style={styles.menuItem}>Dicas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('perfil')}>
          <Text style={styles.menuItem}>Perfíl</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <Text style={styles.title}>Monte sua Horta</Text>
        <Image source={require('@/src/assets/horta-icon.png')} style={styles.image} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate ('Hortas')}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItem: {
    fontSize: 16,
    color: '#555',
  },
  highlighted: {
    color: '#4CAF50', // Verde para destacar a página atual
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;
