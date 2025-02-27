import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/src/firebase/firebase';

const CadastroHortalicaScreen = () => {
  const [horario, setHorario] = useState('');
  const [nomeHortalica, setNomeHortalica] = useState('');
  const [uso, setUso] = useState('');
  const [manuseio, setManuseio] = useState('');

  const handleRegister = async () => {
    if (!horario || !nomeHortalica || !uso || !manuseio) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Salva informações da hortalica na coleção "hortaliças"
      const docRef = doc(db, 'hortalicas', nomeHortalica); // Usando o nome da hortalica como ID do documento
      await setDoc(docRef, {
        horario,
        nome: nomeHortalica,
        uso,
        manuseio,
      });

      Alert.alert('Sucesso', 'Cadastro da hortalica realizado com sucesso!');
      // Limpa os campos após o cadastro
      setHorario('');
      setNomeHortalica('');
      setUso('');
      setManuseio('');
    } catch (error) {
      console.error('Erro no cadastro:', error.message);
      Alert.alert('Erro no cadastro', 'Erro ao cadastrar a hortalica.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Cadastro de Hortalica</Text>
        <TextInput
          style={styles.input}
          placeholder="Horário"
          value={horario}
          onChangeText={setHorario}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome da Hortalica"
          value={nomeHortalica}
          onChangeText={setNomeHortalica}
        />
        <TextInput
          style={styles.input}
          placeholder="Uso"
          value={uso}
          onChangeText={setUso}
        />
        <TextInput
          style={styles.input}
          placeholder="Manuseio"
          value={manuseio}
          onChangeText={setManuseio}
        />
        <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
          <Text style={styles.signupButtonText}>CADASTRAR HORTALICA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signupContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28A745',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CadastroHortalicaScreen;