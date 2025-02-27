import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetalhesScreen = () => {
  const route = useRoute();
  const { hortalica } = route.params || {}; // Recebendo a hortaliça como parâmetro

  // Usar useEffect para logar as informações no console assim que a tela for carregada
  useEffect(() => {
    if (hortalica) {
      console.log('Hortalica selecionada:', hortalica);
    }
  }, [hortalica]);

  if (!hortalica) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhuma hortaliça selecionada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Hortaliça</Text>
      <Text style={styles.text}>Nome: {hortalica.nome}</Text>
      <Text style={styles.text}>Manuseio: {hortalica.manuseio}</Text>
      <Text style={styles.text}>Descrição: {hortalica.uso}</Text>
      <Text style={styles.text}>Descrição: {hortalica.horario}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  text: { fontSize: 18, marginBottom: 8 },
  errorText: { color: 'red', fontSize: 18, textAlign: 'center' },
});

export default DetalhesScreen;
