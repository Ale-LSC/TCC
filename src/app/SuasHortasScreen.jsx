import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/firebase';
import { useNavigation } from '@react-navigation/native';

const SuasHortasScreen = () => {
  const [hortalicas, setHortalicas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const fetchUserHortalicas = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado.');

      const userDoc = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        setHortalicas(userSnapshot.data().hortalicasSelecionadas || []);
      }
    } catch (error) {
      console.error('Erro ao buscar hortaliças:', error);
      setErrorMessage('Erro ao carregar suas hortaliças.');
    }
  };

  const excluirHortalica = async (hortalica) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Usuário não autenticado.');

      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        hortalicasSelecionadas: arrayRemove(hortalica),
      });

      Alert.alert('Sucesso', `${hortalica.nome} foi removida.`);
      fetchUserHortalicas();
    } catch (error) {
      console.error('Erro ao excluir hortaliça:', error);
      setErrorMessage('Erro ao excluir hortaliça.');
    }
  };

  const irParaDetalhes = (hortalica) => {
    navigation.navigate('DetalhesScreen', { nomehortalica: hortalica.nome });
  };

  useEffect(() => {
    fetchUserHortalicas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Hortaliças:</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {hortalicas.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma hortaliça cadastrada.</Text>
      ) : (
        <FlatList
          data={hortalicas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.text}>{item.nome}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => irParaDetalhes(item)}
                >
                  <Text style={styles.buttonText}>Ver Mais</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => excluirHortalica(item)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  itemContainer: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 18, marginBottom: 8 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  detailsButton: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5 },
  deleteButton: { backgroundColor: '#FF3B30', padding: 8, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 8 },
  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
});

export default SuasHortasScreen;
