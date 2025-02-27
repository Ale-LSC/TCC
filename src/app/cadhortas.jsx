import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '@/src/firebase/firebase';

const CadHortalica = () => {
  const [nomeHortalica, setNomeHortalica] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [uso, setUso] = useState('');
  const [manuseio, setManuseio] = useState('');
  const [colheita, setColheita] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!nomeHortalica || !observacoes || !uso || !manuseio || !colheita || !descricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const hortalicaData = {
        nomeHortalica,
        observacoes,
        uso,
        manuseio,
        colheita,
        descricao,
        horario,
      };
      await setDoc(doc(db, 'hortalicas', nomeHortalica), hortalicaData);

      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        await updateDoc(userDoc, {
          hortalicasSelecionadas: arrayUnion(hortalicaData),
        });
      }

      Alert.alert('Sucesso', 'Cadastro de hortaliça realizado com sucesso!');
      navigation.navigate('minhashortas');
    } catch (error) {
      console.error('Erro no cadastro:', error.message);
      Alert.alert('Erro no cadastro', 'Erro ao criar a hortaliça.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Hortalica</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Hortalica"
        value={nomeHortalica}
        onChangeText={setNomeHortalica}
      />
      <TextInput
        style={styles.input}
        placeholder="Observações"
        value={observacoes}
        onChangeText={setObservacoes}
      />
      <TextInput
        style={styles.input}
        placeholder="Horários"
        value={horario}
        onChangeText={setHorario}
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
      <TextInput
        style={styles.input}
        placeholder="Colheita"
        value={colheita}
        onChangeText={setColheita}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>CADASTRAR HORTALICA</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#28A745', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: '#28A745', paddingVertical: 15, alignItems: 'center', borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default CadHortalica;
