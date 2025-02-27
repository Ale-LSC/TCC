import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '@/src/firebase/firebase'; // Firestore
import { db2 } from '@/src/firebase/firebase2'; // Realtime Database

const MinhaHortaScreen = () => {
  const [hortalicas, setHortalicas] = useState([]);
  const [realtimeData, setRealtimeData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Busca dados do Firestore (hortaliças cadastradas)
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

  // Busca parâmetros do Realtime Database
  const fetchRealtimeData = () => {
    const realtimeRef = ref(db2, 'esp01'); // Caminho específico do Arduino
    onValue(realtimeRef, (snapshot) => {
      if (snapshot.exists()) {
        setRealtimeData(snapshot.val()); // Armazena os dados do Arduino
      } else {
        console.warn('Nenhum dado encontrado no Realtime Database.');
      }
    });
  };

  useEffect(() => {
    fetchUserHortalicas();
    fetchRealtimeData();
  }, []);

  const handleNavigation = (route) => {
    if (router.asPath !== route) {
      router.push(route);
    } else {
      fetchUserHortalicas();
    }
  };

  const renderHortalica = ({ item }) => {
    // Substituindo temperatura e umidade com valores do Realtime Database
    const temperatura = realtimeData.temperatura || '--°C';
    const umidade = realtimeData.umidade || '--%';

    return (
      <View style={styles.hortaItem}>
        <Text style={styles.title}>{item.nome || 'Minha Horta'}</Text>
        <Image
          source={require('@/src/assets/horta-icon.png')} // Substitua pelo caminho correto da sua imagem
          style={styles.hortaImage}
        />
        <View style={styles.parameters}>
          <Text style={styles.parameterText}>Clima: {item.clima || '--°C'}</Text>
          <Text style={styles.parameterText}>Temperatura do Solo: {temperatura}</Text>
          <Text style={styles.parameterText}>Umidade do Solo: {umidade}</Text>
        </View>
        <View style={styles.observacoes}>
          <Text style={styles.sectionTitle}>Observações</Text>
          <Text style={styles.observacaoText}>
            {item.observacoes || 'Nenhuma observação disponível'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegação estilo Tabs */}
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
        
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {hortalicas.length === 0 ? (
          <Text style={styles.noHortaText}>Nenhuma horta cadastrada</Text>
        ) : (
          <FlatList
            data={hortalicas}
            renderItem={renderHortalica}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItem: { flex: 1, alignItems: 'center' },
  menuText: { fontSize: 16, color: '#555' },
  activeMenuText: { color: '#4CAF50', fontWeight: 'bold' },
  content: { flex: 1, padding: 10 },
  listContainer: { paddingBottom: 20 },
  hortaItem: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  noHortaText: { fontSize: 20, textAlign: 'center', color: '#777', marginTop: 40 },
  hortaImage: { width: '100%', height: 150, resizeMode: 'contain', marginBottom: 10 },
  parameters: { marginBottom: 10 },
  parameterText: { fontSize: 14, marginBottom: 5, color: '#555' },
  observacoes: { backgroundColor: '#DFFFD6', padding: 10, borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  observacaoText: { fontSize: 14, color: '#555' },
});

export default MinhaHortaScreen;
