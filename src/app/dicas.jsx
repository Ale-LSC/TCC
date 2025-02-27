import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título da Página */}
      <Text style={styles.title}>Dicas para Iniciar Sua Horta Caseira</Text>

      {/* Seção: Escolha o Local Ideal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Escolha o Local Ideal</Text>
        <Text style={styles.sectionText}>
          O local é fundamental para o sucesso da sua horta. Certifique-se de escolher um local que receba
          pelo menos 4-6 horas de luz solar direta por dia. Se você mora em apartamento, procure por uma
          janela bem iluminada ou até mesmo uma varanda.
        </Text>
        <Image
          source={{ uri: 'https://example.com/local_ideal.jpg' }}
          style={styles.image}
        />
      </View>

      {/* Seção: Melhores Plantas para Iniciar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Melhores Plantas para Iniciar</Text>
        <Text style={styles.sectionText}>
          Se você está começando, escolha plantas fáceis de cuidar e que se adaptam bem a diferentes tipos
          de clima. Algumas boas opções incluem:
        </Text>
        <Text style={styles.listItem}>- Alface</Text>
        <Text style={styles.listItem}>- Coentro</Text>
        <Text style={styles.listItem}>- Manjericão</Text>
        <Text style={styles.listItem}>- Tomate</Text>
        <Text style={styles.listItem}>- Cenoura</Text>
      </View>

      {/* Seção: Cuidados Diários */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Cuidados Diários</Text>
        <Text style={styles.sectionText}>
          Lembre-se de regar sua horta regularmente, especialmente durante os meses mais quentes. Além disso,
          faça a rotação das plantas para evitar o esgotamento do solo.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => alert('Dica: Regue suas plantas todas as manhãs!')}>
          <Text style={styles.buttonText}>Dica Rápida</Text>
        </TouchableOpacity>
      </View>

      {/* Seção: Colheita */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Momento da Colheita</Text>
        <Text style={styles.sectionText}>
          Fique atento ao momento certo de colher as suas plantas. Alguns sinais de que a planta está pronta
          para ser colhida incluem folhas grandes, cor vibrante e tamanho adequado.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388E3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#388E3C',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#388E3C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
