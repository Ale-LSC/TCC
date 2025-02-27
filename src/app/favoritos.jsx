import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/firebase';
import { useNavigation } from '@react-navigation/native';

const FavoritosScreen = () => {
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setErrorMessage('Usuário não autenticado. Faça login novamente.');
          return;
        }

        const userDoc = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          setFavoritos(data.favoritos || []);
        }
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        setErrorMessage('Erro ao carregar favoritos. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando favoritos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Hortaliças Favoritas</Text>
      </View>
      
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <TouchableOpacity 
              style={styles.viewMoreButton} 
              onPress={() => navigation.navigate('Detalhes', { itemId: item.id })}>
              <Text style={styles.viewMoreText}>Ver mais</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  viewMoreButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
});

export default FavoritosScreen;
