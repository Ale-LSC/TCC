import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Importa o hook useRouter para navegação

// Importa a imagem local
import HortaImage from '@/src/assets/horta-icon.png';

const MinhaHortaScreen = () => {
  const router = useRouter(); // Inicializa o router do Expo Router

  const handleNavigateToLogin = () => {
    router.push('/login'); // Navega para a página de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monte sua Horta</Text>
      
      {/* Exibe a imagem importada */}
      <Image
        source={HortaImage}
        style={styles.image}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleNavigateToLogin}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
      
      <Text style={styles.footerText}>Acompanhe Sua Evolução</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain', // Mantém a proporção da imagem
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default MinhaHortaScreen;
