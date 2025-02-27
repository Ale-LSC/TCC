import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { auth } from '@/src/firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const PerfilScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserInfo({
        name: user.displayName || 'Usuário',
        email: user.email || 'Email não disponível',
      });
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('login');
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
      });
  };

  if (!userInfo) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando informações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.menuItem}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('minhashortas')} style={styles.menuItem}>
          <Text style={styles.menuText}>Minha Horta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('favoritos')} style={styles.menuItem}>
          <Text style={styles.menuText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('dicas')} style={styles.menuItem}>
          <Text style={styles.menuText}>Dicas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('perfil')} style={styles.menuItem}>
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1572451479625-d98c193aa3c8?crop=entropy&cs=tinysrgb&w=1080&fit=max',
          cache: 'force-cache',
        }}
        style={styles.bannerImage}
      />
      <View style={styles.profileContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{userInfo.name[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.nameText}>{userInfo.name}</Text>
        <Text style={styles.emailText}>{userInfo.email}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('edperfil')} style={styles.optionButton} >
          <Text style={styles.optionButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('sobre')} style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Sobre o App</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('suporte')} style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Suporte</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  bannerImage: { width: '100%', height: 200 },
  profileContainer: { alignItems: 'center', marginVertical: 16 },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1E7DD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, color: '#4CAF50', fontWeight: 'bold' },
  nameText: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  emailText: { fontSize: 16, color: '#666' },
  buttonsContainer: { marginVertical: 16 },
  optionButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionButtonText: { fontSize: 16, color: '#333' },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 32,
    marginHorizontal: 16,
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  logoutButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, color: '#666' },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Verde da paleta de cores
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#388E3C', // Verde mais escuro para o fundo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'absolute',  // Fixando o menu no topo
    top: 0,                // Alinhando no topo
    left: 0,
    right: 0,
    zIndex: 10,           // Garantindo que o menu fique acima dos outros componentes
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#fff', // Texto branco para contraste
    fontWeight: 'bold',
  },
  buttonsContainer: { marginVertical: 16, marginTop: 100 },  // Ajustando o conteúdo para não sobrepor o menu
});

export default PerfilScreen;
