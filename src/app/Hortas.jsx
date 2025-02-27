import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/firebase';
import { useNavigation } from '@react-navigation/native';

const HortasScreen = () => {
  const navigation = useNavigation();
  const [hortalicas, setHortalicas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHortalicas = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'hortalicas'));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setHortalicas(data);
      } catch (error) {
        console.error('Erro ao buscar hortaliças:', error);
        setErrorMessage('Erro ao carregar hortaliças. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHortalicas();
  }, []);

  const selecionarHortalica = async (hortalica) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setErrorMessage('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        hortalicasSelecionadas: arrayUnion(hortalica),
      });

      navigation.navigate('minhashortas');
    } catch (error) {
      console.error('Erro ao adicionar hortaliça:', error);
      setErrorMessage('Erro ao adicionar a hortaliça. Tente novamente.');
    }
  };

  const adicionarFavorito = async (hortalica) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setErrorMessage('Usuário não autenticado. Faça login novamente.');
        return;
      }

      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        favoritos: arrayUnion(hortalica),
      });

      Alert.alert('Sucesso', 'Hortalica adicionada aos favoritos!');
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
      setErrorMessage('Erro ao adicionar aos favoritos. Tente novamente.');
    }
  };

  const irParaDetalhes = (hortalica) => {
    navigation.navigate('detalhes', { hortalica });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Carregando hortaliças...</Text>
      </View>
      
    );
    
  }

  return (
    <View style={styles.container}><View style={styles.menu}>
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
      <Text style={styles.title}>Escolha suas hortaliças:</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <FlatList
        data={hortalicas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.nome}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => selecionarHortalica(item)}
              >
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => irParaDetalhes(item)}
              >
                <Text style={styles.buttonText}>Ver Mais</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => adicionarFavorito(item)}
              >
                <Text style={styles.buttonText}>Favoritar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  itemContainer: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 8 },
  text: { fontSize: 18, marginBottom: 8 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  addButton: { backgroundColor: '#28A745', padding: 8, borderRadius: 5, marginRight: 8 },
  detailsButton: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5 },
  favoriteButton: { backgroundColor: '#FFC107', padding: 8, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 16, marginBottom: 8 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HortasScreen;
